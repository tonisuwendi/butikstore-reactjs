import classes from './ProductDetail.module.css';
import SkeletonImageWrapper from '../../components/Skeleton/ProductDetail/ImagesWrapper';
import SkeletonInfoProduct from '../../components/Skeleton/ProductDetail/InfoProduct';
import SkeletonProductDescription from '../../components/Skeleton/ProductDetail/ProductDescription';

const SkeletonDetailProduct = () => (
  <>
    <div className={classes.main_info}>
      <SkeletonImageWrapper />
      <SkeletonInfoProduct />
    </div>
    <SkeletonProductDescription />
  </>
);

export default SkeletonDetailProduct;
