import classes from './ProductItem.module.css';

const SkeletonProductItem = () => (
  <div className={`${classes.product} skeleton_wrapper_animation`}>
    <div className={classes.image} />
    <div className={classes.description}>
      <div className={classes.title} />
      <div className={classes.price} />
    </div>
  </div>
);

export default SkeletonProductItem;
