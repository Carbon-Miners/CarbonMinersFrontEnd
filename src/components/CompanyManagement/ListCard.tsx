import Image from "next/image";
import { ICompanyCard, ICompanyInfo, StatusEnum } from "@/types";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { cn, getImage } from "@/lib/utils";
import { motion } from "framer-motion";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@radix-ui/react-tooltip";

interface IProps {
	cardInfo: ICompanyCard;
	index: number;
}
const CompanyCard = ({ cardInfo, index }: IProps) => {
	const parseData: ICompanyInfo = JSON.parse(cardInfo.companyMsg);
	parseData.status = cardInfo.status;

	const calcStatus = (status: string) => {
		return (
			<div
				className={cn(
					`${status === StatusEnum.PASSED
						? "bg-[#A162F7] bg-opacity-300"
						: status === StatusEnum.UNHANDLE
							? "bg-[#FF6370] bg-opacity-300"
							: "bg-[#A4A5A6] bg-opacity-300"
					}`,
					"rounded-xl px-2 py-1 font-bold"
				)}
			>
				{status === StatusEnum.PASSED
					? "Approved"
					: status === StatusEnum.UNHANDLE
						? "Unapproved"
						: "Rejected"}
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
				href={`/manage/${cardInfo.publicKey}`}
				className="cursor-pointer hover:scale-105"
			>
				<Card className="bg-[#242731]">
					<CardHeader>
						<div className="flex items-center justify-between">
							<TooltipProvider>
								<Tooltip>
									<TooltipTrigger asChild>
										<CardTitle className="truncate w-[150px]">
											{parseData.companyName}
										</CardTitle>
									</TooltipTrigger>
									<TooltipContent>
										<p>{parseData.companyName}</p>
									</TooltipContent>
								</Tooltip>
							</TooltipProvider>
							{calcStatus(parseData.status)}
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
							<div className="flex justify-between items-center">
								<p className="text-sm text-muted-foreground">
									Company Representative:
								</p>
								{parseData.companyRepresentative}
							</div>
						</div>

						<div className="flex flex-col gap-1">
							<div className="flex justify-between items-center">
								<p className="text-sm text-muted-foreground">Contact Number:</p>
								{parseData.contactNumber}
							</div>
						</div>
					</CardContent>
				</Card>
			</Link>
		</motion.div>
	);
};
export default CompanyCard;
