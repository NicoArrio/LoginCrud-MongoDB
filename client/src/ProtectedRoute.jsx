import { Navigate, Outlet } from "react-router-dom"
import { useAuth } from "./context/AuthContext"

function ProtectedRoute(){
    const {user, isAuthenticated} = useAuth //acceso al contexto, q contiene 2 metodos

    if (!isAuthenticated) return <Navigate to='/login' replace/> //no authen, lo regrasar al login, rp= no vuelva a la ruta anterior


    return <Outlet/> //si authen, continua con el componente correspondiente
}

export default ProtectedRoute