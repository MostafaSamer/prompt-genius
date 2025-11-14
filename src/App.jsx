import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Settings from './pages/Settings';
import Prompt from './pages/Prompt';
import BlackLayout from './layouts/BlackLayout';
import SideMenuLayout from './layouts/SideMenuLayout';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<BlackLayout><Dashboard /></BlackLayout>} />
        <Route path="/sign-in" element={<BlackLayout><SignIn /></BlackLayout>} />
        <Route path="/sign-up" element={<BlackLayout><SignUp /></BlackLayout>} />
        <Route path="/dashboard" element={<BlackLayout><Dashboard /></BlackLayout>} />
        <Route path="/settings" element={<SideMenuLayout><Settings /></SideMenuLayout>} />
        <Route path="/prompt/:id" element={<BlackLayout><Prompt /></BlackLayout>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
