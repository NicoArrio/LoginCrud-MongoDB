import { Children, createContext, useContext, useState, useEffect} from "react";

import { registerRequest, loginRequest } from "../api/auth";

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

    const signin = async (user) => {
        try {
            const res = await loginRequest(user)
            console.log(res)
        } catch (error) {
            console.log(error)
            setErrors(error.response.data) //arreglo
        }
    }

    useEffect (() => { //creando un timeup para desaparecer mensaje de error
        if (errors.length > 0){ //si hay un error como min
            const timer = setTimeout(()=> { //guardamos el timer para ahorrar recursos
                setErrors([])
            },5000) //a los 5seg
            return () => clearTimeout(timer) //elimina el timer
        }
    }, [errors])
    //exportamos signup y signin
    return <AuthContext.Provider 
        value={{ signup, signin, user, isAuthenticated, errors,}}>  {/* //valor obj, xq son varios datos */}
            {children} {/* Asegúrate de que esté en minúscula */}
    </AuthContext.Provider>
}