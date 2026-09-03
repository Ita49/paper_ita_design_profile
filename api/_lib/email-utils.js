const crypto = require('crypto');

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function isValidEmail(email) {
  return typeof email === 'string' && email.length <= 254 && EMAIL_RE.test(email.trim());
}

function shortHash(input) {
  return crypto.createHash('sha256').update(input).digest('hex').slice(0, 24);
}

// Signed with the Resend key so an unsubscribe link can't be forged for someone else's address.
function unsubscribeToken(email) {
  return crypto.createHmac('sha256', process.env.RESEND_API_KEY).update(email.toLowerCase()).digest('hex').slice(0, 32);
}

function isValidUnsubscribeToken(email, token) {
  if (typeof token !== 'string' || !token) return false;
  const expected = Buffer.from(unsubscribeToken(email));
  const actual = Buffer.from(token);
  return expected.length === actual.length && crypto.timingSafeEqual(expected, actual);
}

module.exports = { isValidEmail, shortHash, unsubscribeToken, isValidUnsubscribeToken };
