import Book from './Models/Book';
import mongo from './mongoHelper';
import redis from './redisHelper';
import logger from '@condor-labs/logger';
let books;

export const resolvers = {
  Query: {
    Books: async () => {
      try {
        await mongo.connect();
        await mongo.getClient();
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
        logger.error(error);
        throw new Error(error);
      }
    },
    BookById: async (_, { _id }) => {
      await mongo.connect();
      await mongo.getClient();
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
      await mongo.connect();
      await mongo.getClient();
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
      await mongo.connect();
      await mongo.getClient();
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
        await mongo.connect();
        await mongo.getClient();
        if(await Book.countDocuments({ title : input.title }) === 0 ){
          const newBook = new Book(input);
          await newBook.save();
          return newBook;
        }
        throw new Error("This title is in database");
        logger.log("This title is in database");
      } catch (error) {
        logger.error(error);
        throw new Error(error);
      }
    },
    deleteBook: async (_, { _id }) => {
      try {
        await mongo.connect();
        await mongo.getClient();
        await redis.connectRedis();
        await redis.clearAll();
        return Book.findByIdAndDelete(_id);
      } catch (error) {
        logger.error(error);
        throw new Error(error);
      }
    },
    updateBook: async (_, { _id, input }) => {
      try {
        await mongo.connect();
        await mongo.getClient();
        await redis.connectRedis();
        await redis.clearAll();
        if(await Book.countDocuments({ title : input.title }) === 0 ){
          return Book.findByIdAndUpdate(_id, input, { new: true });
        }
        throw new Error("This title is in database");
        logger.log("This title is in database");
      } catch (error) {
        logger.error(error);
        throw new Error(error);
      }
    },
  },
};
