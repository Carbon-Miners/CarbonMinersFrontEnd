"use client"
import { IMenu } from "@/types";
import MenuItem from "./Menu";
// import { formatAddress } from "@/utils";
// import { useDisconnect, useAccount } from "wagmi";

const SideBar = ({ menuList }: IMenu) => {
  // const { address } = useAccount();

  return (
    <div className="p-[20px] h-full border-solid border-r border-[--split-line]">
      <div className="flex flex-col gap-4">
        {/* <div className="flex flex-col gap-1">
          <div className="text-[--basic-text] font-bold">CarbonTrader</div>
          <div className="text-[--secondry-text] font-bold">{formatAddress(address)}</div>
        </div> */}
        <div className="text-[--basic-text] text-2xl font-bold">CarbonTrader</div>

        {menuList.map((item) => (
          <MenuItem item={item} key={item.title} />
        ))}
      </div>
    </div>
  )
}

export default SideBar;