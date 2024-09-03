import { Navigate, Outlet } from "react-router-dom"
import { useAuth } from "./context/AuthContext"

function ProtectedRoute(){
    const {loading, user, isAuthenticated} = useAuth //acceso al contexto, q contiene 2 metodos
    console.log(loading, user, isAuthenticated)

    if(loading) return <h1>
        Loading...
    </h1>

    if (!loading && !isAuthenticated) return <Navigate to='/login' replace/> //no authen, lo regrasar al login, rp= no vuelva a la ruta anterior


    return <Outlet/> //si authen, continua con el componente correspondiente
}

export default ProtectedRoute