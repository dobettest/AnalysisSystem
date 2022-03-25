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
 * @returns {string} userInfo
 */
export function getUserInfo() {
  return request.post('/user/userInfo');
}

/**
 * @description 获取用户存储授权信息
 * @param {string}  userID
 * @returns {string} userInfo
 */
export function getCloudBaseAuth(data) {
  return request.post('/user/cloudbase/createTicket', data);
}

/**
 * @description 更新用户信息
 * @param {Object}  要更新的值
 * @returns {string} userInfo
 */
export function updateUserInfo(data) {
  return request.post('/user/userUpdate', data);
}

export function getCodeByPhone(data) {
  return request.post('/user/getCodeByPhone', data)
}
export function getCodeByMail(data) {
  return request.post('/user/getCodeByMail', data)
}
export function checkCodeByPhone(data) {
  return request.post('/user/checkCodeByPhone', data)
}
export function checkCodeByMail(data) {
  return request.post('/user/checkCodeByMail', data)
}
export function getImgCode() {
  return request.get('/user/getImgCode')
}
export function loginByPhone(data) {
  return request.post('/user/loginByPhone', data)
}
export function getWorkstations(data) {
  return request.post('/user/getWorkstations', data)
}
export function createTimTicket(data) {
  return request.post('/user/tim/createTicket', data)
}
export function upload(data) {
  return request.post('/user/upload', data)
}