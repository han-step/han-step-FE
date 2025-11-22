import { apiClient } from '@/api';
import { API_ENDPOINTS } from '@/constants/api';
import type { MyBriefingResponse } from '@/types/api';

/**
 * 내 브리핑 조회
 */
export const getMyBriefing = async (): Promise<MyBriefingResponse> => {
  const response = await apiClient.get<MyBriefingResponse>(
    API_ENDPOINTS.MY_BRIEFING,
  );
  return response.data;
};
