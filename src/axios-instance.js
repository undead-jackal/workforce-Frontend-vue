import axios from 'axios'
axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';

const instance = axios.create({
    baseURL: 'http://api.codingfork.com/api/',
});

export default instance
// baseURL: 'http://localhost:8000/api/',
// baseURL: 'http://api.codingfork.com/api/',
