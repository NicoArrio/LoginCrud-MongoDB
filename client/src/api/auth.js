import axios from 'axios';

const API = 'http://localhost:3000/api' //nuestro back

//crea un regis, te pasan un user, tu enviaras una peti post -> /register con ese user q te pasaron
export const registerRequest = user => axios.post(`${API}/register`,user) 


//probando si configure bien github