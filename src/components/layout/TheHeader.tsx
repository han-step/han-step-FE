import { ChevronLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export const TheHeader = ({ headerType }: { headerType: 'main' | 'sub' }) => {
  return (
    <nav className='bg-white/80 backdrop-blur-sm border-b border-border/50 shadow-sm sticky top-0 z-50'>
      <div className='px-6'>
        <div className='flex items-center justify-between h-16'>
          {headerType === 'main' ? (
            <p className='text-xl font-bold  text-primary'>한걸음</p>
          ) : (
            <Link
              to='/'
              className='text-xl font-bold bg-linear-to-r from-primary to-primary-hover bg-clip-text text-transparent flex items-center'
            >
              <ChevronLeft className='w-8 h-8 text-foreground' />
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};
