import request from '@/utils/request';
export function getArticles() {
    return request.post('/article/access')
}
export function createArticle(data) {
    return request.post('/article/create', data)
}
export function updateArticle(data) {
    return request.post('article/modify', data)
}
export function delArticle(data) {
    return request.post('/article/delete', data);
}