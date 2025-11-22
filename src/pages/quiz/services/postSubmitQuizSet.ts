import { apiClient } from '@/api';
import { API_ENDPOINTS } from '@/constants/api';
import type { QuizSubmitRequest, QuizSubmitResponse } from '@/types/api';

/**
 * 퀴즈 세트 제출
 */
export const submitQuizSet = async (
  id: number,
  data: QuizSubmitRequest,
): Promise<QuizSubmitResponse> => {
  const response = await apiClient.post<QuizSubmitResponse>(
    API_ENDPOINTS.QUIZ_SET_SUBMIT(id),
    data,
  );
  return response.data;
};
