import express from "express";
import { graphqlHTTP } from "express-graphql";
import schema from "./schema";
import env from "dotenv"

const app = express();

env.config();

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
