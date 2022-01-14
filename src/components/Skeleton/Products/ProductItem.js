import classes from "./ProductItem.module.css";

const SkeletonProductItem = () => {
  return (
    <div className={classes.product}>
      <div className={classes.image}></div>
      <div className={classes.description}>
        <div className={classes.title}></div>
        <div className={classes.price}></div>
      </div>
    </div>
  );
};

export default SkeletonProductItem;
