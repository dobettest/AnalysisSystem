import remoteLoad from './remoteLoad';
const { AMapCDN, AMapUiCDN } = require('@/plugins/cdn');

/**
 * 用于将地址后面的参数转换成对象返回
 * @param {string} url
 * @returns {Object}
 */
export function param2Obj(url) {
  const search = url.split('?')[1];
  if (!search) {
    return {};
  }
  return JSON.parse(
    '{"' +
    decodeURIComponent(search)
      .replace(/"/g, '\\"')
      .replace(/&/g, '","')
      .replace(/=/g, '":"')
      .replace(/\+/g, ' ') +
    '"}'
  );
}
/**
 * 比较两个对象是否相等1
 * @param {Object,Object} Object
 * @returns {Boolean}
 */
export function objEqual(a, b) {
  let keys = Object.keys(a)
  for (var i = 0; i < keys.length; i++) {
    if (a[keys[i]] instanceof Object) {
      objEqual(a[keys[i]], b[keys[i]]);
    } else {
      if (a[keys[i]] != b[keys[i]]) {
        return false;
      }
    }
  }
  return true;
}
/**
 * 函数防抖
 * @param {Function} func
 * @param {number} delay
 * @param {boolean} immediate
 * @return {*}
 */

export function debounce(func, delay, immediate = false) {
  let timer,
    context = this;
  return (...args) => {
    if (immediate) {
      func.apply(context, args);
      immediate = false;
      return;
    }
    clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(context, args);
    }, delay);
  };
}

/**
 * 获取geoJson数据  通过高德获取    递归获取区县geoJson
 * @param  {string} adcode  行政区code
 * @param  {string} childAdcode 区县级行政区code
 * @return {Array}
 */
export function getGeoJson(adcode, childAdcode = '') {
  return new Promise((resolve, reject) => {
    if (window.AMap && window.AMapUI) {
      insideFun(adcode, childAdcode);
    } else {
      remoteLoad(AMapCDN).then(() => {
        if (window.AMap) {
          remoteLoad(AMapUiCDN).then(() => {
            if (window.AMapUI) {
              insideFun(adcode, childAdcode);
            } else {
              console.error('AMapUI获取失败');
            }
          });
        } else {
          console.error('AMap获取失败');
        }
      });
    }
    function insideFun(adcode, childAdcode) {
      // eslint-disable-next-line
      AMapUI.loadUI(['geo/DistrictExplorer'], DistrictExplorer => {
        var districtExplorer = new DistrictExplorer();
        districtExplorer.loadAreaNode(adcode, function (error, areaNode) {
          if (error) {
            console.error(error);
            reject(error);
            return;
          }
          let Json = areaNode.getSubFeatures();
          if (Json.length === 0) {
            let parent = areaNode._data.geoData.parent.properties.acroutes;
            insideFun(parent[parent.length - 1], adcode);
            return;
          }

          if (childAdcode) {
            Json = Json.filter(item => {
              return item.properties.adcode == childAdcode;
            });
          }
          let mapJson = {
            features: Json
          };
          resolve(mapJson);
        });
      });
    }
  });
}

/**
 * 转换JSON  导出
 * @param  {Array}
 * @return {Array}
 */

export function formatJson(arr, filterVal) {
  return arr.map(v => filterVal.map(j => v[j].toString()));
}
/**
 * 分类
 * @param  {Array}
 * @param  {key}
 * @return {Array}
 */
export function groupBy(arr = [], key) {
  var map = new Map();
  for (var i = 0; i < arr.length; i++) {
    var obj = arr[i];
    var value = map.get(obj[key]);
    if (value !== undefined) {
      map.set(obj[key], ++value);
    } else {
      map.set(obj[key], 1);
    }
  }
  return map;
}
export function rangeBy(arr = [], key, descrptions = []) {
  var map = new Map();
  for (var i = 0; i < arr.length; i++) {
    var obj = arr[i];
    let { min, max } = descrptions[i].split('~');
    if (obj[key] > min && abj[key] < max) {
    }
  }
  return map;
}
