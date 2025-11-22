interface QuizNavigationProps {
  isLastQuestion: boolean;
  allAnswered: boolean;
  isSubmitting: boolean;
  onSubmit: () => void;
}

export const QuizNavigation = ({
  isLastQuestion,
  allAnswered,
  isSubmitting,
  onSubmit,
}: QuizNavigationProps) => {
  if (!isLastQuestion || !allAnswered) {
    return null;
  }

  return (
    <button
      onClick={onSubmit}
      disabled={isSubmitting}
      className='w-full px-6 py-3.5 bg-linear-to-r from-primary to-primary-hover text-primary-foreground rounded-xl font-semibold hover:shadow-lg transition-all duration-200 disabled:opacity-50'
    >
      {isSubmitting ? '제출 중...' : '제출하기'}
    </button>
  );
};
