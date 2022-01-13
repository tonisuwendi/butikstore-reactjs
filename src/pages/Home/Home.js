import Banner from "../../components/Banner/Banner";
import TitleWithUnderline from "../../components/UI/Title/TitleWithUnderline";
import ProductList from "../../components/Products/ProductList";

import { bestSeller, newArrivals } from "../../data/product";

import classes from "./Home.module.css";
import Button from "../../components/UI/Button/Button";
import Layout from "../../components/Layout/Default";

const HomePage = () => {
  return (
    <Layout>
      <main>
        <Banner />
        <section className={classes.products}>
          <TitleWithUnderline title="BEST SELLERS" />
          <ProductList products={bestSeller} />
          <div className={classes.button_see_more}>
            <Button title="SEE MORE" size="lg" />
          </div>
          <TitleWithUnderline title="NEW ARRIVALS" />
          <ProductList products={newArrivals} columns={5} />
          <div className={classes.button_see_more}>
            <Button title="SEE MORE" size="lg" />
          </div>
        </section>
      </main>
    </Layout>
  );
};

export default HomePage;
