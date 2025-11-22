import type { QuizInSetResponse } from '../../../types/api';
import { QuizChoiceButton } from './QuizChoiceButton';
import { WordOrderQuiz } from './WordOrderQuiz';

interface QuizQuestionCardProps {
  quiz: QuizInSetResponse;
  selectedAnswer: string | undefined;
  isAnswered: boolean;
  onAnswerSelect: (answer: string) => void;
  onConfirm?: () => void;
}

export const QuizQuestionCard = ({
  quiz,
  selectedAnswer,
  isAnswered,
  onAnswerSelect,
  onConfirm,
}: QuizQuestionCardProps) => {
  const isWordOrder = quiz.type === 'WORD_ORDER';

  return (
    <div className='bg-white rounded-2xl shadow-sm border border-border/50 p-6 mb-6 hover:shadow-md transition-shadow'>
      <div className='mb-6'>
        <h2 className='text-xl font-semibold text-foreground mb-6 leading-relaxed'>
          {quiz.question}
        </h2>

        {isWordOrder ? (
          <WordOrderQuiz
            quiz={quiz}
            selectedAnswer={selectedAnswer}
            isAnswered={isAnswered}
            onAnswerSelect={onAnswerSelect}
            onConfirm={onConfirm || (() => {})}
          />
        ) : (
          <ChoiceQuiz
            quiz={quiz}
            selectedAnswer={selectedAnswer}
            isAnswered={isAnswered}
            onAnswerSelect={onAnswerSelect}
            onConfirm={onConfirm || (() => {})}
          />
        )}
      </div>
    </div>
  );
};

const ChoiceQuiz = ({
  quiz,
  selectedAnswer,
  isAnswered,
  onAnswerSelect,
  onConfirm,
}: Omit<QuizQuestionCardProps, 'quiz'> & { quiz: QuizInSetResponse }) => {
  const choices = quiz.choices
    ? quiz.choices.split('|').map((c) => c.trim())
    : [];

  const hasSelection = selectedAnswer !== undefined;

  return (
    <div className='space-y-3'>
      {choices.map((choice, index) => {
        const isCorrect = choice === quiz.answer;
        const isSelected = selectedAnswer === choice;

        return (
          <QuizChoiceButton
            key={index}
            choice={choice}
            isSelected={isSelected}
            isAnswered={isAnswered}
            isCorrect={isCorrect}
            onSelect={() => onAnswerSelect(choice)}
          />
        );
      })}

      {/* 확인 버튼 */}
      {!isAnswered && (
        <button
          onClick={onConfirm}
          disabled={!hasSelection}
          className='w-full px-6 py-3.5 bg-linear-to-r from-primary to-primary-hover text-primary-foreground rounded-xl font-semibold hover:shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-none mt-4'
        >
          확인
        </button>
      )}
    </div>
  );
};
