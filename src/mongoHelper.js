"use strict";

const mongoDbSettings = {
  host: "mongo",
  port: 27017,
  database: "books",
  user: "root",
  password: "123456",
  ssl: false,
  authSource: 'admin'
};

const mongo = require("@condor-labs/mongodb")(mongoDbSettings);

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
