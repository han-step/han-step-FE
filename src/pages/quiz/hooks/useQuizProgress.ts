import { useState, useEffect, useRef } from 'react';
import type { QuizSetDetailResponse } from '../../../types/api';
import type { UseMutationResult } from '@tanstack/react-query';

interface UseQuizProgressProps {
  quizSet: QuizSetDetailResponse | undefined;
  currentIndex: number;
  answers: Record<number, string>;
  startTime: number;
  answeredQuizId: number | null;
  submitMutation: UseMutationResult<
    {
      totalCount: number;
      correctCount: number;
      elapsedMillis: number;
    },
    Error,
    {
      totalCount: number;
      correctCount: number;
      elapsedMillis: number;
    },
    unknown
  >;
  setCurrentIndex: React.Dispatch<React.SetStateAction<number>>;
  setAnsweredQuizId: React.Dispatch<React.SetStateAction<number | null>>;
}

export const useQuizProgress = ({
  quizSet,
  currentIndex,
  answers,
  startTime,
  answeredQuizId,
  submitMutation,
  setCurrentIndex,
  setAnsweredQuizId,
}: UseQuizProgressProps) => {
  const [completedQuizIds, setCompletedQuizIds] = useState<Set<number>>(
    new Set(),
  );

  // answers를 ref로도 저장하여 useEffect 재실행 방지
  const answersRef = useRef<Record<number, string>>({});
  useEffect(() => {
    answersRef.current = answers;
  }, [answers]);

  // 완료된 문제 ID 추적
  useEffect(() => {
    if (answeredQuizId !== null) {
      setCompletedQuizIds((prev) => {
        const newSet = new Set([...prev, answeredQuizId]);
        return newSet;
      });
    }
  }, [answeredQuizId]);

  // 타이머 및 다음 문제 이동 로직
  useEffect(() => {
    // 제출 완료된 경우 타이머 실행하지 않음
    if (submitMutation.isSuccess) {
      return;
    }

    if (answeredQuizId !== null && quizSet) {
      const timer = setTimeout(() => {
        const isLastQuestion = currentIndex === quizSet.quizzes.length - 1;

        if (isLastQuestion) {
          // 마지막 문제면 제출
          const totalCount = quizSet.quizzes.length;
          let correctCount = 0;

          // ref에서 최신 answers 가져오기
          quizSet.quizzes.forEach((quiz) => {
            if (answersRef.current[quiz.id] === quiz.answer) {
              correctCount++;
            }
          });

          const elapsedMillis = Date.now() - startTime;

          submitMutation.mutate({
            totalCount,
            correctCount,
            elapsedMillis,
          });
        } else {
          // 다음 문제로 이동
          setCurrentIndex((prev) => prev + 1);
          setAnsweredQuizId(null);
        }
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [
    answeredQuizId,
    currentIndex,
    quizSet,
    startTime,
    submitMutation,
    setCurrentIndex,
    setAnsweredQuizId,
  ]);

  return { completedQuizIds };
};
