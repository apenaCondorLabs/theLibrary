import Book from "./Models/Book";
import mongo from "./mongoHelper";
//import { connectRedis, client } from "./redisHelper";

mongo.getClient();
/*connectRedis();


client.on("error", (err) => {
	console.log(err);
});*/

export const resolvers = {
	Query: {
		Books: async () => {
			/*try {
				clients.get("Books", async (err, jobs) => {
					if (err) throw err;
					
					if (jobs) {
						return JSON.parse(jobs);
					} else {
						const jobs = await Book.find();
						clients.setex("Books", 600, JSON.stringify(jobs));
						return jobs;
					}
				});
			} catch (error) {
				console.log(error)
			}*/
			return Book.find();
		},
	},
  Mutation: {
    createBook: async (_, { input }) => {
		try {
			const newBook = new Book(input);
			await newBook.save();
			return newBook;
		} catch (error) {
			console.log(error)
		}
	
    },
    deleteBook: async (_, { _id }) => {
      	return Book.findByIdAndDelete(_id);
    },
    updateBook: async (_, { _id, input }) => {
      	return Book.findByIdAndUpdate(_id, input, { new: true });
    },
  },
};
