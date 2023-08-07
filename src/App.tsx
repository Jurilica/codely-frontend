import { BrowserRouter, Route, Routes } from 'react-router-dom';
import EditProblemPage from './features/problems/EditProblemPage';
import ProblemsPage from './features/problems/ProblemsPage';
import LoginPage from './features/auth/LoginPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage/>} />
        <Route path="/problems" element={<ProblemsPage/>} />
        <Route path="/problems/:id" element={<EditProblemPage/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
