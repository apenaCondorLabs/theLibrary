import mongo from './../src/mongoHelper';
import redis from './../src/redisHelper';
import { resolvers } from "./../src/resolvers";
import Book from "./../src/Models/Book";


describe("Test of resolvers", () => {
    const book = {"title": "Bob", "author": "Bob", "pages": 1, status: "AVAILABLE"};
    let id;

    beforeEach(async () => {
        await mongo.connect();
        await mongo.getClient();
        let newBook = new Book(book);
        id = newBook._id;
        await newBook.save();
        await redis.connectRedis();
    });

    afterEach(async () => {
        await mongo.closed();
        await redis.quit();
    });

    test("Create a book", async() => {
        let data = await resolvers.Mutation.createBook({input: book});
        expect(data.id != null).toEqual(true);
    });

    test("Update a book", async() => {
        let data = await resolvers.Mutation.updateBook({_id: id, input: book});
        expect(data.id != null).toEqual(true);
    });

    test("Delete a book", async () => {
        let data = await resolvers.Mutation.deleteBook({_id: id});
        expect(data.id != null).toEqual(true);
    });
});