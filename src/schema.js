import { makeExecutableSchema } from 'graphql-tools';
import { resolvers } from './resolvers';

const typeDefs = `
    type Query {
        Books: [Book],
        BookById(_id: ID):Book,
        BookByAuthor(author: String!):[Book]
        BookByTitle(title: String!):[Book]
    }

    type Book {
        _id: ID,
        title: String!,
        author: String!,
        status: String!,
        pages: Int!
    }

    type Mutation {
        createBook(input: BookInput): Book,
        deleteBook(_id: ID): Book,
        updateBook(_id: ID, input: BookInput): Book
    }

    input BookInput {
        title: String!,
        author: String!,
        status: String!,
        pages: Int!
    }
`;

export default makeExecutableSchema({
  typeDefs: typeDefs,
  resolvers: resolvers,
});
