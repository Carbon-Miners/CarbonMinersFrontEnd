import {
  useQuery,
  useMutation,
  useQueryClient,
  useInfiniteQuery,
  UseQueryResult,
} from "@tanstack/react-query";
import { QUERY_KEYS, QUERY_PATHS } from "./queryKeys";
import { get, post } from "../axios";
import { AuctionRsp, ICompanyCard, IQueryResponse } from "@/types";

/**
 * 企业相关接口-----------------------
*/
// 企业列表
const getCompanyList = (url: string) => {
  return get(url);
}

export const useGetCompanyList = (): UseQueryResult<IQueryResponse<ICompanyCard[]>, Error> => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_COMPANY_LIST],
    queryFn: () => getCompanyList(QUERY_PATHS.COMPANY_LIST_PATH),
  });
};

//审批入驻
const checkEntry = (url: string, data: any) => {
  return post(url, {
    data
  });
}
export const useCheckEntry = () => {
  return useMutation({
    mutationFn: (data: any) => checkEntry(QUERY_PATHS.COMPANY_CHECK_PATH, data)
  });
};

/**
 * 惩罚相关接口-----------------------
*/
// 审核罚款
const checkPenaltyInfo = (url: string, data: any) => {
  return post(url, {
    data
  });
}
export const useCheckPenaltyInfo = () => {
  return useMutation({
    mutationFn: (data: any) => checkPenaltyInfo(QUERY_PATHS.PUNISH_USER_PATH, data)
  });
};