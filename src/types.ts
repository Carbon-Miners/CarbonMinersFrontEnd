import { LucideIcon } from "lucide-react";

export interface IMenu {
	menuList: IMenuItem[];
}

export interface ICompanyInfo {
	companyName: string;
	registrationNumber: string;
	companyRepresentative: string;
	companyAddress: string;
	contactEmail: string;
	contactNumber: string;
	emissionData: string;
	reductionStrategy: string;
	status: string;
}

export interface ICompanyReport {
	id: number;
	publicKey: string;
	reportID: string;
	report: string;
	reportStatus: string;
	reportTime: string;
}

export interface ITradingCard {
	id: string;
	seller: string;
	tradeID: string;
	sellAmount: string;
	minimumBidAmount: string;
	initPriceUnit: string;
	status: string;
	startTime: string;
	endTime: string;
	transactionHash: string;
}

export interface IBidCard {
	id: string;
	buyer: string;
	auctionID: string;
	biddingID: string;
	biddingMsg: string;
	biddingStatus: string;
	allocateAmount: number;
	additionalAmountToPay: number;
	biddingTime: string;
	hash: string;
}

export enum BidEnum {
	"AWAIT START",
	"AWAIT DECRYPT",
	"AWAIT OPEN",
	"AWAIT PAYMENT",
	"AWAIT REFUND",
	"FINISHED",
}

export interface IQueryResponse<T> {
	code: number;
	data: T;
	message: string;
}

// export interface IQueryAuctions<T> extends IQueryResponse {
//   data: T[];
// };

export type AuctionRsp = {
	id: number;
	seller: string;
	tradeID: string;
	sellAmount: number;
	minimumBidAmount: number;
	initPriceUnit: number;
	status: string;
	startTime: string;
	endTime: string;
	transactionHash: string;
};

// export type BidRsp = {
//   id: string;
//   buyer: string;
//   auctionID: string;
//   biddingID: string;
//   biddingMsg: string;
//   biddingStatus: string;
//   allocateAmount: number;
//   additionalAmountToPay: number;
//   biddingTime: string;
//   hash: string;
// };
export enum CompanyEnum {
	"SETTLED" = "settled",
	"INFOS" = "infos",
	"APPLY" = "apply",
	"UPLOAD" = "upload",
	"CHECK" = "check",
}

export interface ICompanyCard {
	id: string;
	publicKey: string;
	reportID: string;
	penaltyID: string;
	status: string;
	companyMsg: string;
	extra_msg: string;
	createTime: string;
}

export enum StatusEnum {
	"UNHANDLE" = "0",
	"PASSED" = "1",
	"REJECTED" = "2",
}

/**
 * 开始交易
 */
export interface ITradeStart {
	publicKey: string;
	amount: number;
	priceOfUint: number;
	hash: string;
}

/**
 * 交易列表
 */
export interface ITradeList {
	id: string;
	seller: string;
	tradeID: string;
	sellAmount: number;
	minimumBidAmount: number;
	initPriceUnit: number;
	status: string;
	startTime: string;
	endTime: string;
	transactionHash: string;
}

/**
 * 交易详情
 */
export interface ITradeDetail {
	id: string;
	seller: string;
	tradeID: string;
	sellAmount: number;
	minimumBidAmount: number;
	initPriceUnit: number;
	status: string;
	startTime: string;
	endTime: string;
	transactionHash: string;
}

/**
 * 更新交易
 */
export interface ITradeUpdate {
	tradeID: number;
	buyer: string;
	amount: number;
	priceOfUint: number;
	status: number;
	hash: string;
}

export interface IMenuItem {
	title: string;
	path: string;
	icon?: LucideIcon; // 定义图标类型为 Lucide 提供的组件类型
}
