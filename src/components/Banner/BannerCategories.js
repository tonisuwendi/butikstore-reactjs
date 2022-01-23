import { Link } from 'react-router-dom';

import { bannerCategories } from '../../data/banner';

import classes from './BannerCategories.module.css';

const BannerCategories = () => (
  <section className={classes.banner}>
    {bannerCategories.map((banner) => (
      <div className={classes.item} key={banner.id}>
        <Link to={banner.url}>
          <img src={banner.image} alt={banner.title} />
        </Link>
      </div>
    ))}
  </section>
);

export default BannerCategories;
