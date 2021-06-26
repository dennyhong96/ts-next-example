// import { useAuth } from "@contexts/auth";
import axios, { AxiosRequestConfig } from "axios";

// https://60d75d3c307c300017a5f834.mockapi.io/api/posts

interface IRequestConfig extends AxiosRequestConfig {
  token?: string;
}

export const http = async (
  url: string,
  { token, data, headers, ...customConfig }: IRequestConfig = {},
) => {
  return axios({
    method: "GET",
    // baseURL: "https://some-domain.com/api/",
    url,
    data,
    headers: {
      Authrization: token ? `Bearer ${token}` : "",
      "Content-Type": token ? "application/json" : "",
      ...headers,
    },
    responseType: "json",
    // withCredentials: false,
    ...customConfig,
  });
};

export const useHttp = () => {
  // const { user } = useAuth();
  const token = ""; // Get token from user

  // infer type from the parameters
  return (...[url, config]: Parameters<typeof http>) => http(url, { token, ...config });
};
