import React from 'react'
import { ProductDetails, Data} from './../../../../types/productDetails.type';
import DetailsSlider from 'image/app/_components/DetailsSlider/DetailsSlider';
import AddCartBtn from 'image/app/_components/ProductCart/AddCartBtn';

export default async function page({params}:{params:{id:string }}) {
const {id}= await params
   const res=await fetch(`${process.env.NEXT_PUBLIC_Base_URL}api/v1/products/${id}`)
    const data:ProductDetails =await res.json()
    const product:Data =data.data
    
    const {title,description,category:{name},price,ratingsAverage}=product
  return (
<div className="grid grid-cols-12 items-center gap-24">
    <div className="col-span-3">
 <DetailsSlider Images={product.images}/>
    </div>
    <div className="col-span-9">
      <h1>{title}</h1>
      <p>{description}</p>
      <h5 className='my-10 category-color'>{name}</h5>
           <div className="flex justify-between items-center">
          <span className='third-color'>{price} EGP</span>
          <span><i className='fa-solid fa-star text-amber-400'></i> {ratingsAverage}</span>
        </div>
           <AddCartBtn id={id}/>
     
    </div>
    

</div>
  )
}
