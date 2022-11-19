


import axios from 'axios';



const databaseApi = axios.create({
    baseURL: '/api'
});


export default databaseApi;