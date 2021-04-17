const offset = function offset(ele) {
  //console.log(ele);
  var top = ele.offsetTop;
  var left = ele.offsetLeft;
  while (ele.offsetParent) {
    ele = ele.offsetParent;
    if (window.navigator.userAgent.indexOf('MSTE 8') > -1) {
      top += ele.offsetTop;
      left += ele.offsetLeft;
    } else {
      top += ele.offsetTop + ele.clientTop;
      left += ele.offsetLeft + ele.clientLeft;
    }
  }
  return {
    left: left,
    top: top
  };
};
const checkInView = function checkInView(dom) {
  var wh = window.innerHeight;
  var st = document.body.scrollTop || document.documentElement.scrollTop;
  var domHeight = dom.clientHeight ? dom.clientHeight : dom.parentNode.clientHeight;
  var offsetTop = offset(dom).top;
  if (offsetTop >= st && offsetTop <= st + wh) {
    return true;
  } else if (offsetTop < st && offsetTop + domHeight > st && offsetTop + domHeight < st + wh) {
    return true;
  }
  return false;
};
export const lazyload = (dom, fn, immediate = true) => {
  let flag = false;
  if (immediate && checkInView(dom)) {
    immediate = false;
    fn();
  }
  return function() {
    let context = this;
    let args = Array.prototype.slice.call(arguments);
    if (!flag && checkInView(dom)) {
      flag = true;
      fn.apply(context, args);
    }
  };
};
