import { ChevronLeft } from 'lucide-react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useEffect, useRef } from 'react';

export const TheHeader = ({ headerType }: { headerType: 'main' | 'sub' }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const currentPathRef = useRef(location.pathname);

  useEffect(() => {
    currentPathRef.current = location.pathname;
  }, [location.pathname]);

  const handleBack = () => {
    const currentPath = currentPathRef.current;

    // navigate(-1)을 호출
    navigate(-1);

    // 짧은 지연 후 위치가 변경되지 않았으면 home으로 이동
    setTimeout(() => {
      if (currentPathRef.current === currentPath) {
        navigate('/');
      }
    }, 100);
  };

  return (
    <nav className='bg-white/80 backdrop-blur-sm border-b border-border/50 shadow-sm sticky top-0 z-50'>
      <div className='px-6'>
        <div className='flex items-center justify-between h-16'>
          {headerType === 'main' ? (
            <Link
              to='/'
              className='text-xl font-bold bg-linear-to-r from-primary to-primary-hover bg-clip-text text-transparent'
            >
              한 걸음
            </Link>
          ) : (
            <button
              onClick={handleBack}
              className='text-xl font-bold bg-linear-to-r from-primary to-primary-hover bg-clip-text text-transparent flex items-center'
            >
              <ChevronLeft className='w-8 h-8 text-foreground' />
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};
