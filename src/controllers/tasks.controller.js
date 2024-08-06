import Task from '../models/task.model.js';

//obtener una tarea
export const getTasks = async (req, res) => {
    const tasks = await Task.find({ //peticion para buscar todas las tareas donde el user ID sea igual con el ID autenticado
        user: req.user.id
    }).populate('user')//en vez de devolver un user ID->traeme y mostrame todos los datos del usuario
    res.json(tasks) //respuesta
};

//crear una tarea
export const createTask = async (req, res) => {
    const { title, description, date } = req.body // Extrae los datos del cuerpo de la solicitud (request body)

    const newTask = new Task ({ // Crea una nueva instancia del modelo Task con los datos extraídos
        title,
        description,
        date,
        user: req.user.id //paso anteriormente x AuthRequired->req.user(id)
    }) 
    const savedTask = await newTask.save();//nueva task, guardada en la db
    res.json(savedTask)//return to client
};

//obtener una tarea especifica
export const getTask = async (req, res) => {
    const task = await Task.findById(req.params.id).populate('user')// Busca la task en db utilizando el ID pasado en la URL // traeme y mostrame todos los datos del usuario
    if (!task) return res.status(404).json({ message: 'Task not found' });
    res.json(task);
};

//eliminar una tarea especifica
export const deleteTask = async (req, res) => {
    const task = await Task.findByIdAndDelete(req.params.id)// Busca y elimina la task en db utilizando el ID pasado en la URL, lo devuelve en la const task
    if (!task) return res.status(404).json({ message: 'Task not found' });
    return res.sendStatus(204); //no me devuelvas lo eliminado. solo dame un aviso
};


//actualizar una tarea especifica
export const updateTask = async (req, res) => {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
        new: true //se agrega para q return la tarea actualizada y no la anterior
    });// Busca y actualiza la task en db usando el ID proporcionado y los nuevos datos
    if (!task) return res.status(404).json({ message: 'Task not found' });
    res.json(task);
};
