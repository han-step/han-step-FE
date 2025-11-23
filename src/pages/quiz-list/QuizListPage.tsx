import { QuizList } from './components';
import { useGetQuizSetList } from './hooks/useGetQuizSetList';
import type { QuizSetListResponse } from '@/types/api';

const QuizListPage = () => {
  const { data: quizSets, isLoading } = useGetQuizSetList();

  if (isLoading) {
    return (
      <div className='flex items-center justify-center p-6 min-h-[400px]'>
        <div className='flex flex-col items-center gap-3'>
          <div className='w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin' />
          <div className='text-muted-foreground'>로딩 중...</div>
        </div>
      </div>
    );
  }

  if (!quizSets) {
    return (
      <div className='flex items-center justify-center p-6 min-h-[400px]'>
        <div className='text-muted-foreground'>
          퀴즈 목록을 불러올 수 없습니다.
        </div>
      </div>
    );
  }

  // 퀴즈를 완료한 것과 안 한 것으로 분리
  const unsolvedQuizzes = quizSets.filter(
    (quiz: QuizSetListResponse) => !quiz.solved,
  );
  const solvedQuizzes = quizSets.filter(
    (quiz: QuizSetListResponse) => quiz.solved,
  );

  return (
    <div className='flex flex-col gap-6 p-6'>
      {unsolvedQuizzes.length > 0 && (
        <div className='flex flex-col gap-4'>
          <h2 className='text-xl font-semibold text-foreground'>새로운 퀴즈</h2>
          <QuizList quizSets={unsolvedQuizzes} />
        </div>
      )}

      {solvedQuizzes.length > 0 && (
        <div className='flex flex-col gap-4'>
          <h2 className='text-xl font-semibold text-foreground'>완료한 퀴즈</h2>
          <QuizList quizSets={solvedQuizzes} />
        </div>
      )}

      {/* 퀴즈가 없을 때 */}
      {unsolvedQuizzes.length === 0 && solvedQuizzes.length === 0 && (
        <div className='bg-white rounded-2xl shadow-sm border border-border/50 p-12 text-center'>
          <p className='text-muted-foreground text-lg'>퀴즈가 없습니다.</p>
        </div>
      )}
    </div>
  );
};

export default QuizListPage;
