"use client"

import * as z from "zod";
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
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "../ui/card";

const formSchema = z.object({
  bidPassword: z.string({
    required_error: "bidPassword is required",
  })
});

const BidDetails = () => {

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema)
  });

  const onSubmit = async () => {
    const getFormValues = form.getValues();

  }

  return (
    <div className="w-full h-[100%] relative flex justify-center items-center">
      {/* {isLoading && <Loader />} */}
      <h1 className="absolute top-0 left-0 text-2xl">投标详情</h1>
      <Card>
        <CardContent>
          <div className="flex flex-col gap-2 mt-1">
            <h2 className="text-[--basic-text] text-lg font-bold">Auction Detail</h2>
            <div className="flex flex-col gap-2 text-[--secondry-text] text-sm">
              <div className="flex justify-between">
                <span>Sell Amount</span>
                <span>5</span>
              </div>
              <div className="flex justify-between">
                <span>Minimum Bid Amount</span>
                <span>1</span>
              </div>
              <div className="flex justify-between">
                <span>Init Price Unit</span>
                <span>1</span>
              </div>
              <div className="flex justify-between">
                <span>Start Time</span>
                <span>Fake Name</span>
              </div>
              <div className="flex justify-between">
                <span>End Time</span>
                <span>Fake Name</span>
              </div>
              <div className="flex justify-between">
                <span>Seller Address</span>
                <span>Fake Name</span>
              </div>
              <div className="flex justify-between">
                <span>Transaction Hash</span>
                <span>Fake Name</span>
              </div>
            </div>
          </div>
          <div className="flex flex-col mt-1">
            <h2 className="text-[--basic-text] text-lg font-bold">Bid Information</h2>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2 w-[600px]">
                <FormField
                  control={form.control}
                  name="bidPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Auction Password</FormLabel>
                      <FormControl>
                        <Input placeholder="Set An Auction Password" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="w-full flex justify-end">
                  <Button type="submit" className="w-1/2 bg-[--button-bg] text-[--basic-text] hover:bg-[--button-bg]">Open Bid</Button>
                </div>

              </form>
            </Form>
          </div>

        </CardContent>
      </Card>

    </div>
  );
};
export default BidDetails;