'use client'
import { Form,FormControl, FormField, FormItem, FormLabel, FormMessage } from 'image/components/ui/form'
import React from 'react'
import {useForm } from 'react-hook-form'
import { Button } from 'image/components/ui/button'
import { Input } from 'image/components/ui/input'
import * as z from 'zod'
import {zodResolver} from '@hookform/resolvers/zod'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
export default function Login() {
  const goTo =  useRouter()
  const SchemeForgetPassword =z.object({
   
    email:z.email("Email Is Valid").nonempty("Email Required"),   
  })
  const forgetForm=useForm({
    defaultValues:{
    email:"",

},
resolver:zodResolver(SchemeForgetPassword)
  })

async  function ForgetPassword(values: z.infer<typeof SchemeForgetPassword>){
const res =await fetch(`${process.env.NEXT_PUBLIC_Base_URL}api/v1/auth/forgotPasswords`,{
  method:'post',
  body:JSON.stringify(values),
  headers:{
    "content-type":"application/json"
  }
})
const data =await res.json()
if (data.statusMsg == 'success'){
  toast.success("Reset code sent to your email",{position:'top-center'})
  goTo.push("/resetCode")
}else{
  toast.error(data.message,{position:'top-center'})
}

  }
  return (
    <div className='w-1/2 mx-auto my-5'>
    <h1 className='my-5 third-color text-2xl text-center'>Forget Password</h1>
    <Form {...forgetForm}>
<form className='space-y-5' onSubmit={forgetForm.handleSubmit(ForgetPassword)}>


 <FormField
    control={forgetForm.control}
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






  <Button className='w-full btn-color mt-5 cursor-pointer'>Send Code</Button>
</form>




</Form>
    </div>
    
  )
}
