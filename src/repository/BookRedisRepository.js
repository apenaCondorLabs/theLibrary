import redis from '../utils/redisHelper';

module.exports = class BookRedisRepository {

    constructor() {
        this.redis = redis;
        this.redis.connectRedis();
    }

    async setData(key, data, length) {
        try {
            await this.redis.setData(key, data, length);
        } catch (error) {
            throw new Error(error);
        }
    }

    async getData(key) {
        try {
            return await this.redis.getData(key);
        } catch (error) {
            throw new Error(error);
        }
    } 
    async clearAll() {
        try {
            await this.redis.clearAll();
        } catch (error) {
            throw new Error(error);
        }
    } 
}