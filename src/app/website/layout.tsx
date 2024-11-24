"use client";

import AsideComponent from "@/components/SiteAside/SiteAside";
import { useAccount, useDisconnect } from "wagmi";
import { formatAddress } from "@/utils";
import { JSXElementConstructor, useEffect, useState } from "react";
import useStore from "@/store/index";
import { useRouter } from "next/navigation";
import { Icon } from "@/components/icon";
import { IMenuItem } from "@/types";

const menuList: IMenuItem[] = [
	{
		title: "Company Management",
		path: "/website",
		icon: Icon.companyManagement,
	},
	{
		title: "Auction Center",
		path: "/website/auction-market",
		icon: Icon.auctionCenter,
	},
	{
		title: "Trading Center",
		path: "/website/trading-market",
		icon: Icon.tradingCenter,
	},
	{
		title: "Data Center",
		path: "/website/data-center",
		icon: Icon.dataCenter,
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
