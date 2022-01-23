import { Fragment, memo } from 'react';
import BannerCategories from './BannerCategories';
import BannerSwiper from './BannerSwiper';

const Banner = memo(() => (
  <>
    <BannerSwiper />
    <BannerCategories />
  </>
));

export default Banner;
