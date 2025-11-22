import { TheHeader } from './TheHeader';
import { Outlet } from 'react-router-dom';

interface AppLayoutProps {
  showHeader?: boolean;
}

export default function AppLayout({ showHeader = true }: AppLayoutProps) {
  return (
    <div className='min-h-screen w-full bg-white flex flex-col'>
      <div className='mx-auto max-w-[600px] bg-background flex flex-col flex-1 w-full'>
        {showHeader && <TheHeader />}
        <div className='flex-1'>
          <Outlet />
        </div>
      </div>
    </div>
  );
}
