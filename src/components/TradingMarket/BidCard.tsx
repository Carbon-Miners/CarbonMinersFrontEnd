import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { calcTime, formatAddress, formatHash } from "@/utils";
import { IBidCard, BidEnum } from "@/types";
import { cn } from "@/lib/utils";

interface IProps {
	bidInfo: IBidCard;
	menu?: string;
}

const BidCard = ({ bidInfo, menu }: IProps) => {
	const calcStatus = (biddingStatus: number) => {
		const statusBg = [
			"bg-green-200",
			"bg-green-300",
			"bg-blue-300",
			"bg-yellow-300",
			"bg-gray-300",
		];
		return (
			<span
				className={cn(
					`${statusBg[biddingStatus]}`,
					"rounded-xl px-2 py-1 font-bold text-[--secondry-text]"
				)}
			>
				{BidEnum[biddingStatus]}
			</span>
		);
	};

	return (
		<Link
			href={`/website/${menu}/bid-detail/${bidInfo.biddingID}-${bidInfo.auctionID}`}
			className="cursor-pointer hover:scale-105"
		>
			<Card>
				<CardHeader>
					<div className="flex items-center justify-between">
						<CardTitle>{formatAddress(bidInfo.buyer)}</CardTitle>
						{calcStatus(Number(bidInfo.biddingStatus))}
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
						<div className="flex justify-between items-center">
							<p className="text-sm text-muted-foreground">Bid Time:</p>
							{calcTime(bidInfo.biddingTime, true)}
						</div>
						<div className="flex justify-between items-center">
							<p className="text-sm text-muted-foreground">Hash:</p>
							{formatHash(bidInfo.hash)}
						</div>
					</div>
				</CardContent>
			</Card>
		</Link>
	);
};
export default BidCard;
