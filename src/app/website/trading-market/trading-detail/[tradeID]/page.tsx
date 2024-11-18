"use client"

import * as z from "zod";
import { useForm } from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card";

import { useBidSubmit, useGetAuctionDetail } from "@/utils/react-query/userApi";
import { type BaseError, useReadContracts, useWriteContract } from "wagmi";
import { carbonTraderAbi } from "~/carbonTrader";
import { carbonTraderAddress, erc20Address } from "@/config";
import { erc20Abi } from "~/erc20";
import { waitForTransactionReceipt } from "@wagmi/core";
import { useEffect, useState } from "react";
import { wagmiConfig } from "@/utils/wagmi-config";

import { useToast } from "@/hooks/use-toast";
import { calcTime, encrypt } from "@/utils";
import useStore from "@/store";
import { AuctionRsp } from "@/types";
import { formatEther, parseEther } from 'viem';
import { Loader2 } from "lucide-react";

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

const TradingDetail = ({ params: { tradeID = '' } }) => {

  const { toast } = useToast();
  // const [isLoading, setIsLoading] = useState(false);
  const [auctionInfo, setAuctionInfo] = useState<AuctionRsp>();
  // const [balance, setBalance] = useState<string[]>();
  const { addressConnect } = useStore();
  const { mutateAsync: startBid } = useBidSubmit();
  const result = useReadContracts({
    contracts: [
      {
        address: carbonTraderAddress,
        abi: carbonTraderAbi,
        functionName: 'addressToAllowances',
        args: [addressConnect!],
      },
      {
        address: erc20Address,
        abi: erc20Abi,
        functionName: 'balanceOf',
        args: [addressConnect!],
      }
    ]
  });


  const { writeContract: approve, isSuccess: approveSuccess } = useWriteContract({
    mutation: {
      onSuccess: async (hash, variables) => {
        const listReceipt = await waitForTransactionReceipt(wagmiConfig,
          { hash });
        if (listReceipt.status === "success") {
          toast({
            description: "Approved successfully!",
          });
        }
      },
      onError: (error) => {
        toast({
          description: "Error: " + ((error as BaseError).shortMessage || error.message)
        });
      }
    }
  });
  const { writeContract: deposit, isSuccess: depositSuccess } = useWriteContract({
    mutation: {
      onSuccess: async (hash, variables) => {
        const listReceipt = await waitForTransactionReceipt(wagmiConfig,
          { hash });
        if (listReceipt.status === "success") {
          // toast({
          //   description: "Deposited successfully!",
          // });
          submitBid(hash);
        }
      },
      onError: (error) => {
        toast({
          description: "Error: " + ((error as BaseError).shortMessage || error.message)
        });
      }
    }
  })

  const { data: auctionDetail } = useGetAuctionDetail(tradeID!);

  useEffect(() => {
    if (auctionDetail && auctionDetail.code === 200) {
      setAuctionInfo(auctionDetail.data);
    }
  }, [auctionDetail]);

  useEffect(() => {
    if (result.data) {
      const getData = result.data.map(item => item.result);
      form.setValue("allowance", getData[0]!.toString());
      form.setValue("tokenAmount", formatEther(getData[1]!));
    }
  }, [result.data]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      allowance: "",
      tokenAmount: ""
    }
  });
  // approve method
  const approveToken = () => {
    approve({
      abi: erc20Abi,
      address: erc20Address,
      functionName: 'approve',
      args: [carbonTraderAddress, parseEther(form.getValues().pricePerUint)]
    })
  }
  // deposit method
  const depositToken = async () => {
    const getFormValues = form.getValues();
    const params = {
      publicKey: addressConnect!,
      quantityOfAuction: getFormValues.quantityOfAuction,
      pricePerUint: getFormValues.pricePerUint,
    }
    const encryptInfo = encrypt(JSON.stringify(params), getFormValues.bidPassword);
    deposit({
      abi: carbonTraderAbi,
      address: carbonTraderAddress,
      functionName: 'deposit',
      args: [BigInt(tradeID), parseEther(form.getValues().pricePerUint), encryptInfo]
    })
  }

  // 竞拍提交
  const submitBid = async (hash: string) => {
    const getFormValues = form.getValues();
    const params = {
      publicKey: addressConnect!,
      quantityOfAuction: getFormValues.quantityOfAuction,
      pricePerUint: getFormValues.pricePerUint,
    }
    const encryptInfo = encrypt(JSON.stringify(params), getFormValues.bidPassword)
    const result = await startBid({
      publicKey: addressConnect!,
      auctionID: tradeID,
      hash: hash,
      biddingMsg: encryptInfo
    });
    if (result) {
      toast({
        description: "Deposited and Bid successfully!",
      });
    }
  }

  return (
    <div className="w-full h-[100%] relative flex justify-center items-center">
      {/* {isLoading && <Loader />} */}
      <h1 className="absolute top-0 left-0 text-2xl">拍卖详情</h1>
      <Card>
        <CardContent className="w-full">
          <div className="flex flex-col gap-2 mt-1">
            <h2 className="text-[--basic-text] text-lg font-bold">Auction Detail</h2>
            <div className="flex flex-col gap-2 text-[--secondry-text] text-sm">
              {
                auctionInfo &&
                <>
                  <div className="flex justify-between">
                    <span>Sell Amount</span>
                    <span>{auctionInfo.sellAmount}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Minimum Bid Amount</span>
                    <span>{auctionInfo.minimumBidAmount}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Init Price Unit</span>
                    <span>{auctionInfo.initPriceUnit}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Start Time</span>
                    <span>{calcTime(auctionInfo.startTime)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>End Time</span>
                    <span>{calcTime(auctionInfo.endTime)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Seller Address</span>
                    <span>{auctionInfo.seller}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Transaction Hash</span>
                    <span>{auctionInfo.transactionHash}</span>
                  </div>
                </>
              }

            </div>
          </div>
          <div className="flex flex-col mt-1">
            <h2 className="text-[--basic-text] text-lg font-bold">Auction Information</h2>
            <Form {...form}>
              <form className="space-y-2 w-full">
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
                        <Input type="password" placeholder="Set An Auction Password" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {/* <div className="w-full flex gap-2">
                  <Button className="w-1/2 bg-[--button-bg] text-[--basic-text] hover:bg-[--button-bg]" onClick={approveToken}>
                    Approve
                  </Button>
                  <Button className="w-1/2 bg-[--button-bg] text-[--basic-text] hover:bg-[--button-bg]" onClick={depositToken}>
                    Deposit
                  </Button>
                </div> */}

              </form>
            </Form>
          </div>
          <div className="w-full flex gap-2 mt-2">
            <Button className="w-1/2 bg-[--button-bg] text-[--basic-text] hover:bg-[--button-bg]" onClick={approveToken}>
              Approve
            </Button>
            <Button className="w-1/2 bg-[--button-bg] text-[--basic-text] hover:bg-[--button-bg]" onClick={depositToken}>
              Deposit
            </Button>
          </div>

        </CardContent>
      </Card>

    </div>
  );
};
export default TradingDetail;