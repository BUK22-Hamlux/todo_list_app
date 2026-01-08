import Header from './components/layout/Header';
import Dashboard from './pages/Dashboard';
import { useEffect } from 'react';
import Modal from './components/common/Modal';

function App() {
  useEffect(() => {
          if (window.lucide) {
              window.lucide.createIcons();
          }
              
      }, []);
  return (
    <div className="app">
      <Header />
      <Dashboard />
    </div>
  );
}

export default App;