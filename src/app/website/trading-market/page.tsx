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
import AuctionForm from "@/components/AuctionAndTradeMarket/AuctionForm";
import ListCard from "@/components/AuctionAndTradeMarket/ListCard";
import BidCard from "@/components/AuctionAndTradeMarket/BidCard";
import {
	useGetAuctionList,
	getAuctionList,
	useGetBidList,
	useGetTradeList,
	useGetMyParticipation,
} from "@/utils/react-query/userApi";
import useStore from "@/store";
import { ComingSoon } from "@/components/ComingSoon";
import MyTrade from "@/components/AuctionAndTradeMarket/MyTrade";
import { AuctionRsp, TradeRsp } from "@/types";
import TrackingCard from "@/components/AuctionAndTradeMarket/TrackingCard";

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
	const { data: myTradeList } = useGetMyParticipation(addressConnect);
	const [showDialog, setShowDialog] = useState(false);
	const handleChange = (value: boolean) => {
		setShowDialog(value);
	};

	return (
		<div className="w-full h-full relative">
			<Tabs defaultValue="market" className="w-full h-full flex flex-col">
				<TabsList className="grid w-[390px] grid-cols-3">
					<TabsTrigger value="market">Trading Market</TabsTrigger>
					<TabsTrigger value="track">Trade Tracking</TabsTrigger>
					<TabsTrigger value="mine">My Trading</TabsTrigger>
				</TabsList>
				<TabsContent value="market" className="flex-[1]">
					<div className="flex flex-wrap gap-4">
						{tradeList &&
							tradeList.data.map((item, index) => {
								return (
									<ListCard
										key={index}
										cardInfo={item as AuctionRsp & TradeRsp}
										menu="trading-market"
										index={index}
									/>
								);
							})}
					</div>
				</TabsContent>
				<TabsContent value="track" className="flex-[1]">
					<div className="flex flex-wrap gap-4">
						{/* <ComingSoon /> */}
						{myTradeList &&
							myTradeList.data.map((item, index) => {
								return (
									<TrackingCard
										key={index}
										cardInfo={item as AuctionRsp & TradeRsp}
										menu="trading-market"
										index={index}
									/>
								);
							})}
					</div>
				</TabsContent>
				<TabsContent value="mine" className="flex-[1]">
					<div className="flex flex-wrap m-5">
						<MyTrade />
					</div>
				</TabsContent>
			</Tabs>
		</div>
	);
};
export default TradingMarket;
