import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { HistoryPage } from './pages/history';
import GeneratorPage from './pages/generator/ui/GeneratorPage';
import Layout from './shared/components/layout/Layout';
import { AggregatePage } from './pages/aggregate';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { path: '/', element: <AggregatePage /> },
      { path: '/history', element: <HistoryPage /> },
      { path: '/generator', element: <GeneratorPage /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
