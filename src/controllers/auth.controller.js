import User from '../models/user.model.js';
import bcrypt from 'bcryptjs';
import { createAccessToken} from '../libs/jwt.js';


export const register = async (req, res) => {
    const {email, password,username} = req.body
    try {
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
        res.status(500).json({ message: error.message});
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

export const profile = (req,res) => {
    res.send('profile');
};