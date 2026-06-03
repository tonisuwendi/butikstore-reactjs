import lbsData from './lbsProducts.json';
import { sizeChartImage, sizeGuideImage } from './productImages';

export const CATEGORY_META = {
  'best-sellers': 'BEST SELLERS',
  'new-arrivals': 'NEW ARRIVALS',
  'back-in-stock': 'BACK IN STOCK',
  'back-to-office': 'BACK TO OFFICE',
  'under-300k': 'SHOP UNDER 300K',
};

const CATEGORY_IDS = {
  'best-sellers': 1,
  'new-arrivals': 2,
  'back-in-stock': 3,
  'back-to-office': 4,
  'under-300k': 5,
};

const buildDescription = (specs) => JSON.stringify({
  weight: specs.weight,
  size: specs.size,
  material: specs.material,
  color: specs.color,
  height: specs.height,
  wearing_size: specs.wearingSize,
});

const normalizeCategorySlugs = (slugs = [], price = 0) => {
  const set = new Set(slugs.filter((s) => s !== 'shop-all' && CATEGORY_META[s]));
  if (price > 0 && price < 300000) set.add('under-300k');
  if (set.size === 0) set.add('new-arrivals');
  return [...set];
};

const toCategories = (categorySlugs) => categorySlugs.map((slug) => ({
  id: CATEGORY_IDS[slug] || 0,
  slug,
  title: CATEGORY_META[slug],
}));

export const MOCK_PRODUCTS = lbsData.products.map((p, index) => {
  const categorySlugs = normalizeCategorySlugs(p.categorySlugs, p.price);
  const listImages = p.images.length >= 2
    ? [p.images[0], p.images[1]]
    : [p.images[0], p.images[0]].filter(Boolean);

  return {
    id: p.shopifyId || index + 1,
    slug: p.slug,
    title: p.title,
    short_description: p.short_description,
    price: p.price,
    stock: p.stock,
    categories: toCategories(categorySlugs),
    categorySlugs,
    images: p.images,
    listImages,
    size_guide: p.images[0] || sizeGuideImage,
    size_chart: p.images[1] || p.images[0] || sizeChartImage,
    description: buildDescription(p.description),
  };
});

export const getProductBySlug = (slug) => MOCK_PRODUCTS.find((p) => p.slug === slug);

export const toDetailImages = (images) => (
  Array.isArray(images) ? images.join('^') : images
);

export const toListItem = (product) => ({
  id: product.id,
  slug: product.slug,
  title: product.title,
  price: product.price,
  images: product.listImages || product.images,
});

export const sortProducts = (products, sort) => {
  const list = [...products];
  if (sort === 'price01') return list.sort((a, b) => a.price - b.price);
  if (sort === 'price10') return list.sort((a, b) => b.price - a.price);
  if (sort === 'name') return list.sort((a, b) => a.title.localeCompare(b.title));
  return list;
};

export const filterByCategory = (slug) => {
  if (slug === 'under-300k') {
    return MOCK_PRODUCTS.filter((p) => p.price < 300000);
  }
  return MOCK_PRODUCTS.filter((p) => p.categorySlugs.includes(slug));
};

export const searchProducts = (keyword) => {
  if (!keyword) return MOCK_PRODUCTS;
  const q = keyword.toLowerCase();
  return MOCK_PRODUCTS.filter(
    (p) => p.title.toLowerCase().includes(q)
      || p.short_description.toLowerCase().includes(q),
  );
};

export const isValidCategorySlug = (slug) => (
  slug === 'under-300k' || Boolean(CATEGORY_META[slug])
);
