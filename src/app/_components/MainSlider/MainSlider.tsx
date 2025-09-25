'use client'
import React from "react";
import Slider from "react-slick";
import  Image  from 'next/image';

export default function MainSlider() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows:false,
    autoplay:true, 
  };
  return (
<div className="grid grid-cols-12 my-6 mb-25">
    <div className="col-span-9">
            <Slider {...settings}>
      <div>
     <Image className="w-full h-96 object-cover" src='/slider/slider-image-1.jpeg' alt="slider-image-1" width={1000} height={1000}/>
      </div>
      <div>
     <Image className="w-full h-96 object-cover"  src='/slider/slider-image-2.jpeg' alt="slider-image-2" width={1000} height={1000}/>
      </div>
      <div>
     <Image className="w-full h-96 object-cover"  src='/slider/slider-image-3.jpeg' alt="slider-image-3" width={1000} height={1000}/>
      </div>
    </Slider>
    </div>
    <div className="col-span-3">
  <Image className="w-full h-48 object-cover" src='/slider/slider-image-1.jpeg' alt="slider-image-1" width={300} height={300}/>
  <Image className="w-full h-48 object-cover"  src='/slider/slider-image-2.jpeg' alt="slider-image-2" width={1000} height={1000}/>
    </div>

</div>
  );
}