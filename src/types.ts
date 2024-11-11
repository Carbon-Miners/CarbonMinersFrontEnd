export interface IMenuItem {
  path: string;
  icon?: JSX.Element;
  title: string;
}

export interface IMenu {
  menuList: IMenuItem[]
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