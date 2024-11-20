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
import { Card, CardContent } from "@/components/ui/card";
import { useBidUpdate, useGetAuctionDetail, useGetBidDetails } from "@/utils/react-query/userApi";
import { useEffect, useState } from "react";
import { AuctionRsp, IBidCard } from "@/types";
import { calcTime, decrypt } from "@/utils";
import { useWriteContract, type BaseError } from "wagmi";
import { waitForTransactionReceipt } from "@wagmi/core";
import { wagmiConfig } from "@/utils/wagmi-config";
import { useToast } from "@/hooks/use-toast";
import { carbonTraderAbi } from "~/carbonTrader";
import { carbonTraderAddress, erc20Address } from "@/config";
import { Loader2 } from "lucide-react";
import { erc20Abi } from "~/erc20";
import { parseEther } from "viem";
import { readContract } from '@wagmi/core'

const formSchema = z.object({
  bidPassword: z.string({
    required_error: "bidPassword is required",
  })
});

const BidDetails = ({ params: { bidID = '' } }) => {
  const [bidId, acutionId] = bidID.split('-');
  const { toast } = useToast();
  const { mutateAsync: bidUpdate } = useBidUpdate();
  const { mutateAsync: updateBid } = useBidUpdate();
  const [bidDetail, setBidDetail] = useState<IBidCard>({} as IBidCard);
  const [auctionDetail, setAuctionDetail] = useState<AuctionRsp>({} as AuctionRsp);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema)
  });
  const { writeContract: setBidSecret, isSuccess } = useWriteContract({
    mutation: {
      onSuccess: async (hash, variables) => {
        const listReceipt = await waitForTransactionReceipt(wagmiConfig,
          { hash });
        if (listReceipt.status === "success") {
          toast({
            description: "Deposited successfully!",
          });
          submitBidSecret(hash);
        }
      },
      onError: (error) => {
        toast({
          description: "Error: " + ((error as BaseError).shortMessage || error.message)
        });
      }
    }
  })
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
  const { writeContract: finalize, isSuccess: finalizeSuccess } = useWriteContract({
    mutation: {
      onSuccess: async (hash, variables) => {
        const listReceipt = await waitForTransactionReceipt(wagmiConfig,
          { hash });
        if (listReceipt.status === "success") {

          updateBidInfo(hash);
        }
      },
      onError: (error) => {
        toast({
          description: "Error: " + ((error as BaseError).shortMessage || error.message)
        });
      }
    }
  });

  const { data: bidData } = useGetBidDetails(bidId);
  const { data: acutionData, refetch } = useGetAuctionDetail(acutionId);

  useEffect(() => {
    if (bidData) {
      // setAuctionID(bidData.data.auctionID);
      setBidDetail(bidData.data);
      // refetch();
    }
  }, [bidData]);
  useEffect(() => {
    if (acutionData) {
      setAuctionDetail(acutionData.data);
    }
  }, [acutionData])

  const openBid = (data: z.infer<typeof formSchema>) => {
    // const getFormValues = form.getValues();
    setBidSecret({
      abi: carbonTraderAbi,
      address: carbonTraderAddress,
      functionName: 'setBidSecret',
      args: [BigInt(bidDetail.auctionID), data.bidPassword]
    })
  }

  const submitBidSecret = async (hash: string) => {
    const getFormValues = form.getValues();
    const res = await bidUpdate({
      biddingID: bidId,
      biddingMsg: decrypt(bidDetail.biddingMsg, getFormValues.bidPassword),
      hash: hash,
      status: '2'
    });
    if (res) {
      toast({
        description: "Bid open successfully!",
      })
    }
  }

  const approveToken = async () => {
    approve({
      abi: erc20Abi,
      address: erc20Address,
      functionName: 'approve',
      args: [carbonTraderAddress, parseEther(String(bidDetail.additionalAmountToPay))]
    })
  }

  const finalizeAuction = () => {
    finalize({
      abi: carbonTraderAbi,
      address: carbonTraderAddress,
      functionName: 'finalizeAuctionAndTransferCarbon',
      args: [BigInt(bidDetail.auctionID), BigInt(bidDetail.allocateAmount), parseEther(String(bidDetail.additionalAmountToPay))]
    })
  }

  const updateBidInfo = async (hash: string) => {
    const res = await updateBid({
      biddingID: bidId,
      hash: hash,
      status: '5'
    });
    if (res) {
      toast({
        description: "finalize successfully!",
      });
    }
  }

  const judgeComponent = (status: string) => {
    switch (status) {
      case "0":
        return (
          <div>等待投标开始</div>
        )
      case "1":
        return (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(openBid)} className="space-y-2 w-full">
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
              <div className="w-full flex justify-end">
                <Button type="submit" className="w-1/2 bg-[--button-bg] text-[--basic-text] hover:bg-[--button-bg]">
                  {/* {
                    isSuccess && <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  } */}
                  Open Bid
                </Button>
              </div>

            </form>
          </Form>
        )
      case "2":
        return (
          <div>等待开标</div>
        )
      case "3":
        return (
          <div className="flex flex-col gap-2">
            <div className="flex justify-between font-bold text-[--secondry-text]">
              <span>Number of Awards</span>
              <span>{bidDetail.allocateAmount}</span>
            </div>
            <div className="flex gap-2 justify-end">
              <div className="cursor-pointer px-4 h-[40px] flex justify-center items-center bg-[--button-bg] text-center rounded-lg text-[--basic-text]" onClick={approveToken}>
                Approve
              </div>
              <div className="cursor-pointer px-4 h-[40px] flex justify-center items-center py-1 bg-[--button-bg] text-center rounded-lg text-[--basic-text]" onClick={finalizeAuction}>
                Finalize Auction
              </div>
            </div>
          </div>

        )
      case "4":
        return (
          <div>等待退款</div>
        )
      case "5":
        return (
          <div>结束</div>
        )
    }
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
                <span>{auctionDetail.sellAmount}</span>
              </div>
              <div className="flex justify-between">
                <span>Minimum Bid Amount</span>
                <span>{auctionDetail.minimumBidAmount}</span>
              </div>
              <div className="flex justify-between">
                <span>Init Price Unit</span>
                <span>{auctionDetail.initPriceUnit}</span>
              </div>
              <div className="flex justify-between">
                <span>Start Time</span>
                <span>{calcTime(auctionDetail.startTime)}</span>
              </div>
              <div className="flex justify-between">
                <span>End Time</span>
                <span>{calcTime(auctionDetail.endTime)}</span>
              </div>
              <div className="flex justify-between">
                <span>Seller Address</span>
                <span>{auctionDetail.seller}</span>
              </div>
              <div className="flex justify-between">
                <span>Transaction Hash</span>
                <span>{auctionDetail.transactionHash}</span>
              </div>
            </div>
          </div>
          <div className="flex flex-col mt-1">
            <h2 className="text-[--basic-text] text-lg font-bold">Bid Information</h2>
            {
              judgeComponent(bidDetail.biddingStatus)
            }

          </div>

        </CardContent>
      </Card>

    </div>
  );
};
export default BidDetails;