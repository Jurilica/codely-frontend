import { BrowserRouter, Route, Routes } from 'react-router-dom';
import EditProblemPage from './features/admin/problems/EditProblemPage';
import ProblemsPage from './features/admin/problems/ProblemsPage';
import LoginPage from './features/shared/auth/LoginPage';
import RegistrationPage from './features/shared/auth/RegistrationPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage/>} />
        <Route path="/login" element={<LoginPage/>} />
        <Route path="/register" element={<RegistrationPage/>} />
        <Route path="/problems" element={<ProblemsPage/>} />
        <Route path="/problems/:id" element={<EditProblemPage/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
