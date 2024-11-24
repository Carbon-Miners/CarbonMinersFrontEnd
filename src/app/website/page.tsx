"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import ApplyForm from "@/components/CompanyManagement/ApplyForm";
import CompanyInformation from "@/components/CompanyManagement/CompanyInformation";
import { useEffect, useState } from "react";
import { CompanyEnum, ICompanyInfo, StatusEnum } from "@/types";
import { Upload } from "lucide-react";
import UploadReport from "@/components/CompanyManagement/UploadReport";
import { ComingSoon } from "@/components/ComingSoon";
import useStore from "@/store";
import { useGetCompanyInfo } from "@/utils/react-query/userApi";

const CompanyManage = () => {
	const addressConnect = useStore((state) => state.addressConnect);
	const [companyInfo, setCompanyInfo] = useState<ICompanyInfo>();
	const { data: companyData } = useGetCompanyInfo(addressConnect!);

	const [tabDefault, setTabValue] = useState("");

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
		if (companyInfo) {
			if (companyInfo.status === StatusEnum.PASSED) {
				setTabValue(CompanyEnum.INFOS);
			} else {
				setTabValue(CompanyEnum.SETTLED);
			}
		}
	}, [companyInfo]);

	const changeTab = (value: string) => {
		setTabValue(value as CompanyEnum);
	};

	return (
		<Tabs
			value={tabDefault}
			onValueChange={changeTab}
			className="w-full h-full flex flex-col"
		>
			<TabsList
				className={`grid w-[420px] ${
					companyInfo?.status === StatusEnum.PASSED
						? "grid-cols-4"
						: "grid-cols-5"
				}`}
			>
				{companyInfo && companyInfo!.status !== StatusEnum.PASSED && (
					<TabsTrigger value="settled">申请入驻</TabsTrigger>
				)}
				<TabsTrigger value="infos">公司信息</TabsTrigger>
				<TabsTrigger value="apply">额度申请</TabsTrigger>
				<TabsTrigger value="upload">提交报告</TabsTrigger>
				<TabsTrigger value="check">核查清缴</TabsTrigger>
			</TabsList>
			{companyInfo && companyInfo!.status !== StatusEnum.PASSED && (
				<TabsContent value="settled" className="flex-[1]">
					<ApplyForm setTabValue={changeTab} />
				</TabsContent>
			)}
			<TabsContent value="infos" className="flex-[1]">
				<CompanyInformation />
			</TabsContent>
			<TabsContent value="apply" className="flex-[1]">
				<ComingSoon />
			</TabsContent>
			<TabsContent value="upload" className="flex-[1]">
				<UploadReport />
			</TabsContent>
			<TabsContent value="check" className="flex-[1]">
				<ComingSoon />
			</TabsContent>
		</Tabs>
	);
};

export default CompanyManage;
