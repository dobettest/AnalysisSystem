import request from '@/utils/request';
export function getStorageInfo(data) {
    return request.post('/storage/access', data)
}
export function createStoreage(data) {
    return request.post('storage/create', data)
}
export function delStorage(data) {
    return request.post('/storage/delete', data)
}
export function updateStorage(data) {
    return request.post('/storage/update', data)
}