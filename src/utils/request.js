import axios from 'axios';
import router from '../router';
import { Message } from 'element-ui';
import Vue from 'vue';
import Router from 'vue-router';
Vue.use(Router);
import {getToken} from '../utils/Func'
const service = axios.create({
    baseURL: '/api',
    timeout: 20000,
    headers: {
        retry: 1,
        "Content-Type": "application/json;"
    }
});
//拦截器
service.interceptors.request.use(
    config => {
        if (getToken()) {//localStorage.getItem('token')
            config.headers.token =getToken(); //localStorage.getItem('token');
        }
        config.retry = config.headers.retry;
        config.retryDelay = 1000;
        return config;
    },
        error => {
            return new Promise(() => {
        });
    }
);
axios.interceptors.response.use(undefined, function axiosRetryInterceptor(err) {
    let config = err.config;
    // If config does not exist or the retry option is not set, reject
    if(!config || !config.retry) return Promise.reject(err);

    // Set the variable for keeping track of the retry count
    config.__retryCount = config.__retryCount || 0;

    // Check if we've maxed out the total number of retries
    if(config.__retryCount >= config.retry) {
        // Reject with the error
        return Promise.reject(err);
    }
    // Increase the retry count
    config.__retryCount += 1;
    if(config.__retryCount === 3){
        Message.error("系统故障")
    }

    // Create new promise to handle exponential backoff
    let backoff = new Promise(function(resolve) {
        setTimeout(function() {
            resolve();
        }, config.retryDelay || 1);
    });

    // Return the promise in which recalls axios to retry the request
    return backoff.then(function() {
        return axios(config);
    });
});

//响应拦截
service.interceptors.response.use(
    response => {
        if (response.status === 200) {

            if(response.headers['content-disposition']){
                return response;
            }
            if( response.data.code === 403){
                Message.success('请先登录');
                router.push('/login');
            }
            if( response.data.code === 401){
                Message.success('您没有权限');
            }
            if( response.data.code === 500){
                Message.error(response.data.msg);
            }
            else return response.data;
        }
        else {
            Promise.reject();
        }
    },
    error => {
        return Promise.reject(error);
    });

export  default  service