import { BrowserRouter, Route, Routes } from 'react-router-dom';
import CreateProblemPage from './features/problems/CreateProblemPage';
import EditProblemPage from './features/problems/EditProblemPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<CreateProblemPage/>} />
        <Route path="/problems/:id" element={<EditProblemPage/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
