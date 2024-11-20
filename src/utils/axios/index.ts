import axios from "axios";
import type { AxiosRequestConfig } from "axios";
axios.defaults.baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;
axios.defaults.timeout = 5000;
// axios.defaults.headers.post["Content-Type"] = 'application/json;charset=UTF-8'

// 请求拦截器
axios.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 响应拦截器
axios.interceptors.response.use(
  (response) => {
    if (response.status === 200) {
      return Promise.resolve(response);
    } else {
      return Promise.reject(response);
    }
  },
  (error) => {
    console.error("请求错误", error); // 打印错误信息
    return Promise.reject(error.response);
  }
);

let pending: any[] = [];
let cancels: any[] = [];

export function cancelApi(url: string, cancelMsg?: string) {
  if (pending.includes(url)) {
    let index = pending.indexOf(url);
    pending.splice(index, 1);
    let cancel = cancels.splice(index, 1)[0];
    cancelMsg ? cancel(cancelMsg) : cancel();
  }
}

export function cancelAllApi() {
  pending = [];
  cancels.forEach((cancel) => cancel());
  cancels = [];
}

export enum Method {
  GET = "GET",
  DELETE = "DELETE",
  HEAD = "HEAD",
  OPTIONS = "OPTIONS",
  POST = "POST",
  PUT = "PUT",
}

export function baseHttp(
  url: string,
  method: Method,
  config: AxiosRequestConfig & any
) {
  config.url = url;
  config.method = method;
  if (config.url?.indexOf("/") != 0) {
    config.url = "/" + config.url;
  }
  config.url = config.url.replace(/\/\//gi, "/");
  return new Promise((resolve, reject) => {
    axios(config)
      .then((res) => resolve(res.data))
      .catch((e) => reject(e))
      .finally(() => {
        // 注释掉取消请求逻辑
        // cancelApi(config.url);
      });
  });
}

export function get(url: string, config: AxiosRequestConfig & any = {}){
  return baseHttp(url, Method.GET, config);
};

export function post(url: string, config: AxiosRequestConfig & any = {}) {
  return baseHttp(url, Method.POST, config);
}

export function put(url: string, config: AxiosRequestConfig & any = {}) {
  return baseHttp(url, Method.PUT, config);
}

export function del(url: string, config: AxiosRequestConfig & any = {}) {
  return baseHttp(url, Method.DELETE, config);
}

export default { get, post, put, del, cancelApi, cancelAllApi };
