import User from '../models/user.model.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

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

        /*method sign:
        *  nos pide el dato q queremos guardar dentro del token
        *  secretOrOprivateKey: string q usaremos para cifrar o descifrar lo q esta adentro
        *  options: de cuanto tiempo lo queremos
        *  algorithm: tipo de algoritmo q queremos usar
        */
        jwt.sign( //4- se crea el token
            {
                id: userSaved._id,
            },
            "secret123",
            {
                expiresIn: "1d",
            },
            (err,token) => {
                if (err) console.log(err);
                res.json({token});
            }
        );

        // res.json({ //devuelva al front los sig datos
        //     id: userSaved._id,
        //     username: userSaved.username,
        //     email: userSaved.email,
        //     createdAt: userSaved.createdAt,
        //     updateAt: userSaved.updatedAt,
        // }) 

    } catch (error) {
        console.log(error);
    }
    
    
};

export const login = (req, res) => res.send("login");
