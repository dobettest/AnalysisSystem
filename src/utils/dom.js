/**
 * 判断是否存在元素内部
 * @param  {Array}
 * @return {Array}
 */
export async function isInnerClass(el, className) {
  if (el.classList.contains(className)) {
    return true;
  } else if (el.tagName !== 'HTML') {
    return await isInnerClass(el.parentElement, className);
  } else {
    return false;
  }
}
export const clickOutSide = function(className, cb) {
  if (!Object.prototype.toString.call(cb) === '[object Funtion]') {
    throw new Error('cb must be function');
  }
  return async function(e) {
    let context = this;
    let el = e.target || e.srcElement;
    let flag = await isInnerClass(el, className);
    if (!flag) {
      cb.apply(context);
    }
  };
};
