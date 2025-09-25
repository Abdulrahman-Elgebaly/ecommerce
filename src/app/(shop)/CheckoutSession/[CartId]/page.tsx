'use client'
import { Button } from 'image/components/ui/button';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from 'image/components/ui/form';
import { Input } from 'image/components/ui/input';
import { useParams } from 'next/navigation'
import React from 'react'
import { useForm } from 'react-hook-form';
import { Form } from "image/components/ui/form"
import { checkoutPayment } from 'image/OrderActions/OrderActions';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';


const shippingSchema = z.object({
  details: z.string().min(5, "Details must be at least 5 characters"),
  phone: z.string().min(10, "Phone must be at least 10 digits"),
  city: z.string().min(2, "City must be at least 2 characters"),
});

type ShippingFormValues = z.infer<typeof shippingSchema>;

export default function CheckoutSession() {
  const {CartId}:{CartId:string}=useParams()
  console.log(CartId);

  const shippingForm = useForm<ShippingFormValues>({
    resolver: zodResolver(shippingSchema), 
    defaultValues:{
      "details": "",
      "phone": "",
      "city": ""
    }
  })

  async function handelCheckout(values: ShippingFormValues){
    console.log(values);
    const data = await checkoutPayment(CartId, values)
    console.log(data);
    window.location.href = data.session.url
  }

  return (
    <div className='w-1/2 mx-auto my-5'>
      <h1 className='text-3xl my-5'>Checkout Payment</h1>

      <Form {...shippingForm}>
        <form className='space-y-3' onSubmit={shippingForm.handleSubmit(handelCheckout)}>
          <FormField
            control={shippingForm.control}
            name="details"
            render={({field}) => (
              <FormItem>
                <FormLabel>Details</FormLabel>
                <FormControl>
                  <Input {...field}/>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={shippingForm.control}
            name="phone"
            render={({field}) => (
              <FormItem>
                <FormLabel>Phone</FormLabel>
                <FormControl>
                  <Input {...field}/>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={shippingForm.control}
            name="city"
            render={({field}) => (
              <FormItem>
                <FormLabel>City</FormLabel>
                <FormControl>
                  <Input {...field}/>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button>Payment</Button>
        </form>
      </Form>
    </div>
  )
}
