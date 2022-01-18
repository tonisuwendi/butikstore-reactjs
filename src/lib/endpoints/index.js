import { DOMAIN_API } from "./common";

const PRODUCTS_API = `${DOMAIN_API}products/`;

const endpoints = {
  getBestSellers: () => `${PRODUCTS_API}best-sellers`,
  getNewArrivals: () => `${PRODUCTS_API}new-arrivals`,
  getProductCat: (slug, query) =>
    `${PRODUCTS_API}product-category/${slug}${query}`,
  getAllProducts: (query) => `${PRODUCTS_API}all-products${query}`,
};

export default endpoints;
