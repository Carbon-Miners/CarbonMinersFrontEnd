"use client"

import { useGetCompanyInfo, useGetReportInfo } from "@/utils/react-query/userApi";
import { Card, CardContent } from "../ui/card";
import useStore from "@/store";
import { useEffect, useState } from "react";
import { ICompanyInfo, ICompanyReport } from "@/types";
import { useReadContracts } from "wagmi";
import { carbonTraderAbi } from "~/carbonTrader";
import { carbonTraderAddress, erc20Address } from "@/config";
import { erc20Abi } from "~/erc20";
import { formatEther } from "viem";
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
        functionName: 'addressToAllowances',
        args: [addressConnect],
      },
      {
        address: carbonTraderAddress,
        abi: carbonTraderAbi,
        functionName: 'frozenAllowances',
        args: [addressConnect],
      },
      {
        address: erc20Address,
        abi: erc20Abi,
        functionName: 'balanceOf',
        args: [addressConnect!],
      }
    ]
  });

  useEffect(() => {
    if (result.data) {
      const getData = result.data.map(item => item.result!);
      setBalance(getData);
    }
  }, [result.data]);

  useEffect(() => {
    if (companyData && companyData.code === 200 && companyData.data.companyMsg) {
      const companyObj = JSON.parse(companyData.data.companyMsg);
      setCompanyInfo({
        ...companyObj,
        status: companyData.data.status
      });
    }
  }, [companyData]);
  useEffect(() => {
    if (reportData && reportData.code === 200) {
      setCompanyReport(reportData.data);
    }
  }, [reportData]);

  return (
    <Card>
      <CardContent className="flex flex-wrap justify-between gap-6 pt-3">
        <div className="flex flex-col gap-2 w-2/5">
          <h2 className="text-[--basic-text] text-lg font-bold">Company Profile</h2>
          <div className="flex flex-col gap-2 text-[--secondry-text] text-sm">
            {
              companyInfo &&
              <>
                <div className="flex justify-between">
                  <span>Company Name</span>
                  <span>{companyInfo!.companyName}</span>
                </div>
                <div className="flex justify-between">
                  <span>Registration Number</span>
                  <span>{companyInfo!.registrationNumber}</span>
                </div>
                <div className="flex justify-between">
                  <span>Company Representative</span>
                  <span>{companyInfo!.reductionStrategy}</span>
                </div>
                <div className="flex justify-between">
                  <span>Company Address</span>
                  <span>{companyInfo!.companyAddress}</span>
                </div>
                <div className="flex justify-between">
                  <span>Contact Email</span>
                  <span>{companyInfo!.contactEmail}</span>
                </div>
                <div className="flex justify-between">
                  <span>Contact Number</span>
                  <span>{companyInfo!.contactNumber}</span>
                </div>
              </>
            }
          </div>
        </div>
        <div className="flex flex-col gap-2 w-2/5">
          <h2 className="text-[--basic-text] text-lg font-bold">Carbon Emission Information</h2>
          <div className="flex flex-col gap-2 text-[--secondry-text] text-sm">
            {
              companyInfo &&
              <>
                <div className="flex justify-between">
                  <span>Emission Data</span>
                  <span>{companyInfo!.emissionData}</span>
                </div>
                <div className="flex justify-between">
                  <span>Reduction Strategy</span>
                  <span>{companyInfo!.reductionStrategy}</span>
                </div>
              </>
            }
          </div>
        </div>
        <div className="flex flex-col gap-2 w-2/5">
          <h2 className="text-[--basic-text] text-lg font-bold">Others</h2>
          <div className="flex flex-col gap-2 text-[--secondry-text] text-sm">
            <div className="flex justify-between">
              <span>Apply Status</span>
              <span>{companyInfo && companyInfo!.status}</span>
            </div>
            <div className="flex justify-between">
              <span>Allowance</span>
              <span>{balance && balance[0].toString()}</span>
            </div>
            <div className="flex justify-between">
              <span>Frozen Allowance</span>
              <span>{balance && balance[1].toString()}</span>
            </div>
            <div className="flex justify-between">
              <span>Balance Of Token</span>
              <span>{balance && formatEther(balance[2])}</span>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-2 w-2/5">
          <h2 className="text-[--basic-text] text-lg font-bold">Carbon Emission Report</h2>
          <div className="flex flex-col gap-2 text-[--secondry-text] text-sm">
            <div className="flex justify-between">
              <span>Emission Report</span>
              <span>{companyReport && companyReport.report}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
export default CompanyInformation;