import common from './common';

const PRODUCTS_API = `${common.DOMAIN_API}products/`;
const CART_API = `${common.DOMAIN_API}cart/`;
const ORDERS_API = `${common.DOMAIN_API}orders/`;
const AUTH_API = `${common.DOMAIN_API}auth/`;

const endpoints = {
  getProductCat: (slug, query) => `${PRODUCTS_API}product-category/${slug}${query}`,
  getAllProducts: (query) => `${PRODUCTS_API}all-products${query}`,
  search: (rest = '') => `${PRODUCTS_API}search${rest}`,
  getProductBySlug: (slug) => `${PRODUCTS_API}detail/${slug}`,
  cart: () => CART_API,
  getCart: (clientKey) => `${CART_API}${clientKey}`,
  orders: (rest = '') => `${ORDERS_API}${rest}`,
  auth: (type = '') => `${AUTH_API}${type}`,
};

export default endpoints;
