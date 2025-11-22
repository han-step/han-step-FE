import AppLayout from '@/components/layout/AppLayout';
import { HomePage, QuizListPage, QuizPage } from '@/pages';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
    ],
  },
  {
    path: '/quiz-list',
    element: <AppLayout headerType='sub' />,
    children: [
      {
        index: true,
        element: <QuizListPage />,
      },
    ],
  },
  {
    path: '/quiz/:id',
    element: <AppLayout showHeader={false} />,
    children: [
      {
        index: true,
        element: <QuizPage />,
      },
    ],
  },
]);

const Router = () => {
  return <RouterProvider router={router} />;
};

export default Router;
