/* eslint-disable no-console */
/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
/* eslint-disable max-len */
/* eslint-disable no-underscore-dangle */
import { writeFileSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const BASE = 'https://lookboutiquestore.com';
const COLLECTIONS = [
  'best-sellers',
  'back-in-stock',
  'modest-wear',
  'tops',
  'bottoms',
  'dresses',
  'outerwear',
  'essential-knitwear',
  'basic-pieces',
];

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT = join(__dirname, '../src/mocks/lbsProducts.json');

const stripHtml = (html = '') => html
  .replace(/<[^>]+>/g, ' ')
  .replace(/\s+/g, ' ')
  .trim();

const sleep = (ms) => new Promise((r) => { setTimeout(r, ms); });

const fetchCollection = async (handle, page = 1, attempt = 0) => {
  const url = `${BASE}/collections/${handle}/products.json?limit=250&page=${page}`;
  const res = await fetch(url);
  if (!res.ok) {
    if (attempt < 2) {
      await sleep(800);
      return fetchCollection(handle, page, attempt + 1);
    }
    return [];
  }
  const data = await res.json();
  return data.products || [];
};

const fetchAllFromCollection = async (handle) => {
  let page = 1;
  const all = [];
  for (;;) {
    // eslint-disable-next-line no-await-in-loop
    const batch = await fetchCollection(handle, page);
    if (!batch.length) break;
    all.push(...batch);
    if (batch.length < 250) break;
    page += 1;
  }
  return all;
};

const APP_COLLECTIONS = new Set([
  'best-sellers', 'back-in-stock', 'back-to-office', 'under-300k',
]);

const mapCategories = (tags = [], collectionHandles = [], price = 0) => {
  const slugs = new Set(
    collectionHandles.filter((h) => APP_COLLECTIONS.has(h)),
  );
  if (tags.some((t) => t.toLowerCase() === 'new')) slugs.add('new-arrivals');
  if (tags.some((t) => t.includes('OFFICEWEAR'))) slugs.add('back-to-office');
  if (tags.some((t) => t.toUpperCase().includes('BACK IN STOCK'))) {
    slugs.add('back-in-stock');
  }
  if (price > 0 && price < 300000) slugs.add('under-300k');
  return [...slugs];
};

const transformProduct = (p, categorySlugs) => {
  const imageUrls = (p.images || []).map((img) => img.src);
  const price = Math.round(parseFloat(p.variants?.[0]?.price || 0));
  const stock = p.variants?.reduce((sum, v) => sum + (v.available ? 1 : 0), 0) || 5;
  const sizes = p.options?.find((o) => o.name === 'SIZE')?.values?.join(', ')
    || p.variants?.map((v) => v.option1).filter(Boolean).join(', ')
    || 'S, M, L';
  const color = p.options?.find((o) => o.name === 'COLOR')?.values?.[0]
    || p.tags?.find((t) => ['BROWN', 'CREME', 'BLUE', 'WHITE', 'GREEN'].includes(t))
    || '-';
  const material = p.tags?.find((t) => ['POLYESTER', 'COTTON', 'LINEN', 'VISCOSE', 'SILK', 'DENIM', 'KNIT'].some((m) => t.includes(m)))
    || p.product_type
    || 'Premium fabric';

  return {
    shopifyId: p.id,
    slug: p.handle,
    title: p.title,
    short_description: stripHtml(p.body_html).slice(0, 200),
    price,
    stock: Math.max(stock, 1),
    categorySlugs,
    images: imageUrls,
    product_type: p.product_type,
    description: {
      weight: p.variants?.[0]?.grams || 300,
      size: sizes,
      material,
      color,
      height: 168,
      wearingSize: 'M',
    },
  };
};

const main = async () => {
  const byHandle = new Map();
  const collectionMembership = new Map();

  for (const collection of COLLECTIONS) {
    console.log(`Fetching ${collection}...`);
    const products = await fetchAllFromCollection(collection);
    console.log(`  → ${products.length} products`);
    products.forEach((p) => {
      if (!collectionMembership.has(p.handle)) {
        collectionMembership.set(p.handle, new Set());
      }
      collectionMembership.get(p.handle).add(collection);
      if (!byHandle.has(p.handle)) {
        byHandle.set(p.handle, p);
      }
    });
  }

  const products = [...byHandle.entries()].map(([handle, p]) => {
    const memberships = [...(collectionMembership.get(handle) || [])];
    const price = Math.round(parseFloat(p.variants?.[0]?.price || 0));
    const categorySlugs = mapCategories(p.tags, memberships, price);
    return transformProduct(p, categorySlugs);
  });

  products.sort((a, b) => a.title.localeCompare(b.title));

  const output = {
    fetchedAt: new Date().toISOString(),
    source: BASE,
    count: products.length,
    products,
  };

  writeFileSync(OUT, `${JSON.stringify(output, null, 2)}\n`);
  console.log(`\nSaved ${products.length} products → ${OUT}`);
};

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
