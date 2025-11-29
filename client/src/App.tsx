import { BrowserRouter } from 'react-router-dom';
import Footer from './components/Footer'
import AppRoutes from './routes/AppRoutes';

function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
      <Footer />
    </BrowserRouter>
  );
}

export default App
