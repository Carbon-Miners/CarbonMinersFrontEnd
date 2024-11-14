export enum QUERY_KEYS {

  GET_COMPANY_INFO = "getCompanyInfo",
  // // AUTH KEYS
  // CREATE_USER_ACCOUNT = "createUserAccount",

  // // USER KEYS
  // GET_CURRENT_USER = "getCurrentUser",
  // GET_USERS = "getUsers",
  // GET_USER_BY_ID = "getUserById",

  // // POST KEYS
  // GET_POSTS = "getPosts",
  // GET_INFINITE_POSTS = "getInfinitePosts",
  // GET_RECENT_POSTS = "getRecentPosts",
  // GET_POST_BY_ID = "getPostById",
  // GET_USER_POSTS = "getUserPosts",
  // GET_FILE_PREVIEW = "getFilePreview",

  // //  SEARCH KEYS
  // SEARCH_POSTS = "getSearchPosts",
}

export enum QUERY_PATHS {
  // 企业管理-user
  COMPANY_INFO_PATH = "/api/user",
  COMPANY_APPLY_PATH = "/api/user/apply-entry",

  //拍卖
  START_AUCTION_PATH = "/api/auction/start-auction",
  AUCTION_LIST_PATH = "/api/auction/list",
  AUCTION_DETAIL_PATH = "/api/auction",

  //竞拍


  SUBMIT_REPORT_PATH = "/api/report/submit-report",
}