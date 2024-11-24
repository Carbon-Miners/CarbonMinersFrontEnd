"use client";

import AsideComponent from "@/components/SiteAside/SiteAside";
import { useAccount, useDisconnect } from "wagmi";
import { formatAddress } from "@/utils";
import { useEffect, useState } from "react";
import useStore from "@/store/index";
import { useRouter } from "next/navigation";

const menuList = [
	{
		title: "企业管理",
		path: "/website",
	},
	{
		title: "拍卖中心",
		path: "/website/auction-market",
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
];

const WebsiteLayout = ({ children }: { children: React.ReactNode }) => {
	const router = useRouter();
	const { address } = useAccount();
	const { disconnect } = useDisconnect();
	const setAddr = useStore((state) => state.setAddr);
	const [clientAddress, setClientAddress] = useState<`0x${string}` | undefined>(
		undefined
	);
	const exitSystem = () => {
		disconnect();
		router.push("/");
	};

	useEffect(() => {
		setClientAddress(address);
		setAddr(address!);
	}, [address]);

	return (
		<div className="flex h-screen">
			<div className="flex-[1]">
				<AsideComponent menuList={menuList} />
			</div>
			<div className="flex-[4] p-4 flex flex-col">
				<div className="w-full flex justify-end">
					<div
						className="min-w-[149px] h-[40px] px-4 rounded-[16px] bg-[--button-bg] text-[--basic-text] flex justify-center items-center font-bold cursor-pointer"
						onClick={exitSystem}
					>
						{clientAddress ? formatAddress(clientAddress) : "Loading..."}
					</div>
				</div>
				<div className="flex-1">{children}</div>
			</div>
		</div>
	);
};

export default WebsiteLayout;
