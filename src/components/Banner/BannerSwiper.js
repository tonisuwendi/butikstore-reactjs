import SwiperCore, { Navigation, Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

import { bannerSwiper } from "../../data/banner";

import classes from "./BannerSwiper.module.css";
import "swiper/css";
import "swiper/css/navigation";

SwiperCore.use([Navigation, Autoplay]);

const BannerSwiper = () => {
  return (
    <section className={`${classes.banner} banner-component`}>
      <Swiper
        navigation
        loop
        autoplay={{ delay: 3000, disableOnInteraction: false }}
      >
        {bannerSwiper.map((banner) => (
          <SwiperSlide key={banner.id}>
            <img src={banner.image} alt={banner.title} />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default BannerSwiper;
