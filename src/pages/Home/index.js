import { memo, useEffect } from 'react';

import Banner from '../../components/Banner/Banner';
import useHttp from '../../hooks/use-http';
import Layout from '../../components/Layout/Default';
import classes from './Home.module.css';
import ProductContent from '../../components/Products/ProductContent';
import endpoints from '../../lib/endpoints';

const HomePage = memo(() => {
  const {
    sendRequest: sendRequestBest,
    isLoading: bestSellerLoading,
    data: bestSeller,
    error: errorBestSeller,
  } = useHttp();
  const {
    sendRequest: sendRequestNew,
    isLoading: newArrivalsLoading,
    data: newArrivals,
    error: errorNewArrivals,
  } = useHttp();

  useEffect(() => {
    sendRequestBest({
      url: `${endpoints.getProductCat('best-sellers', '?limit=6')}`,
    });
    sendRequestNew({
      url: `${endpoints.getProductCat('new-arrivals', '?limit=5')}`,
    });
  }, [sendRequestBest, sendRequestNew]);

  return (
    <Layout>
      <main>
        <div className={classes.info}>Masih dalam tahap pengembangan</div>
        <Banner />
        <section className={classes.products}>
          <ProductContent
            title="BEST SELLERS"
            loading={bestSellerLoading}
            products={bestSeller.products}
            error={errorBestSeller}
            seeMore="/product-cat/best-sellers"
          />
          <ProductContent
            title="NEW ARRIVALS"
            loading={newArrivalsLoading}
            products={newArrivals.products}
            columns={5}
            error={errorNewArrivals}
            seeMore="/product-cat/new-arrivals"
          />
        </section>
      </main>
    </Layout>
  );
});

export default HomePage;
