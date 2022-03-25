import cloudbase from "@cloudbase/js-sdk";
import { nanoid } from "nanoid";
import path from 'path';
let app = null;
let ready = false;
class cloudbaseService {
    constructor() {

    }
    static isReady() {
        if (ready === false) {
            throw new Error('sdk not ready')
        }
    }
    static async init(env, region) {
        try {
            console.log(env,region)
            app = cloudbase.init({
                env,
                region
            });
            ready = true;
        } catch (error) {
            throw new Error('error')
        }
    }
    static async login(ticket) {
        this.isReady();
        return await app.auth().customAuthProvider().signIn(ticket);
    }
    static async logout() {
        this.isReady();
        await app.auth().signOut();
    }
    static async upload(file, cb) {
        try {
            this.isReady();
            await app.uploadFile({
                cloudPath: [nanoid(), path.extname(file['name'])].join("."),
                filePath: file,
                onUploadProgress: function (progressEvent) {
                    _.isFunction(cb) && cb(progressEvent);
                }
            })
        } catch (error) {
            throw new Error(error);
        }
    }
}
export const resolveType = function (ftype) {
    let type;
    switch (true) {
        case /(png|jpe?g|svg)/i.test(ftype):
            type = 'album';
            break;
        case /(docx?|txt|md)/i.test(ftype):
            type = 'docx';
            break;
        case /(pptx?)/i.test(ftype):
            type = 'pptx';
            break;
        case /(rar|zip|7z|tar)/i.test(ftype):
            type = 'zip';
            break;
        case /(exe)/i.test(ftype):
            type = 'exe';
            break;
        case /folder/.test(ftype):
            type = 'folder';
            break;
        default:
            type = 'unknow';
            break;
    }
    return type;
}
export const total = '5GB';
/**
 * @param {String} 待转化的单位值
 * @return {Number} B字节计量值
 */
export function s2n(size = '') {
    let arr = size.match(/([\d]+(?:\.[\d]{2})?)([KMG]?B)/);
    let num = 0;
    let type = '';
    if (arr) {
        num = arr[1];
        type = arr[2];
    }
    switch (type) {
        case 'B':
            break;
        case 'KB':
            num *= 1024;
            break;
        case 'MB':
            num *= Math.pow(1024, 2);
            break;
        case 'GB':
            num *= Math.pow(1024, 3);
            break;
        case 'TB':
            num *= Math.pow(1024, 4);
            break;
        default:
            break;
    }
    return num;
}
/**
 * @param {Number} 待转化的数值
 * @return {String} 单位值
 */
export function n2s(size) {
    let str = '';
    ['B', 'KB', 'MB', 'GB', 'TB'].forEach((n, idx) => {
        let num = ((size / Math.pow(1024, idx))).toFixed(2);
        if (parseInt(num)) {
            str = num + n;
        }
    });
    return str || '0B';
}
export default cloudbaseService;