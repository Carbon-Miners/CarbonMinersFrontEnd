"use client"

import * as z from "zod";
import { useState } from "react";
import { useForm } from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent } from "../ui/card";


const formSchema = z.object({
  companyName: z.string({
    required_error: "companyName required",
  }),
  registrationNumber: z.string(
    {
      required_error: "registrationNumber required",
    }
  ),
  companyRepresentative: z.string(
    {
      required_error: "companyRepresentative required",
    }
  ),
  companyAddress: z.string({
    required_error: "companyAddress required",
  }),
  contactEmail: z.string(
    {
      required_error: "contactEmail required",
    }
  ).email(),
  contactNumber: z.string(
    {
      required_error: "contactNumber required",
    }
  ),
  emissionData: z.string(
    {
      required_error: "emissionData required",
    }
  ),
  reductionStrategy: z.string(
    {
      required_error: "reductionStrategy required",
    }
  )
});


const ApplyForm = () => {

  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema)
  });

  const onSubmit = async () => {
    const getFormValues = form.getValues();
    // setIsLoading(true);

  }

  return (
    <div className="w-full h-[100%] flex justify-center items-center">
      {/* {isLoading && <Loader />} */}

      <Card>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="relative grid grid-cols-2 gap-8 w-[800px] pb-14 pt-6">
              <FormField
                control={form.control}
                name="companyName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Company Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter company name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="registrationNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Registration Number</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter registration number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="companyRepresentative"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Company Representative</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter company representative" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="companyAddress"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Company Address</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter company address" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="contactEmail"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Contact Email</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter contact email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="contactNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Contact Number</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter contact Number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="emissionData"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Emission Data</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Enter emission data"
                        className="resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="reductionStrategy"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Reduction Strategy</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Describe your company's carbon reduction plans and strategies"
                        className="resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* <div className="w-full flex justify-end gap-2"> */}
              <Button type="submit" className="absolute bottom-0 w-full bg-[--button-bg] text-[--basic-text] hover:bg-[--button-bg]">Apply For Entry</Button>
              {/* </div> */}

            </form>
          </Form>
        </CardContent>
      </Card>

    </div>
  )
}


export default ApplyForm;