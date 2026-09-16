#!/usr/bin/env node
/*
Notify the Newsletter Subscribers segment about a published blog post.

Usage:
  node scripts/notify-subscribers.js <slug>          Dry run: prints the email, sends nothing
  node scripts/notify-subscribers.js <slug> --send    Creates and sends the broadcast for real
*/

const fs = require('fs');
const path = require('path');

function loadEnvLocal() {
  const envPath = path.join(__dirname, '..', '.env.local');
  const content = fs.readFileSync(envPath, 'utf8');
  for (const line of content.split('\n')) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const eq = trimmed.indexOf('=');
    if (eq === -1) continue;
    const key = trimmed.slice(0, eq).trim();
    let value = trimmed.slice(eq + 1).trim();
    value = value.replace(/^['"]|['"]$/g, '');
    if (!(key in process.env)) process.env[key] = value;
  }
}

loadEnvLocal();

const { Resend } = require('resend');
const { sanityQuery } = require('../api/_lib/sanity');
const { buildPostNotificationBroadcast } = require('../api/_lib/post-notification-email');

const resend = new Resend(process.env.RESEND_API_KEY);
const SEGMENT_ID = process.env.RESEND_NEWSLETTER_SEGMENT_ID;

async function main() {
  const args = process.argv.slice(2);
  const send = args.includes('--send');
  const slug = args.find((a) => !a.startsWith('--'));

  if (!slug) {
    console.error('Usage: node scripts/notify-subscribers.js <slug> [--send]');
    process.exit(1);
  }

  const post = await sanityQuery(
    `*[_type == "post" && slug.current == $slug][0]{title, excerpt, category, "slug": slug.current}`,
    { slug }
  );

  if (!post) {
    console.error(`No published post found with slug "${slug}"`);
    process.exit(1);
  }

  const broadcast = buildPostNotificationBroadcast(post);

  console.log('--- Broadcast preview ---');
  console.log('Name:', broadcast.name);
  console.log('Subject:', broadcast.subject);
  console.log('From:', broadcast.from);
  console.log('Post URL:', broadcast.postUrl);
  console.log('Target segment:', SEGMENT_ID);
  console.log('-------------------------');

  if (!send) {
    console.log('\nDry run only, nothing was sent. Re-run with --send to create and send this broadcast.');
    return;
  }

  // Guard against re-running this by accident for a post that was already notified.
  const { data: listData, error: listError } = await resend.broadcasts.list();
  if (listError) {
    console.warn('Could not check for a prior send, continuing anyway:', listError.message);
  } else {
    const existing = listData?.data || listData || [];
    const already = existing.find((b) => b.name === broadcast.name && b.status !== 'draft');
    if (already) {
      console.log(`A broadcast named "${broadcast.name}" was already sent (status: ${already.status}, id: ${already.id}). Skipping.`);
      return;
    }
  }

  const { data: created, error: createError } = await resend.broadcasts.create({
    name: broadcast.name,
    from: broadcast.from,
    subject: broadcast.subject,
    html: broadcast.html,
    segmentId: SEGMENT_ID,
  });

  if (createError) {
    console.error('Failed to create broadcast:', createError.message);
    process.exit(1);
  }

  const { error: sendError } = await resend.broadcasts.send(created.id);

  if (sendError) {
    console.error('Failed to send broadcast:', sendError.message);
    process.exit(1);
  }

  console.log(`Sent broadcast ${created.id} to segment ${SEGMENT_ID}.`);
}

main();
