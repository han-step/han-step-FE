import { useState, useEffect } from 'react';
import { CheckCircle2, XCircle } from 'lucide-react';
import type { QuizInSetResponse } from '../../../types/api';

interface WordOrderQuizProps {
  quiz: QuizInSetResponse;
  selectedAnswer: string | undefined;
  isAnswered: boolean;
  onAnswerSelect: (answer: string) => void;
  onConfirm: () => void;
}

export const WordOrderQuiz = ({
  quiz,
  selectedAnswer,
  isAnswered,
  onAnswerSelect,
  onConfirm,
}: WordOrderQuizProps) => {
  const availableWords = quiz.choices
    ? quiz.choices.split('|').map((w) => w.trim())
    : [];
  const correctOrder = quiz.answer
    ? quiz.answer.split('|').map((w) => w.trim())
    : [];

  const [selectedWords, setSelectedWords] = useState<string[]>(
    selectedAnswer ? selectedAnswer.split('|').map((w) => w.trim()) : [],
  );

  // selectedAnswer prop 변경 시 내부 state 동기화
  // 외부에서 selectedAnswer가 변경된 경우(예: 문제 변경)에만 동기화
  useEffect(() => {
    if (selectedAnswer !== undefined) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setSelectedWords(
        selectedAnswer ? selectedAnswer.split('|').map((w) => w.trim()) : [],
      );
    }
  }, [selectedAnswer]);

  const handleWordClick = (word: string) => {
    if (isAnswered) return;

    if (selectedWords.includes(word)) {
      // 이미 선택된 단어면 제거
      const newWords = selectedWords.filter((w) => w !== word);
      setSelectedWords(newWords);
      // 선택된 단어가 있으면 answers에 저장 (확인 전까지는 답변으로 처리하지 않음)
      if (newWords.length > 0) {
        onAnswerSelect(newWords.join('|'));
      }
    } else {
      // 선택되지 않은 단어면 추가
      const newWords = [...selectedWords, word];
      setSelectedWords(newWords);
      // 선택된 단어가 있으면 answers에 저장 (확인 전까지는 답변으로 처리하지 않음)
      onAnswerSelect(newWords.join('|'));
    }
  };

  const handleRemoveWord = (index: number) => {
    if (isAnswered) return;

    const newWords = selectedWords.filter((_, i) => i !== index);
    setSelectedWords(newWords);
    // 선택된 단어가 있으면 answers에 저장
    if (newWords.length > 0) {
      onAnswerSelect(newWords.join('|'));
    }
  };

  const handleConfirm = () => {
    if (selectedWords.length === availableWords.length) {
      onConfirm();
    }
  };

  const isAllSelected = selectedWords.length === availableWords.length;
  const isCorrect = selectedAnswer === quiz.answer;

  return (
    <div className='space-y-4'>
      {/* 선택된 단어들 표시 */}
      <div className='min-h-[200px] p-4 bg-accent/30 rounded-xl border-2 border-dashed border-border/50'>
        {selectedWords.length === 0 ? (
          <div className='text-muted-foreground text-center py-4'>
            단어를 클릭하여 순서대로 선택하세요
          </div>
        ) : (
          <div className='flex flex-wrap gap-2'>
            {selectedWords.map((word, index) => (
              <button
                key={`${word}-${index}`}
                onClick={() => handleRemoveWord(index)}
                disabled={isAnswered}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  isAnswered
                    ? isCorrect
                      ? 'bg-success/20 text-success border-2 border-success'
                      : 'bg-destructive/20 text-destructive border-2 border-destructive'
                    : 'bg-primary/10 text-primary border-2 border-primary hover:bg-primary/20 cursor-pointer'
                }`}
              >
                {word}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* 사용 가능한 단어들 */}
      <div className='flex flex-wrap gap-2'>
        {availableWords.map((word, index) => {
          const isSelected = selectedWords.includes(word);
          const isUsed = isSelected;

          return (
            <button
              key={index}
              onClick={() => handleWordClick(word)}
              disabled={isAnswered || isUsed}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                isAnswered
                  ? isUsed
                    ? 'opacity-50 cursor-not-allowed'
                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  : isUsed
                    ? 'bg-primary/20 text-primary border-2 border-primary cursor-not-allowed opacity-50'
                    : 'bg-white text-foreground border-2 border-border hover:border-primary hover:bg-accent/30 cursor-pointer'
              }`}
            >
              {word}
            </button>
          );
        })}
      </div>

      {/* 확인 버튼 */}
      {!isAnswered && (
        <button
          onClick={handleConfirm}
          disabled={!isAllSelected}
          className='w-full px-6 py-3.5 bg-linear-to-r from-primary to-primary-hover text-primary-foreground rounded-xl font-semibold hover:shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-none'
        >
          확인
        </button>
      )}

      {/* 정답 표시 (답변 후) */}
      {isAnswered && (
        <div
          className={`mt-4 p-4 rounded-xl border-2 ${
            isCorrect
              ? 'bg-success/10 border-success'
              : 'bg-destructive/10 border-destructive'
          }`}
        >
          <div className='flex items-center gap-2 mb-2'>
            {isCorrect ? (
              <>
                <CheckCircle2 className='w-5 h-5 text-success' />
                <span className='font-semibold text-success'>정답입니다!</span>
              </>
            ) : (
              <>
                <XCircle className='w-5 h-5 text-destructive' />
                <span className='font-semibold text-destructive'>
                  틀렸습니다
                </span>
              </>
            )}
          </div>
          <div className='text-sm text-muted-foreground'>
            정답: {correctOrder.join(' ')}
          </div>
        </div>
      )}
    </div>
  );
};
