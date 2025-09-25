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
import Link from 'next/link'
export default function Login() {
  const goTo =  useRouter()
  const SchemeResetPassword =z.object({
   
    email:z.email("Email Is Valid").nonempty("Email Required"),
    newPassword:z.string().nonempty("New Password Required").regex(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/,'Enter Valid Password'),
   
  })
  const ResetPasswordForm=useForm({
    defaultValues:{
    newPassword: "",
    email:"",

},
resolver:zodResolver(SchemeResetPassword)
  })

async  function handelResetPassword(values: z.infer<typeof SchemeResetPassword>){
const res =await fetch(`${process.env.NEXT_PUBLIC_Base_URL}api/v1/auth/resetPassword`,{
  method:'PUT',
  body:JSON.stringify(values),
  headers:{
    "content-type":"application/json"
  }
})
const data =await res.json()
console.log(data);

if (data.token){
  toast.success("Remember your password to avoid resetting it again ",{position:'top-center'})
  goTo.push("/login")
}else{
  toast.error(data.message,{position:'top-center'})
}

  }
  return (
    <div className='w-1/2 mx-auto my-5'>
    <h1 className='my-5 third-color text-2xl text-center'>Update Password</h1>
    <Form {...ResetPasswordForm}>
<form className='space-y-5' onSubmit={ResetPasswordForm.handleSubmit(handelResetPassword)}>


 <FormField
    control={ResetPasswordForm.control}
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
    control={ResetPasswordForm.control}
    name="newPassword"
    render={({field}) => (
      <FormItem>
        <FormLabel> New Password: </FormLabel>
        <FormControl>
        <Input type='password' {...field} />
        </FormControl>
      
        <FormMessage />
      </FormItem>
    )}
  />





  <Button className='w-full btn-color mt-5 cursor-pointer'>Reset Password</Button>
</form>




</Form>
    </div>
    
  )
}
