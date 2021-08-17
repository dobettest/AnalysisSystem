const remoteLoad = url => {
  return new Promise((resolve, reject) => {
    const existingScript = document.getElementById(url);
    //如果script不存在
    if (!existingScript) {
      const script = document.createElement('script');
      script.id = url;
      script.src = url;
      script.async = true;
      document.body.appendChild(script);
      script.onload = function () {
        resolve();
      };
      script.onerror = function () {
        this.onerror = this.onload = null;
        reject('加载失败' + url);
      };
    } else {
      resolve();
    }
  });
};

export default remoteLoad;
