import { memo, useEffect } from "react";

import Banner from "../../components/Banner/Banner";
import useHttp from "../../hooks/use-http";
import Layout from "../../components/Layout/Default";
import classes from "./Home.module.css";
import ProductContent from "../../components/Products/ProductContent";

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
      url: "http://localhost:5000/products/best-seller?limit=6",
    });
    sendRequestNew({
      url: "http://localhost:5000/products/new-arrivals?limit=5",
    });
  }, [sendRequestBest, sendRequestNew]);

  return (
    <Layout>
      <main>
        <Banner />
        <section className={classes.products}>
          <ProductContent
            title="BEST SELLERS"
            loading={bestSellerLoading}
            products={bestSeller.products}
            error={errorBestSeller}
          />
          <ProductContent
            title="NEW ARRIVALS"
            loading={newArrivalsLoading}
            products={newArrivals.products}
            columns={5}
            error={errorNewArrivals}
          />
        </section>
      </main>
    </Layout>
  );
});

export default HomePage;
