import common from './common';

const PRODUCTS_API = `${common.DOMAIN_API}products/`;

const endpoints = {
  getBestSellers: () => `${PRODUCTS_API}best-sellers`,
  getNewArrivals: () => `${PRODUCTS_API}new-arrivals`,
  getProductCat: (slug, query) => `${PRODUCTS_API}product-category/${slug}${query}`,
  getAllProducts: (query) => `${PRODUCTS_API}all-products${query}`,
  getProductBySlug: (slug) => `${PRODUCTS_API}detail/${slug}`,
};

export default endpoints;
