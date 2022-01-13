import Banner from "../../components/Banner/Banner";
import Header from "../../components/Header/Header";
import TitleWithUnderScore from "../../components/UI/Title/TitleWithUnderScore";
import ProductList from "../../components/Products/ProductList";

import { bestSeller, newArrivals } from "../../data/product";

import classes from "./Home.module.css";
import Button from "../../components/UI/Button/Button";

const HomePage = () => {
  return (
    <>
      <Header />
      <main>
        <Banner />
        <section className={classes.products}>
          <TitleWithUnderScore title="BEST SELLERS" />
          <ProductList products={bestSeller} />
          <div className={classes.button_see_more}>
            <Button title="SEE MORE" size="lg" />
          </div>
          <TitleWithUnderScore title="NEW ARRIVALS" />
          <ProductList products={newArrivals} columns={5} />
          <div className={classes.button_see_more}>
            <Button title="SEE MORE" size="lg" />
          </div>
        </section>
      </main>
    </>
  );
};

export default HomePage;
