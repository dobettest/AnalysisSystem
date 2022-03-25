import request from '@/utils/request';
export function getBlogs() {
    return request.post('/vblog/access')
}
export function createBlog(data) {
    return request.post('/vblog/create', data, {
        headers: { "Content-Type": "multipart/form-data" }
    })
}
export function updateBlog(data) {
    return request.post('vblog/modify', data)
}
export function delBlog(data) {
    return request.post('/vblog/delete', data);
}