"use client";

import {
	useGetCompanyInfo,
	useGetReportInfo,
} from "@/utils/react-query/userApi";
import { Card, CardContent, CardFooter, CardTitle } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { ICompanyInfo, ICompanyReport, StatusEnum } from "@/types";
import { Input } from "@/components/ui/input";
import { type BaseError, useReadContracts, useWriteContract } from "wagmi";
import { carbonTraderAbi } from "~/carbonTrader";
// import { erc20Abi } from "~/erc20";
import { carbonTraderAddress, erc20Address } from "@/config";
import { waitForTransactionReceipt } from "@wagmi/core";
// import { useState } from "react";
import { wagmiConfig } from "@/utils/wagmi-config";
import {
	useCheckEntry,
	useCheckPenaltyInfo,
} from "@/utils/react-query/managerApi";
import { useToast } from "@/hooks/use-toast";
import { Icon } from "@/components/icon";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

const CompanyDetail = ({ params: { id = "" } }) => {
	// const { addressConnect } = useStore();
	const { toast } = useToast();
	const [companyInfo, setCompanyInfo] = useState<ICompanyInfo>();
	const [companyReport, setCompanyReport] = useState("");
	const [allowance, setAllowance] = useState("");
	const [penalty, setPenalty] = useState("0");
	const [balance, setBalance] = useState<string[]>();
	const { data: companyData } = useGetCompanyInfo(id!);
	const { data: reportData } = useGetReportInfo(id!);
	const { mutateAsync: checkEntry } = useCheckEntry();
	const { mutateAsync: checkPenaltyInfo } = useCheckPenaltyInfo();
	const [isLoading, setIsLoading] = useState(false);

	const result = useReadContracts({
		contracts: [
			{
				address: carbonTraderAddress,
				abi: carbonTraderAbi,
				functionName: "addressToAllowances",
				args: [id as `0x${string}`],
			},
			{
				address: carbonTraderAddress,
				abi: carbonTraderAbi,
				functionName: "frozenAllowances",
				args: [id as `0x${string}`],
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
						description: "Issue Success！",
					});
					setIsLoading(false);
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
	const { writeContract: handlePlenalty } = useWriteContract({
		mutation: {
			onSuccess: async (hash, variables) => {
				const listReceipt = await waitForTransactionReceipt(wagmiConfig, {
					hash,
				});
				if (listReceipt.status === "success") {
					// toast({
					//   description: "Issue Success！",
					// });
					sendPlenty();
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

	useEffect(() => {
		if (result.data) {
			const getData = result.data.map((item) => item.result!.toString());
			setBalance(getData);
		}
	}, [result.data]);

	useEffect(() => {
		if (
			companyData &&
			companyData.code === 200 &&
			companyData.data.companyMsg
		) {
			const companyObj = JSON.parse(companyData.data.companyMsg);
			setCompanyInfo({
				...companyObj,
				status: companyData.data.status,
			});
		}
	}, [companyData]);
	useEffect(() => {
		if (reportData && reportData.code === 200) {
			setCompanyReport(reportData.data.report);
		}
	}, [reportData]);

	const handlePass = async (status: StatusEnum) => {
		const result = await checkEntry({ id: companyData!.data.id, status });
		if (result) {
			toast({
				description: "Handle Success!",
			});
		}
	};

	const sendPlenty = async () => {
		const reportStatus = Number(penalty) ? "2" : "1";
		const res = await checkPenaltyInfo({
			publicKey: id as `0x${string}`,
			reportID: reportData!.data.reportID,
			reportStatus: reportStatus,
			penalty: penalty,
		});
		if (res) {
			toast({
				description: "This review has been send to user.",
			});
		}
	};

	const punishCompany = () => {
		handlePlenalty({
			abi: carbonTraderAbi,
			address: carbonTraderAddress,
			functionName: "destoryAllAllowance",
			args: [id as `0x${string}`],
		});
	};

	const IssueAllowance = () => {
		// console.log(BigInt(allowance));
		setIsLoading(true);
		writeContract({
			abi: carbonTraderAbi,
			address: carbonTraderAddress,
			functionName: "issueAllowance",
			args: [id as `0x${string}`, BigInt(allowance)],
		});
	};

	const router = useRouter();

	return (
		<Card className="mt-3">
			<CardTitle className="m-3 flex items-center">
				<Icon.back
					className="h-10 w-10 hover:scale-110 transition-all cursor-pointer"
					onClick={() => router.back()}
				/>
				<span>Company Detail</span>
			</CardTitle>
			<div className="flex flex-col">
				<div className="relative flex flex-col pt-5 px-10 pb-10 m-5 bg-[#242731] rounded-[6px] overflow-auto">
					<h2 className="text-[#FFFFFF] text-xl mb-5 font-bold">
						Company Profile
					</h2>
					<div className="grid grid-cols-3 gap-2 text-[--secondry-text] text-sm">
						{companyInfo && (
							<>
								<div className="flex flex-col justify-between">
									<span className="text-[#E0E4E7] text-lg mb-2">
										Company Name
									</span>
									<span>{companyInfo!.companyName}</span>
								</div>
								<div className="flex flex-col justify-between">
									<span className="text-[#E0E4E7] text-lg mb-2">
										Registration Number
									</span>
									<span>{companyInfo!.registrationNumber}</span>
								</div>
								<div className="flex flex-col justify-between">
									<span className="text-[#E0E4E7] text-lg mb-2">
										Company Representative
									</span>
									<span>{companyInfo!.reductionStrategy}</span>
								</div>
								<div className="flex flex-col justify-between">
									<span className="text-[#E0E4E7] text-lg mb-2">
										Company Address
									</span>
									<span>{companyInfo!.companyAddress}</span>
								</div>
								<div className="flex flex-col justify-between">
									<span className="text-[#E0E4E7] text-lg mb-2">
										Contact Email
									</span>
									<span>{companyInfo!.contactEmail}</span>
								</div>
								<div className="flex flex-col justify-between">
									<span className="text-[#E0E4E7] text-lg mb-2">
										Contact Number
									</span>
									<span>{companyInfo!.contactNumber}</span>
								</div>
							</>
						)}
					</div>
				</div>
				<div className="relative flex flex-col pt-5 px-10 pb-10 m-5 bg-[#242731] rounded-[6px] overflow-auto">
					<h2 className="text-[#FFFFFF] text-xl mb-5 font-bold">
						Carbon Emission Information
					</h2>
					<div className="grid grid-cols-3 gap-2 text-[--secondry-text] text-sm">
						{companyInfo && (
							<>
								<div className="flex flex-col justify-between">
									<span className="text-[#E0E4E7] text-lg mb-2">
										Emission Data
									</span>
									<span>{companyInfo!.emissionData}</span>
								</div>
								<div className="flex flex-col justify-between">
									<span className="text-[#E0E4E7] text-lg mb-2">
										Reduction Strategy
									</span>
									<span>{companyInfo!.reductionStrategy}</span>
								</div>
							</>
						)}
					</div>
				</div>
				<div className="relative flex flex-col pt-5 px-10 pb-10 m-5 bg-[#242731] rounded-[6px] overflow-auto">
					<h2 className="text-[#FFFFFF] text-xl mb-5 font-bold">Others</h2>
					<div className="grid grid-cols-3 gap-2 text-[--secondry-text] text-sm">
						<div className="flex flex-col justify-between">
							<span className="text-[#E0E4E7] text-lg mb-2">Apply Status</span>
							<span>
								{companyInfo &&
									(companyInfo!.status === StatusEnum.PASSED
										? "Approved"
										: companyInfo!.status === StatusEnum.UNHANDLE
										? "Unapproved"
										: "Rejected")}
							</span>
						</div>
						<div className="flex flex-col justify-between">
							<span className="text-[#E0E4E7] text-lg mb-2">Allowance</span>
							<span>{balance && balance[0].toString()}</span>
						</div>
						<div className="flex flex-col justify-between">
							<span className="text-[#E0E4E7] text-lg mb-2">
								Frozen Allowance
							</span>
							<span>{balance && balance[1].toString()}</span>
						</div>
						<div className="flex flex-col justify-between">
							<span className="text-[#E0E4E7] text-lg mb-2">
								Issue More Allowance
							</span>
							{companyInfo && companyInfo.status === StatusEnum.PASSED && (
								<div className="flex gap-2">
									<Input
										className="w-[200px]"
										placeholder="Issue More Allowance"
										onChange={(e) => setAllowance(e.target.value)}
									/>
									<div
										className="cursor-pointer w-[100px] flex justify-center items-center bg-[--button-bg] text-center rounded-lg text-[--basic-text]"
										onClick={IssueAllowance}
									>
										{isLoading && (
											<Loader2 className="mr-2 h-4 w-4 animate-spin" />
										)}
										Issue
									</div>
								</div>
							)}
						</div>
					</div>
				</div>
				<div className="relative flex flex-col pt-5 px-10 pb-10 m-5 bg-[#242731] rounded-[6px] overflow-auto">
					<h2 className="text-[#FFFFFF] text-xl mb-5 font-bold">
						Carbon Emission Report
					</h2>
					<div className="grid grid-cols-3 gap-2 text-[--secondry-text] text-sm">
						<div className="flex flex-col justify-between">
							<span className="text-[#E0E4E7] text-lg mb-2">
								Emission Report
							</span>
							<span>{companyReport}</span>
						</div>
					</div>
				</div>
			</div>
			<CardFooter>
				{companyInfo && companyInfo!.status === StatusEnum.UNHANDLE && (
					<div className="flex gap-2">
						<div
							className="cursor-pointer w-[100px] h-[40px] flex justify-center items-center bg-[--button-bg] text-center rounded-lg text-[--basic-text]"
							onClick={() => handlePass(StatusEnum.PASSED)}
						>
							PASS
						</div>
						<div
							className="cursor-pointer w-[100px] h-[40px] flex justify-center items-center py-1 bg-[--button-bg] text-center rounded-lg text-[--basic-text]"
							onClick={() => handlePass(StatusEnum.REJECTED)}
						>
							REJECT
						</div>
					</div>
				)}
			</CardFooter>
		</Card>
	);
};
export default CompanyDetail;
