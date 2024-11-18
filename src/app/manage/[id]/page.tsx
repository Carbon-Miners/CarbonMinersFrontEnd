"use client"

import { useGetCompanyInfo, useGetReportInfo } from "@/utils/react-query/userApi";
import { Card, CardContent } from "@/components/ui/card";
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
import { useCheckEntry, useCheckPenaltyInfo } from "@/utils/react-query/managerApi";
import { useToast } from "@/hooks/use-toast";


const companyDetail = ({ params: { id = '' } }) => {

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

  const result = useReadContracts({
    contracts: [
      {
        address: carbonTraderAddress,
        abi: carbonTraderAbi,
        functionName: 'addressToAllowances',
        args: [id as `0x${string}`],
      },
      {
        address: carbonTraderAddress,
        abi: carbonTraderAbi,
        functionName: 'frozenAllowances',
        args: [id as `0x${string}`],
      }
    ]
  });
  const { writeContract } = useWriteContract({
    mutation: {
      onSuccess: async (hash, variables) => {
        const listReceipt = await waitForTransactionReceipt(wagmiConfig,
          { hash });
        if (listReceipt.status === "success") {
          toast({
            description: "Issue Success！",
          });
        }
      },
      onError: (error) => {
        toast({
          description: "Error: " + ((error as BaseError).shortMessage || error.message)
        });
      }
    }
  })
  const { writeContract: handlePlenalty } = useWriteContract({
    mutation: {
      onSuccess: async (hash, variables) => {
        const listReceipt = await waitForTransactionReceipt(wagmiConfig,
          { hash });
        if (listReceipt.status === "success") {
          // toast({
          //   description: "Issue Success！",
          // });
          sendPlenty();
        }
      },
      onError: (error) => {
        toast({
          description: "Error: " + ((error as BaseError).shortMessage || error.message)
        });
      }
    }
  })



  useEffect(() => {
    if (result.data) {
      const getData = result.data.map(item => item.result!.toString());
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
      setCompanyReport(reportData.data.report);
    }
  }, [reportData]);

  const handlePass = async (status: StatusEnum) => {
    const result = await checkEntry({ id: companyData!.data.id, status });
    if (result) {
      toast({
        description: "Handle Success!"
      })
    }
  }

  const sendPlenty = async () => {
    const reportStatus = Number(penalty) ? "2" : "1";
    const res = await checkPenaltyInfo({
      publicKey: id as `0x${string}`,
      reportID: reportData!.data.reportID,
      reportStatus: reportStatus,
      penalty: penalty
    });
    if (res) {
      toast({
        description: "This review has been send to user."
      })
    }
  }

  const punishCompany = () => {
    handlePlenalty({
      abi: carbonTraderAbi,
      address: carbonTraderAddress,
      functionName: 'destoryAllAllowance',
      args: [id as `0x${string}`],
    });
  }

  const IssueAllowance = () => {
    // console.log(BigInt(allowance));
    writeContract({
      abi: carbonTraderAbi,
      address: carbonTraderAddress,
      functionName: 'issueAllowance',
      args: [id as `0x${string}`, BigInt(allowance)],
    })
  }

  return (
    <Card className="mt-3">
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
                {
                  companyInfo.status === StatusEnum.UNHANDLE
                  &&
                  <div className="flex gap-2">
                    <div className="cursor-pointer w-[100px] h-[40px] flex justify-center items-center bg-[--button-bg] text-center rounded-lg text-[--basic-text]" onClick={() => handlePass(StatusEnum.PASSED)}>PASS</div>
                    <div className="cursor-pointer w-[100px] h-[40px] flex justify-center items-center py-1 bg-[--button-bg] text-center rounded-lg text-[--basic-text]" onClick={() => handlePass(StatusEnum.REJECTED)}>REJECT</div>
                  </div>
                }

              </>
            }
          </div>
        </div>

        <div className="flex flex-col gap-2 w-2/5">
          <h2 className="text-[--basic-text] text-lg font-bold">Carbon Emission Report</h2>
          <div className="flex flex-col gap-2 text-[--secondry-text] text-sm">
            <div className="flex justify-between">
              <span>Emission Report</span>
              <span>{companyReport}</span>
            </div>
            {
              companyReport && <div className="flex gap-2">
                <Input className="w-[200px]" placeholder="If no penalty, please leave blank" onChange={(e) => setPenalty(e.target.value)} />
                <div className="cursor-pointer w-[150px] flex justify-center items-center bg-[--button-bg] text-center rounded-lg text-[--basic-text]" onClick={punishCompany}>Review And Punish</div>
              </div>
            }
          </div>
        </div>

        <div className="flex flex-col gap-2 w-2/5">
          <h2 className="text-[--basic-text] text-lg font-bold">Others</h2>
          <div className="flex flex-col gap-2 text-[--secondry-text] text-sm">
            <div className="flex justify-between">
              <span>Apply Status</span>
              <span>{companyInfo && companyInfo.status}</span>
            </div>
            <div className="flex justify-between">
              <span>Allowance</span>
              <span>{balance && balance[0]}</span>
            </div>
            <div className="flex justify-between">
              <span>Frozen Allowance</span>
              <span>{balance && balance[1]}</span>
            </div>
          </div>
          {
            companyInfo && companyInfo.status === StatusEnum.PASSED
            &&
            <div className="flex gap-2">
              <Input className="w-[200px]" placeholder="Issue More Allowance" onChange={(e) => setAllowance(e.target.value)} />
              <div className="cursor-pointer w-[100px] flex justify-center items-center bg-[--button-bg] text-center rounded-lg text-[--basic-text]" onClick={IssueAllowance}>Issue</div>
            </div>
          }
        </div>
      </CardContent>
    </Card>
  );
};
export default companyDetail;