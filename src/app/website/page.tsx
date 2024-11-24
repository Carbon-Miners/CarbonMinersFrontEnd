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
	// const [showApply, setShowApply] = useState(true);

	const [tabDefault, setTabValue] = useState(CompanyEnum.INFOS);

	useEffect(() => {
		if (
			companyData &&
			companyData.code === 200 &&
			companyData.data.companyMsg
		) {
			const companyObj = JSON.parse(companyData.data.companyMsg);
			// setShowApply(false);
			setCompanyInfo({
				...companyObj,
				status: companyData.data.status,
			});
		}
	}, [companyData]);

	// useEffect(() => {
	// 	if (companyInfo) {
	// 		if (companyInfo.status === StatusEnum.PASSED) {
	// 			setTabValue(CompanyEnum.INFOS);
	// 		} else {
	// 			setTabValue(CompanyEnum.SETTLED);
	// 		}
	// 	}
	// }, [companyInfo]);

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
				{!companyInfo && <TabsTrigger value="settled">Apply</TabsTrigger>}
				<TabsTrigger value="infos">Infos</TabsTrigger>
				<TabsTrigger value="apply">Allowance</TabsTrigger>
				<TabsTrigger value="upload">Report</TabsTrigger>
				<TabsTrigger value="check">Check</TabsTrigger>
			</TabsList>
			{!companyInfo && (
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
