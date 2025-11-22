import { Sparkles } from 'lucide-react';
import type { MyBriefingResponse } from '@/types/api';

type HomeBriefingProps = {
  briefing: MyBriefingResponse;
};

export const HomeBriefing = ({ briefing }: HomeBriefingProps) => {
  return (
    <section className='bg-white rounded-2xl shadow-sm border border-border/50 p-6 hover:shadow-md transition-shadow'>
      <div className='flex items-center gap-3 mb-4'>
        <div className='w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center'>
          <Sparkles className='w-5 h-5 text-primary' />
        </div>
        <h2 className='text-xl font-semibold text-foreground'>AI 브리핑</h2>
      </div>
      {briefing ? (
        <div className='bg-accent rounded-xl p-4 border border-border/30'>
          <p className='text-foreground whitespace-pre-wrap leading-relaxed text-[15px]'>
            {briefing.briefing}
          </p>
        </div>
      ) : (
        <div className='text-center py-8 text-muted-foreground'>
          브리핑을 불러올 수 없습니다.
        </div>
      )}
    </section>
  );
};
