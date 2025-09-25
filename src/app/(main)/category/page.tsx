import { Categories, category } from 'image/types/categories.type'
import React from 'react'
import Image from "next/image";
export default async function page() {

  const res=await fetch(`${process.env.NEXT_PUBLIC_Base_URL}api/v1/categories`)
  const data:Categories =await res.json()  
  const category:category[]=data.data
  
  return (
   <>
    <h1 className='text-center text-white text-4xl p-5 btn-color w-full mb-5'>Our Categories</h1>
   <div className='grid grid-cols-2  gap-6 text-center' >
{
  category.map((item)=>{
    return <div key={item._id} className="rounded-2xl shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 bg-white p-3"
 >
     <Image
              src={item.image} 
              alt={item.name}
              width={300}
              height={200}
              className="w-full h-40 object-contain rounded-2xl"
            />
         
      <h3 className="mt-2 text-lg font-semibold text-black">{item.name}</h3>

    </div>
  })
}
   </div>
   </>
  )
}
