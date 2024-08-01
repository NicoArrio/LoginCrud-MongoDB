import User from '../models/user.model.js';
import bcrypt from 'bcryptjs';
import { createAccessToken} from '../libs/jwt.js';

//para q se muestre algo 
//send mensj json
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

export const login = (req, res) => res.send("login");
