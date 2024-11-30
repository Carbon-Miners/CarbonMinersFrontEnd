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

import { useBidSubmit, useGetAuctionDetail } from "@/utils/react-query/userApi";
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
import { AuctionRsp } from "@/types";
import { formatEther, parseEther } from "viem";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { Icon } from "@/components/icon";

const formSchema = z.object({
	allowance: z.string({
		required_error: "allowance is required",
	}),
	tokenAmount: z.string({
		required_error: "tokenAmount is required",
	}),
	quantityOfAuction: z.string({
		required_error: "quantityOfAuction is required",
	}),
	pricePerUint: z.string({
		required_error: "pricePerUint is required",
	}),
	bidPassword: z.string({
		required_error: "bidPassword is required",
	}),
});

const TradingDetail = ({ params: { tradeID = "" } }) => {
	const { toast } = useToast();
	// const [isLoading, setIsLoading] = useState(false);
	const [auctionInfo, setAuctionInfo] = useState<AuctionRsp>();
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

	const { writeContract: approve, isSuccess: approveSuccess } =
		useWriteContract({
			mutation: {
				onSuccess: async (hash, variables) => {
					const listReceipt = await waitForTransactionReceipt(wagmiConfig, {
						hash,
					});
					if (listReceipt.status === "success") {
						toast({
							description: "Approved successfully!",
						});
					}
				},
				onError: (error) => {
					toast({
						description:
							"Error: " + ((error as BaseError).shortMessage || error.message),
					});
				},
			},
		});
	const { writeContract: deposit, isSuccess: depositSuccess } =
		useWriteContract({
			mutation: {
				onSuccess: async (hash, variables) => {
					const listReceipt = await waitForTransactionReceipt(wagmiConfig, {
						hash,
					});
					if (listReceipt.status === "success") {
						// toast({
						//   description: "Deposited successfully!",
						// });
						submitBid(hash);
						router.back();
					}
				},
				onError: (error) => {
					toast({
						description:
							"Error: " + ((error as BaseError).shortMessage || error.message),
					});
				},
			},
		});

	const { data: auctionDetail } = useGetAuctionDetail(tradeID!);

	useEffect(() => {
		if (auctionDetail && auctionDetail.code === 200) {
			setAuctionInfo(auctionDetail.data);
		}
	}, [auctionDetail]);

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
		approve({
			abi: erc20Abi,
			address: erc20Address,
			functionName: "approve",
			args: [carbonTraderAddress, parseEther(form.getValues().pricePerUint)],
		});
	};
	// deposit method
	const depositToken = async () => {
		const getFormValues = form.getValues();
		const params = {
			publicKey: addressConnect!,
			quantityOfAuction: getFormValues.quantityOfAuction,
			pricePerUint: getFormValues.pricePerUint,
		};
		const encryptInfo = encrypt(
			JSON.stringify(params),
			getFormValues.bidPassword
		);
		deposit({
			abi: carbonTraderAbi,
			address: carbonTraderAddress,
			functionName: "deposit",
			args: [
				BigInt(tradeID),
				parseEther(form.getValues().pricePerUint),
				encryptInfo,
			],
		});
	};

	// 竞拍提交
	const submitBid = async (hash: string) => {
		const getFormValues = form.getValues();
		const params = {
			publicKey: addressConnect!,
			quantityOfAuction: getFormValues.quantityOfAuction,
			pricePerUint: getFormValues.pricePerUint,
		};
		const encryptInfo = encrypt(
			JSON.stringify(params),
			getFormValues.bidPassword
		);
		const result = await startBid({
			publicKey: addressConnect!,
			auctionID: tradeID,
			hash: hash,
			biddingMsg: encryptInfo,
		});
		if (result) {
			toast({
				description: "Deposited and Bid successfully!",
			});
		}
	};

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
					{auctionInfo?.seller}
				</h1>
			</div>

			<div className="bg-[#353945] flex flex-col gap-2 mt-5 rounded-[6px]">
				<div className="grid grid-cols-2 gap-2 p-5 text-[--secondry-text] text-sm">
					{auctionInfo && (
						<>
							<div className="flex flex-col justify-between ">
								<span className="text-[#FFFFFF] text-xl mb-2">
									Sell Amount:
								</span>
								<span>{auctionInfo.sellAmount}</span>
							</div>
							<div className="flex flex-col justify-between">
								<span className="text-[#FFFFFF] text-xl mb-2">
									Min Bid Amount:
								</span>
								<span>{auctionInfo.minimumBidAmount}</span>
							</div>
							<div className="flex flex-col justify-between">
								<span className="text-[#FFFFFF] text-xl mb-2">
									Init Price Unit:
								</span>
								<span>{auctionInfo.initPriceUnit}</span>
							</div>
							<div className="flex flex-col justify-between">
								<span className="text-[#FFFFFF] text-xl mb-2">Start Time:</span>
								<span>{calcTime(auctionInfo.startTime)}</span>
							</div>
							<div className="flex flex-col justify-between">
								<span className="text-[#FFFFFF] text-xl mb-2">End Time:</span>
								<span>{calcTime(auctionInfo.endTime)}</span>
							</div>
							<div className="flex flex-col justify-between">
								<span className="text-[#FFFFFF] text-xl mb-2">
									Transaction Hash:
								</span>
								<span>{auctionInfo.transactionHash}</span>
							</div>
						</>
					)}
				</div>
			</div>
			<div className="flex flex-col mt-5">
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
						<FormField
							control={form.control}
							name="quantityOfAuction"
							render={({ field }) => (
								<FormItem className="mb-5">
									<FormLabel className="text-[#FFFFFF] text-xl mb-2">
										Quantity for Auction
									</FormLabel>
									<FormControl>
										<Input
											placeholder="Enter Quantity for Auction"
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
							name="pricePerUint"
							render={({ field }) => (
								<FormItem className="mb-5">
									<FormLabel className="text-[#FFFFFF] text-xl mb-2">
										Price per Unit
									</FormLabel>
									<FormControl>
										<Input
											placeholder="Enter Price per Unit"
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
							name="bidPassword"
							render={({ field }) => (
								<FormItem>
									<FormLabel className="text-[#FFFFFF] text-xl mb-2">
										Auction Password
									</FormLabel>
									<FormControl>
										<Input
											type="password"
											placeholder="Set An Auction Password"
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
			</div>
			<div className="w-full grid grid-cols-2 gap-2 mt-10">
				<Button
					className="w-1/3 bg-[--button-bg] text-[--basic-text] hover:bg-[--button-bg]"
					onClick={approveToken}
				>
					Approve
				</Button>
				<Button
					className="w-1/3 bg-[--button-bg] text-[--basic-text] hover:bg-[--button-bg]"
					onClick={depositToken}
				>
					Deposit
				</Button>
			</div>
		</div>
	);
};
export default TradingDetail;
