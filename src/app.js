import express from 'express';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';

import authRoutes from './routes/auth.routes.js';
import tasksRoutes from './routes/task.routes.js'

const app = express(); // Inicializar la aplicación

app.use(morgan('dev')); // Usar morgan para el logging

//backend no entiende los datos JSON cuando creamos un servidor Express
app.use(express.json());// Middleware para parsear JSON

app.use(cookieParser());//middleware para convertirlo cookie a un obj JSO

// Usar las rutas de autenticación con un prefijo
app.use('/api', authRoutes);
app.use('/api',tasksRoutes);



export default app;