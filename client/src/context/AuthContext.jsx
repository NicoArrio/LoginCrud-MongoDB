import { Children, createContext, useContext, useState} from "react";

import { registerRequest } from "../api/auth";

export const AuthContext = createContext();

//va a hacer por mi el uso del contexto 
export const useAuth = () => {
    const context = useContext(AuthContext)
    if (!context){
        throw new Error ("useAuth must be used within an AuthProvider")
    }
    return context; // Agrega esta línea
}

//cracion de un Provider(compo q engloba a otros)
//provi recibe un elem hijo, return provi
export const AuthProvider = ({children}) => {
    const [user,setUser] = useState(null) //usuario q va a ser leido en toda la app
    const [isAuthenticated, setIsAuthenticated] = useState(false);//si se registra correctamente, se autentifica
    const [errors, setErrors] = useState([]); //areglo vacio para evitar errores

    /*llame a signup: va a hacer la peticion, va a recibir 
    *la respuesta y cuando reciba la respuesta. 
    *Queremos q estos datos q recibo los guardes en user
    */
    const signup = async (user) => {
        try {
            const res = await registerRequest(user) //solicitud HTTP envía los datos del formulario al servidor
            console.log(res.data);
            setUser(res.data);//lo establecemos
            setIsAuthenticated(true);//autenticado
        } catch (error) {
            console.log(error.response)
            setErrors(error.response.data)
        }
    }

    //exportamos signup
    return <AuthContext.Provider 
        value={{ signup, user, isAuthenticated, errors,}}>  {/* //valor obj, xq son varios datos */}
            {children} {/* Asegúrate de que esté en minúscula */}
    </AuthContext.Provider>
}