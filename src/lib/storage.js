import cloudbase from "@cloudbase/js-sdk";
export const env = "miscro-stage-8gtboxpr3f09d045";
export const upList = [];//上传列表
export const isAuth = {
    value: false,
    get() {
        return this.value;
    },
    set(val) {
        this.value = val;
    }
}
export const app = cloudbase.init({
    region: 'ap-guangzhou',
    env
});
export const db = app.database();
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
export const files = db.collection("files");
export const total = '5GB';
/**
 * 
 * @param {String} dirname
 * @param {String} path 
 * @param {Number} fileSize 
 * @param {Number[1,-1]} mul 
 */
export const resize = async (dirname, path, fileSize = 0, mul = 1) => {
    const { data: fileList } = await files.where({ dirname }).get();
    let current = fileList[0];
    let inx = current['files'].findIndex(f => {
        return f['fname'] === path && f['ftype'] === 'folder';
    });
    if (inx !== -1) {
        current['files'][inx]['filesize'] += fileSize * mul;
    }
    await files.where({ dirname }).update({ files: current['files'] });
};

export const resizePath = async (paths, fileSize, mul = 1) => {
    let pr = [];
    paths.reduce((preDir, dirname) => {
        pr.push(resize(preDir, dirname, fileSize, mul));
        dirname = [preDir, dirname].join('/');
        return dirname;
    });
    await Promise.all(pr);
}
export const trash = async (startPath, dirs, fileArr) => {
    let pr = [];
    if (fileArr.length) {
        app.deleteFile({
            fileList: fileArr
        });
    }
    dirs.forEach(async f => {
        let dirname = [startPath, f['fname']].join('/');
        const { data: fileList } = await files.where({ dirname }).get();
        let current = fileList[0];
        let dirs = current['files'].filter(f => f['ftype'] === 'folder');
        let fileArr = current['files'].filter(f => f['ftype'] !== 'folder').map(f => f['fileID']);
        files.where({ dirname }).remove();
        if (dirs.length || fileArr.length) {
            pr.push(trash(dirname, dirs, fileArr));
        }
    });
    await Promise.all(pr);
};