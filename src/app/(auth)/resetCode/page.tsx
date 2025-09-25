'use client'
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp"
import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp"

import { Form,FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import React from 'react'
import {useForm } from 'react-hook-form'
import { Button } from 'image/components/ui/button'

import * as z from 'zod'
import {zodResolver} from '@hookform/resolvers/zod'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
export default function Login() {
  const goTo =  useRouter()
  const SchemeResetCode =z.object({
   
    resetCode:z.string().nonempty("Reset Code Required")
  })
  const codeForm=useForm({
    defaultValues:{
    resetCode:"",

},
resolver:zodResolver(SchemeResetCode)
  })

async  function ResetCode(values: z.infer<typeof SchemeResetCode>){
const res =await fetch(`${process.env.NEXT_PUBLIC_Base_URL}api/v1/auth/verifyResetCode`,{
  method:'POST',
  body:JSON.stringify(values),
  headers:{
    "content-type":"application/json"
  }
})
const data =await res.json()
console.log(values);

if (data){
  toast.success("Done",{position:'top-center'})
  goTo.push("/resetPassword")
}else{
  toast.error(data.message,{position:'top-center'})
}

  }
  return (
    <div className='w-1/2 mx-auto my-5'>
    <h1 className='my-5 third-color text-2xl text-center'>Reset Code</h1>
    <Form {...codeForm}>
<form className='space-y-5' onSubmit={codeForm.handleSubmit(ResetCode)}>


 <FormField
    control={codeForm.control}
    name="resetCode"
    render={({field}) => (
      <FormItem>
        <FormLabel> Enter the code sent to your email: </FormLabel>
        <FormControl>
<div className="flex justify-center items-center">
              <InputOTP {...field} maxLength={6} pattern={REGEXP_ONLY_DIGITS_AND_CHARS}>
      <InputOTPGroup>
        <InputOTPSlot index={0} />
        <InputOTPSlot index={1} />
        <InputOTPSlot index={2} />
        <InputOTPSlot index={3} />
        <InputOTPSlot index={4} />
        <InputOTPSlot index={5} />
      </InputOTPGroup>
    </InputOTP>
</div>
        </FormControl>
   
      
        <FormMessage />
      </FormItem>
    )}
  />






  <Button className='w-full btn-color mt-5 cursor-pointer'>Verify Code</Button>
</form>




</Form>
    </div>
    
  )
}
