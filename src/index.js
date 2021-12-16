import express from 'express';
import { graphqlHTTP } from 'express-graphql';
import schema from './schema';
import { connect } from './mongoHelper'


const app = express();
connect();


app.use(
  '/',
  graphqlHTTP({
    graphiql: true,
    schema: schema,
    context: {
      messageId: 'test',
    },
  })
);

app.listen(3000, () => console.log('Server on port 3000'));
