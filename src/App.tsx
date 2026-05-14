import { BrowserRouter } from 'react-router-dom';
import { AppRoutes } from '@/routes/AppRoutes';
import { ArticlesProvider } from '@/context/ArticlesContext';

const App = () => (
  <ArticlesProvider>
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  </ArticlesProvider>
);

export default App;
