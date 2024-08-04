import jwt from "jsonwebtoken"; 
import { TOKEN_SECRET } from "../config.js";

//next=en vez return to client, continua xq hay una funct desp de esta
export const authRequired = (req, res, next) => {
    const {token} = req.cookies
    if (!token) 
        return res.status(401).json({ message: "no token, authorization denied"});

        //verificate if token fue generado x nosotros
        jwt.verify(token, TOKEN_SECRET, (err, user) =>{
            if (err) return res.status(403).json({message: "Invalid Token"});

            //req = peticion q esta llegando y lo guardo ahi
            req.user = user //la peticion user guarda a "USER"
            next();
        })
}