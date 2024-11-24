import {
	useQuery,
	useMutation,
	useQueryClient,
	useInfiniteQuery,
	UseQueryResult,
} from "@tanstack/react-query";
import { QUERY_KEYS, QUERY_PATHS } from "./queryKeys";
import { get, post } from "../axios";
// import request from "./request";
import {
	AuctionRsp,
	IBidCard,
	ICompanyReport,
	IQueryResponse,
	ITradeStart,
} from "@/types";

/**
 * 公司管理相关接口-----------------------
 */
//申请入驻
const applyEntry = (url: string, data: any) => {
	return post(url, {
		data,
	});
};
export const useApplyEntry = () => {
	// const queryClient = useQueryClient(); Record<string, any>
	return useMutation({
		mutationFn: (data: any) => applyEntry(QUERY_PATHS.COMPANY_APPLY_PATH, data),
		// mutationFn: (data: any) => submitReport(QUERY_PATHS.SUBMIT_REPORT_PATH, data),
		// onSuccess: () => {
		//   queryClient.invalidateQueries({
		//     queryKey: [QUERY_KEYS.GET_RECENT_POSTS],
		//   });
		//   queryClient.invalidateQueries({
		//     queryKey: [QUERY_KEYS.GET_POSTS],
		//   });
		//   queryClient.invalidateQueries({
		//     queryKey: [QUERY_KEYS.GET_CURRENT_USER],
		//   });
		// },
	});
};

// 获取公司信息
const getCompanyInfo = (url: string, publicKey: string) => {
	return get(url, {
		params: { publicKey },
	});
};
export const useGetCompanyInfo = (
	publicKey: string
): UseQueryResult<IQueryResponse<any>, Error> => {
	return useQuery({
		queryKey: [QUERY_KEYS.GET_COMPANY_INFO, publicKey],
		queryFn: () => getCompanyInfo(QUERY_PATHS.COMPANY_INFO_PATH, publicKey),
	});
};

/**
 * 拍卖相关接口-----------------------
 */
// 开始拍卖
const startAuction = (url: string, data: any) => {
	return post(url, {
		data,
	});
};
export const useStartAuction = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: (data: any) =>
			startAuction(QUERY_PATHS.AUCTION_START_PATH, data),
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: [QUERY_KEYS.GET_AUCTION_LIST],
			});
		},
	});
};
// 获取拍卖列表
export const getAuctionList = (url: string) => {
	return get(url);
};
export const useGetAuctionList = (
	publicKey?: string
): UseQueryResult<IQueryResponse<AuctionRsp[]>, Error> => {
	return useQuery({
		queryKey: [QUERY_KEYS.GET_AUCTION_LIST],
		queryFn: () => getAuctionList(QUERY_PATHS.AUCTION_LIST_PATH),
	});
};
// 获取拍卖详情
const getAuctionDetail = (url: string, tradeID: string) => {
	return get(url, {
		params: { tradeID },
	});
};
export const useGetAuctionDetail = (
	tradeID: string
): UseQueryResult<IQueryResponse<AuctionRsp>, Error> => {
	return useQuery({
		queryKey: [QUERY_KEYS.GET_COMPANY_INFO],
		queryFn: () => getAuctionDetail(QUERY_PATHS.AUCTION_DETAIL_PATH, tradeID),
	});
};
// 我的拍卖
const getMyAuction = (url: string, publicKey: string) => {
	return get(url, {
		params: { publicKey },
	});
};
export const useGetMyAuction = (
	publicKey: string
): UseQueryResult<IQueryResponse<AuctionRsp[]>, Error> => {
	return useQuery({
		queryKey: [QUERY_KEYS.GET_MY_AUCTION],
		queryFn: () => getMyAuction(QUERY_PATHS.MY_AUCTION_PATH, publicKey),
	});
};

/**
 * 竞拍相关接口-----------------------
 */
// 提交竞拍
const bidSubmit = (url: string, data: any) => {
	return post(url, {
		data,
	});
};
export const useBidSubmit = () => {
	return useMutation({
		mutationFn: (data: any) => bidSubmit(QUERY_PATHS.BID_SUBMIT_PATH, data),
	});
};

// 更新竞拍
// 投标状态，
// 0【等待投标开始】
// 1【等待解密】
// 2【等待开标】
// 3【等待支付】
// 4【等待退款】
// 5【结束】
const bidUpdate = (url: string, data: any) => {
	return post(url, {
		data,
	});
};
export const useBidUpdate = () => {
	return useMutation({
		mutationFn: (data: any) => bidUpdate(QUERY_PATHS.BID_UPDATE_PATH, data),
	});
};

// 竞拍列表
const getBidList = (url: string, publicKey: string) => {
	return get(url, {
		params: { publicKey },
	});
};
export const useGetBidList = (
	publicKey: string
): UseQueryResult<IQueryResponse<IBidCard[]>, Error> => {
	return useQuery({
		queryKey: [QUERY_KEYS.GET_BID_LIST],
		queryFn: () => getBidList(QUERY_PATHS.BID_LIST_PATH, publicKey),
	});
};
// 竞拍详情
const getBidDetails = (url: string, biddingID: string) => {
	return get(url, {
		params: { biddingID },
	});
};

export const useGetBidDetails = (
	biddingID: string
): UseQueryResult<IQueryResponse<IBidCard>, Error> => {
	return useQuery({
		queryKey: [QUERY_KEYS.GET_BID_DETAILS],
		queryFn: () => getBidDetails(QUERY_PATHS.BID_DETAILS_PATH, biddingID),
	});
};

/**
 * 排放报告相关接口-----------------------
 */
// 获取报告信息
const getReportInfo = (url: string, publicKey: string) => {
	return get(url, {
		params: { publicKey },
	});
};
export const useGetReportInfo = (
	publicKey: string
): UseQueryResult<IQueryResponse<ICompanyReport>, Error> => {
	return useQuery({
		queryKey: [QUERY_KEYS.GET_REPORT_INFO],
		queryFn: () => getReportInfo(QUERY_PATHS.REPORT_INFO_PATH, publicKey),
	});
};
// 提交报告
const submitReport = (url: string, data: any) => {
	return post(url, {
		data,
	});
};
export const useSubmitReport = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: (data: any) =>
			submitReport(QUERY_PATHS.SUBMIT_REPORT_PATH, data),
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: [QUERY_KEYS.GET_REPORT_INFO],
			});
		},
	});
};

/**
 * 惩罚相关接口-----------------------
 */
// 查询罚款
const getPenaltyInfo = (url: string, address: string) => {
	return get(url, {
		params: { address },
	});
};
export const useGetPenaltyInfo = (
	address: string
): UseQueryResult<IQueryResponse<any>, Error> => {
	return useQuery({
		queryKey: [QUERY_KEYS.GET_REPORT_INFO],
		queryFn: () => getPenaltyInfo(QUERY_PATHS.PUNISH_INFO_PATH, address),
	});
};

/**
 * 交易相关接口-----------------------
 */
// 开始交易
const startTrade = (url: string, data: ITradeStart) => {
	return post(url, {
		data,
	});
};

export const useStartTrade = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: (data: ITradeStart) =>
			startTrade(QUERY_PATHS.TRADE_START_PATH, data),
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: [QUERY_KEYS.GET_AUCTION_LIST],
			});
		},
	});
};

// 获取交易列表
const getTradeList = (url: string) => {
	console.log(QUERY_PATHS.TRADE_LIST_PATH);
	return get(url);
};
export const useGetTradeList = (): UseQueryResult<
	IQueryResponse<AuctionRsp[]>,
	Error
> => {
	return useQuery({
		queryKey: [QUERY_KEYS.GET_TRADE_LIST],
		queryFn: () => getTradeList(QUERY_PATHS.TRADE_LIST_PATH),
	});
};

// 获取交易详情
const getTradeDetail = (url: string, tradeID: string) => {
	return get(url, {
		params: { tradeID },
	});
};

export const useGetTradeDetail = (
	tradeID: string
): UseQueryResult<IQueryResponse<AuctionRsp>, Error> => {
	return useQuery({
		queryKey: [QUERY_KEYS.GET_TRADE_DETAILS],
		queryFn: () => getTradeDetail(QUERY_PATHS.TRADE_DETAIL_PATH, tradeID),
	});
};

// 更新交易
const tradeUpdate = (url: string, data: any) => {
	return post(url, {
		data,
	});
};
export const useTradeUpdate = () => {
	return useMutation({
		mutationFn: (data: any) => tradeUpdate(QUERY_PATHS.TRADE_UPDATE_PATH, data),
	});
};
