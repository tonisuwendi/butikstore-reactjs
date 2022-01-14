import { memo } from "react";

import ProductItem from "./ProductItem";

import classes from "./ProductList.module.css";

const ProductList = memo(({ products, columns = 6 }) => {
  return (
    <div
      className={`${classes.products}`}
      style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}
    >
      {products.map((product) => (
        <ProductItem
          key={product.id}
          slug={product.slug}
          images={product.images}
          title={product.title}
          price={product.price}
        />
      ))}
    </div>
  );
});

export default ProductList;
