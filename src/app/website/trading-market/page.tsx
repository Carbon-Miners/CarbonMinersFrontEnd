"use client"

import { useState } from "react";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import AuctionForm from "@/components/TradingMarket/AuctionForm";
import ListCard from "@/components/TradingMarket/ListCard"
import BidCard from "@/components/TradingMarket/BidCard"


const listData = [
  {
    id: "1",
    seller: "0x5d685c71B40Ad741dbA424229FD641816E9A6395",
    tradeID: "tradeID",
    sellAmount: "5",
    minimumBidAmount: "1",
    initPriceUnit: "2",
    status: "dd",
    startTime: "1729555200000",
    endTime: "1729728000000",
    transactionHash: "0xdfefefeffef"
  },
  {
    id: "2",
    seller: "0x5d685c71B40Ad741dbA424229FD641816E9A6395",
    tradeID: "tradeI",
    sellAmount: "5",
    minimumBidAmount: "1",
    initPriceUnit: "3",
    status: "dd2",
    startTime: "1729729000000",
    endTime: "1761264000000",
    transactionHash: "0xdfef2feffef"
  }
]
const BidData = [
  {
    id: "bid01",
    buyer: "0x5d685c71B40Ad741dbA424229FD641816E9A6395",
    auctionID: "0336",
    biddingID: "0155",
    biddingMsg: "hello",
    biddingStatus: "0",
    allocateAmount: 655,
    additionalAmountToPay: 60,
    biddingTime: "1733200925000",
    hash: "0xdfef2feffef"
  }
]

const TradingMarket = () => {

  const [showDialog, setShowDialog] = useState(false);
  const handleChange = (value: boolean) => {
    setShowDialog(value);
  }

  return (
    <div className="w-full h-full relative">
      <Tabs defaultValue="market" className="w-full h-full flex flex-col">
        <TabsList className="grid w-[240px] grid-cols-4">
          <TabsTrigger value="market">拍卖市场</TabsTrigger>
          <TabsTrigger value="bid">投标追踪</TabsTrigger>
          <TabsTrigger value="normal">常规市场</TabsTrigger>
          <TabsTrigger value="mine">我的</TabsTrigger>
        </TabsList>
        <TabsContent value="market" className="flex-[1]">
          <div className="flex flex-wrap gap-4">
            {
              listData.map((item, index) => {
                return <ListCard key={index} cardInfo={item} />
              })
            }
          </div>
        </TabsContent>
        <TabsContent value="bid" className="flex-[1]">
          <div className="flex flex-wrap gap-4">
            {
              BidData.map((item, index) => {
                return <BidCard key={index} bidInfo={item} />
              })
            }
          </div>
        </TabsContent>
        <TabsContent value="nromal" className="flex-[1]">
          我的
        </TabsContent>
        <TabsContent value="mine" className="flex-[1]">
          我的
        </TabsContent>
      </Tabs>
      <div className="absolute right-5 top-1">
        <Dialog open={showDialog} onOpenChange={handleChange}>
          <DialogTrigger asChild>
            <div className='px-3 py-1 rounded-[14px] bg-[--button-bg] text-[--basic-text] flex justify-center items-center font-bold cursor-pointer'>创建项目</div>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Start Auction</DialogTitle>
            </DialogHeader>
            <AuctionForm />
          </DialogContent>
        </Dialog>
      </div>
    </div>

  )
};
export default TradingMarket;