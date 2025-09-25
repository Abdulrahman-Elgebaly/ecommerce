'use client'
import { Form,FormControl, FormField, FormItem, FormLabel, FormMessage } from 'image/components/ui/form'
import React, { useContext } from 'react'
import {useForm } from 'react-hook-form'
import { Button } from 'image/components/ui/button'
import { Input } from 'image/components/ui/input'
import * as z from 'zod'
import {zodResolver} from '@hookform/resolvers/zod'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { signIn } from 'next-auth/react'
import { getUserToken } from 'image/getUserToken'
import { getCartData } from 'image/CartAction/CartAction'
import { CartData } from 'image/types/cart.type'
import { CountContext } from 'image/CountProvider'
export default function Login() {
  const {setCount}=useContext(CountContext)
  const goTo =  useRouter()
  const SchemeLogin =z.object({
   
    email:z.email("Email Is Valid").nonempty("Email Required"),
    password:z.string().nonempty("Password Required").regex(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/,'Enter Valid Password'),
   
  })
  const LoginForm=useForm({
    defaultValues:{
    password: "",
    email:"",

},
resolver:zodResolver(SchemeLogin)
  })

async  function handleLogin(values: z.infer<typeof SchemeLogin>){
const data=await signIn('credentials',{
  email:values.email,
  password:values.password,
  redirect:false

})
if(data?.ok){
   toast.success("Login Success",{position:'top-center'})
  const token:string | null = await getUserToken();
           if(token){
            const data:CartData=await   getCartData()
            let sum:number = 0
            data.data.products.forEach((item)=>{
             sum+= Number(item.count)
                  setCount(sum)
            })
       
           }
   goTo.push("/")
}else{
  toast.error(data?.error,{position:'top-center'})
}
  // const res =await fetch(`${process.env.NEXT_PUBLIC_Base_URL}api/v1/auth/signin`,{
//   method:'post',
//   body:JSON.stringify(values),
//   headers:{
//     "content-type":"application/json"
//   }
// })
// const data =await res.json()
// if (data.message == 'success'){
//   toast.success("Login Success",{position:'top-center'})
//   goTo.push("/")
// }else{
//   toast.error(data.message,{position:'top-center'})
// }

  }
  return (
    <div className='w-1/2 mx-auto my-5'>
    <h1 className='my-5 third-color text-2xl text-center'>Login</h1>
    <Form {...LoginForm}>
<form className='space-y-5' onSubmit={LoginForm.handleSubmit(handleLogin)}>


 <FormField
    control={LoginForm.control}
    name="email"
    render={({field}) => (
      <FormItem>
        <FormLabel> Email: </FormLabel>
        <FormControl>
        <Input type='email' {...field} />
        </FormControl>
      
        <FormMessage />
      </FormItem>
    )}
  />
 <FormField
    control={LoginForm.control}
    name="password"
    render={({field}) => (
      <FormItem>
        <FormLabel> Password: </FormLabel>
        <FormControl>
        <Input type='password' {...field} />
        </FormControl>
      
        <FormMessage />
      </FormItem>
    )}
  />



<Link className='third-color' href={'/forgetPassword'}>Foget Your Password ?</Link>


  <Button className='w-full btn-color mt-5 cursor-pointer'>Login</Button>
</form>




</Form>
    </div>
    
  )
}
