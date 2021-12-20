import redis from "@condor-labs/redis";
import env from "dotenv";

env.config();

const settings = {
    host: "redis",
    port: 6379
};

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
            if(data.length > 0) {
                await redisBatch.set(key, JSON.stringify(data));
                return redisBatch.execAsync();
            }
        } catch (e) {
            console.log(e);
        }
    },
    getData: async (key) => {
        await redisBatch.get(key);
        return redisBatch.execAsync();
    },
    addData: async (key ,data) => {
        if(data.length > 0) {
            await redisBatch.hset(key, JSON.stringify(data));
            return redisBatch.execAsync();
        }
    },
    deleteData: async (key) => {
        await redisBatch.expire(key, 1);
        return redisBatch.execAsync();
    },
    clearAll: async () => {
        try {
            await redisBatch.flushdb();
            await redisBatch.execAsync();
        } catch (e) {
            console.log(e);
        }
    } 
  };
  
  module.exports = helper;