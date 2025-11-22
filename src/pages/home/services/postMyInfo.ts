import { apiClient } from '@/api';
import { API_ENDPOINTS } from '@/constants/api';
import type { MyInfoRequest, MyInfoResponse } from '@/types/api';

/**
 * 내 정보 저장
 */
export const postMyInfo = async (
  data: MyInfoRequest,
): Promise<MyInfoResponse> => {
  const response = await apiClient.post<MyInfoResponse>(
    API_ENDPOINTS.MY_INFO,
    data,
  );
  return response.data;
};
