import {Router} from 'express'; //exportamos desde express su enrutador
import { authRequired } from '../middlewares/validateToken.js';
import {    
    getTask,
    getTasks,
    deleteTask,
    createTask,
    updateTask
} from '../controllers/tasks.controller.js';

const router = Router(); // lo ejecutamos 

//rutas tasks - {solo para usuarios autenticados }
router.get('/tasks', authRequired, getTasks) //obtener 
router.get('/tasks/:id', authRequired, getTask)//obtener uno especifico
router.post('/tasks', authRequired, createTask) //crear
router.delete('/tasks/:id', authRequired, deleteTask)//eliminar uno especifico
router.put('/tasks/:id', authRequired, updateTask)//actualizar uno especifico

export default router;