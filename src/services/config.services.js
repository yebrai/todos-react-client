// la configuracion inicial de TODAS las llamadas al Backend

import axios from "axios";

// crear el archivo base de servicios
const service = axios.create({
    baseURL: "http://localhost:5005/api"
})

export default service