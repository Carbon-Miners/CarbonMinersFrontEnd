import {
	Bolt,
	ChartArea,
	ChevronLeft,
	Inbox,
	LucideIcon,
	Receipt,
	ShoppingBag,
	ShoppingCart,
} from "lucide-react";

export const Icon: Record<string, LucideIcon> = {
	back: ChevronLeft,
	inBox: Inbox,
	companyManagement: Bolt,
	auctionCenter: ShoppingCart,
	tradingCenter: ShoppingBag,
	dataCenter: ChartArea,
	supervision_punishment: Receipt,
};
