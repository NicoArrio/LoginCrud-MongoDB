import { Router } from 'express';
import { login, register } from '../controllers/auth.controller.js';

//objeto router, q permite hacer peticiones
//post,put,delete,get
const router = Router(); 

router.post('/register', register); //cuando haga una peticion post a register, ejecutaras register
router.post('/login', login);

//export router xq creamos las rutas y tienen q anadirse a app.js
export default router;
