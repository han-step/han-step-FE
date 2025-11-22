import { BookOpen, CheckCircle } from 'lucide-react';
import { KOREAN_LEVEL_LABELS } from '../../../constants/api';
import type { QuizSetListResponse } from '../../../types/api';

interface CompletedQuizCardProps {
  quizSet: QuizSetListResponse;
}

export const CompletedQuizCard = ({ quizSet }: CompletedQuizCardProps) => {
  return (
    <div className='bg-gray-100 rounded-2xl border border-gray-200 p-6 cursor-not-allowed relative'>
      <div className='flex items-start justify-between gap-4'>
        <div className='flex-1'>
          <div className='flex items-center gap-3 mb-4'>
            <div className='w-10 h-10 rounded-xl bg-secondary text-secondary-foreground flex items-center justify-center'>
              <BookOpen className='w-5 h-5 text-secondary-foreground' />
            </div>
            <h3 className='text-xl font-semibold text-foreground'>
              {quizSet.title}
            </h3>
          </div>
          <div className='flex items-center justify-between flex-wrap gap-2'>
            <span className='px-3 py-1.5 bg-secondary text-secondary-foreground rounded-full text-sm font-semibold'>
              {KOREAN_LEVEL_LABELS[quizSet.level] || quizSet.level}
            </span>
            <span className='px-3 py-1.5 bg-success text-success-foreground rounded-full text-sm font-semibold flex items-center gap-1.5'>
              <CheckCircle className='w-4 h-4' />
              완료
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
