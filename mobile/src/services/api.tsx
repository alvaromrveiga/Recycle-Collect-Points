import axios from 'axios';
import serverAddres from '../serverAddress'

const api = axios.create({
    baseURL: serverAddres
})

export default api;