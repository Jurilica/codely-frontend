import { BrowserRouter, Route, Routes } from 'react-router-dom';
import EditProblemPage from './features/problems/EditProblemPage';
import ProblemsPage from './features/problems/ProblemsPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ProblemsPage/>} />
        <Route path="/problems" element={<ProblemsPage/>} />
        <Route path="/problems/:id" element={<EditProblemPage/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
