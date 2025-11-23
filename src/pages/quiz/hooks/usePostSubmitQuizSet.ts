import { useMutation, useQueryClient } from '@tanstack/react-query';
import { submitQuizSet } from '../services/postSubmitQuizSet';
import { QUERY_KEYS } from '@/constants/queryKeys';

export const usePostSubmitQuizSet = (id: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: {
      totalCount: number;
      correctCount: number;
      elapsedMillis: number;
    }) => submitQuizSet(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.QUIZ_SET_DETAIL(id),
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.QUIZ_SET_LIST],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.MY_INFO],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.MY_BRIEFING],
      });
    },
  });
};
