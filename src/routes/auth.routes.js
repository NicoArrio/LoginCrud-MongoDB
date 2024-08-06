import { Router } from 'express';
import { 
    login, 
    logout, 
    register, 
    profile,
} from '../controllers/auth.controller.js';
import {authRequired} from '../middlewares/validateToken.js';
import {validateSchema} from '../middlewares/validator.middleware.js';
import { registerSchema,loginSchema } from '../schemas/auth.schema.js';

//objeto router, q permite hacer peticiones
//post,put,delete,get
const router = Router(); 

//register=1-ejecutas el VL 
router.post('/register', validateSchema(registerSchema), register); //cuando haga una peticion post a register, ejecutaras register
router.post('/login', validateSchema(loginSchema), login);
router.post('/logout', logout);
router.get('/profile', authRequired, profile) //primero valida AR antes de entrar a profile
//export router xq creamos las rutas y tienen q anadirse a app.js
export default router;
