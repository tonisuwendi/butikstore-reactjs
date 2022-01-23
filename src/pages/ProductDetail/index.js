import { useEffect } from 'react';
import { FiMinus, FiPlus } from 'react-icons/fi';
import { useParams, useHistory, Link } from 'react-router-dom';

import Layout from '../../components/Layout/Default';
import useHttp from '../../hooks/use-http';
import endpoints from '../../lib/endpoints';
import NotFound from '../NotFound';
import Button from '../../components/UI/Button/Button';
import { shareProduct } from '../../data/external-link';
import ImagesWrapper from './ImagesWrapper';
import TitleWithUnderline from '../../components/UI/Title/TitleWithUnderline';
import ProductContent from '../../components/Products/ProductContent';

import classes from './ProductDetail.module.css';

const ProductDetail = () => {
  const params = useParams();
  const history = useHistory();
  const { slug } = params;

  const {
    sendRequest: getRequestData,
    isLoading,
    data: productData,
    error: errorRequest,
    slugIsExist,
  } = useHttp();

  const { product, categories, relatedProducts } = productData;

  const description = product?.description && JSON.parse(product.description);

  const priceFormat = new Intl.NumberFormat('id-ID').format(product?.price);

  useEffect(() => {
    getRequestData({
      url: endpoints.getProductBySlug(slug),
    });
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, [getRequestData, slug, history]);

  let contentProduct;

  if (isLoading) {
    contentProduct = <h3>LOADING...</h3>;
  }

  if (errorRequest || !product || !categories) {
    contentProduct = <h3>{errorRequest}</h3>;
  }

  if (!slugIsExist) {
    return <NotFound />;
  }

  if (!isLoading && product) {
    contentProduct = (
      <>
        <ImagesWrapper images={product.images} />
        <div className={classes.info_product}>
          <h1 className={classes.main_info_title}>
            {product?.title}
          </h1>
          <h3 className={classes.main_info_price}>{`Rp${priceFormat}`}</h3>
          <p className={classes.main_short_desc}>
            {product?.short_description}
          </p>
          <div className={classes.main_actions}>
            <div className={classes.quantity_action}>
              <button type="button">
                <FiMinus />
              </button>
              <input type="text" autoComplete="off" readOnly defaultValue={1} />
              <button type="button">
                <FiPlus />
              </button>
            </div>
            <button type="button" className={classes.add_to_cart_button}>Add to cart</button>
          </div>
          <div className={classes.buttons_size}>
            <Button title="SIZE GUIDE" size="sm" />
            <Button title="SIZE CHART" size="sm" />
          </div>
          <div className={classes.main_categories}>
            <p>Categories:</p>
            {categories.map((category) => (
              <Link key={category.id} to={`/product-cat/${category.slug}`}>{category.title}</Link>
            )).reduce((prev, curr) => [prev, ', ', curr])}
          </div>
          <div className={classes.buttons_share}>
            <p>Share:</p>
            {shareProduct.map((share) => (
              <a href={share.url} key={share.id} target="_blank" rel="noreferrer">
                {share.icon}
              </a>
            ))}
          </div>
        </div>
      </>
    );
  }

  return (
    <Layout>
      <main className={classes.wrapper}>
        <div className={classes.main_info}>{contentProduct}</div>
        <div className={classes.description}>
          <TitleWithUnderline title="DESCRIPTION" />
          <table>
            <tbody>
              <tr>
                <td>WEIGHT</td>
                <td>
                  {description?.weight ? description.weight / 1000 : 0}
                  {' '}
                  kg
                </td>
              </tr>
              <tr>
                <td>SIZE</td>
                <td>{description?.size}</td>
              </tr>
              <tr>
                <td>MATERIAL</td>
                <td>{description?.material}</td>
              </tr>
              <tr>
                <td>COLOR</td>
                <td>{description?.color}</td>
              </tr>
              <tr>
                <td>MODEL&apos;S HEIGHT</td>
                <td>
                  {description?.height || 0}
                  {' '}
                  CM
                </td>
              </tr>
              <tr>
                <td>MODEL&apos;S WEARING SIZE</td>
                <td>{description?.wearing_size}</td>
              </tr>
            </tbody>
          </table>
        </div>
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
