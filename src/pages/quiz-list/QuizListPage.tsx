import type { QuizSetListResponse } from '../../types/api';
import { QuizList, QuizSetGenerateButton } from './components';

const QuizListPage = () => {
  // const { data: quizSets, isLoading } = useQuery({
  //   queryKey: ['quizSetList'],
  //   queryFn: getQuizSetList,
  // });

  const quizSets: QuizSetListResponse[] = [
    {
      id: 1,
      title: '퀴즈 1',
      level: 'BEGINNER',
      quizCount: 10,
      solved: false,
    },
    {
      id: 2,
      title: '퀴즈 2',
      level: 'INTERMEDIATE',
      quizCount: 10,
      solved: false,
    },
    {
      id: 3,
      title: '퀴즈 3',
      level: 'ADVANCED',
      quizCount: 10,
      solved: true,
    },
  ];

  // if (isLoading) {
  //   return (
  //     <div className='flex items-center justify-center p-6 min-h-[400px]'>
  //       <div className='flex flex-col items-center gap-3'>
  //         <div className='w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin' />
  //         <div className='text-muted-foreground'>로딩 중...</div>
  //       </div>
  //     </div>
  //   );
  // }

  return (
    <div className='flex flex-col gap-4 p-6'>
      <p className='text-lg font-medium text-foreground'>
        원하는 퀴즈를 선택하여 시작하세요
      </p>

      <QuizList quizSets={quizSets} />

      <QuizSetGenerateButton />
    </div>
  );
};

export default QuizListPage;
