import {
  useQuery,
  useMutation,
  useQueryClient,
  useInfiniteQuery,
  UseQueryResult,
} from "@tanstack/react-query";
import { QUERY_KEYS, QUERY_PATHS } from "./queryKeys";
import { get, post } from "../axios";
import request from "./request";
import { AuctionRsp, IQueryResponse } from "@/types";

// const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
// /**
//  * GET请求.
//  * @param path 请求路径.
//  * @param params 请求参数.
//  * @returns 响应.
//  */
// const commonFetch = async (path: string, params?: Record<string, string>) => {
//   const url = new URL(path, API_BASE_URL);
//   if (params) {
//     Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));
//   }

//   const response = await fetch(url);
//   if (!response.ok) {
//     throw new Error('Network response was not ok');
//   }
//   return response.json();
// };

// /**
//  * POST请求.
//  * @param path 请求路径.
//  * @param data 请求参数.
//  * @returns 响应.
//  */
// const commonPost = async (path: string, data: any) => {
//   const response = await fetch(`${API_BASE_URL}${path}`, {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/x-www-form-urlencoded'
//     },
//     body: data,
//   });

//   if (!response.ok) {
//     throw new Error('Network response was not ok');
//   }
//   return response.json();
// };

/**
 * 公司管理相关接口-----------------------
*/
//申请入驻
const applyEntry = (url: string, data: any) => {
  return post(url, {
    data
  });
}
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
const getCompanyInfo = (url: string, data: any) => {
  return get(url, {
    params: data
  });
}
export const useGetCompanyInfo = (address: string): UseQueryResult<IQueryResponse<any>, Error> => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_COMPANY_INFO],
    queryFn: () => getCompanyInfo(QUERY_PATHS.COMPANY_INFO_PATH, { address }),
  });
};

const submitReport = (url: string, data: any) => {
  return post(url, {
    data
  });
}


/**
 * 拍卖相关接口-----------------------
*/
// 开始拍卖
const startAuction = (url: string, data: any) => {
  return post(url, {
    data
  });
}
export const useStartAuction = () => {
  return useMutation({
    mutationFn: (data: any) => startAuction(QUERY_PATHS.START_AUCTION_PATH, data),
  });
};
// 获取拍卖列表
const getAuctionList = (url: string) => {
  return get(url);
}
export const useGetAuctionList = (): UseQueryResult<IQueryResponse<AuctionRsp[]>, Error> => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_COMPANY_INFO],
    queryFn: () => getAuctionList(QUERY_PATHS.AUCTION_LIST_PATH),
  });
};
// 获取拍卖详情
const getAuctionDetail = (url: string, tradeID: string) => {
  return get(url, {
    params: { tradeID }
  });
}
export const useGetAuctionDetail = (tradeID: string): UseQueryResult<IQueryResponse<AuctionRsp>, Error> => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_COMPANY_INFO],
    queryFn: () => getAuctionDetail(QUERY_PATHS.AUCTION_DETAIL_PATH, tradeID),
  });
};

// 提交报告
export const useSubmitReport = () => {
  return useMutation({
    mutationFn: (data: any) => submitReport(QUERY_PATHS.SUBMIT_REPORT_PATH, data),
  });
};