import { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Trophy,
  Clock,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { getQuizSetDetail, submitQuizSet } from '../api';
import { KOREAN_LEVEL_LABELS } from '../constants/api';

const QuizPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const quizSetId = id ? parseInt(id, 10) : 0;

  const { data: quizSet, isLoading } = useQuery({
    queryKey: ['quizSetDetail', quizSetId],
    queryFn: () => getQuizSetDetail(quizSetId),
    enabled: !!quizSetId,
  });

  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [startTime] = useState(Date.now());
  const [isSubmitted, setIsSubmitted] = useState(false);

  const submitMutation = useMutation({
    mutationFn: (data: {
      totalCount: number;
      correctCount: number;
      elapsedMillis: number;
    }) => submitQuizSet(quizSetId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['quizSetList'] });
      setIsSubmitted(true);
    },
  });

  useEffect(() => {
    if (
      quizSet &&
      Object.keys(answers).length === quizSet.quizzes.length &&
      !isSubmitted
    ) {
      // 모든 문제에 답변했을 때 자동 제출
      handleSubmit();
    }
  }, [answers, quizSet, isSubmitted]);

  const handleAnswer = (quizId: number, answer: string) => {
    setAnswers((prev) => ({ ...prev, [quizId]: answer }));
  };

  const handleNext = () => {
    if (quizSet && currentIndex < quizSet.quizzes.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleSubmit = () => {
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
  };

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

  if (!quizSet) {
    return (
      <div className='flex items-center justify-center p-6 min-h-[400px]'>
        <div className='text-muted-foreground'>퀴즈를 찾을 수 없습니다.</div>
      </div>
    );
  }

  const currentQuiz = quizSet.quizzes[currentIndex];
  const isLastQuestion = currentIndex === quizSet.quizzes.length - 1;
  const allAnswered = Object.keys(answers).length === quizSet.quizzes.length;

  if (isSubmitted && submitMutation.data) {
    const result = submitMutation.data;
    return (
      <div className='p-6'>
        <div className='bg-white rounded-2xl shadow-lg border border-border/50 p-8 text-center'>
          <div className='w-20 h-20 rounded-full bg-linear-to-br from-primary to-primary-hover flex items-center justify-center mx-auto mb-6 shadow-lg'>
            <Trophy className='w-10 h-10 text-primary-foreground' />
          </div>
          <h2 className='text-3xl font-bold text-foreground mb-8'>
            퀴즈 완료!
          </h2>
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
                    {Math.floor(result.elapsedMillis / 1000 / 60)}:
                    {String(
                      Math.floor((result.elapsedMillis / 1000) % 60),
                    ).padStart(2, '0')}
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
  }

  const choices = currentQuiz.choices ? currentQuiz.choices.split(',') : [];

  return (
    <div className='p-6'>
      {/* 헤더 */}
      <div className='mb-6'>
        <div className='flex items-center justify-between mb-4'>
          <h1 className='text-2xl font-bold text-foreground'>
            {quizSet.title}
          </h1>
          <span className='px-4 py-1.5 bg-linear-to-r from-secondary to-secondary-hover text-secondary-foreground rounded-full text-sm font-semibold shadow-sm'>
            {KOREAN_LEVEL_LABELS[quizSet.level] || quizSet.level}
          </span>
        </div>
        <div className='flex items-center justify-between mb-3'>
          <div className='text-sm font-medium text-muted-foreground'>
            문제 {currentIndex + 1} / {quizSet.quizzes.length}
          </div>
          <div className='text-xs text-muted-foreground'>
            {Math.round(((currentIndex + 1) / quizSet.quizzes.length) * 100)}%
            완료
          </div>
        </div>
        <div className='w-full bg-muted rounded-full h-2.5 overflow-hidden'>
          <div
            className='bg-linear-to-r from-primary to-primary-hover h-full rounded-full transition-all duration-300 shadow-sm'
            style={{
              width: `${((currentIndex + 1) / quizSet.quizzes.length) * 100}%`,
            }}
          />
        </div>
      </div>

      {/* 문제 카드 */}
      <div className='bg-white rounded-2xl shadow-sm border border-border/50 p-6 mb-6 hover:shadow-md transition-shadow'>
        <div className='mb-6'>
          <h2 className='text-xl font-semibold text-foreground mb-6 leading-relaxed'>
            {currentQuiz.question}
          </h2>

          <div className='space-y-3'>
            {choices.map((choice, index) => {
              const choiceValue = choice.trim();
              const isSelected = answers[currentQuiz.id] === choiceValue;
              return (
                <button
                  key={index}
                  onClick={() => handleAnswer(currentQuiz.id, choiceValue)}
                  className={`w-full text-left p-4 rounded-xl border-2 transition-all duration-200 ${
                    isSelected
                      ? 'border-primary bg-linear-to-r from-primary/10 to-primary/5 shadow-sm'
                      : 'border-border/50 hover:border-border-primary/50 bg-white hover:bg-accent/30'
                  }`}
                >
                  <div className='flex items-center gap-4'>
                    <div
                      className={`w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 transition-all ${
                        isSelected
                          ? 'border-primary bg-primary shadow-sm'
                          : 'border-border'
                      }`}
                    >
                      {isSelected && (
                        <div className='w-2.5 h-2.5 rounded-full bg-primary-foreground' />
                      )}
                    </div>
                    <span
                      className={`font-medium ${
                        isSelected ? 'text-foreground' : 'text-foreground'
                      }`}
                    >
                      {choiceValue}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* 네비게이션 버튼 */}
      <div className='flex items-center justify-between gap-4'>
        <button
          onClick={handlePrev}
          disabled={currentIndex === 0}
          className='flex items-center gap-2 px-6 py-3.5 bg-secondary text-secondary-foreground rounded-xl font-semibold hover:bg-secondary-hover transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-secondary'
        >
          <ChevronLeft className='w-5 h-5' />
          이전
        </button>

        {isLastQuestion && allAnswered ? (
          <button
            onClick={handleSubmit}
            disabled={submitMutation.isPending}
            className='flex-1 px-6 py-3.5 bg-linear-to-r from-primary to-primary-hover text-primary-foreground rounded-xl font-semibold hover:shadow-lg transition-all duration-200 disabled:opacity-50'
          >
            {submitMutation.isPending ? '제출 중...' : '제출하기'}
          </button>
        ) : (
          <button
            onClick={handleNext}
            disabled={isLastQuestion}
            className='flex items-center gap-2 flex-1 px-6 py-3.5 bg-linear-to-r from-primary to-primary-hover text-primary-foreground rounded-xl font-semibold hover:shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed justify-center'
          >
            다음
            <ChevronRight className='w-5 h-5' />
          </button>
        )}
      </div>
    </div>
  );
};

export default QuizPage;
