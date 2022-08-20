import axios, { AxiosRequestConfig } from 'axios';

const defaultOptions: AxiosRequestConfig = {
  baseURL: process.env.NEXT_PUBLIC_reactBackendAPI || 'http://localhost:3001',
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    'Access-Control-Allow-Origin': '*',
  },
};

const axiosInstance = axios.create(defaultOptions);

export default axiosInstance;
