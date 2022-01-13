import { bannerCategories } from "../../data/banner";

import classes from "./BannerCategories.module.css";

const BannerCategories = () => {
  return (
    <section className={classes.banner}>
      {bannerCategories.map((banner) => (
        <div className={classes.item} key={banner.id}>
          <a href={banner.url}>
            <img src={banner.image} alt={banner.title} />
          </a>
        </div>
      ))}
    </section>
  );
};

export default BannerCategories;
