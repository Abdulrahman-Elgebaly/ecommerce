'use client'
import React from "react";
import Slider from "react-slick";
import  Image  from 'next/image';

export default function DetailsSlider({ Images }: { Images: string[] })
 {
  const settings = {
    dots: true,
    arrows:false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <Slider  {...settings}>
  
        {Images.map((el,i)=>{
          return(
            <div key={i}><Image className="w-full  object-contain" src={el} alt={el} width={200} height={100}/></div>
          ) 
        })}
   

    </Slider>
  );
}