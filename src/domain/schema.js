import { makeExecutableSchema } from 'graphql-tools';
import { resolvers } from './resolvers';

const typeDefs = `
    type Query {
        Books(pageNumber: Int!, row: Int!): paginationBook,
        BookById(_id: ID):Book,
        BookByAuthor(author: String!):[Book]
        BookByTitle(title: String!): Book
    }

    type Book {
        _id: ID,
        title: String!,
        author: String!,
        status: String!,
        pages: Int!
    }

    type metadata {
        page: Int!,
        pageCount: Int!,
        perPage: Int!,
        totalCount: Int!
    }

    type paginationBook {
        metadata: metadata
        Books: [Book]
    }

    enum Status {
        LENT
        AVAILABLE
        UNAVAILABLE
    }

    type Mutation {
        createBook(input: BookCreate): Book,
        deleteBook(_id: ID): Book,
        updateBook(_id: ID, input: BookInput): Book
    }

    input BookCreate {
        title: String!,
        author: String!,
        pages: Int!
    }

    input BookInput {
        title: String!,
        author: String!,
        status: Status!,
        pages: Int!
    }
`;

export default makeExecutableSchema({
  typeDefs: typeDefs,
  resolvers: resolvers,
});
