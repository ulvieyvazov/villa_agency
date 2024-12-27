import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';


// import required modules
import { Navigation } from 'swiper/modules';

export default function SwiperHome() {
  return (
    <>
      <Swiper navigation={true} modules={[Navigation]} className="mySwiper">
        <SwiperSlide><img src="https://templatemo.com/templates/templatemo_591_villa_agency/assets/images/banner-01.jpg" alt="" /></SwiperSlide>
        <SwiperSlide><img src="https://templatemo.com/templates/templatemo_591_villa_agency/assets/images/banner-02.jpg" alt="" /></SwiperSlide>
        <SwiperSlide><img src="https://templatemo.com/templates/templatemo_591_villa_agency/assets/images/banner-03.jpg" alt="" /></SwiperSlide>
      </Swiper>
    </>
  );
}
