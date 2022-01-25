import classes from './InfoProduct.module.css';

const SkeletonInfoProduct = () => (
  <div className={`${classes.info_product} skeleton_wrapper_animation`}>
    <div className={classes.title} />
    <div className={classes.price} />
    <div className={classes.short_description}>
      <div className={classes.short_description_1} />
      <div className={classes.short_description_2} />
      <div className={classes.short_description_3} />
    </div>
    <div className={classes.button_actions}>
      <div className={classes.button_action_qty} />
      <div className={classes.button_action_atc} />
    </div>
  </div>
);

export default SkeletonInfoProduct;
