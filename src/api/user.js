import request from '@/utils/request';

/**
 * @description 用户登录
 * @param {string}  username
 * @param {string}  password
 * @returns {string} token
 */

export function login(data) {
  return request.post('/user/login', data);
}

/**
 * @description 用户退出登录
 * @returns {string}
 */

export function logout(data) {
  return request.post('/user/logout', data);
}

/**
 * @description 获取验证码
 * @returns {number} code
 */
export function getPhoneCode(data) {
  return request.post('/user/sendCode', data);
}

/**
 * @description 验证验证码
 * @param {string}  phone  手机号
 * @param {string}  code   验证码
 * @returns {string}
 */
export function getCodeTest(data) {
  return request.post('/user/verifyCode', data);
}

/**
 * @description 获取用户信息
 * @param {string}  token
 * @returns {string} userInfo
 */
export function getInfo(data) {
  return request.post('/user/userInfo', data);
}

/**
 * @description 获取用户存储授权信息
 * @param {string}  userID
 * @returns {string} userInfo
 */
 export function getCloudBaseAuth(userID) {
  return request.post('/user/cloudbaseAuth', userID);
}

/**
 * @description 更新用户信息
 * @param {Object}  要更新的值
 * @returns {string} userInfo
 */
 export function updateUserInfo(data) {
  return request.post('/user/userUpdate', data);
}