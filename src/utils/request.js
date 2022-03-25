import axios from 'axios';
import { message } from 'ant-design-vue';
import store from '@/store';

const service = axios.create({
  baseURL: '/api'
});

//请求
service.interceptors.request.use(config => {
  if (store.getters.token) {
    config.headers['authorization'] = store.getters.token;
  }
  return config;
});

//响应
service.interceptors.response.use(response => {
  const data = response.data;
  if (data['errStr']) {
    message.error(data.errStr || '');
    return Promise.reject(data);
  } else {
    return Promise.resolve(data);
  }
});

let http = {};

/**
 * get方法，对应get请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */

http.get = function (url, params = null) {
  return new Promise((resolve, reject) => {
    service
      .get(url, { params })
      .then(res => {
        resolve(res.data);
      })
      .catch(e => {
        reject(e);
      });
  });
};

/**
 * post方法，对应post请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */

http.post = function (url, params, config) {
  return new Promise((resolve, reject) => {
    service
      .post(url, params, config)
      .then(res => {
        resolve(res.data);
      })
      .catch(e => {
        reject(e);
      });
  });
};

export default http;
