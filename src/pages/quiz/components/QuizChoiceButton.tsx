import { CheckCircle2, XCircle } from 'lucide-react';

interface QuizChoiceButtonProps {
  choice: string;
  isSelected: boolean;
  isAnswered: boolean;
  isCorrect: boolean;
  onSelect: () => void;
}

export const QuizChoiceButton = ({
  choice,
  isSelected,
  isAnswered,
  isCorrect,
  onSelect,
}: QuizChoiceButtonProps) => {
  const getButtonStyle = () => {
    if (!isAnswered) {
      return isSelected
        ? 'border-primary bg-linear-to-r from-primary/10 to-primary/5 shadow-sm'
        : 'border-border/50 hover:border-border-primary/50 bg-white hover:bg-accent/30';
    }

    // 답변 후 스타일
    if (isCorrect) {
      return 'border-success bg-success/10';
    }
    if (isSelected && !isCorrect) {
      return 'border-destructive bg-destructive/10';
    }
    return 'border-border/30 bg-gray-50 opacity-60';
  };

  const getIconStyle = () => {
    if (!isAnswered) {
      return isSelected
        ? 'border-primary bg-primary shadow-sm'
        : 'border-border';
    }

    if (isCorrect) {
      return 'border-success bg-success';
    }
    if (isSelected && !isCorrect) {
      return 'border-destructive bg-destructive';
    }
    return 'border-border/30 bg-gray-200';
  };

  return (
    <button
      onClick={onSelect}
      disabled={isAnswered}
      className={`w-full text-left p-4 rounded-xl border-2 transition-all duration-200 ${getButtonStyle()} ${
        isAnswered ? 'cursor-not-allowed' : 'cursor-pointer'
      }`}
    >
      <div className='flex items-center gap-4'>
        <div
          className={`w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 transition-all ${getIconStyle()}`}
        >
          {isAnswered ? (
            isCorrect ? (
              <CheckCircle2 className='w-4 h-4 text-success-foreground' />
            ) : isSelected ? (
              <XCircle className='w-4 h-4 text-destructive-foreground' />
            ) : null
          ) : isSelected ? (
            <div className='w-2.5 h-2.5 rounded-full bg-primary-foreground' />
          ) : null}
        </div>
        <span className='font-medium text-foreground'>{choice}</span>
      </div>
    </button>
  );
};
