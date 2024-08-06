import {Router} from 'express'; //exportamos desde express su enrutador
import { authRequired } from '../middlewares/validateToken.js';
import {    
    getTask,
    getTasks,
    deleteTask,
    createTask,
    updateTask
} from '../controllers/tasks.controller.js';
import { validateSchema } from '../middlewares/validator.middleware.js';
import { createTaskSchema } from '../schemas/task.schema.js';

const router = Router(); // lo ejecutamos 

//rutas tasks - {solo para usuarios autenticados }
//URL->validacion de usuario autenticado->validacion de creacion de datos->creacion de la tarea
router.get(
    '/tasks', 
    authRequired, 
    validateSchema(createTaskSchema),
    getTasks
); //obtener 

router.get('/tasks/:id', authRequired, getTask)//obtener uno especifico

router.post(
    '/tasks', 
    authRequired,
    validateSchema(createTaskSchema),
    createTask
); //crear

router.delete('/tasks/:id', authRequired, deleteTask)//eliminar uno especifico

router.put('/tasks/:id', authRequired, updateTask)//actualizar uno especifico

export default router;