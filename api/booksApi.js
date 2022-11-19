
import axios from 'axios';



const booksApi = axios.create({
    baseURL: 'https://api.itbook.store/1.0'
});


export default booksApi;