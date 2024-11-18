"use client"

import AsideComponent from "@/components/SiteAside/SiteAside";
import { useAccount, useDisconnect } from "wagmi";
import { formatAddress } from "@/utils";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
const menuList = [
  {
    title: "企业管理",
    path: "/manage",
  },
  {
    title: "监管处罚",
    path: "/manage/supervise-page",
  }
]

const websiteLayout = ({ children }: { children: React.ReactNode }) => {

  const { address } = useAccount();
  const router = useRouter();
  const { disconnect } = useDisconnect();
  const [clientAddress, setClientAddress] = useState<`0x${string}` | undefined>(undefined);

  useEffect(() => {
    setClientAddress(address);
  }, [address]);

  const exitSystem = () => {
    disconnect();
    router.push('/');
  }

  return (
    <div className="flex h-screen">
      <div className="flex-[1]">
        <AsideComponent menuList={menuList} />
      </div>
      <div className="flex-[4] p-4 flex flex-col overflow-y-hidden">
        <div className="w-full flex justify-end">
          <div className='min-w-[149px] h-[40px] px-4 rounded-[16px] bg-[--button-bg] text-[--basic-text] flex justify-center items-center font-bold cursor-pointer' onClick={exitSystem}>
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
