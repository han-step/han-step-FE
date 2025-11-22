import { useQuery } from '@tanstack/react-query';
import { getMyBriefing } from '../services/getMyBriefing';
import { QUERY_KEYS } from '@/constants/queryKeys';

export const useGetMyBriefing = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.MY_BRIEFING],
    queryFn: getMyBriefing,
  });
};
