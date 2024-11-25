export enum QUERY_KEYS {
	// COMPANY KEYS
	GET_COMPANY_INFO = "getCompanyInfo",
	GET_COMPANY_LIST = "getCompanyList",

	// AUCTION/BID KEYS
	GET_AUCTION_LIST = "getAuctionList",
	GET_BID_LIST = "getBidList",
	GET_BID_DETAILS = "getBidDetails",
	GET_MY_AUCTION = "getMyAuction",

	// REPORT KEYS
	GET_REPORT_INFO = "getReportInfo",

	// TRADE KEYS
	GET_TRADE_LIST = "getTradeList",
	GET_TRADE_DETAILS = "getTradeDetails",
	GET_MY_TRADE = "getMyTrade",
	GET_MY_PARTICIPATION = "getMyParticipation",
}

export enum QUERY_PATHS {
	// 企业管理-user
	COMPANY_INFO_PATH = "/api/user",
	COMPANY_APPLY_PATH = "/api/user/apply-entry",

	// 企业管理-manager
	COMPANY_LIST_PATH = "/api/user/list",
	COMPANY_CHECK_PATH = "/api/user/review-entry",

	//拍卖
	AUCTION_START_PATH = "/api/auction/start-auction",
	AUCTION_LIST_PATH = "/api/auction/list",
	AUCTION_DETAIL_PATH = "/api/auction",
	MY_AUCTION_PATH = "/api/auction/list/key",

	//竞拍
	BID_SUBMIT_PATH = "/api/bidding/submit-bidding",
	BID_LIST_PATH = "/api/bidding/key",
	BID_DETAILS_PATH = "/api/bidding/id",
	BID_UPDATE_PATH = "/api/bidding/update-bidding",

	// 交易
	TRADE_START_PATH = "/api/trade/start-trade",
	TRADE_LIST_PATH = "/api/trade/list",
	TRADE_DETAIL_PATH = "/api/trade",
	TRADE_UPDATE_PATH = "/api/trade/update-trade",
	MY_TRADE_PATH = "/api/trade/list/key",
	MY_PARTICIPATION_PATH = "/api/trade/list/buyer",

	//报告
	SUBMIT_REPORT_PATH = "/api/report/submit-report",
	REPORT_INFO_PATH = "/api/report",

	//惩罚
	PUNISH_INFO_PATH = "/api/penalty",
	PUNISH_USER_PATH = "/api/report/review-report",
}
