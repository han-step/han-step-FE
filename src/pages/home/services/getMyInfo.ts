import { apiClient } from '@/api';
import { API_ENDPOINTS } from '@/constants/api';
import type { MyInfoResponse } from '@/types/api';

/**
 * 내 정보 조회
 */
export const getMyInfo = async (): Promise<MyInfoResponse> => {
  const response = await apiClient.get<MyInfoResponse>(API_ENDPOINTS.MY_INFO);
  return response.data;
};
