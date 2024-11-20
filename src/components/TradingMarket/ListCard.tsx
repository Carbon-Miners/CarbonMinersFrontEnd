import Image from "next/image";
import Link from "next/link";
import { AuctionRsp } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { calcTime, formatAddress } from "@/utils";
import { cn } from "@/lib/utils";

interface IProps {
	cardInfo: AuctionRsp;
	menu?: string;
}

const PropertiesList = [
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

const ListCard = ({ cardInfo, menu }: IProps) => {
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
					`${
						status.trading
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

	return (
		<Link
			href={`/website/${menu}/trading-detail/${cardInfo.tradeID}`}
			className="cursor-pointer hover:scale-105"
		>
			<Card className="bg-[#242731]">
				<CardHeader>
					<div className="flex items-center justify-between">
						<CardTitle>{formatAddress(cardInfo.seller)}</CardTitle>
						{calcStatus(cardInfo.startTime, cardInfo.endTime)}
					</div>
				</CardHeader>
				<CardContent className="grid gap-4 pt-2">
					<Image
						src="/carbon.png"
						alt="carbon"
						width={256}
						height={192}
					></Image>

					<div className="flex flex-col gap-1">
						{PropertiesList.map((item, index) => (
							<div className="flex justify-between items-center" key={index}>
								<p className="text-sm text-muted-foreground">{item.title}:</p>
								{item.key === "startTime" || item.key === "endTime"
									? calcTime(cardInfo[item.key as keyof typeof cardInfo])
									: cardInfo[item.key as keyof typeof cardInfo]}
							</div>
						))}
					</div>
				</CardContent>
			</Card>
		</Link>
	);
};
export default ListCard;
