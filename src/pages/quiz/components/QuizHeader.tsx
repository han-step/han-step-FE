import { KOREAN_LEVEL_LABELS } from '../../../constants/api';
import type { QuizSetDetailResponse } from '../../../types/api';

interface QuizHeaderProps {
  quizSet: QuizSetDetailResponse;
  currentIndex: number;
  answeredCount: number;
}

export const QuizHeader = ({
  quizSet,
  currentIndex,
  answeredCount,
}: QuizHeaderProps) => {
  // 이미 풀은 문제 수를 기준으로 진행률 계산
  const progress = (answeredCount / quizSet.quizzes.length) * 100;

  return (
    <div className='mb-6'>
      <div className='flex items-center justify-between mb-4'>
        <h1 className='text-2xl font-bold text-foreground'>{quizSet.title}</h1>
        <span className='px-4 py-1.5 bg-linear-to-r from-secondary to-secondary-hover text-secondary-foreground rounded-full text-sm font-semibold shadow-sm'>
          {KOREAN_LEVEL_LABELS[quizSet.level] || quizSet.level}
        </span>
      </div>
      <div className='flex items-center justify-between mb-3'>
        <div className='text-sm font-medium text-muted-foreground'>
          문제 {currentIndex + 1} / {quizSet.quizzes.length}
        </div>
        <div className='text-xs text-muted-foreground'>
          {Math.round(progress)}% 완료
        </div>
      </div>
      <div className='w-full bg-muted rounded-full h-2.5 overflow-hidden'>
        <div
          className='bg-linear-to-r from-primary to-primary-hover h-full rounded-full transition-all duration-300 shadow-sm'
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
};
