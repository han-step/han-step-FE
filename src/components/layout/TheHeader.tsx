import { Link } from 'react-router-dom';

export const TheHeader = () => {
  return (
    <nav className='bg-white/80 backdrop-blur-sm border-b border-border/50 shadow-sm sticky top-0 z-50'>
      <div className='px-6'>
        <div className='flex items-center justify-between h-16'>
          <Link
            to='/'
            className='text-xl font-bold bg-linear-to-r from-primary to-primary-hover bg-clip-text text-transparent'
          >
            한 걸음
          </Link>
        </div>
      </div>
    </nav>
  );
};
