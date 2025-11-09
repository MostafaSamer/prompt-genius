import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Settings from './pages/Settings';
import Prompt from './pages/Prompt';
import BlackLayout from './layouts/BlackLayout';
import SideMenuLayout from './layouts/SideMenuLayout';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<BlackLayout><Dashboard /></BlackLayout>} />
        <Route path="/dashboard" element={<BlackLayout><Dashboard /></BlackLayout>} />
        <Route path="/settings" element={<SideMenuLayout><Settings /></SideMenuLayout>} />
        <Route path="/prompt" element={<BlackLayout><Prompt /></BlackLayout>} />
        <Route path="/prompt/:id" element={<BlackLayout><Prompt /></BlackLayout>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
