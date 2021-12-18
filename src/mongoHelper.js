import mongoLabs from "@condor-labs/mongodb";
import env from "dotenv";

env.config();

const mongoDbSettings = {
  host: process.env.HOSTMONGO,
  port: process.env.PORTMONGO,
  database: process.env.DATABASEMONGO,
  user: process.env.USERMONGO,
  password: process.env.PASSWORDMONGO,
  ssl: false,
  authSource: process.env.AUTHSOURCEMONGO
};

const mongo = mongoLabs(mongoDbSettings);

const helper = {
  clients: {},
  isConnected: (connectionName) => {
    return mongo._isConnected(connectionName);
  },
  connect: async () => {
    try {
      
      let client = await mongo.getClient();
      helper.clients = client;
      console.log('>>> DB is connected');
      return mongo;
    } catch (e) {
      console.log(e);
    }
  },
  getClient: async () => {
			await mongo.getClient();
  }
};

module.exports = helper;
