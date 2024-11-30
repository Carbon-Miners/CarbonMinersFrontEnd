"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import {
	useBidUpdate,
	useGetAuctionDetail,
	useGetBidDetails,
} from "@/utils/react-query/userApi";
import { useEffect, useState } from "react";
import { AuctionRsp, IBidCard } from "@/types";
import { calcTime, decrypt } from "@/utils";
import { useWriteContract, type BaseError } from "wagmi";
import { waitForTransactionReceipt } from "@wagmi/core";
import { wagmiConfig } from "@/utils/wagmi-config";
import { useToast } from "@/hooks/use-toast";
import { carbonTraderAbi } from "~/carbonTrader";
import { carbonTraderAddress, erc20Address } from "@/config";
import { Loader2 } from "lucide-react";
import { erc20Abi } from "~/erc20";
import { parseEther } from "viem";
// import { readContract } from "@wagmi/core";
import { useRouter } from "next/navigation";
import { Icon } from "@/components/icon";
// import { mockAuctionDetail, mockBidList } from "@/lib/mockData";

const formSchema = z.object({
	bidPassword: z.string({
		required_error: "bidPassword is required",
	}),
});

const BidDetails = ({ params: { bidID = "" } }) => {
	const router = useRouter();
	const [openLoading, setOpenLoading] = useState(false);
	const [approveLoading, setApproveLoading] = useState(false);
	const [depositLoading, setDepositLoading] = useState(false);
	const [bidId, auctionId] = bidID.split("-");
	const { toast } = useToast();
	const { mutateAsync: bidUpdate } = useBidUpdate();
	const { mutateAsync: updateBid } = useBidUpdate();
	const [bidDetail, setBidDetail] = useState<IBidCard>({} as IBidCard);
	const [auctionDetail, setAuctionDetail] = useState<AuctionRsp>(
		{} as AuctionRsp
	);
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
	});

	const { writeContract: setBidSecret, isSuccess } = useWriteContract({
		mutation: {
			onSuccess: async (hash, variables) => {
				const listReceipt = await waitForTransactionReceipt(wagmiConfig, {
					hash,
				});
				if (listReceipt.status === "success") {
					submitBidSecret(hash);
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
						setApproveLoading(false);
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
	const { writeContract: finalize, isSuccess: finalizeSuccess } =
		useWriteContract({
			mutation: {
				onSuccess: async (hash, variables) => {
					const listReceipt = await waitForTransactionReceipt(wagmiConfig, {
						hash,
					});
					if (listReceipt.status === "success") {
						updateBidInfo(hash);
					}
				},
				onError: (error) => {
					toast({
						description:
							"Error: " + ((error as BaseError).shortMessage || error.message),
					});
					setDepositLoading(false);
				},
			},
		});

	const { data: bidData } = useGetBidDetails(bidId);
	const { data: auctionData, refetch } = useGetAuctionDetail(auctionId);

	useEffect(() => {
		if (bidData) {
			setBidDetail(bidData.data);
		}
	}, [bidData]);
	useEffect(() => {
		if (auctionData) {
			setAuctionDetail(auctionData.data);
		}
	}, [auctionData]);

	const openBid = (data: z.infer<typeof formSchema>) => {
		setOpenLoading(true);
		setBidSecret({
			abi: carbonTraderAbi,
			address: carbonTraderAddress,
			functionName: "setBidSecret",
			args: [BigInt(bidDetail.auctionID), data.bidPassword],
		});
	};

	const submitBidSecret = async (hash: string) => {
		const getFormValues = form.getValues();
		const res = await bidUpdate({
			biddingID: bidId,
			biddingMsg: decrypt(bidDetail.biddingMsg, getFormValues.bidPassword),
			hash: hash,
			status: "2",
		});
		if (res) {
			setOpenLoading(false);
			toast({
				description: "Bid open successfully!",
			});
		}
	};

	const approveToken = async () => {
		setApproveLoading(true);
		approve({
			abi: erc20Abi,
			address: erc20Address,
			functionName: "approve",
			args: [
				carbonTraderAddress,
				parseEther(String(bidDetail.additionalAmountToPay)),
			],
		});
	};

	const finalizeAuction = () => {
		setDepositLoading(true);
		finalize({
			abi: carbonTraderAbi,
			address: carbonTraderAddress,
			functionName: "finalizeAuctionAndTransferCarbon",
			args: [
				BigInt(bidDetail.auctionID),
				parseEther(String(bidDetail.additionalAmountToPay)),
			],
		});
	};

	const updateBidInfo = async (hash: string) => {
		const res = await updateBid({
			biddingID: bidId,
			hash: hash,
			status: "5",
		});
		if (res) {
			toast({
				description: "finalize successfully!",
			});
			router.push("/website/auction-market");
		}
	};

	const judgeComponent = (status: string) => {
		switch (status) {
			case "0":
				return (
					<div className="flex flex-col justify-between">
						<span className="text-[#FFFFFF] text-xl mb-2">Status:</span>
						<span className="text-[--secondry-text]">Not Start</span>
					</div>
				);
			case "1":
				return (
					<Form {...form}>
						<form
							onSubmit={form.handleSubmit(openBid)}
							className="space-y-2 w-full flex flex-col gap-2"
						>
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
												className="w-[50%] h-10 bg-[#242731] border-[1px] border-gray-200 rounded-[6px] text-[#FFFFFF] pl-2"
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<div className="w-full flex justify-start">
								<Button
									type="submit"
									className="bg-[--button-bg] text-[--basic-text] hover:bg-[--button-bg]"
								>
									{
										openLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />
									}
									Open Bid
								</Button>
							</div>
						</form>
					</Form>
				);
			case "2":
				return (
					<div className="flex flex-col justify-between">
						<span className="text-[#FFFFFF] text-xl mb-2">Status:</span>
						<span className="text-[--secondry-text]">Bid Opening...</span>
					</div>
				);
			case "3":
				return (
					<div className="w-full flex flex-col gap-4">
						<div className="flex flex-col justify-between">
							<span className="text-[#FFFFFF] text-xl mb-2">
								Number of Awards:
							</span>
							<span className="text-[--secondry-text]">
								{bidDetail.allocateAmount}
							</span>
						</div>
						<div className="flex gap-4 justify-start">
							<div
								className="cursor-pointer px-4 h-[40px] flex justify-center items-center bg-[--button-bg] text-center rounded-lg text-[--basic-text]"
								onClick={approveToken}
							>
								{
									approveLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />
								}
								Approve
							</div>
							<div
								className="cursor-pointer px-4 h-[40px] flex justify-center items-center py-1 bg-[--button-bg] text-center rounded-lg text-[--basic-text]"
								onClick={finalizeAuction}
							>
								{
									depositLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />
								}
								Finalize Auction
							</div>
						</div>
					</div>
				);
			case "4":
				return (
					<div className="flex flex-col justify-between">
						<span className="text-[#FFFFFF] text-xl mb-2">Status:</span>
						<span className="text-[--secondry-text]">Refunding...</span>
					</div>
				);
			case "5":
				return (
					<div className="flex flex-col justify-between">
						<span className="text-[#FFFFFF] text-xl mb-2">Status:</span>
						<span className="text-[--secondry-text]">End</span>
					</div>
				);
		}
	};

	return (
		<div className="relative flex flex-col p-10 m-5 bg-[#242731] rounded-[6px] overflow-auto">
			{/* {isLoading && <Loader />} */}
			<div className="flex items-center">
				<Icon.back
					className="h-10 w-10 hover:scale-110 transition-all cursor-pointer"
					onClick={() => router.back()}
				/>
				<h1 className="text-[--basic-text] text-2xl font-bold">
					Auction Detail
				</h1>
			</div>

			<div className="bg-[#353945] flex flex-col gap-2 mt-5 rounded-[6px]">
				<div className="grid grid-cols-2 gap-2 p-5 text-[--secondry-text] text-sm">
					{auctionDetail && (
						<>
							<div className="flex flex-col justify-between ">
								<span className="text-[#FFFFFF] text-xl mb-2">Seller:</span>
								<span> {auctionDetail?.seller}</span>
							</div>
							<div className="flex flex-col justify-between ">
								<span className="text-[#FFFFFF] text-xl mb-2">
									Sell Amount:
								</span>
								<span>{auctionDetail?.sellAmount}</span>
							</div>
							<div className="flex flex-col justify-between">
								<span className="text-[#FFFFFF] text-xl mb-2">
									Min Bid Amount:
								</span>
								<span>{auctionDetail?.minimumBidAmount}</span>
							</div>
							<div className="flex flex-col justify-between">
								<span className="text-[#FFFFFF] text-xl mb-2">
									Init Price Unit:
								</span>
								<span>{auctionDetail?.initPriceUnit}</span>
							</div>
							<div className="flex flex-col justify-between">
								<span className="text-[#FFFFFF] text-xl mb-2">Start Time:</span>
								<span>{calcTime(auctionDetail?.startTime)}</span>
							</div>
							<div className="flex flex-col justify-between">
								<span className="text-[#FFFFFF] text-xl mb-2">End Time:</span>
								<span>{calcTime(auctionDetail?.endTime)}</span>
							</div>
							<div className="flex flex-col justify-between">
								<span className="text-[#FFFFFF] text-xl mb-2">
									Transaction Hash:
								</span>
								<span>{auctionDetail?.transactionHash}</span>
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
			</div> */}
			<div className="flex flex-col gap-2 mt-5 rounded-[6px]">
				<h2 className="text-[--basic-text] text-2xl font-bold">
					Bid Information
				</h2>
				<div className="bg-[#353945] flex flex-col gap-2 mt-2 p-5 rounded-[6px]">
					{judgeComponent(bidDetail.biddingStatus)}
				</div>{" "}
			</div>
		</div>
	);
};
export default BidDetails;
