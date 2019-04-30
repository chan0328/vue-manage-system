import qs from 'qs';
import Vue from 'vue';
import axios from 'axios';
import utils from './utils';
import router from '../router';

const service = axios.create({
    baseURL: process.env.NODE_ENV === 'production' ? 'http://online':'http://test',
    timeout: 30 * 1000,
    headers: {
        'Content-Type': 'application/json',
        'authorization': sessionStorage.getItem('token')
    }
});
service.interceptors.request.use(
    config => {
        config.headers.token = sessionStorage.getItem('token') || '';
        if (config.method == 'post') {
            config.data = qs.stringify(config.data);
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);
service.interceptors.response.use(response => {
    if(response.data.code === 400){
        utils.endLoading();
        Vue.prototype.$message.error(response.data.message);
    }else if (response.data.code === 401) {
        // token过期，需要重新登录
        utils.endLoading();
        localStorage.clear();
        sessionStorage.clear();
        router.replace('/login');
    }
    return response;
}, (error) => {
    let { status } = error.response;
    return Promise.reject(error);
});
export default service;