"use client";

import { ComingSoon } from "@/components/ComingSoon";
import ListCard from "@/components/CompanyManagement/ListCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CompanyEnum } from "@/types";
import { useGetCompanyList } from "@/utils/react-query/managerApi";
import { useState } from "react";

const ManagementPage = () => {
	const [tabDefault, setTabValue] = useState(CompanyEnum.SETTLED);
	const changeTab = (value: string) => {
		setTabValue(value as CompanyEnum);
	};

	const { data: companyList } = useGetCompanyList();

	return (
		<Tabs
			defaultValue={tabDefault}
			onValueChange={changeTab}
			className="w-full h-full flex flex-col"
		>
			<TabsList className="grid w-[220px] grid-cols-2">
				<TabsTrigger value="settled">公司列表</TabsTrigger>
				<TabsTrigger value="check">核查清缴</TabsTrigger>
			</TabsList>
			<TabsContent value="settled" className="flex-[1]">
				<div className="flex flex-wrap gap-4">
					{companyList &&
						companyList.data.map((item, index) => {
							return <ListCard key={item.id} cardInfo={item} index={index} />;
						})}
				</div>
			</TabsContent>
			<TabsContent value="check" className="flex-[1]">
				<ComingSoon />
			</TabsContent>
		</Tabs>
	);
};
export default ManagementPage;
