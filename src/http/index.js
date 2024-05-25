import axios from "axios"

const $host = axios.create({
    baseURL: process.env.REACT_APP_API_URL
})
const $authHost = axios.create({
    baseURL: process.env.REACT_APP_API_URL
})


const authInterceptor = config => {
    config.headers.authorization = `Bearer ${localStorage.getItem('token')}`
    return config
}

$authHost.interceptors.request.use(authInterceptor)


$authHost.interceptors.response.use(response => {
    return response;
 }, error => {
   if (error.response.status === 401) {
    localStorage.removeItem('token')
   }
   return error;
 });

export {
    $host,
    $authHost
}