import { Sparkles } from 'lucide-react';
import { useGetMyBriefing } from '../hooks/useGetMyBriefing';

export const HomeBriefing = () => {
  const { data: briefing, isLoading: briefingLoading } = useGetMyBriefing();

  return (
    <section className='bg-white rounded-2xl shadow-sm border border-border/50 p-6 hover:shadow-md transition-shadow'>
      <div className='flex items-center gap-3 mb-4'>
        <div className='w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center'>
          <Sparkles className='w-5 h-5 text-primary' />
        </div>
        <h2 className='text-xl font-semibold text-foreground'>AI 브리핑</h2>
      </div>
      {briefingLoading ? (
        <div className='bg-accent rounded-xl p-4 border border-border/30'>
          <div className='flex items-center justify-center py-8'>
            <div className='flex flex-col items-center gap-3'>
              <div className='w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin' />
              <div className='text-muted-foreground text-sm'>로딩 중...</div>
            </div>
          </div>
        </div>
      ) : briefing ? (
        <div className='bg-accent rounded-xl p-4 border border-border/30'>
          <p className='text-foreground whitespace-pre-wrap leading-relaxed text-[15px]'>
            {briefing.briefing}
          </p>
        </div>
      ) : (
        <div className='bg-accent rounded-xl p-4 border border-border/30'>
          <div className='text-center py-8 text-muted-foreground'>
            브리핑을 불러올 수 없습니다.
          </div>
        </div>
      )}
    </section>
  );
};
