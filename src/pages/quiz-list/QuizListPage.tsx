import { QuizList } from './components';
import { useGetQuizSetList } from './hooks/useGetQuizSetList';

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

  return (
    <div className='flex flex-col gap-4 p-6'>
      <p className='text-lg font-medium text-foreground'>
        원하는 퀴즈를 선택하여 시작하세요
      </p>

      <QuizList quizSets={quizSets} />
    </div>
  );
};

export default QuizListPage;
