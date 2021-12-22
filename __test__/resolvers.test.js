import mongo from './../src/mongoHelper';
import redis from './../src/redisHelper';
import { resolvers } from "./../src/resolvers";
import Book from "./../src/Models/Book";


describe("Test of resolvers", () => {
    const book = {"title": "Bob", "author": "Bob", "pages": 1, status: "AVAILABLE"};

    beforeEach(async () => {
        await mongo.connect();
        await mongo.getClient();
        await Book.remove();
        await redis.connectRedis();
    });

    afterEach(async () => {
        await mongo.closed();
        await redis.quit();
    });

    test("Create a book", async() => {
        let data = await resolvers.Mutation.createBook(null, {input: book});
        expect(data.id != null).toEqual(true);
    });

    test("Update a book", async() => {
        let newBook = new Book(book);
        let id = newBook._id;
        await newBook.save();
        book.title = `${book.title} update`
        let data = await resolvers.Mutation.updateBook(null, {_id: id, input: book});
        expect(data.id != null).toEqual(true);
    });

    test("Delete a book", async () => {
        let newBook = new Book(book);
        let id = newBook._id;
        await newBook.save();
        let data = await resolvers.Mutation.deleteBook(null, {_id: id});
        expect(data.id != null).toEqual(true);
    });
});