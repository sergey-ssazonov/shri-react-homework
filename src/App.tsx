import { createBrowserRouter, RouterProvider } from 'react-router-dom';
// import './App.css'
import HistoryPage from './pages/history/HistoryPage';
import AggregatePage from './pages/aggregate/ui/AggregatePage';
import GeneratorPage from './pages/generator/ui/GeneratorPage';
import Layout from './shared/components/layout/Layout';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />, // layout оборачивает все страницы
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
