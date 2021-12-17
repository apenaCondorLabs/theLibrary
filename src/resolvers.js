import Book from "./Models/Book";
import mongo from "./mongoHelper";
import redis from "./redisHelper";

mongo.getClient();

let books;

export const resolvers = {
	Query: {
		Books: async () => {
			try {
				await redis.connectRedis();
				let results = await redis.getData("Books");
				if(results[0] == null)  {
					books = await Book.find();
					await redis.setData("Books", books);
					return books;
				} else {
					return JSON.parse(results)
				}
			} catch (error) {
				console.log(error)
			}
		},
		BookById: async (_, { _id }) => {
			await redis.connectRedis();
			let results = await redis.getData(_id);
			if(results[0] == null)  {
				books = await Book.findById(_id);
				await redis.setData(_id, books);
				return books;
			} else {
				return JSON.parse(results)
			}
		},
		BookByAuthor: async (_, { author }) => {
			await redis.connectRedis();
			let results = await redis.getData(author);
			if(results[0] == null)  {
				books = await Book.find({ "author": author });
				await redis.setData(author, books);
				return books;
			} else {
				return JSON.parse(results)
			}
		},
		BookByTitle: async (_, { title }) => {
			await redis.connectRedis();
			let results = await redis.getData(title);
			if(results[0] == null)  {
				books = await Book.find({ "title": title });
				await redis.setData(title, books);
				return books;
			} else {
				return JSON.parse(results)
			}
		}
	},
  Mutation: {
    createBook: async (_, { input }) => {
		try {
			await redis.connectRedis();
			await redis.deleteData("Books");
			const newBook = new Book(input);
			await newBook.save();
			return newBook;
		} catch (error) {
			console.log(error)
		}
    },
    deleteBook: async (_, { _id }) => {
		try {
			await redis.connectRedis();
			await redis.deleteData("Books");
			return Book.findByIdAndDelete(_id);
		} catch (error) {
			console.log(error)
		}
    },
    updateBook: async (_, { _id, input }) => {
		try {
			await redis.connectRedis();
			await redis.deleteData("Books");
			return Book.findByIdAndUpdate(_id, input, { new: true });
		} catch (error) {
			console.log(error)
		}
    },
  },
};
