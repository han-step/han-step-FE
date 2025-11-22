import { useNavigate } from 'react-router-dom';
import { Trophy, Clock, CheckCircle2 } from 'lucide-react';
import type { QuizSubmitResponse } from '../../../types/api';

interface QuizResultProps {
  result: QuizSubmitResponse;
}

export const QuizResult = ({ result }: QuizResultProps) => {
  const navigate = useNavigate();

  const minutes = Math.floor(result.elapsedMillis / 1000 / 60);
  const seconds = Math.floor((result.elapsedMillis / 1000) % 60);

  return (
    <div className='p-6'>
      <div className='bg-white rounded-2xl shadow-lg border border-border/50 p-8 text-center'>
        <div className='w-20 h-20 rounded-full bg-linear-to-br from-primary to-primary-hover flex items-center justify-center mx-auto mb-6 shadow-lg'>
          <Trophy className='w-10 h-10 text-primary-foreground' />
        </div>
        <h2 className='text-3xl font-bold text-foreground mb-8'>퀴즈 완료!</h2>
        <div className='space-y-6 mb-8'>
          <div className='bg-linear-to-br from-primary/10 to-primary/5 rounded-2xl p-6 border border-primary/20'>
            <div className='text-5xl font-bold text-primary mb-2'>
              {(result.accuracy * 100).toFixed(1)}%
            </div>
            <div className='text-muted-foreground font-medium'>정확도</div>
          </div>
          <div className='grid grid-cols-2 gap-4'>
            <div className='bg-accent/50 rounded-xl p-4'>
              <div className='flex items-center justify-center gap-2 mb-2'>
                <CheckCircle2 className='w-5 h-5 text-success' />
                <div className='text-2xl font-bold text-foreground'>
                  {result.correctCount}
                </div>
              </div>
              <div className='text-sm text-muted-foreground'>정답</div>
            </div>
            <div className='bg-accent/50 rounded-xl p-4'>
              <div className='flex items-center justify-center gap-2 mb-2'>
                <Clock className='w-5 h-5 text-primary' />
                <div className='text-2xl font-bold text-foreground'>
                  {minutes}:{String(seconds).padStart(2, '0')}
                </div>
              </div>
              <div className='text-sm text-muted-foreground'>소요 시간</div>
            </div>
          </div>
        </div>
        <button
          onClick={() => navigate('/quiz-list')}
          className='w-full px-6 py-3.5 bg-linear-to-r from-primary to-primary-hover text-primary-foreground rounded-xl font-semibold hover:shadow-lg transition-all duration-200'
        >
          퀴즈 목록으로 돌아가기
        </button>
      </div>
    </div>
  );
};
