import redis from "@condor-labs/redis";

const settings = {
    prefix: 'Books',
    host: 'localhost',
    port: 6379
};
const keyName = 'Books';

const connectRedis = redis(settings);

const helper = {
    connectRedis: async () => {
      try {
        let client = await connectRedis.getClient();
        const redisBatch = client.batch();
        await redisBatch.set(keyName);
        return connectRedis;
      } catch (e) {
        console.log(e);
      }
    },
    getClient: () => {
        return connectRedis.getClient();
    }
  };
  
  module.exports = helper;