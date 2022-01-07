import { dependencyServices } from "@condor-labs/health-middleware";
import env from "dotenv";

env.config();

const healthConfig = {
    service: "service random",
    description: "Service to check",
    dependencies: [
      {
        service: dependencyServices.REDIS,
        componentName: 'Redis',
        connection: {
            host: process.env.HOSTREDIS,
            port: process.env.PORTREDIS
        }
      },
      {
        service: dependencyServices.MONGODB,
        componentName: 'MongoDB',
        connection: {
            host: process.env.HOSTMONGO,
            port: process.env.PORTMONGO,
            database: process.env.DATABASEMONGO,
            user: process.env.USERMONGO,
            password: process.env.PASSWORDMONGO,
            ssl: true,
            authSource: process.env.AUTHSOURCEMONGO
        }
      }
    ]
};

module.exports = healthConfig;