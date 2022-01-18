import { Fragment } from "react";
import { Link } from "react-router-dom";

import { productFilter } from "../../data/product";
import useURLQuery from "../../hooks/use-urlquery";

import classes from "./FilterProduct.module.css";

const FilterProduct = () => {
  const sort = useURLQuery("sort");

  const filterClasses = (url) =>
    url.includes(sort) ? classes.filterActive : classes.filterNotActive;

  return (
    <section className={classes.filter}>
      {productFilter.map((filter) => (
        <Fragment key={filter.id}>
          <h3>{filter.title}</h3>
          <ul>
            {filter.menus.map((menu) => (
              <li key={menu.id}>
                <Link className={filterClasses(menu.url)} to={menu.url}>
                  {menu.title}
                </Link>
              </li>
            ))}
          </ul>
        </Fragment>
      ))}
    </section>
  );
};

export default FilterProduct;
