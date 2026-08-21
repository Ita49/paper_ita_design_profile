const PROJECT_ID = process.env.SANITY_API_PROJECT_ID;
const DATASET = process.env.SANITY_API_DATASET;
const READ_TOKEN = process.env.SANITY_API_READ_TOKEN;

async function sanityQuery(groqQuery, params = {}) {
  const url = new URL(`https://${PROJECT_ID}.api.sanity.io/v2024-08-01/data/query/${DATASET}`);
  url.searchParams.set('query', groqQuery);
  for (const [key, value] of Object.entries(params)) {
    url.searchParams.set(`$${key}`, JSON.stringify(value));
  }

  const res = await fetch(url, {
    headers: { Authorization: `Bearer ${READ_TOKEN}` },
  });

  if (!res.ok) {
    throw new Error(`Sanity query failed: ${res.status} ${await res.text()}`);
  }

  const json = await res.json();
  return json.result;
}

function imageUrl(source, { width } = {}) {
  if (!source || !source.asset || !source.asset._ref) return null;
  // asset ref format: image-<assetId>-<width>x<height>-<format>
  const ref = source.asset._ref;
  const parts = ref.replace('image-', '').split('-');
  const format = parts.pop();
  const dimensions = parts.pop();
  const assetId = parts.join('-');
  const w = width ? `?w=${width}&auto=format` : '?auto=format';
  return `https://cdn.sanity.io/images/${PROJECT_ID}/${DATASET}/${assetId}-${dimensions}.${format}${w}`;
}

module.exports = { sanityQuery, imageUrl };
