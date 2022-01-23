import classes from './ProductDescription.module.css';

const SkeletonProductDescription = () => (
  <div className={classes.description}>
    <div>
      <div className={classes.title} />
      <div className={classes.table_item} />
      <div className={classes.table_item} />
      <div className={classes.table_item} />
    </div>
  </div>
);

export default SkeletonProductDescription;
