import request from '@/utils/request';
/**
 * @description  获取route
 * @param {string} name
 * @param {string} status
 * @param {string} page
 * @param {string} size
 * @returns {Object}
 */

export function getRoleRoute(data) {
  return request.get('/route/getRoleRoute',data);
}