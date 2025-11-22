import { QUERY_KEYS } from '@/constants/queryKeys';
import { getQuizSetList } from '../services/getQuizSetList';
import { useQuery } from '@tanstack/react-query';

export const useGetQuizSetList = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.QUIZ_SET_LIST],
    queryFn: getQuizSetList,
  });
};
