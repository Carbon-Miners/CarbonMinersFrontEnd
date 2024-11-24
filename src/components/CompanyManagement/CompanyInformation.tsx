"use client";

import {
	useGetCompanyInfo,
	useGetReportInfo,
} from "@/utils/react-query/userApi";
import { Card, CardContent } from "../ui/card";
import useStore from "@/store";
import { useEffect, useState } from "react";
import { ICompanyInfo, ICompanyReport, StatusEnum } from "@/types";
import { useReadContracts } from "wagmi";
import { carbonTraderAbi } from "~/carbonTrader";
import { carbonTraderAddress, erc20Address } from "@/config";
import { erc20Abi } from "~/erc20";
import { formatEther } from "viem";
import { EmptyPage } from "../EmptyPage";
// import { waitForTransactionReceipt } from "@wagmi/core";
// import { wagmiConfig } from "@/utils/wagmi-config";

const CompanyInformation = () => {
	const { addressConnect } = useStore();
	const [companyInfo, setCompanyInfo] = useState<ICompanyInfo>();
	const [companyReport, setCompanyReport] = useState<ICompanyReport>();
	const [balance, setBalance] = useState<bigint[]>();
	const { data: companyData } = useGetCompanyInfo(addressConnect!);
	const { data: reportData } = useGetReportInfo(addressConnect!);

	const result = useReadContracts({
		contracts: [
			{
				address: carbonTraderAddress,
				abi: carbonTraderAbi,
				functionName: "addressToAllowances",
				args: [addressConnect],
			},
			{
				address: carbonTraderAddress,
				abi: carbonTraderAbi,
				functionName: "frozenAllowances",
				args: [addressConnect],
			},
			{
				address: erc20Address,
				abi: erc20Abi,
				functionName: "balanceOf",
				args: [addressConnect!],
			},
		],
	});

	useEffect(() => {
		if (result.data) {
			const getData = result.data.map((item) => item.result!);
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
			setCompanyReport(reportData.data);
		}
	}, [reportData]);

	return (
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
							Balance Of Token
						</span>
						<span>{balance && formatEther(balance[2])}</span>
					</div>
				</div>
			</div>
			<div className="relative flex flex-col pt-5 px-10 pb-10 m-5 bg-[#242731] rounded-[6px] overflow-auto">
				<h2 className="text-[#FFFFFF] text-xl mb-5 font-bold">
					Carbon Emission Report
				</h2>
				<div className="grid  gap-2 text-[--secondry-text] text-sm">
					<div className="flex flex-col justify-between">
						<span className="text-[#E0E4E7] text-lg mb-2">Emission Report</span>
						{companyReport && companyReport.report ? (
							<span>{companyReport && companyReport.report}</span>
						) : (
							<EmptyPage />
						)}
					</div>
				</div>
			</div>
		</div>
	);
};
export default CompanyInformation;
