import FilterProduct from "../FilterProduct/FilterProduct";
import classes from "./ProductLayout.module.css";

const Layout = ({ children }) => {
  return (
    <section className={classes.wrapper}>
      <div className={classes.filter}>
        <FilterProduct />
      </div>
      <div className={classes.content}>{children}</div>
    </section>
  );
};

export default Layout;
