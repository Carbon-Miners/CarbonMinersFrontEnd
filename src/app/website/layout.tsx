"use client"

import AsideComponent from "@/components/SiteAside/SiteAside";
import { useAccount } from "wagmi";
import { formatAddress } from "@/utils";
import { useEffect, useState } from "react";
const menuList = [
  {
    title: "企业管理",
    path: "/website",
  },
  {
    title: "交易中心",
    path: "/website/trading-market",
  },
  {
    title: "数据中心",
    path: "/website/data-center",
  },
  // {
  //   title: "监管处罚",
  //   path: "/website/supervise-page",
  // }
]

const websiteLayout = ({ children }: { children: React.ReactNode }) => {

  const { address } = useAccount();
  const [clientAddress, setClientAddress] = useState<`0x${string}` | undefined>(undefined);

  useEffect(() => {
    setClientAddress(address);
  }, [address]);

  return (
    <div className="flex h-screen">
      <div className="flex-[1]">
        <AsideComponent menuList={menuList} />
      </div>
      <div className="flex-[4] p-4 flex flex-col overflow-y-hidden">
        <div className="w-full flex justify-end">
          <div className='min-w-[149px] h-[40px] px-4 rounded-[16px] bg-[--button-bg] text-[--basic-text] flex justify-center items-center font-bold cursor-pointer'>
            {clientAddress ? formatAddress(clientAddress) : "Loading..."}
          </div>
        </div>
        <div className="flex-[1]">
          {children}
        </div>
      </div>
    </div>
  )
}

export default websiteLayout
