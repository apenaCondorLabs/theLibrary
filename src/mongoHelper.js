import mongoLabs from "@condor-labs/mongodb";
import env from "dotenv";

env.config();

const mongoDbSettings = {
  host: "mongo",
  port: "27017",
  database: "books",
  user: "root",
  password: "123456",
  ssl: false,
  authSource: "admin",
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
      return mongo;
    } catch (e) {
      console.log(e);
    }
  },
  getClient: async () => {
			await mongo.getClient();
  },
  closed: async () => {
    await mongo.mongoose.connection.close();
  }
};

module.exports = helper;
