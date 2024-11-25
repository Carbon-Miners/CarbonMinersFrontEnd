import useStore from "@/store";
import { Button } from "../ui/button";
import { useGetMyTrade, useGetTradeList } from "@/utils/react-query/userApi";
import { calcTime } from "@/utils";
import { useEffect, useState } from "react";
import { EmptyPage } from "../EmptyPage";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "../ui/dialog";
import TradeForm from "./TradeForm";

export function MyTrade() {
	const addressConnect = useStore((state) => state.addressConnect);
	const { data: myTradeList, refetch } = useGetMyTrade(addressConnect);
	const { refetch: refetchTradeList } = useGetTradeList();

	const [showDialog, setShowDialog] = useState(false);

	const handleChange = (value: boolean) => {
		setShowDialog(value);
	};

	const handleTradeFormClose = () => {
		setShowDialog(false);
		refetch();
		refetchTradeList();
	};

	return (
		<div className="w-full h-full">
			<div className="flex items-center justify-between">
				<h1 className="text-2xl">My Trading</h1>

				<Dialog open={showDialog} onOpenChange={handleChange}>
					<DialogTrigger asChild>
						<Button className="bg-[--button-bg] text-[--basic-text]">
							Create Trading
						</Button>
					</DialogTrigger>
					<DialogContent>
						<DialogHeader>
							<DialogTitle>My Trading</DialogTitle>
						</DialogHeader>
						<TradeForm close={handleTradeFormClose} />
					</DialogContent>
				</Dialog>
			</div>
			<div className="flex flex-col justify-start h-[calc(100vh-220px)] gap-4 mt-5 text-[--secondry-text] text-sm overflow-y-auto">
				{myTradeList && myTradeList.data.length ? (
					myTradeList.data.map((item, index) => {
						return (
							<div className="w-full p-5 grid grid-cols-2 gap-2 bg-[#242731] opacity-200 rounded-lg">
								<div className="flex flex-col justify-between">
									<span className="text-[#E0E4E7] text-lg mb-2">Amount</span>
									<span>{item?.Amount}</span>
								</div>
								<div className="flex flex-col justify-between">
									<span className="text-[#E0E4E7] text-lg mb-2">
										Price of Unit
									</span>
									<span>{item?.PriceOfUnit}</span>
								</div>
								<div className="flex flex-col justify-between">
									<span className="text-[#E0E4E7] text-lg mb-2">Status</span>
									<span>
										{item?.Status === 1
											? "Normal"
											: item?.Status === 2
											? "Finished"
											: "Take Down"}
									</span>
								</div>
								<div className="flex flex-col justify-between">
									<span className="text-[#E0E4E7] text-lg mb-2">
										Create Time
									</span>
									<span>{calcTime(item?.CreateTime)}</span>
								</div>
								<div className="flex flex-col justify-between">
									<span className="text-[#E0E4E7] text-lg mb-2">
										Update Time
									</span>
									<span>{calcTime(item?.UpdateTime)}</span>
								</div>
								<div className="flex flex-col justify-between">
									<span className="text-[#E0E4E7] text-lg mb-2">
										Transaction Hash
									</span>
									<span>{item?.TransactionHash}</span>
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
