import classes from './ImagesWrapper.module.css';

const SkeletonImageWrapper = () => (
  <div className={classes.images_wrapper}>
    <div className={classes.top_images_wrapper}>
      <div className={classes.image1} />
      <div className={classes.container_image2}>
        <div className={classes.image2} />
      </div>
    </div>
    <div className={classes.bottom_images_wrapper}>
      <div className={classes.image_other} />
      <div className={classes.image_other} />
      <div className={classes.image_other} />
    </div>
  </div>
);

export default SkeletonImageWrapper;
