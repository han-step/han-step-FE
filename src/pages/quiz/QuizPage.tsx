import { useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import {
  QuizHeader,
  QuizQuestionCard,
  QuizNavigation,
  QuizResult,
} from './components';
import { useQuizProgress } from './hooks/useQuizProgress';
import { useGetQuizSetDetail } from './hooks/useGetQuizSetDetail';
import { usePostSubmitQuizSet } from './hooks/usePostSubmitQuizSet';

const QuizPage = () => {
  const { id } = useParams<{ id: string }>();
  const quizSetId = id ? parseInt(id, 10) : 0;

  const { data: quizSet, isLoading } = useGetQuizSetDetail(quizSetId ?? 0);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [startTime] = useState(Date.now());
  const [answeredQuizId, setAnsweredQuizId] = useState<number | null>(null);

  const submitMutation = usePostSubmitQuizSet(quizSetId ?? 0);

  const { completedQuizIds } = useQuizProgress({
    quizSet,
    currentIndex,
    answers,
    startTime,
    answeredQuizId,
    submitMutation,
    setCurrentIndex,
    setAnsweredQuizId,
  });

  const handleSubmit = useCallback(() => {
    if (!quizSet) return;

    const totalCount = quizSet.quizzes.length;
    let correctCount = 0;

    quizSet.quizzes.forEach((quiz) => {
      if (answers[quiz.id] === quiz.answer) {
        correctCount++;
      }
    });

    const elapsedMillis = Date.now() - startTime;

    submitMutation.mutate({
      totalCount,
      correctCount,
      elapsedMillis,
    });
  }, [quizSet, answers, startTime, submitMutation]);

  const handleAnswer = (quizId: number, answer: string) => {
    // 선택만 저장하고, 답변 완료는 확인 버튼을 눌러야 함
    if (answeredQuizId !== null) return; // 이미 답변한 경우 무시

    setAnswers((prev) => ({ ...prev, [quizId]: answer }));
  };

  const handleConfirm = () => {
    if (!quizSet) return;
    const currentQuiz = quizSet.quizzes[currentIndex];

    // 확인 버튼을 눌렀을 때 답변 완료 처리
    setAnsweredQuizId(currentQuiz.id);
  };

  if (isLoading) {
    return (
      <div className='flex items-center justify-center p-6 min-h-[400px] mt-4'>
        <div className='flex flex-col items-center gap-3'>
          <div className='w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin' />
          <div className='text-muted-foreground'>로딩 중...</div>
        </div>
      </div>
    );
  }

  if (!quizSet) {
    return (
      <div className='flex items-center justify-center p-6 min-h-[400px] mt-4'>
        <div className='text-muted-foreground'>퀴즈를 찾을 수 없습니다.</div>
      </div>
    );
  }

  const currentQuiz = quizSet.quizzes[currentIndex];
  const isLastQuestion = currentIndex === quizSet.quizzes.length - 1;
  const allAnswered = Object.keys(answers).length === quizSet.quizzes.length;

  // 제출 중이거나 제출 완료된 경우 전체 문제 수로 계산
  // 확인 버튼을 누른 문제만 카운트에 포함
  const answeredCount = (() => {
    if (submitMutation.isSuccess || submitMutation.isPending) {
      return quizSet.quizzes.length;
    }

    // 확인 버튼을 누른 문제들만 카운트
    return completedQuizIds.size;
  })();

  if (submitMutation.isSuccess && submitMutation.data) {
    return <QuizResult result={submitMutation.data} />;
  }

  return (
    <div className='p-6 mt-4'>
      <QuizHeader
        quizSet={quizSet}
        currentIndex={currentIndex}
        answeredCount={answeredCount}
      />

      <QuizQuestionCard
        quiz={currentQuiz}
        selectedAnswer={answers[currentQuiz.id]}
        isAnswered={answeredQuizId === currentQuiz.id}
        onAnswerSelect={(answer) => handleAnswer(currentQuiz.id, answer)}
        onConfirm={handleConfirm}
      />

      {/* 마지막 문제가 아닐 때만 제출하기 버튼 표시 (마지막 문제는 확인 버튼으로 자동 제출) */}
      {answeredQuizId === null && !isLastQuestion && (
        <QuizNavigation
          isLastQuestion={isLastQuestion}
          allAnswered={allAnswered}
          isSubmitting={submitMutation.isPending}
          onSubmit={handleSubmit}
        />
      )}
    </div>
  );
};

export default QuizPage;
