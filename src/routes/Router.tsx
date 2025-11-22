import AppLayout from '@/components/layout/AppLayout';
import { HomePage, QuizListPage, QuizPage } from '@/pages';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout showHeader={true} />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: '/quiz-list',
        element: <QuizListPage />,
      },
      {
        path: '/quiz/:id',
        element: <QuizPage />,
      },
    ],
  },
]);

const Router = () => {
  return <RouterProvider router={router} />;
};

export default Router;
