import { memo } from 'react';
import { Link } from 'react-router-dom';

import TitleWithUnderline from '../UI/Title/TitleWithUnderline';
import ProductList from './ProductList';
import Button from '../UI/Button/Button';
import SkeletonProductList from '../Skeleton/Products/ProductList';

import classes from './ProductContent.module.css';

const ProductContent = memo(({
  title, loading, products, error, seeMore, columns = 6,
}) => {
  let contentProductList;
  if (loading) {
    contentProductList = <SkeletonProductList columns={columns} />;
  } else if (error) {
    contentProductList = <p className={classes.center}>{error}</p>;
  } else if (products && products.length === 0) {
    contentProductList = <p className={classes.center}>Product is empty!</p>;
  } else if (products && products.length > 0) {
    contentProductList = (
      <>
        <ProductList products={products} columns={columns} />
        {seeMore && (
          <div className={classes.button_see_more}>
            <Link to={seeMore}>
              <Button title="SEE MORE" size="lg" />
            </Link>
          </div>
        )}
      </>
    );
  }

  return (
    <>
      {title && <TitleWithUnderline title={title} />}
      {contentProductList}
    </>
  );
});

export default ProductContent;
