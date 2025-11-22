import { apiClient } from '@/api';
import { API_ENDPOINTS } from '@/constants/api';
import type { QuizSetDetailResponse } from '@/types/api';

/**
 * 퀴즈 세트 상세 조회
 */
export const getQuizSetDetail = async (
  id: number,
): Promise<QuizSetDetailResponse> => {
  const response = await apiClient.get<QuizSetDetailResponse>(
    API_ENDPOINTS.QUIZ_SET_DETAIL(id),
  );
  return response.data;
};
