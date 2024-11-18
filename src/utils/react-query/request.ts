import queryString from 'query-string';

type Method = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

interface Params {
  cacheTime?: number; //缓存时间，单位为s。默认强缓存，0为不缓存
  params?: Record<string, any>;
}

interface Props extends Params {
  url: string;
  method: Method;
}

type Config = { next: { revalidate: number } } | { cache: 'no-store' } | { cache: 'force-cache' };

class Request {
  /**
   * 请求拦截器
   */
  interceptorsRequest({ url, method, params, cacheTime }: Props) {
    let queryParams = ''; //url参数
    let requestPayload = ''; //请求体数据
    //请求头
    const headers = {
      authorization: `token`,
    };

    const config: Config =
      cacheTime || cacheTime === 0
        ? cacheTime > 0
          ? { next: { revalidate: cacheTime } }
          : { cache: 'no-store' }
        : { cache: 'force-cache' };

    if (method === 'GET' || method === 'DELETE') {
      //fetch对GET请求等，不支持将参数传在body上，只能拼接url
      if (params) {
        queryParams = queryString.stringify(params);
        url = `${url}?${queryParams}`;
      }
    } else {
      //非form-data传输JSON数据格式
      if (!['[object FormData]', '[object URLSearchParams]'].includes(Object.prototype.toString.call(params))) {
        Object.assign(headers, { 'Content-Type': 'application/json' });
        // Object.assign(headers, { 'Content-Type': 'application/x-www-form-urlencoded' });
        requestPayload = JSON.stringify(params);
        console.log("requestPayload", requestPayload);
      }
    }
    return {
      url,
      options: {
        method,
        headers,
        body: method !== 'GET' && method !== 'DELETE' ? requestPayload : undefined,
        ...config,
      },
    };
  }

  /**
   * 响应拦截器
   */
  interceptorsResponse<T>(res: Response): Promise<T> {
    return new Promise((resolve, reject) => {
      const requestUrl = res.url;
      if (res.ok) {
        return resolve(res.json() as Promise<T>);
      } else {
        res
          .clone()
          .text()
          .then((text) => {
            try {
              const errorData = JSON.parse(text);
              return reject({ message: errorData || '接口错误', url: requestUrl });
            } catch {
              return reject({ message: text, url: requestUrl });
            }
          });
      }
    });
  }

  async httpFactory<T>({ url = '', params = {}, method }: Props): Promise<T> {
    const req = this.interceptorsRequest({
      url: process.env.NEXT_PUBLIC_API_BASE_URL + url,
      method,
      params: params.params,
      cacheTime: params.cacheTime,
    });
    const res = await fetch(req.url, req.options);
    return this.interceptorsResponse<T>(res);
  }

  async request<T>(method: Method, url: string, params?: Params): Promise<T> {
    return this.httpFactory<T>({ url, params, method });
  }

  get<T>(url: string, params?: Params): Promise<T> {
    return this.request('GET', url, params);
  }

  post<T>(url: string, params?: Params): Promise<T> {
    return this.request('POST', url, params);
  }

  put<T>(url: string, params?: Params): Promise<T> {
    return this.request('PUT', url, params);
  }

  delete<T>(url: string, params?: Params): Promise<T> {
    return this.request('DELETE', url, params);
  }

  patch<T>(url: string, params?: Params): Promise<T> {
    return this.request('PATCH', url, params);
  }
}

const request = new Request();

export default request;

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
