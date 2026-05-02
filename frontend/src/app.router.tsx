import { createBrowserRouter, Navigate } from 'react-router';
import { VideoLayout } from './videos/layouts/VideoLayout';
import { FeedPage } from './videos/pages/feed/FeedPage';

export const appRouter = createBrowserRouter([
  {
    path: '/',
    element: <VideoLayout />,
    children: [
      {
        index: true,
        element: <FeedPage />,
      },
    ],
  },
  {
    path: '*',
    element: <Navigate to="/" />,
  },
]);
