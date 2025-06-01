import { useState } from 'react';
import { searchSpeeches, SearchParams, KokkaiResponse } from '../utils/kokkaiApi';

export const useKokkaiSearch = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<KokkaiResponse | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [lastSearchParams, setLastSearchParams] = useState<SearchParams | null>(null);

  const search = async (params: SearchParams) => {
    try {
      setLoading(true);
      setError(null);
      console.log('検索リクエスト:', { 
        ...params,
        startRecord: ((currentPage - 1) * 20) + 1,
        maximumRecords: 20 
      });

      // 新しい検索の場合はページを1にリセット
      if (!lastSearchParams || 
          params.any !== lastSearchParams.any ||
          params.speaker !== lastSearchParams.speaker ||
          params.nameOfMeeting !== lastSearchParams.nameOfMeeting ||
          params.from !== lastSearchParams.from ||
          params.until !== lastSearchParams.until) {
        setCurrentPage(1);
      }

      const response = await searchSpeeches({
        ...params,
        startRecord: ((currentPage - 1) * 20) + 1,
        maximumRecords: 20
      });

      console.log('検索結果:', response);
      setData(response);
      setLastSearchParams(params);
    } catch (err) {
      console.error('検索エラー:', err);
      const errorMessage = err instanceof Error ? err.message : '検索中にエラーが発生しました';
      setError(errorMessage);
      setData(null);
    } finally {
      setLoading(false);
    }
  };

  const nextPage = () => {
    if (data && data.nextRecordPosition && lastSearchParams) {
      setCurrentPage(prev => prev + 1);
      search(lastSearchParams);
    }
  };

  const previousPage = () => {
    if (currentPage > 1 && lastSearchParams) {
      setCurrentPage(prev => prev - 1);
      search(lastSearchParams);
    }
  };

  return {
    loading,
    error,
    data,
    currentPage,
    search,
    nextPage,
    previousPage,
    hasMore: data ? data.nextRecordPosition > 0 : false,
  };
};