import type { MyInfoResponse } from '@/types/api';
import { User } from 'lucide-react';
import { KOREAN_LEVEL_LABELS } from '@/constants/api';

type HomeInfoProps = {
  myInfo: MyInfoResponse;
};

export const HomeInfo = ({ myInfo }: HomeInfoProps) => {
  return (
    <section className='bg-white rounded-2xl shadow-sm border border-border/50 p-6 hover:shadow-md transition-shadow'>
      <div className='flex items-center gap-3 mb-4'>
        <div className='w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center'>
          <User className='w-5 h-5 text-primary' />
        </div>
        <h2 className='text-xl font-semibold text-foreground'>
          내 한국어 수준
        </h2>
      </div>
      {myInfo ? (
        <div className='space-y-4'>
          <div className='flex items-center justify-between p-4 bg-accent/50 rounded-xl'>
            <span className='text-foreground font-medium'>푼 퀴즈 개수</span>
            <span className='text-foreground text-lg font-semibold'>
              {myInfo.solvedQuizCount} 개
            </span>
          </div>
          <div className='flex items-center justify-between p-4 bg-accent/50 rounded-xl'>
            <span className='text-foreground font-medium'>
              푼 퀴즈 세트 개수
            </span>
            <span className='text-foreground text-lg font-semibold'>
              {myInfo.solvedQuizSetCount} 개
            </span>
          </div>
          <div className='flex items-center justify-between p-4 bg-accent/50 rounded-xl'>
            <span className='text-foreground font-medium'>한국어 레벨</span>
            <span className='px-4 py-1.5 bg-linear-to-r from-primary to-primary-hover text-primary-foreground rounded-full font-semibold text-sm shadow-sm'>
              {KOREAN_LEVEL_LABELS[myInfo.koreanLevel] || myInfo.koreanLevel}
            </span>
          </div>
        </div>
      ) : (
        <div className='text-center py-8 text-muted-foreground'>
          정보를 불러올 수 없습니다.
        </div>
      )}
    </section>
  );
};
