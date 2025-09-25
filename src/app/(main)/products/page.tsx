import React, { Suspense } from 'react'
import  Image  from 'next/image';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import  Link  from 'next/link';
import Skeleton from 'image/app/_components/Skeleton/Skeleton';
import AddCartBtn from 'image/app/_components/ProductCart/AddCartBtn';
import { product, ProductData } from 'image/types/products.type';
import ClientWish from 'image/ClientWish/ClientWish';



export default async function page() {
    const res =await fetch(`${process.env.NEXT_PUBLIC_Base_URL}api/v1/products`)
    const data:ProductData= await res.json()
    const productsList: product[]= data.data

    
  return (
    <>
  <Suspense fallback={<Skeleton/>}>
 
    <div className="grid lg:grid-cols-6 md:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-5">
    {
    productsList.map((el)=>{
      return  <Card key={el._id} className='relative' >
 <ClientWish id={el._id}/>
<Link href={`/products/${el._id}`} >
  <CardHeader>
           <Image className='w-full object-cover rounded-2xl' src={el.imageCover}   alt={el.title} width={200} height={100} />
  </CardHeader>
  <CardContent>
     <CardTitle className='category-color'>{el.category.name}</CardTitle>
     <CardTitle className='my-3'>{el.title.split(" ").slice(0,2).join(" ")}</CardTitle>
     <div className="flex justify-between items-center">
          <span className='third-color'>{el.price} EGP</span>
          <span><i className='fa-solid fa-star text-amber-400'></i> {el.ratingsAverage}</span>
        </div>
     
  </CardContent>
    </Link>
  <CardFooter>
    
   <AddCartBtn id={el._id}/>
  </CardFooter>

</Card>
    })
    }

       
  
    </div>
  </Suspense>

    </>
  )
}
