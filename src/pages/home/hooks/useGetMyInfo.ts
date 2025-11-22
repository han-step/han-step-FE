import { useQuery } from '@tanstack/react-query';
import { getMyInfo } from '../services/getMyInfo';
import { QUERY_KEYS } from '@/constants/queryKeys';

export const useGetMyInfo = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.MY_INFO],
    queryFn: getMyInfo,
  });
};
