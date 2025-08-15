import axios from 'axios';
import type { SearchParams, KokkaiResponse } from 'shared';
export type { SearchParams, KokkaiResponse } from 'shared';

export interface ErrorResponse {
  error: string;
}

const api = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/api/kokkai`,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

export const searchSpeeches = async (params: SearchParams): Promise<KokkaiResponse> => {
  try {
    // 空文字列のパラメータを削除
    const cleanParams = Object.fromEntries(
      Object.entries(params).filter(([, value]) => 
        value !== undefined && value !== null && value.toString().trim() !== ''
      )
    );
    
    console.log('API Request params:', cleanParams);
    const { data } = await api.get<KokkaiResponse>('/search', { params: cleanParams });
    console.log('API Response:', data);
    return data;
  } catch (error: unknown) {
    console.error('API Error:', error);
    if (error && typeof error === 'object' && 'response' in error) {
      const axiosError = error as { response?: { data?: ErrorResponse } };
      if (axiosError.response?.data?.error) {
        throw new Error(axiosError.response.data.error);
      }
    }
    throw new Error('国会議事録の検索中にエラーが発生しました');
  }
};