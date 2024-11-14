import { useQuery, useMutation, UseQueryResult, UseMutationResult } from '@tanstack/react-query';

// GET 请求
const fetchData = async (path: string, params: Record<string, string>) => {
  const url = new URL(path, process.env.NEXT_PUBLIC_API_BASE_URL);
  Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

export const useFetchData = (path: string, params: Record<string, string>): UseQueryResult<any, Error> => {
  return useQuery({
    queryKey: ['entry', path, params],
    queryFn: () => fetchData(path, params),
  });
};

// POST 请求
const postData = async (path: string, data: Record<string, any>) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}${path}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

export const usePostData = (path: string): UseMutationResult<any, Error, Record<string, any>> => {
  return useMutation({
    mutationFn: (data: Record<string, any>) => postData(path, data),
  });
};
