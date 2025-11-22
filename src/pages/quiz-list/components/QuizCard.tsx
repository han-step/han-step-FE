import { BookOpen, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { KOREAN_LEVEL_LABELS } from '../../../constants/api';
import type { QuizSetListResponse } from '../../../types/api';

interface QuizCardProps {
  quizSet: QuizSetListResponse;
}

export const QuizCard = ({ quizSet }: QuizCardProps) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/quiz/${quizSet.id}`);
  };

  return (
    <div
      onClick={handleClick}
      className='group bg-white rounded-2xl shadow-sm border border-border/50 p-6 cursor-pointer hover:border-border-primary hover:shadow-lg transition-all duration-200'
    >
      <div className='flex items-start justify-between gap-4'>
        <div className='flex-1'>
          <div className='flex items-center gap-3 mb-4'>
            <div className='w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors'>
              <BookOpen className='w-5 h-5 text-primary' />
            </div>
            <h3 className='text-xl font-semibold text-foreground'>
              {quizSet.title}
            </h3>
          </div>
          <div className='flex items-center gap-3 flex-wrap'>
            <span className='px-3 py-1.5 bg-linear-to-r from-secondary to-secondary-hover text-secondary-foreground rounded-full text-sm font-semibold shadow-sm'>
              {KOREAN_LEVEL_LABELS[quizSet.level] || quizSet.level}
            </span>
          </div>
        </div>
        <div className='flex items-center'>
          <ChevronRight className='w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all' />
        </div>
      </div>
    </div>
  );
};
