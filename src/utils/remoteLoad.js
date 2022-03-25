const { isFunction } = require('lodash');
const { customAlphabet } = require('nanoid');
const remoteLoad = (module, url, callback) => {
  return function (...args) {
    return new Promise((resolve, reject) => {
      try {
        const existingScript = document.getElementById(module);
        //如果script不存在
        if (!existingScript) {
          let context = this;
          const script = document.createElement('script');
          const needCallBack = isFunction(callback);
          let handler = null;
          if (needCallBack) {
            let nanoid = customAlphabet('abcdefghijklmnopqrst', 6);
            let cb = nanoid();
            handler = new Promise((resolve, reject) => {
              window[cb] = function () {
                callback.apply(context, args);
                resolve();
                delete window[cb];
              }
            })
            url += `&callback=${cb}`;
          }
          script.id = module;
          script.src = url;
          script.async = true;
          document.body.appendChild(script);
          script.onload = async function () {
            if (callback) {
              await handler;
            }
            resolve()
          };
          script.onerror = function () {
            this.onerror = this.onload = null;
            reject('加载失败' + url);
          };
        } else {
          resolve();
        }
      } catch (error) {
        reject(error)
      }
    });
  }
};

export default remoteLoad;
