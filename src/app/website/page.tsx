"use client"

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"

import ApplyForm from "@/components/CompanyManagement/ApplyForm";
import CompanyInformation from "@/components/CompanyManagement/CompanyInformation";
import { useState } from "react";
import { CompanyEnum } from "@/types";
import { Upload } from "lucide-react";
import UploadReport from "@/components/CompanyManagement/UploadReport";

const CompanyManage = () => {

  const [tabDefault, setTabValue] = useState(CompanyEnum.SETTLED);
  const changeTab = (value: string) => {
    setTabValue(value as CompanyEnum);
  }

  return (
    <Tabs defaultValue={tabDefault} onValueChange={changeTab} className="w-full h-full flex flex-col">
      <TabsList className="grid w-[420px] grid-cols-5">
        <TabsTrigger value="settled">申请入驻</TabsTrigger>
        <TabsTrigger value="infos">公司信息</TabsTrigger>
        <TabsTrigger value="apply">额度申请</TabsTrigger>
        <TabsTrigger value="upload">提交报告</TabsTrigger>
        <TabsTrigger value="check">核查清缴</TabsTrigger>
      </TabsList>
      <TabsContent value="settled" className="flex-[1]">
        <ApplyForm setTabValue={changeTab} />
      </TabsContent>
      <TabsContent value="infos" className="flex-[1]">
        <CompanyInformation />
      </TabsContent>
      <TabsContent value="apply" className="flex-[1]">
        额度申请
      </TabsContent>
      <TabsContent value="upload" className="flex-[1]">
        <UploadReport />
      </TabsContent>
      <TabsContent value="check" className="flex-[1]">
        核查清缴
      </TabsContent>
    </Tabs>
  )
}

export default CompanyManage