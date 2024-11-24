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
} from "@/utils/react-query/userApi";
import useStore from "@/store";
import MyAuction from "@/components/MyAuction/page";

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

const AuctionMarket = () => {
	const { addressConnect } = useStore();
	const { data: auctionList } = useGetAuctionList();
	const { data: bidList } = useGetBidList(addressConnect);

	return (
		<div className="w-full h-full relative">
			<Tabs defaultValue="market" className="w-full h-full flex flex-col">
				<TabsList className="grid w-[270px] grid-cols-3">
					<TabsTrigger value="market">拍卖市场</TabsTrigger>
					<TabsTrigger value="bid">投标追踪</TabsTrigger>
					<TabsTrigger value="mine">我的拍卖</TabsTrigger>
				</TabsList>
				<TabsContent value="market" className="flex-[1]">
					<div className="flex flex-wrap gap-4">
						{auctionList &&
							auctionList.data.map((item, index) => {
								return (
									<ListCard
										key={index}
										cardInfo={item}
										menu="auction-market"
										index={index}
									/>
								);
							})}
					</div>
				</TabsContent>
				<TabsContent value="bid" className="flex-[1]">
					<div className="flex flex-wrap gap-4">
						{bidList &&
							bidList.data.map((item, index) => {
								return (
									<BidCard
										key={index}
										bidInfo={item}
										menu="auction-market"
										index={index}
									/>
								);
							})}
					</div>
				</TabsContent>
				<TabsContent value="mine" className="flex-[1]">
					<div className="flex flex-wrap m-5">
						<MyAuction />
					</div>
				</TabsContent>
			</Tabs>
		</div>
	);
};
export default AuctionMarket;
