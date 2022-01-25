import common from './common';

const PRODUCTS_API = `${common.DOMAIN_API}products/`;
const CART_API = `${common.DOMAIN_API}cart/`;

const endpoints = {
  getProductCat: (slug, query) => `${PRODUCTS_API}product-category/${slug}${query}`,
  getAllProducts: (query) => `${PRODUCTS_API}all-products${query}`,
  getProductBySlug: (slug) => `${PRODUCTS_API}detail/${slug}`,
  insertCart: () => `${CART_API}insert`,
  getCart: (clientKey) => `${CART_API}/${clientKey}`,
};

export default endpoints;
