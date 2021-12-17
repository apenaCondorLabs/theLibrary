import redis from "@condor-labs/redis";

const settings = {
    host: 'redis',
    port: 6379
};
const keyName = 'Books';

const connectRedis = redis(settings);
let client;
let redisBatch;
const helper = {
    connectRedis: async () => {
      try {
        client = await connectRedis.getClient();
        redisBatch = client.batch();
      } catch (e) {
        console.log(e);
      }
    },
    setData: async (key, data) => {
        try {
            await redisBatch.set(key, JSON.stringify(data));
            return redisBatch.execAsync();
        } catch (e) {
            console.log(e);
        }
    },
    getData: async (key) => {
        await redisBatch.get(key);
        return redisBatch.execAsync();
    },
    addData: async (key ,data) => {
        await redisBatch.hset(key, JSON.stringify(data));
        return redisBatch.execAsync();
    },
    deleteData: async (key) => {
        await redisBatch.expire(key, 1);
        return redisBatch.execAsync();
    }
  };
  
  module.exports = helper;