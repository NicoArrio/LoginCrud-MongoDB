import User from '../models/user.model.js';
import bcrypt from 'bcryptjs';
import { createAccessToken} from '../libs/jwt.js';
import jwt from 'jsonwebtoken';
import { TOKEN_SECRET } from '../config.js';


export const register = async (req, res) => {
    const {email, password,username} = req.body
    try {
        
        //validacion del usuario
        const userFound = await User.findOne({email})
        if (userFound) return res.status(400).json(['The email already exists']) //mens modo array para tener el mismo formato q zod

        /*metodo hash:
        * convierte un string -> serie de caracte aleatorios
        * 10 : cant de veces q se ejectura el algor
        */
        const passwordHash = await bcrypt.hash(password,10) // 1-entra un hash, se encripta

        //crea el objeto, lo modificas y lo guarda desp
        const newUser = new User({ // 2- se crea un usuario
            username,
            email,
            password: passwordHash,
        })

        //const save obj in db
        const userSaved = await newUser.save(); // 3- se guarda el usuario

        const token = await createAccessToken({ id: userSaved._id }); //4- se crea el token

        res.cookie('token', token, {//5-lo estableces en una cookie la respuesta(metodo express)

            httpOnly: true, // asegura que la cookie solo sea accesible desde el servidor
            secure: process.env.NODE_ENV === 'production', // enviar cookies solo a través de HTTPS en producción
            sameSite: 'lax', // protección CSRF
        }); 

        res.json({ //6-envias la respuesta
            //devuelva al front los sig datos
            id: userSaved._id,
            username: userSaved.username,
            email: userSaved.email,
            createdAt: userSaved.createdAt,
            updateAt: userSaved.updatedAt,
        }) 

    } catch (error) {
        res.status(500).json({ message: error.message});
    }
};

export const login = async (req, res) => {
    const {email, password} = req.body //solo necesito estos datos
    try {
        
        const userFound = await User.findOne({email}) //buscamos un usuario (atravez del mail)
        if (!userFound) return res.status(400).json({ message: "User not found"}) 
        
        const isMatch = await bcrypt.compare(password, userFound.password) //compara pass&userFound y return true si encuentra ambas
        if(!isMatch) return res.status(400).json({ message: "incorrect password"})

        const token = await createAccessToken({ id: userFound._id }); //vas a tomar el ID del user y crear un token con ella

        res.cookie('token', token, {//lo estableces en una cookie la respuesta(metodo express)

            httpOnly: true, // asegura que la cookie solo sea accesible desde el servidor
            secure: process.env.NODE_ENV === 'production', // enviar cookies solo a través de HTTPS en producción
            sameSite: 'lax', // protección CSRF
        }); 

        res.json({ //6-envias la respuesta
            //devuelva al front los sig datos
            id: userFound._id,
            username: userFound.username,
            email: userFound.email,
            createdAt: userFound.createdAt,
            updateAt: userFound.updatedAt,
        }) 

    } catch (error) {
        res.status(500).json({ message: error.message}); //mensaje de error x si no esta correcto el formato
    }
};

//para cerrar el token
export const logout = (req, res) =>{
    /**para eliminar algo, desde respond, tenemos el method cookie
     * token: establecido anteriormente en res.cookie su valor de token de verdad
     * "": cuando voy a hacer un logout el valor va a estar vacio
     * expires: fec de exp 0 = no va a haber token
    **/
    res.cookie('token', '',{
        expires: new Date(0)
    })
    return res.sendStatus(200); //no enviamos ningun mensj
};

export const profile = async (req,res) => {
    const userFound = await User.findById(req.user.id)//devuelve todos los datos q pertenecen a ese user
    //sino encontramos nada
    if(!userFound) return res.status(400).json({message: "user not found"});
    //if found return this data
    return res.json({
        id: userFound._id,
        username: userFound.username,
        email: userFound.email,
        createdAt: userFound.createdAt,
        updateAt: userFound.updateAt,
    })
};

//metodo de verificacion de token
export const verifyToken = async (req, res) =>{
    const {token} = req.cookies // Obtiene el token de las cookies de la solicitud

     // Si no hay un token en las cookies, devuelve un error de autorización
    if (!token) return res.status(401).json({ message: "Unauthorized"});

     // Verifica la validez del token utilizando el método jwt.verify
    jwt.verify(token, TOKEN_SECRET, async(err, user) => {
        
        // Si hay un error en la verificación, devuelve un error de autorización
        if (err) return res.status(401).json({ message: "Unauthorized"})
        
        // Busca al usuario en la base de datos por su ID
        const userFound = await User.findById(user.id)

        // Si no se encuentra el usuario, devuelve un error de autorización
        if (!userFound) return res.status(401).json({ message: "Unauthorized"})

        // Si todo es correcto, responde con la información del usuario
        return res.json({
            id: userFound._id,
            username: userFound.username,
            email: userFound.email,
        });
    })
}