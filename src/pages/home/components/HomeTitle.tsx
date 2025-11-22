import type { MyInfoResponse } from '@/types/api';
import { useNavigate } from 'react-router-dom';

type HomeTitleProps = {
  myInfo: MyInfoResponse;
};

export const HomeTitle = ({ myInfo }: HomeTitleProps) => {
  const navigate = useNavigate();

  return (
    <>
      <div className='mb-4'>
        <h1 className='text-2xl font-bold text-foreground mb-1'>
          반갑습니다 {myInfo?.name || '사용자'}님!
        </h1>
        <p className='text-muted-foreground'>
          오늘도 즐거운 한국어 학습 되세요!
        </p>
      </div>

      <button
        className='w-full bg-primary text-primary-foreground px-4 py-4 rounded-2xl'
        onClick={() => navigate('/quiz-list')}
      >
        <p className='text-lg font-semibold'>퀴즈 풀러가기</p>
      </button>
    </>
  );
};
