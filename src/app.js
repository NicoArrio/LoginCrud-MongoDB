import express from 'express';
import morgan from 'morgan';
import authRoutes from './routes/auth.routes.js';

const app = express(); // Inicializar la aplicación

app.use(morgan('dev')); // Usar morgan para el logging

//backend no entiende los datos JSON cuando creamos un servidor Express
app.use(express.json());// Middleware para parsear JSON

// Usar las rutas de autenticación con un prefijo
app.use('/api', authRoutes);

export default app;