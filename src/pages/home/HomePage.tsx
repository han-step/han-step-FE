import { HomeBriefing, HomeInfo, HomeTitle } from './components';
import { useGetMyInfo } from './hooks/useGetMyInfo';
import { useGetMyBriefing } from './hooks/useGetMyBriefing';

const HomePage = () => {
  const { data: myInfo, isLoading: infoLoading } = useGetMyInfo();

  const { data: briefing, isLoading: briefingLoading } = useGetMyBriefing();

  if (infoLoading || briefingLoading) {
    return (
      <div className='flex items-center justify-center p-6 min-h-[400px] flex-1'>
        <div className='flex flex-col items-center gap-3'>
          <div className='w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin' />
          <div className='text-muted-foreground'>로딩 중...</div>
        </div>
      </div>
    );
  }

  if (!myInfo || !briefing) {
    return (
      <div className='flex items-center justify-center p-6 min-h-[400px] flex-1'>
        <div className='text-muted-foreground'>정보를 불러올 수 없습니다.</div>
      </div>
    );
  }

  return (
    <div className='p-6 space-y-6 flex-1'>
      <HomeTitle myInfo={myInfo} />
      <HomeInfo myInfo={myInfo} />
      <HomeBriefing briefing={briefing} />
    </div>
  );
};

export default HomePage;
