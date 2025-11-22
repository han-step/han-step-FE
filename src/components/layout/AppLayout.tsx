import { TheHeader } from './TheHeader';
import { Outlet } from 'react-router-dom';

interface AppLayoutProps {
  showHeader?: boolean;
  headerType?: 'main' | 'sub';
}

export default function AppLayout({
  showHeader = true,
  headerType = 'main',
}: AppLayoutProps) {
  return (
    <div className='min-h-screen w-full bg-white flex flex-col'>
      <div className='mx-auto max-w-[600px] bg-background flex flex-col flex-1 w-full'>
        {showHeader && <TheHeader headerType={headerType} />}
        <div className='flex-1'>
          <Outlet />
        </div>
      </div>
    </div>
  );
}
