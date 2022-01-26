import { useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';

import BannerTitle from '../../components/BannerTitle/BannerTitle';
import Layout from '../../components/Layout/Default';
import ProductLayout from '../../components/Layout/ProductLayout';
import ProductContent from '../../components/Products/ProductContent';
import useHttp from '../../hooks/use-http';
import endpoints from '../../lib/endpoints';
import { breadcrumbProductCat } from '../../data/product';
import useURLQuery from '../../hooks/use-urlquery';

const ProductCat = () => {
  const sort = useURLQuery('sort');

  const params = useParams();
  const history = useHistory();
  const { slug } = params;

  const {
    sendRequest: getRequestData,
    isLoading,
    data: productsData,
    error: errorRequest,
    slugIsExist,
  } = useHttp();

  useEffect(() => {
    getRequestData({
      url: endpoints.getProductCat(slug, `?sort=${sort}`),
    });
    if (!slugIsExist) {
      history.push('/404');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [getRequestData, slug, sort, slugIsExist, history]);

  return (
    <Layout>
      <main>
        <BannerTitle
          title={productsData?.categoryTitle}
          breadcrumb={breadcrumbProductCat}
        />
        <ProductLayout>
          <ProductContent
            loading={isLoading}
            products={productsData.products}
            columns={3}
            error={errorRequest}
          />
        </ProductLayout>
      </main>
    </Layout>
  );
};

export default ProductCat;
