import express from "express";
import "core-js/stable";
import "regenerator-runtime/runtime";
import { healthMonitor } from "@condor-labs/health-middleware";
import { graphqlHTTP } from "express-graphql";
import schema from "./domain/schema";
import healthConfig from "./utils/healthMiddlewareConfig";
import env from "dotenv"

env.config();
const app = express();

healthMonitor(app, healthConfig);

app.use(
  "/",
  graphqlHTTP({
    graphiql: true,
    schema: schema,
    context: {
      messageId: "test",
    },
  })
);

app.listen(3000, () => console.log("Server on port 3000"));
