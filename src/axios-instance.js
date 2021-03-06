import axios from 'axios'
axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
axios.defaults.headers.post['Content-Type'] ='application/json;charset=utf-8';
axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';

var isDevelopment = true;

const instance = axios.create({
    baseURL: (isDevelopment) ?'http://localhost:8000/api/':'http://api.codingfork.com/api/',
});

export default instance
// baseURL: 'http://localhost:8000/api/',
// baseURL: 'http://api.codingfork.com/api/',
    