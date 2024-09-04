import {BrowserRouter, Routes, Route} from 'react-router-dom';

import { AuthProvider } from './context/AuthContext';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import TaskPage from './pages/TaskPage';
import TaskFormePage from './pages/taskFormPage';
import ProfilePage from './pages/ProfilePage';
import HomePage from './pages/HomePage';

import ProtectedRoute from './ProtectedRoute';

function App() {
  return (
    <AuthProvider> {/* Asegúrate de que AuthProvider envuelva las rutas */}
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<HomePage/>} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<RegisterPage />} />
                    
                    <Route element={<ProtectedRoute/>}> {/* elemento padre de rutas protegidas */}
                      <Route path="/tasks" element={<TaskPage/>} />
                      <Route path="/add-task" element={<TaskFormePage/>} />
                      <Route path="/task/:id" element={<TaskFormePage/>} />
                      <Route path="/profile" element={<ProfilePage/>} />
                    </Route>
                </Routes>
            </BrowserRouter>
    </AuthProvider>
  )
}

export default App
