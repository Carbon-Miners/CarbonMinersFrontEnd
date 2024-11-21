"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import AuctionForm from "@/components/TradingMarket/AuctionForm";
import ListCard from "@/components/TradingMarket/ListCard";
import BidCard from "@/components/TradingMarket/BidCard";
import {
	useGetAuctionList,
	getAuctionList,
	useGetBidList,
	useGetTradeList,
} from "@/utils/react-query/userApi";
import useStore from "@/store";

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
		hash: "0xdfef2feffef",
	},
];

const TradingMarket = () => {
	const { addressConnect } = useStore();
	const { data: tradeList } = useGetTradeList();
	const { data: bidList } = useGetBidList(addressConnect);

	const [showDialog, setShowDialog] = useState(false);
	const handleChange = (value: boolean) => {
		setShowDialog(value);
	};

	return (
		<div className="w-full h-full relative">
			<Tabs defaultValue="market" className="w-full h-full flex flex-col">
				<TabsList className="grid w-[270px] grid-cols-3">
					<TabsTrigger value="market">交易市场</TabsTrigger>
					<TabsTrigger value="bid">交易追踪</TabsTrigger>
					<TabsTrigger value="mine">我的项目</TabsTrigger>
				</TabsList>
				<TabsContent value="market" className="flex-[1]">
					<div className="flex flex-wrap gap-4">
						{tradeList &&
							tradeList.data.map((item, index) => {
								return (
									<ListCard key={index} cardInfo={item} menu="trade-market" />
								);
							})}
					</div>
				</TabsContent>
				<TabsContent value="bid" className="flex-[1]">
					<div className="flex flex-wrap gap-4">
						{bidList &&
							bidList.data.map((item, index) => {
								return (
									<BidCard key={index} bidInfo={item} menu="trade-market" />
								);
							})}
					</div>
				</TabsContent>
				<TabsContent value="mine" className="flex-[1]">
					我的项目
				</TabsContent>
			</Tabs>
			<div className="absolute right-5 top-1">
				<Dialog open={showDialog} onOpenChange={handleChange}>
					<DialogTrigger asChild>
						<div className="px-3 py-1 rounded-[14px] bg-[--button-bg] text-[--basic-text] flex justify-center items-center font-bold cursor-pointer">
							创建项目
						</div>
					</DialogTrigger>
					<DialogContent>
						<DialogHeader>
							<DialogTitle>Start Auction</DialogTitle>
						</DialogHeader>
						<AuctionForm close={setShowDialog} />
					</DialogContent>
				</Dialog>
			</div>
		</div>
	);
};
export default TradingMarket;
