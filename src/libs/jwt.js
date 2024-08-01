import { TOKEN_SECRET } from "../config.js";
import jwt from 'jsonwebtoken';

export function createAccessToken(payload){//4- se crea el token

    // es un obj global de note 
    // puede q todo ande bien=resolve o mal=reject
    return new Promise((resolve,reject) => {

        //method sign: nos pide el dato q queremos guardar dentro del token
        jwt.sign( 
            payload, //nos pide el dato q queremos guardar dentro del token
            TOKEN_SECRET, //secretOrOprivateKey: string q usaremos para cifrar o descifrar lo q esta adentro
            {
                expiresIn: "1d", //options: de cuanto tiempo lo queremos
            },
            (err,token) => { //algorithm: tipo de algoritmo q queremos usar
                if (err) {
                    reject(err);
                    console.log(err);
                } else {
                    resolve(token);
                }
            }
        );
    });
}
