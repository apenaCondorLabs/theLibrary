import redis from "@condor-labs/redis";
import logger from "@condor-labs/logger";
import env from "dotenv";

env.config();

const settings = {
    host: process.env.HOSTREDIS,
    port: process.env.PORTREDIS
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
        logger.error(e);
      }
    },
    setData: async (key, data) => {
        try {
            if(data.length > 0) {
                await redisBatch.set(key, JSON.stringify(data));
                return redisBatch.execAsync();
            }
        } catch (e) {
            logger.error(e);
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
            logger.error(e);
        }
    },
    quit: async () => {
        await redisBatch.quit();
    }
  };
  
  module.exports = helper;