import { BrowserRouter, Route, Routes } from 'react-router-dom';
import EditProblemPage from './features/problems/EditProblemPage';
import ProblemsPage from './features/problems/ProblemsPage';
import LoginPage from './features/auth/LoginPage';
import RegistrationPage from './features/auth/RegistrationPage';

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
