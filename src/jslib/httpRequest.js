import axios from 'axios';
const service = axios.create({
    baseURL: process.env.NODE_ENV === 'production' ? 'http://online':'http://test',
    timeout: 30 * 1000,
    headers: {
        'Content-Type': 'application/json',
        'authorization': localStorage.getItem('token')
    }
});
service.interceptors.response.use(response => {
    service.defaults.headers.authorization = localStorage.getItem('token');
    return response;
}, (error) => {
    let { status } = error.response;
    // token过期，需要重新登录
    if (status === 401) {
        localStorage.clear();
        window.location.reload();
    }
    return Promise.reject(error);
});
export default service;