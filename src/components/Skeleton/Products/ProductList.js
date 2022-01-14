import SkeletonProductItem from "./ProductItem";

import classes from "./ProductList.module.css";

const SkeletonProductList = ({ columns = 6 }) => {
  const skeletonItem = [];
  for (let i = 1; i <= columns; i++) {
    skeletonItem.push(<SkeletonProductItem key={i} />);
  }

  return (
    <div
      className={classes.products}
      style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}
    >
      {skeletonItem}
    </div>
  );
};

export default SkeletonProductList;
