import { createContext, useContext, useState, useEffect} from "react";
import { registerRequest, loginRequest, verifyTokenRequest } from "../api/auth";
import Cookies from 'js-cookie';

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
            console.log(res) //muestra en consola el req
            setIsAuthenticated(true) //autentifica al user si se loguea
            setUser(res.data) //guarda los datos del user 
        } catch (error) {
            if (Array.isArray(error.response.data)){ //el obj array de (e.r.d = formato de axios), si el error es un array
                return setErrors(error.response.data) // establecelo tal cual y acaba ahi
            }
            setErrors([error.response.data.message]) // sino es un array, establece y crea un array (con el error con la propiedad message)
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

    useEffect(() => { //si carga la app, haras una consulta al back 
        function checkLogin () {
            const cookies = Cookies.get() // Obtiene todas las cookies almacenadas en el navegador

            if (cookies.token) { //si hay un token 
                try {
                    const res = verifyTokenRequest(cookies.token) //vas a enviar desde cookie el token, q has encontrado  
                    console.log(res.data)
                    if (!res.data) setIsAuthenticated(false) //sino hay respuesta 

                    isAuthenticated(true) //si hay respuesta
                    setUser(res.data) // con los datos
                } catch (error) { //si axios recibio un error 
                    setIsAuthenticated(false) 
                    setUser(null) //no hay usuario
                } 
            }
        }
        checkLogin()//cuando carga lo ejecutaras "checkLogin"
    },[]) 

    //exportamos signup y signin
    return <AuthContext.Provider 
        value={{ signup, signin, user, isAuthenticated, errors,}}>  {/* //valor obj, xq son varios datos */}
            {children} {/* Asegúrate de que esté en minúscula */}
    </AuthContext.Provider>
}