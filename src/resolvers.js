import Book from './Models/Book';
import mongo from './mongoHelper';
import redis from './redisHelper';

let books;

mongo.connect();
mongo.getClient();

export const resolvers = {
  Query: {
    Books: async () => {
      try {
        await redis.connectRedis();
        let results = await redis.getData('Books');
        if (results[0] == null) {
          books = await Book.find();
          await redis.setData('Books', books);
          return books;
        } else {
          return JSON.parse(results);
        }
      } catch (error) {
        throw Error(error);
      }
    },
    BookById: async (_, { _id }) => {
      await redis.connectRedis();
      let results = await redis.getData(_id);
      if (results[0] == null) {
        books = await Book.findById(_id);
        await redis.setData(_id, books);
        return books;
      } else {
        return JSON.parse(results);
      }
    },
    BookByAuthor: async (_, { author }) => {
      connect();
      await redis.connectRedis();
      let results = await redis.getData(author);
      if (results[0] == null) {
        books = await Book.find({ author: author });
        await redis.setData(author, books);
        return books;
      } else {
        return JSON.parse(results);
      }
    },
    BookByTitle: async (_, { title }) => {
      connect();
      await redis.connectRedis();
      let results = await redis.getData(title);
      if (results[0] == null) {
        books = await Book.find({ title: title });
        await redis.setData(title, books);
        return books;
      } else {
        return JSON.parse(results);
      }
    },
  },
  Mutation: {
    createBook: async (_, { input }) => {
      try {
        input.status = 'AVAILABLE';
        await redis.connectRedis();
        await redis.clearAll();
        const newBook = new Book(input);
        await newBook.save();
        return newBook;
      } catch (error) {
        throw Error(error);
      }
    },
    deleteBook: async (_, { _id }) => {
      try {
        await redis.connectRedis();
        await redis.clearAll();
        return Book.findByIdAndDelete(_id);
      } catch (error) {
        throw Error(error);
      }
    },
    updateBook: async (_, { _id, input }) => {
      try {
        await redis.connectRedis();
        await redis.clearAll();
        return Book.findByIdAndUpdate(_id, input, { new: true });
      } catch (error) {
        throw Error(error);
      }
    },
  },
};
