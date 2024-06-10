import axios, {
  AxiosInstance,
  AxiosError,
  InternalAxiosRequestConfig
} from 'axios';
import { getToken } from './token';
import { BACKEND_URL, REQUEST_TIMEOUT } from '../const';
import { toast } from 'react-toastify';
import { StatusCodes } from 'http-status-codes';

type DetailMessageType = {
  type: string;
  message: string;
}

const StatusCodeMapping: Record<number, boolean> = {
  [StatusCodes.BAD_REQUEST]: true,
  [StatusCodes.UNAUTHORIZED]: true,
  [StatusCodes.NOT_FOUND]: true
};

export const createAPI = (): AxiosInstance => {
  const api = axios.create({
    baseURL: BACKEND_URL,
    timeout: REQUEST_TIMEOUT,
  });

  api.interceptors.response.use(
    (response) => response,
    (error: AxiosError<DetailMessageType>) => {
      if (error.response && !!StatusCodeMapping[error.response.status]) {
        const detailMessage = error.response.data;
        toast.warn(detailMessage.message, {
          position: 'top-center'
        });
      }

      throw error;
    }
  );

  api.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      const token = getToken();

      if (token && config.headers) {
        config.headers['x-token'] = token;
      }

      return config;
    }
  );

  return api;
};
