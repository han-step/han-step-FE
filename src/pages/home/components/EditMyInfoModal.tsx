import { useState } from 'react';
import { X } from 'lucide-react';
import type { MyInfoResponse, KoreanLevel } from '@/types/api';
import { KOREAN_LEVEL_LABELS } from '@/constants/api';
import { usePostMyInfo } from '../hooks/usePostMyInfo';

interface EditMyInfoModalProps {
  myInfo: MyInfoResponse;
  isOpen: boolean;
  onClose: () => void;
}

export const EditMyInfoModal = ({
  myInfo,
  isOpen,
  onClose,
}: EditMyInfoModalProps) => {
  const [name, setName] = useState(myInfo.name);
  const [koreanLevel, setKoreanLevel] = useState<KoreanLevel>(
    myInfo.koreanLevel,
  );
  const { mutate: postMyInfo, isPending } = usePostMyInfo();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    postMyInfo(
      {
        name,
        koreanLevel,
      },
      {
        onSuccess: () => {
          onClose();
        },
      },
    );
  };

  if (!isOpen) return null;

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4'>
      <div className='bg-white rounded-2xl shadow-lg w-full max-w-md p-6'>
        {/* 헤더 */}
        <div className='flex items-center justify-between mb-6'>
          <h2 className='text-2xl font-bold text-foreground'>정보 수정</h2>
          <button
            onClick={onClose}
            className='text-muted-foreground hover:text-foreground transition-colors'
            disabled={isPending}
          >
            <X className='w-6 h-6' />
          </button>
        </div>

        {/* 폼 */}
        <form onSubmit={handleSubmit} className='space-y-4'>
          {/* 이름 입력 */}
          <div>
            <label
              htmlFor='name'
              className='block text-sm font-medium text-foreground mb-2'
            >
              이름
            </label>
            <input
              id='name'
              type='text'
              value={name}
              onChange={(e) => setName(e.target.value)}
              className='w-full px-4 py-2.5 border-2 border-border rounded-xl focus:outline-none focus:border-primary transition-colors'
              placeholder='이름을 입력하세요'
              required
              disabled={isPending}
            />
          </div>

          {/* 수준 선택 */}
          <div>
            <label
              htmlFor='koreanLevel'
              className='block text-sm font-medium text-foreground mb-2'
            >
              한국어 수준
            </label>
            <select
              id='koreanLevel'
              value={koreanLevel}
              onChange={(e) => setKoreanLevel(e.target.value as KoreanLevel)}
              className='w-full px-4 py-2.5 border-2 border-border rounded-xl focus:outline-none focus:border-primary transition-colors bg-white'
              required
              disabled={isPending}
            >
              <option value='BEGINNER'>{KOREAN_LEVEL_LABELS.BEGINNER}</option>
              <option value='INTERMEDIATE'>
                {KOREAN_LEVEL_LABELS.INTERMEDIATE}
              </option>
              <option value='ADVANCED'>{KOREAN_LEVEL_LABELS.ADVANCED}</option>
            </select>
          </div>

          {/* 버튼 */}
          <div className='flex gap-3 pt-4'>
            <button
              type='button'
              onClick={onClose}
              disabled={isPending}
              className='flex-1 px-4 py-3 border-2 border-border rounded-xl font-semibold text-foreground hover:bg-accent transition-colors disabled:opacity-50 disabled:cursor-not-allowed'
            >
              취소
            </button>
            <button
              type='submit'
              disabled={isPending || !name.trim()}
              className='flex-1 px-4 py-3 bg-linear-to-r from-primary to-primary-hover text-primary-foreground rounded-xl font-semibold hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-none'
            >
              {isPending ? '저장 중...' : '완료'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
