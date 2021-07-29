class redisStore {
    constructor(expiredTime) {
        this.map = new Map();
        this.expiredTime = expiredTime;
    }
    update(key, value) {
        this.map.set(key, value);
    }
    get(key) {
        return this.map.get(key)
    }
    add(key, value) {
        this.map.set(key, value);
        var timer=setTimeout(() => {
            this.map.delete(key)
        }, this.expiredTime);
        clearTimeout(timer)
    }
    remove(key) {
        this.map.delete(key)
    }
}
exports.redisStore = redisStore;