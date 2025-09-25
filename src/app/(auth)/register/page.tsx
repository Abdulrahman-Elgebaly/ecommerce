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
export default function Register() {
  const goTo =  useRouter()
  const SchemeRegister =z.object({
    name:z.string().nonempty("Name Required").min(3,"Min Char 2").max(20,"Max Char 20"),
    email:z.email("Email Is Valid").nonempty("Email Required"),
    password:z.string().nonempty("Password Required").regex(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/,'Enter Valid Password'),
    rePassword:z.string().nonempty("Password Required"),
    Phone:z.string().nonempty("Phone Required").regex(/^01[0125][0-9]{8}$/,"Enter Valid Phone")
  
  }).refine((obj)=>{
   return obj.password == obj.rePassword 
  },{
    path:['rePassword'],
    error:'Confirm Password Not MAtch'
  })
  const RegisterForm=useForm({
    defaultValues:{
    name: "",
    email:"",
    password:"",
    rePassword:"",
    Phone:''
},
resolver:zodResolver(SchemeRegister)
  })

async  function handelRegister(values: z.infer<typeof SchemeRegister>){
const res =await fetch(`${process.env.NEXT_PUBLIC_Base_URL}api/v1/auth/signup`,{
  method:'post',
  body:JSON.stringify(values),
  headers:{
    "content-type":"application/json"
  }
})
const data =await res.json()
if (data.message == 'success'){
  toast.success("Account Created",{position:'top-center'})
  goTo.push("/login")
}else{
  toast.error(data.message,{position:'top-center'})
}

  }
  return (
    <div className='w-1/2 mx-auto my-5'>
    <h1 className='my-5 third-color text-2xl text-center'>Register</h1>
    <Form {...RegisterForm}>
<form className='space-y-5 ' onSubmit={RegisterForm.handleSubmit(handelRegister)}>

 <FormField
    control={RegisterForm.control}
    name="name"
    render={({field}) => (
      <FormItem>
        <FormLabel> Name: </FormLabel>
        <FormControl>
        <Input type='text' {...field} />
        </FormControl>
      
        <FormMessage />
      </FormItem>
    )}
  />
 <FormField
    control={RegisterForm.control}
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
    control={RegisterForm.control}
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
 <FormField
    control={RegisterForm.control}
    name="rePassword"
    render={({field}) => (
      <FormItem>
        <FormLabel> Confirm Password: </FormLabel>
        <FormControl>
        <Input type='password' {...field} />
        </FormControl>
      
        <FormMessage />
      </FormItem>
    )}
  />
 <FormField
    control={RegisterForm.control}
    name="Phone"
    render={({field}) => (
      <FormItem>
        <FormLabel> Phone: </FormLabel>
        <FormControl>
        <Input type='tel' {...field} />
        </FormControl>
      
        <FormMessage />
      </FormItem>
    )}
  />






  <Button className='w-full btn-color mt-5 cursor-pointer '>Register</Button>
</form>




</Form>
    </div>
    
  )
}
