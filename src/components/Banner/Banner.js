import { memo } from "react";
import BannerCategories from "./BannerCategories";
import BannerSwiper from "./BannerSwiper";

const Banner = memo(() => {
  return (
    <>
      <BannerSwiper />
      <BannerCategories />
    </>
  );
});

export default Banner;
