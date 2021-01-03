import router from '@/router/index.js';

const BASE_URL = process.env.NODE_ENV === 'production'
    ? '/api/'
    : 'http://localhost:3030/api/'

import Axios from 'axios';
var axios = Axios.create({
    withCredentials: true
});

axios.interceptors.request.use(config => {
    NProgress.start()
    return config
  })

  axios.interceptors.response.use(response => {
    NProgress.done()
    return response
  })

export const httpService = {
    get(endpoint, data) {
        
        
        return ajax(endpoint, 'GET', data)
    },
    post(endpoint, data) {
        // console.log('endpoint:', endpoint)
        return ajax(endpoint, 'POST', data)
    },
    put(endpoint, data) {
        return ajax(endpoint, 'PUT', data)
    },
    delete(endpoint, data) {
        return ajax(endpoint, 'DELETE', data)
    }
}

async function ajax(endpoint, method = 'get', data = null) {
    try {
        const res = await axios({
            url: `${BASE_URL}${endpoint}`,
            method,
            data
        })

        return res.data;
    } catch (err) {
        // console.log('err', err);
        if (err.response.status === 401) {
            router.push('/');
        }
        // console.log(`Had issues ${method}ing to server`, err)
        throw err;
    }
}





