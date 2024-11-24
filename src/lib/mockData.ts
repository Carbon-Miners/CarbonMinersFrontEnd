import { AuctionRsp, IBidCard } from "@/types";

export const mockBidList: { data: IBidCard[] } = {
	data: [
		{
			id: "bid01",
			buyer: "0x5d685c71B40Ad741dbA424229FD641816E9A6395",
			auctionID: "0336",
			biddingID: "0155",
			biddingMsg: "hello",
			biddingStatus: "0",
			allocateAmount: 655,
			additionalAmountToPay: 60,
			biddingTime: "2024-11-24T22:15:31+08:00",
			hash: "0xdfef2feffef",
		},
		{
			id: "bid02",
			buyer: "0x5d685c71B40Ad741dbA424229FD641816E9A6395",
			auctionID: "0336",
			biddingID: "0155",
			biddingMsg: "hello",
			biddingStatus: "0",
			allocateAmount: 655,
			additionalAmountToPay: 60,
			biddingTime: "2024-11-24T22:15:31+08:00",
			hash: "0xdfef2feffef",
		},
		{
			id: "bid03",
			buyer: "0x5d685c71B40Ad741dbA424229FD641816E9A6395",
			auctionID: "0336",
			biddingID: "0155",
			biddingMsg: "hello",
			biddingStatus: "0",
			allocateAmount: 655,
			additionalAmountToPay: 60,
			biddingTime: "2024-11-24T22:15:31+08:00",
			hash: "0xdfef2feffef",
		},
	],
};

export const mockAuctionDetail: AuctionRsp = {
	id: 1,
	seller: "0x5d685c71B40Ad741dbA424229FD641816E9A6395",
	tradeID: "0336",
	sellAmount: 655,
	minimumBidAmount: 60,
	initPriceUnit: 60,
	status: "0",
	startTime: "2024-11-24T22:15:31+08:00",
	endTime: "2024-11-24T22:15:31+08:00",
	transactionHash: "0xdfef2feffef",
};
