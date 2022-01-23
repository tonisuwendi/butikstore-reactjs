import classes from './ProductItem.module.css';

const SkeletonProductItem = () => (
  <div className={classes.product}>
    <div className={classes.image} />
    <div className={classes.description}>
      <div className={classes.title} />
      <div className={classes.price} />
    </div>
  </div>
);

export default SkeletonProductItem;
