'use client'

import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form"
import Image from "next/image"
import Link from "next/link"

// ✅ Schema validasi pakai Zod
const formSchema = z.object({
  storeName: z.string().min(2, "Store name must be at least 2 characters"),
  storeDomain: z.string().min(3, "Store domain is required"),
  city: z.string().min(2, "City is required"),
  postalCode: z.string().min(4, "Postal code must be valid"),
  address: z.string().min(5, "Detail address is required"),
})

export default function OpenStore() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      storeName: "",
      storeDomain: "",
      city: "",
      postalCode: "",
      address: "",
    },
  })

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log("✅ Store submitted:", values)
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-muted/20 p-20">
      <Card className="w-full max-w-sm p-3 rounded-2xl shadow-md bg-background border">
        {/* Header */}
        <div className="flex flex-col items-start p-6">
          <div className="flex items-center gap-2 mb-3">
            <Image
              src="/Vector.png"
              alt="Logo"
              width={40}
              height={40}
            />
            <span className="text-xl font-semibold text-black">Shirt</span>
          </div>
          <h1 className="text-2xl font-semibold text-left">
            Open Your Store Today
          </h1>
          <p className="text-sm text-muted-foreground text-left mt-1">
            Start selling in minutes and reach thousands of customers instantly
          </p>
        </div>

        {/* Form */}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardContent className="space-y-6">
              {/* STORE PROFILE */}
              <div>
                <h2 className="font-bold text-l text-muted-foreground mb-2">STORE PROFILE</h2>
                <div className="space-y-3">
                  <FormField
                    control={form.control}
                    name="storeName"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input placeholder="Store Name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="storeDomain"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input placeholder="Store Domain" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              {/* STORE ADDRESS */}
              <div>
                <h2 className="text-l font-bold text-muted-foreground mb-2">STORE ADDRESS</h2>
                <div className="space-y-3">
                  <FormField
                    control={form.control}
                    name="city"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input placeholder="City" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="postalCode"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input placeholder="Postal Code" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="address"
                    render={({ field }) => (
                       <FormItem>
                        <FormControl>
                          <Textarea placeholder="Detail Address" {...field} />
                        </FormControl>
                        <FormMessage />
                       </FormItem>
                    )}
                  />
                </div>
              </div>
            </CardContent>

            <CardFooter className="flex flex-col gap-2">
              <Button type="submit" className="w-full mt-2 h-11 bg-black text-white hover:bg-gray-800 rounded-lg text-base font-medium">
                Submit
              </Button>
              <Link
                href="/"
                className="font-bold border-b text-sm text-center text-muted-foreground hover:underline"
              >
                Back
              </Link>
            </CardFooter>
          </form>
        </Form>
      </Card>
    </div>
  )
}
