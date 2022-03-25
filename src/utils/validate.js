const code = /\d{6}/;
const illegal = /[^-+=|,0-9a-zA-Z!@#$%^&*?_.~+\/\\(){}\[\]<>]/;
const allNumber = /^\d+$/;
const allLetter = /^[a-zA-Z]+$/;
const allCharacter = /^[-+=|,!@#$%^&*?_.~+\/\\(){}\[\]<>]+$/;
const allSame = /^([\s\S])\1*$/;
const upperLetter = /[A-Z]/;
const lowerLetter = /[a-z]/;
const number = /\d/g;
const phone = /^1\d{10}$/;
const character = /[-+=|,!@#$%^&*?_.~+\/\\()|{}\[\]<>]/;
const mail = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
/**
 * @description 验证手机号
 * @param value
 * @returns {boolean}
 */
export function isPhone(value) {
  const reg = /^1[3,4,5,6,7,8,9]\d{9}$/;
  return reg.test(value);
}

/**
 * @description 校验密码
 * @param value
 * @returns {boolean}
 */
export function isPassWord(value) {
  const reg = /^[A-Za-z0-9]{6,}$/;
  return reg.test(value);
}

/**
 * @description 校验验证码格式
 * @param value
 * @returns {boolean}
 */
export function isCode(value) {
  const reg = /^\d{6}$/;
  return reg.test(value);
}
export {
  code,
  illegal,
  allNumber,
  allLetter,
  allCharacter,
  allSame,
  upperLetter,
  lowerLetter,
  number,
  phone,
  character,
  mail
}