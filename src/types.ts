export interface IMenuItem {
  path: string;
  icon?: JSX.Element;
  title: string;
}

export interface IMenu {
  menuList: IMenuItem[]
}

export interface ICompanyInfo {
  companyName: string,
  registrationNumber: string,
  companyRepresentative: string,
  companyAddress: string,
  contactEmail: string,
  contactNumber: string,
  emissionData: string,
  reductionStrategy: string,
  status: string
}

export interface ICompanyReport {
  id: number,
  publicKey: string,
  reportID: string,
  report: string,
  reportStatus: string,
  reportTime: string
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
  "FINISHED"
}

export interface IQueryResponse<T> {
  code: number;
  data: T;
  message: string;
};

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
  id: string,
  publicKey: string,
  reportID: string,
  penaltyID: string,
  status: string,
  companyMsg: string,
  extra_msg: string,
  createTime: string
}

export enum StatusEnum {
  "UNHANDLE" = "0",
  "PASSED" = "1",
  "REJECTED" = "2"
}