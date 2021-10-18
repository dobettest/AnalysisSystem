let genToken = (len = 8) => {
    const raw = 'abcdefghijklmnopqrstuvwxyz0123456789';
    const arr = [];
    let idx = -1;
    for (var i = 0; i < len; i++) {
        idx = Math.floor(Math.random() * 36);
        let char = raw[idx];
        console.log(idx, char, raw[idx])
        arr.push(char);
    }
    // console.log(arr)
    return arr.join('');
}
console.log(genToken(23))