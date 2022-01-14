import { useState, memo } from "react";
import { FaEye } from "react-icons/fa";

import ProductImage from "./ProductImage";
import classes from "./ProductItem.module.css";

const ProductItem = memo(({ slug, title, price, images }) => {
  const [productIsHover, setProductIsHover] = useState(false);

  const priceFormat = new Intl.NumberFormat("id-ID").format(price);

  const imageEnterHandler = () => {
    setProductIsHover(true);
  };

  const imageLeaveHandler = () => {
    setProductIsHover(false);
  };

  const detailStyles = [
    classes.detail,
    productIsHover ? classes.detailShow : "",
  ];

  return (
    <div
      className={classes.product}
      onMouseEnter={imageEnterHandler}
      onMouseLeave={imageLeaveHandler}
    >
      <a href={slug}>
        <div className={classes.thumbnail}>
          <ProductImage
            image={images[0]}
            imageHover={images[1] || images[0]}
            productIsHover={productIsHover}
          />
          <div className={detailStyles.join(" ")}>
            <p>
              <FaEye /> DETAIL
            </p>
          </div>
        </div>
        <div className={classes.description}>
          <p className={classes.title}>{title}</p>
          <p className={classes.price}>Rp{priceFormat}</p>
        </div>
      </a>
    </div>
  );
});

export default ProductItem;
