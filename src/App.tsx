import { BrowserRouter, Route, Routes } from 'react-router-dom';
import EditProblemPage from './features/admin/problems/EditProblemPage';
import AdminProblemsPage from './features/admin/problems/ProblemsPage';
import UserProblemsPage from './features/user/problems/ProblemsPage';
import UserProblemPage from './features/user/problems/ProblemPage';
import LoginPage from './features/shared/auth/LoginPage';
import RegistrationPage from './features/shared/auth/RegistrationPage';
import RequireAuth from './features/shared/auth/RequireAuth';
import Layout from './components/layout/Layout';
import './app.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout/>}>
          <Route path="/" element={<LoginPage/>} />
          <Route path="/login" element={<LoginPage/>} />
          <Route path="/register" element={<RegistrationPage/>} />
          <Route element={<RequireAuth/>}>
            <Route path="/problems" element={<UserProblemsPage/>} />
            <Route path="/problems/:id" element={<UserProblemPage/>} />
            <Route path="/admin/problems" element={<AdminProblemsPage/>} />
            <Route path="/admin/problems/:id" element={<EditProblemPage/>} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;