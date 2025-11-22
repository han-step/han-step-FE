import { QUERY_KEYS } from '@/constants/queryKeys';
import { getQuizSetDetail } from '../services/getQuizSetDetail';
import { useQuery } from '@tanstack/react-query';

export const useGetQuizSetDetail = (id: number) => {
  return useQuery({
    queryKey: QUERY_KEYS.QUIZ_SET_DETAIL(id),
    queryFn: () => getQuizSetDetail(id),
    enabled: !!id,
  });
};
