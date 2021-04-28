/*
 * @Author: your name
 * @Date: 2021-03-21 19:28:18
 * @LastEditTime: 2021-04-03 16:11:47
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue-antd-admin\src\api\user.js
 */
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
  return request.post('/user/code', data);
}

/**
 * @description 验证验证码
 * @param {string}  phone  手机号
 * @param {string}  code   验证码
 * @returns {string}
 */
export function getCodeTest(data) {
  return request.post('/user/testCode', data);
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
 * @description 获取用户仪表盘列表
 * @param {string}  username   用户名
 * @returns {string}
 */
export function getChartList(data) {
  return request.post('/user/chartlist', data);
}

/**
 * @description 获取用户数据库列表
 * @param {string}  username   用户名
 * @returns {string}
 */
export function getDbList(data) {
  const res=request.post('/user/dbList', data);
  console.log("api",res)
  return res;
}

/**
 * @description 获取用户数据表详情
 * @param {string}  username   用户名
 * @returns {string}
 */
export function getDbDetail(data) {
  return request.post('/user/dbDetail', data);
}
/**
 * @description 获取用户仪表盘列表
 * @param {string}  username   用户名
 * @returns {string}
 */
export function getDashList(data) {
  return request.post('/user/dashList', data);
}

/**
 * @description 获取用户仪表盘详情
 * @param {string}  username   用户名
 * @returns {string}
 */
export function getDashDetail(data) {
  
  return request.post('/user/dashDetail', data);
}