import { useEffect, useContext, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';

import useHttp from '../../hooks/use-http';
import UIContext from '../../store/UI/ui-context';
import endpoints from '../../lib/endpoints';

import Layout from '../../components/Layout/Default';
import NotFound from '../NotFound';
import ImagesWrapper from './ImagesWrapper';
import ProductContent from '../../components/Products/ProductContent';
import Modal from '../../components/Modal/Modal';
import InfoProduct from './InfoProduct';
import ProductDescription from './ProductDescription';
import SkeletonDetailProduct from './SkeletonDetailProduct';

import classes from './ProductDetail.module.css';

const ProductDetail = () => {
  const [imageSize, setImageSize] = useState('');
  const params = useParams();
  const history = useHistory();
  const { slug } = params;
  const uiCtx = useContext(UIContext);

  const {
    sendRequest: getRequestData,
    isLoading,
    data: productData,
    error: errorRequest,
    slugIsExist,
  } = useHttp();

  const { product, categories, relatedProducts } = productData;

  const description = product?.description && JSON.parse(product.description);

  useEffect(() => {
    getRequestData({
      url: endpoints.getProductBySlug(slug),
    });
    return () => {
      uiCtx.toggleToaster(null);
    };
  }, [getRequestData, slug, history]);
  const imageSizeHandler = (url) => {
    setImageSize(url);
    uiCtx.toggleModal();
  };

  let contentProduct;
  if (isLoading) {
    contentProduct = <SkeletonDetailProduct />;
  }

  if (!isLoading && (errorRequest || !product || !categories)) {
    contentProduct = <h3>{errorRequest}</h3>;
  }

  if (!isLoading && !slugIsExist) {
    return <NotFound />;
  }

  if (!isLoading && product) {
    contentProduct = (
      <>
        <div className={classes.main_info}>
          <ImagesWrapper images={product.images} />
          <InfoProduct
            idProduct={product.id}
            title={product.title}
            shortDescription={product.short_description}
            price={product.price}
            stock={product.stock}
            sizeGuide={product.size_guide}
            sizeChart={product.size_chart}
            categories={categories}
            onImageSize={imageSizeHandler}
          />
        </div>
        <ProductDescription
          weight={description.weight}
          size={description.size}
          material={description.material}
          color={description.color}
          height={description.height}
          wearingSize={description.wearing_size}
        />
      </>
    );
  }

  return (
    <Layout title={product?.title}>
      {uiCtx.showModal && (
        <Modal>
          <img src={imageSize} alt="size" />
        </Modal>
      )}
      <main className={classes.wrapper}>
        {contentProduct}
        <ProductContent
          title="RELATED PRODUCTS"
          loading={isLoading}
          error={errorRequest}
          columns={5}
          products={relatedProducts}
        />
      </main>
    </Layout>
  );
};

export default ProductDetail;
