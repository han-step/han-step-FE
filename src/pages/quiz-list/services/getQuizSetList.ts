import { apiClient } from '@/api';
import { API_ENDPOINTS } from '@/constants/api';
import type { QuizSetListResponse } from '@/types/api';

export const getQuizSetList = async () => {
  const response = await apiClient.get<QuizSetListResponse[]>(
    API_ENDPOINTS.QUIZ_SETS,
  );
  return response.data;
};
