import { BookOpen } from 'lucide-react';
import type { QuizSetListResponse } from '../../../types/api';
import { CompletedQuizCard, QuizCard } from '.';

interface QuizListProps {
  quizSets: QuizSetListResponse[];
}

export const QuizList = ({ quizSets }: QuizListProps) => {
  if (!quizSets || quizSets.length === 0) {
    return (
      <div className='bg-white rounded-2xl shadow-sm border border-border/50 p-12 text-center'>
        <BookOpen className='w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-50' />
        <p className='text-muted-foreground text-lg'>퀴즈가 없습니다.</p>
      </div>
    );
  }

  return (
    <div className='grid gap-4'>
      {quizSets.map((quizSet: QuizSetListResponse) =>
        quizSet.solved ? (
          <CompletedQuizCard key={quizSet.id} quizSet={quizSet} />
        ) : (
          <QuizCard key={quizSet.id} quizSet={quizSet} />
        ),
      )}
    </div>
  );
};
