const domainURL = process.env.REACT_APP_DOMAIN_API;

const PRODUCTS_API = `${domainURL}products/`;
const CART_API = `${domainURL}cart/`;
const ORDERS_API = `${domainURL}orders/`;
const AUTH_API = `${domainURL}auth/`;

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
