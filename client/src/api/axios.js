import axios from 'axios';

const instance = axios.create({ //dominio base donde va a consultar
    baseURL: 'http://localhost:3000/api',
    withCredentials: true,
})

export default instance

//configuracion de axios para el uso de cookies