import Image from "next/image";
import Link from "next/link";
import { AuctionRsp, TradeRsp } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { calcTime, formatAddress } from "@/utils";
import { cn, getImage } from "@/lib/utils";
import { motion } from "framer-motion";

interface IProps {
	cardInfo: AuctionRsp & TradeRsp;
	menu?: string;
	index: number;
}

const auctionList = [
	{
		title: "Sell Amount",
		key: "sellAmount",
	},
	{
		title: "Init Price Unit",
		key: "initPriceUnit",
	},
	{
		title: "Min Bid Amount",
		key: "minimumBidAmount",
	},
	{
		title: "Start Time",
		key: "startTime",
	},
	{
		title: "End Time",
		key: "endTime",
	},
];

const tradeList = [
	{
		title: "Amount",
		key: "Amount",
	},
	{
		title: "Price Of Unit",
		key: "PriceOfUnit",
	},
	{
		title: "Create Time",
		key: "CreateTime",
	},
];

const ListCard = ({ cardInfo, menu, index }: IProps) => {
	const calcStatus = (startTime: string, endTime: string) => {
		const nowDate = new Date();
		const start = new Date(startTime);
		const end = new Date(endTime);

		const status = {
			trading: start <= nowDate && nowDate <= end,
			notStart: nowDate <= start,
			finished: nowDate >= end,
		};
		return (
			<div
				className={cn(
					`${status.trading
						? "bg-[#A162F7] bg-opacity-300"
						: status.notStart
							? "bg-[#FF6370] bg-opacity-300"
							: "bg-[#A4A5A6] bg-opacity-300"
					}`,
					"rounded-xl px-2 py-1 font-bold"
				)}
			>
				{status.trading
					? "Trading"
					: status.notStart
						? "Not Start"
						: "Finished"}
			</div>
		);
	};

	const calcTradStatus = (status: number) => {
		return (
			<div
				className={cn(
					`${status === 1
						? "bg-[#A162F7] bg-opacity-300"
						: status === 2
							? "bg-[#FF6370] bg-opacity-300"
							: "bg-[#A4A5A6] bg-opacity-300"
					}`,
					"rounded-xl px-2 py-1 font-bold"
				)}
			>
				{status === 1 ? "Normal" : status === 2 ? "Finished" : "Take Down"}
			</div>
		);
	};

	return (
		<motion.div
			className="box"
			whileHover={{ scale: 1.02 }}
			whileTap={{ scale: 0.9 }}
			transition={{ type: "spring", stiffness: 400, damping: 10 }}
		>
			<Link
				href={`/website/${menu}/trading-detail/${cardInfo.tradeID ?? cardInfo.TradeID
					}`}
				className="cursor-pointer hover:scale-105"
			>
				<Card className="bg-[#242731]">
					<CardHeader>
						<div className="flex items-center justify-between gap-2">
							<CardTitle>
								{formatAddress(
									menu === "trading-market" ? cardInfo.Seller : cardInfo.seller
								)}
							</CardTitle>
							{menu === "trading-market"
								? calcTradStatus(cardInfo.Status)
								: calcStatus(cardInfo.startTime, cardInfo.endTime)}
						</div>
					</CardHeader>
					<CardContent className="grid gap-4 pt-2">
						<Image
							src={`/${getImage(index)}.png`}
							alt="carbon"
							width={256}
							height={192}
						></Image>

						<div className="flex flex-col gap-1">
							{(menu === "trading-market" ? tradeList : auctionList).map(
								(item, index) => (
									<div
										className="flex justify-between items-center"
										key={index}
									>
										<p className="text-sm text-muted-foreground">
											{item.title}:
										</p>
										{item.key === "startTime" ||
											item.key === "endTime" ||
											item.key === "CreateTime" ||
											item.key === "UpdateTime"
											? calcTime(cardInfo[item.key as keyof typeof cardInfo])
											: cardInfo[item.key as keyof typeof cardInfo]}
									</div>
								)
							)}
						</div>
					</CardContent>
				</Card>
			</Link>
		</motion.div>
	);
};
export default ListCard;
