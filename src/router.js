import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import TaskManagerPage from './pages/TaskManagerPage';

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<TaskManagerPage/>}/>
        <Route path='*' element={<Navigate to='/'/>}/>
      </Routes>
    </BrowserRouter>
  );
}
