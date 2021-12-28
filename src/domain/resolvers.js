
import logger from '@condor-labs/logger';
import BookMongoRepository from './../repository/BookMongoRepository'
import BookRedisRepository from './../repository/BookRedisRepository'
let books;

const bookMongoRepository = new BookMongoRepository();
const bookRedisRepository = new BookRedisRepository();
let results;
export const resolvers = {
  Query: {
    Books: async (_, { pageNumber, row }) => {
      try {
        results = await bookRedisRepository.getData(`Books${pageNumber}-${row}`);
        if (results[0] == null) {
          let Books = await bookMongoRepository.findPaginate(null, pageNumber, row);
          let allData = await bookMongoRepository.find({});
          let metadata = {
            page: pageNumber,
            pageCount: Math.round(allData.length / pageNumber),
            perPage: row,
            totalCount: allData.length
          };
          let response = {metadata, Books};
          await bookRedisRepository.setData(`Books${pageNumber}-${row}`, response, Books.length);
          return response;
        } else {
          return JSON.parse(results);
        }  
      } catch (error) {
        logger.err(error);
        throw new Error(error);
      }
    },
    BookById: async (_, { _id }) => {
      results = await bookRedisRepository.getData(_id);
      if (results[0] == null) {
        books = await bookMongoRepository.findById(_id);
        await bookRedisRepository.setData(_id, books, 1);
        return books;
      } else {
        return JSON.parse(results);
      }
    },
    BookByAuthor: async (_, { author }) => {
      results = await bookRedisRepository.getData(author);
      if (results[0] == null) {
        books = await bookMongoRepository.find({ author: author });
        await bookRedisRepository.setData(author, books, 1);
        return books;
      } else {
        return JSON.parse(results);
      }
    },
    BookByTitle: async (_, { title }) => {
      results = await bookRedisRepository.getData(title);
      if (results[0] == null) {
        books = await bookMongoRepository.findOne({ title: title });
        await bookRedisRepository.setData(title, books, 1);
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
        let data = await bookMongoRepository.find({ title : input.title });
        if(data.length === 0 ){
          await bookRedisRepository.clearAll();
          return await bookMongoRepository.create(input);
        }
        throw new Error("This title is in database");
      } catch (error) {
        throw new Error(error);
      }
    },
    deleteBook: async (_, { _id }) => {
      try {
        await bookRedisRepository.clearAll();
        return bookMongoRepository.delete(_id);
      } catch (error) {
        logger.err(error);
        throw new Error(error);
      }
    },
    updateBook: async (_, { _id, input }) => {
      try {
        let data = await bookMongoRepository.find({ title : input.title });
        let findBook = data.find(x => {
          return x._id == _id
        });
        if(data.length === 0 || typeof(findBook) !== "undefined"){
          await bookRedisRepository.clearAll();
          return await bookMongoRepository.update(_id, input);
        }
        throw new Error("This title is in database");
      } catch (error) {
        throw new Error(error);
      }
    },
  },
};
