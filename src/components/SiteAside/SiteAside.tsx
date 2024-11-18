"use client"
import { IMenu } from "@/types";
import MenuItem from "./Menu";


const SideBar = ({ menuList }: IMenu) => {

  return (
    <div className="p-[20px] h-full border-solid border-r border-[--split-line]">
      <div className="flex flex-col gap-4">
        <div className="text-[--basic-text] text-2xl font-bold">CarbonTrader</div>
        {menuList.map((item) => (
          <MenuItem item={item} key={item.title} />
        ))}
      </div>
    </div>
  )
}

export default SideBar;