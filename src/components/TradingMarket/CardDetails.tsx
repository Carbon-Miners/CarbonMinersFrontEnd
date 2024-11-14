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
import { useAccount } from "wagmi";
import { useGetAuctionDetail } from "@/utils/react-query";

const formSchema = z.object({
  allowance: z.string({
    required_error: "allowance is required",
  }),
  tokenAmount: z.string(
    {
      required_error: "tokenAmount is required",
    }
  ),
  quantityOfAuction: z.string(
    {
      required_error: "quantityOfAuction is required",
    }
  ),
  pricePerUint: z.string({
    required_error: "pricePerUint is required",
  }),
  bidPassword: z.string({
    required_error: "bidPassword is required",
  })
});

const CardDetails = ({ tradeID }: { tradeID: string }) => {

  const { address } = useAccount();
  const { data } = useGetAuctionDetail(tradeID!);
  if (data && data.code === 200) {
    console.log(data.data);
  }

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      allowance: "5",
      tokenAmount: "666666"
    }
  });

  const onSubmit = async () => {
    const getFormValues = form.getValues();
  }

  return (
    <div className="w-full h-[100%] relative flex justify-center items-center">
      {/* {isLoading && <Loader />} */}
      <h1 className="absolute top-0 left-0 text-2xl">拍卖详情</h1>
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
            <h2 className="text-[--basic-text] text-lg font-bold">Auction Information</h2>
            {/* <div className="flex flex-col gap-2 text-[--secondry-text] text-sm">
            <div className="flex justify-between">
              <span>Your Allowance</span>
              <span>5</span>
            </div>
            <div className="flex justify-between">
              <span>Balance Of Token</span>
              <span>6666666</span>
            </div>
          </div> */}
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2 w-[600px]">
                <FormField
                  control={form.control}
                  name="allowance"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Your Allowance</FormLabel>
                      <FormControl>
                        <Input disabled placeholder="Enter allowance" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="tokenAmount"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Balance Of Token</FormLabel>
                      <FormControl>
                        <Input disabled placeholder="Enter balance number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="quantityOfAuction"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Quantity for Auction</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter Quantity for Auction" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="pricePerUint"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Price per Unit</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter Price per Unit" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
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
                <div className="w-full flex gap-2">
                  <Button className="w-1/2 bg-[--button-bg] text-[--basic-text] hover:bg-[--button-bg]">Approve</Button>
                  <Button type="submit" className="w-1/2 bg-[--button-bg] text-[--basic-text] hover:bg-[--button-bg]">Deposit</Button>
                </div>

              </form>
            </Form>
          </div>

        </CardContent>
      </Card>

    </div>
  );
};
export default CardDetails;