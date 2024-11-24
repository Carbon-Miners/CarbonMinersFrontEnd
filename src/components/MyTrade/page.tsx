import useStore from "@/store";
import { Button } from "../ui/button";
import {
	useGetAuctionList,
	useGetMyAuction,
} from "@/utils/react-query/userApi";
import { calcTime } from "@/utils";
import { Icon } from "../icon";
import { useEffect, useState } from "react";
import { AuctionRsp } from "@/types";
import { EmptyPage } from "../EmptyPage";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "../ui/dialog";
import AuctionForm from "../TradingMarket/AuctionForm";

export function MyTrade() {
	const addressConnect = useStore((state) => state.addressConnect);
	const { data: myAuctionList } = useGetMyAuction(addressConnect);
	const [showDialog, setShowDialog] = useState(false);
	const handleChange = (value: boolean) => {
		setShowDialog(value);
	};

	return (
		<div className="w-full h-full">
			<div className="flex items-center justify-between">
				<h1 className="text-2xl">My Auctions</h1>

				<Dialog open={showDialog} onOpenChange={handleChange}>
					<DialogTrigger asChild>
						<Button className="bg-[--button-bg] text-[--basic-text]">
							Create Auction
						</Button>
					</DialogTrigger>
					<DialogContent>
						<DialogHeader>
							<DialogTitle>My Auction</DialogTitle>
						</DialogHeader>
						<AuctionForm close={setShowDialog} />
					</DialogContent>
				</Dialog>
			</div>
			<div className="flex flex-wrap h-[calc(100vh-220px)] gap-4 mt-5 text-[--secondry-text] text-sm overflow-y-auto">
				{myAuctionList && myAuctionList.data.length ? (
					myAuctionList.data.map((item, index) => {
						return (
							<div className="w-full p-5 grid grid-cols-2 gap-2 bg-[#242731] opacity-200 rounded-lg">
								<div className="flex flex-col justify-between">
									<span className="text-[#E0E4E7] text-lg mb-2">
										Sell Amount
									</span>
									<span>{item?.sellAmount}</span>
								</div>
								<div className="flex flex-col justify-between">
									<span className="text-[#E0E4E7] text-lg mb-2">
										Min Bid Amount
									</span>
									<span>{item?.minimumBidAmount}</span>
								</div>
								<div className="flex flex-col justify-between">
									<span className="text-[#E0E4E7] text-lg mb-2">
										Init Price Unit
									</span>
									<span>{item?.initPriceUnit}</span>
								</div>
								<div className="flex flex-col justify-between">
									<span className="text-[#E0E4E7] text-lg mb-2">
										Start Time
									</span>
									<span>{calcTime(item?.startTime)}</span>
								</div>
								<div className="flex flex-col justify-between">
									<span className="text-[#E0E4E7] text-lg mb-2">End Time</span>
									<span>{calcTime(item?.endTime)}</span>
								</div>
								<div className="flex flex-col justify-between">
									<span className="text-[#E0E4E7] text-lg mb-2">
										Transaction Hash
									</span>
									<span>{item?.transactionHash}</span>
								</div>
							</div>
						);
					})
				) : (
					<EmptyPage />
				)}
			</div>
		</div>
	);
}
export default MyTrade;
