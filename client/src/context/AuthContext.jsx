import { createContext, useContext, useState, useEffect} from "react";
import { registerRequest, loginRequest, verifyTokenRequest } from "../api/auth.js";
import Cookies from 'js-cookie';

export const AuthContext = createContext();

//va a hacer por mi el uso del contexto 
export const useAuth = () => {
    const context = useContext(AuthContext)
    console.log(context)
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
    const [loading, setLoading] = useState(true); //para que siempre este cargando

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
            console.log(error)
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

    useEffect(() => { // Cuando la aplicación carga, realizará una consulta al backend para verificar si el usuario está autenticado.
        console.log("AuthContext initialized"); // Mensaje de confirmación de que la función 'checkLogin' se ha inicializado.
        async function checkLogin () {
            const cookies = Cookies.get() // Obtiene todas las cookies almacenadas en el navegador
            console.log("Cookies:", cookies); // Muestra las cookies del usuario en la consola para depuración.
            if(!cookies.token){ // Si no hay un token presente en las cookies, el usuario no está autenticado.
                setIsAuthenticated(false); // Establece que el usuario no está autenticado.
                setUser(null); // No hay usuario, por lo tanto, se establece el valor de 'user' como null.
                setLoading(false); // Finaliza la carga, ya que no hay necesidad de verificar el token.
                return; // Salimos de la función porque no hay token.
            }
            try {
                const res = await verifyTokenRequest(cookies.token) // Enviaremos el token desde las cookies para verificarlo con el backend.
                console.log("Token verification response:", res); // Muestra la respuesta de la verificación del token para depuración.

                if (!res.data) { // Si no hay datos en la respuesta, significa que el token no es válido o ha expirado.
                    setIsAuthenticated(false);  // El usuario no está autenticado. 
                    setLoading(false); // Finaliza la carga.
                    return; // Salimos de la función porque la verificación falló.
                }
                setIsAuthenticated(true)  // Si la respuesta contiene datos, significa que el token es válido, por lo que el usuario está autenticado.
                setUser(res.data) // // Establecemos los datos del usuario que fueron devueltos por la verificación del token.
                //setLoading(false);
            } catch (error) { // Si ocurre un error durante la solicitud de verificación del token.
                console.log("Error verifying token:", error); // Muestra el error en la consola para depuración.
                setIsAuthenticated(false) // En caso de error, asumimos que el usuario no está autenticado.
                setUser(null) // Como no hay usuario autenticado, lo establecemos como null.
                //setLoading(false)
            } finally {
            setLoading(false); // Siempre finalizamos la carga, independientemente de si la solicitud fue exitosa o falló.
            }
        }
        checkLogin();//cuando carga lo ejecutaras "checkLogin"
    },[]) // El array vacío indica que este efecto solo se ejecuta una vez, cuando el componente se monta.

    //exportamos signup y signin
    return <AuthContext.Provider 
        value={{ signup, signin,loading, user, isAuthenticated, errors,}}>  {/* //valor obj, xq son varios datos */}
            {children} {/* Asegúrate de que esté en minúscula */}
    </AuthContext.Provider>
}