import { useMutation } from '@tanstack/react-query';
import { postMyInfo } from '../services/postMyInfo';
import type { MyInfoRequest } from '@/types/api';
import { QUERY_KEYS } from '@/constants/queryKeys';
import { queryClient } from '@/constants/queryClient';

export const usePostMyInfo = () => {
  return useMutation({
    mutationFn: (data: MyInfoRequest) => postMyInfo(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.MY_INFO],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.MY_BRIEFING],
      });
    },
  });
};
