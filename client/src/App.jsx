import {BrowserRouter, Routes, Route} from 'react-router-dom';

import { AuthProvider } from './context/AuthContext';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';

function App() {
  return (
    <AuthProvider> {/* Asegúrate de que AuthProvider envuelva las rutas */}
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<h1>Home Page</h1>} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<RegisterPage />} />
                    <Route path="/tasks" element={<h1>Tasks page</h1>} />
                    <Route path="/add-task" element={<h1>new task</h1>} />
                    <Route path="/task/:id" element={<h1>update task</h1>} />
                    <Route path="/profile" element={<h1>profile</h1>} />
                </Routes>
            </BrowserRouter>
        </AuthProvider>
  )
}

export default App