import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import BannerTitle from '../../components/BannerTitle/BannerTitle';
import Layout from '../../components/Layout/Default';
import ProductLayout from '../../components/Layout/ProductLayout';
import ProductContent from '../../components/Products/ProductContent';
import useHttp from '../../hooks/use-http';
import endpoints from '../../lib/endpoints';
import { breadcrumbProductCat } from '../../data/product';
import useURLQuery from '../../hooks/use-urlquery';

const Search = () => {
  const sort = useURLQuery('sort');

  const params = useParams();
  const { keyword } = params;

  const {
    sendRequest: getRequestData,
    isLoading,
    data: productsData,
    error: errorRequest,
  } = useHttp();

  useEffect(() => {
    getRequestData({
      url: endpoints.search(`?keyword=${keyword}&sort=${sort}`),
    });
  }, [getRequestData, keyword, sort]);

  return (
    <Layout title={productsData?.categoryTitle}>
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

export default Search;
