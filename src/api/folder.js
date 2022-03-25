import request from '@/utils/request';
export function getDir(data) {
    return request.post('/folder/access', data);
}
export function createDir(data) {
    return request.post('/folder/create', data);
}
export function upload(data) {
    return request.post('/folder/uploadFile', data, {
        header: {
            'Content-Type': "multipart/form-data"
        }
    });
}
export function delDir(data) {
    return request.post('/folder/delete', data)
}
export function update(data) {
    return request.post('/folder/update', data)
}
export function rename(data) {
    return request.post('/folder/rename', data)
}
export function move(data) {
    return request.post('/folder/move', data)
}