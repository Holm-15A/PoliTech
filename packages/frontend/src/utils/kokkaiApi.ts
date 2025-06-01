import axios from 'axios';

export interface SpeechRecord {
  speechID: string;
  issueID: string;
  imageKind: string;
  searchObject: string;
  session: string;
  nameOfHouse: string;
  nameOfMeeting: string;
  issue: string;
  date: string;
  closing: string;
  speechOrder: number;
  speaker: string;
  speakerYomi: string;
  speakerGroup: string;
  speakerPosition: string;
  speakerRole: string;
  speech: string;
  startPage: number;
  speechURL: string;
  meetingURL: string;
  pdfURL: string;
}

export interface KokkaiResponse {
  numberOfRecords: number;
  numberOfReturn: number;
  startRecord: number;
  nextRecordPosition: number;
  speechRecord: SpeechRecord[];
}

export interface SearchParams {
  maximumRecords?: number;
  startRecord?: number;
  any?: string;
  speaker?: string;
  nameOfMeeting?: string;
  from?: string;
  until?: string;
}

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
      Object.entries(params).filter(([_, value]) => 
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