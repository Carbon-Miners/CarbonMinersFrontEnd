"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";

import { useBidSubmit, useGetTradeDetail } from "@/utils/react-query/userApi";
import { type BaseError, useReadContracts, useWriteContract } from "wagmi";
import { carbonTraderAbi } from "~/carbonTrader";
import { carbonTraderAddress, erc20Address } from "@/config";
import { erc20Abi } from "~/erc20";
import { waitForTransactionReceipt } from "@wagmi/core";
import { useEffect, useState } from "react";
import { wagmiConfig } from "@/utils/wagmi-config";

import { useToast } from "@/hooks/use-toast";
import { calcTime, encrypt } from "@/utils";
import useStore from "@/store";
import { AuctionRsp, TradeRsp } from "@/types";
import { formatEther, parseEther } from "viem";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { Icon } from "@/components/icon";
import { writeContract } from "@wagmi/core";

const formSchema = z.object({
	allowance: z.string({
		required_error: "allowance is required",
	}),
	tokenAmount: z.string({
		required_error: "tokenAmount is required",
	}),
	quantityOfTrading: z.string({
		required_error: "quantityOfTrading is required",
	}),
});

const TradingDetail = ({ params: { TradeID = "" } }) => {
	const { toast } = useToast();
	const [isLoading, setIsLoading] = useState(false);
	const [tradeInfo, setTradeInfo] = useState<TradeRsp>();
	// const [balance, setBalance] = useState<string[]>();
	const { addressConnect } = useStore();
	const { mutateAsync: startBid } = useBidSubmit();
	const result = useReadContracts({
		contracts: [
			{
				address: carbonTraderAddress,
				abi: carbonTraderAbi,
				functionName: "addressToAllowances",
				args: [addressConnect!],
			},
			{
				address: erc20Address,
				abi: erc20Abi,
				functionName: "balanceOf",
				args: [addressConnect!],
			},
		],
	});

	const { writeContract } = useWriteContract({
		mutation: {
			onSuccess: async (hash, variables) => {
				const listReceipt = await waitForTransactionReceipt(wagmiConfig, {
					hash,
				});
				if (listReceipt.status === "success") {
					toast({
						description: "Approved successfully!",
					});
					setIsLoading(false);
					router.back();
				}
			},
			onError: (error) => {
				toast({
					description:
						"Error: " + ((error as BaseError).shortMessage || error.message),
				});
				setIsLoading(false);
			},
		},
	});

	const { data: tradeDetail } = useGetTradeDetail(TradeID!);

	useEffect(() => {
		if (tradeDetail && tradeDetail.code === 200) {
			setTradeInfo(tradeDetail.data);
		}
	}, [tradeDetail]);

	useEffect(() => {
		if (result.data) {
			const getData = result.data.map((item) => item.result);
			form.setValue("allowance", getData[0]!.toString());
			form.setValue("tokenAmount", formatEther(getData[1]!));
		}
	}, [result.data]);

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			allowance: "",
			tokenAmount: "",
		},
	});
	// approve method
	const approveToken = () => {
		writeContract({
			abi: erc20Abi,
			address: erc20Address,
			functionName: "approve",
			args: [carbonTraderAddress, parseEther(String(tradeInfo!.PriceOfUnit))],
		});
	};

	function makeADeal() {
		setIsLoading(true);
		writeContract({
			abi: carbonTraderAbi,
			address: carbonTraderAddress,
			functionName: "makeADeal",
			args: [BigInt(TradeID)],
		});
	}

	const router = useRouter();

	return (
		<div className="relative flex flex-col p-10 m-5 bg-[#242731] rounded-[6px] overflow-auto">
			{/* {isLoading && <Loader />} */}
			<div className="flex items-center">
				<Icon.back
					className="h-10 w-10 hover:scale-110 transition-all cursor-pointer"
					onClick={() => router.back()}
				/>
				<h1 className="text-[--basic-text] text-xl font-bold">
					{tradeInfo?.Seller}
				</h1>
			</div>

			<div className="bg-[#353945] flex flex-col gap-2 mt-5 rounded-[6px]">
				<div className="grid grid-cols-2 gap-2 p-5 text-[--secondry-text] text-sm">
					{tradeInfo && (
						<>
							<div className="flex flex-col justify-between ">
								<span className="text-[#FFFFFF] text-xl mb-2">Amount:</span>
								<span>{tradeInfo.Amount}</span>
							</div>
							<div className="flex flex-col justify-between">
								<span className="text-[#FFFFFF] text-xl mb-2">
									Price of Unit:
								</span>
								<span>{tradeInfo.PriceOfUnit}</span>
							</div>
							<div className="flex flex-col justify-between">
								<span className="text-[#FFFFFF] text-xl mb-2">Status:</span>
								<span>
									{tradeInfo?.Status === "1"
										? "Normal"
										: tradeInfo?.Status === "2"
										? "Finished"
										: "Take Down"}
								</span>
							</div>
							<div className="flex flex-col justify-between">
								<span className="text-[#FFFFFF] text-xl mb-2">
									Create Time:
								</span>
								<span>{calcTime(tradeInfo.CreateTime)}</span>
							</div>
							<div className="flex flex-col justify-between">
								<span className="text-[#FFFFFF] text-xl mb-2">
									Update Time:
								</span>
								<span>{calcTime(tradeInfo.UpdateTime)}</span>
							</div>
							<div className="flex flex-col justify-between">
								<span className="text-[#FFFFFF] text-xl mb-2">
									Transaction Hash:
								</span>
								<span>{tradeInfo.TransactionHash}</span>
							</div>
						</>
					)}
				</div>
			</div>
			{/* <div className="flex flex-col mt-5">
				<Form {...form}>
					<form className="w-full grid grid-cols-2">
						<FormField
							control={form.control}
							name="allowance"
							render={({ field }) => (
								<FormItem className="mb-5">
									<FormLabel className="text-[#FFFFFF] text-xl mb-2">
										Your Allowance
									</FormLabel>
									<FormControl>
										<Input
											disabled
											placeholder="Enter allowance"
											{...field}
											className="w-[70%] h-10 bg-[#242731] border-[1px] border-gray-200 rounded-[6px] text-[#FFFFFF] pl-2"
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="tokenAmount"
							render={({ field }) => (
								<FormItem className="mb-5">
									<FormLabel className="text-[#FFFFFF] text-xl mb-2">
										Balance Of Token
									</FormLabel>
									<FormControl>
										<Input
											disabled
											placeholder="Enter balance number"
											{...field}
											className="w-[70%] h-10 bg-[#242731] border-[1px] border-gray-200 rounded-[6px] text-[#FFFFFF] pl-2"
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</form>
				</Form>
			</div> */}
			{/* <div className="w-full grid grid-cols-2 gap-2 mt-10">
				<Button
					className="w-1/3 bg-[--button-bg] text-[--basic-text] hover:bg-[--button-bg]"
					onClick={approveToken}
				>
					{isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
					Approve
				</Button>
				<Button
					className="w-1/3 bg-[--button-bg] text-[--basic-text] hover:bg-[--button-bg]"
					onClick={makeADeal}
				>
					Make A Deal
				</Button>
			</div> */}
		</div>
	);
};
export default TradingDetail;
