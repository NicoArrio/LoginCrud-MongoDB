import axios from './axios.js';

const API = 'http://localhost:3000/api' //nuestro back

//crea un regis, te pasan un user, tu enviaras una peti post -> /register con ese user q te pasaron
export const registerRequest = user => axios.post(`/register`,user) 

export const loginRequest = user => axios.post(`/login`, user)

//petision req a auth/verify para verificar token
export const verifyTokenRequest = () => axios.get('/verify')