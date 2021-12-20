import mongo from "./../src/mongoHelper";
import redis from "./../src/redisHelper";
import { resolvers } from "./../src/resolvers";
import Book from "./../src/Models/Book";


describe("Test of resolvers", () => {
    const book = {title: "Bob", author: "Bob", pages: 1, status: "AVAILABLE"};
    let id;

    beforeEach(done => {
        redis.connectRedis().then(() => {
            redis.clearAll();
        });
        mongo.connect();
        let newBook = new Book(book);
        newBook.save();
        id = newBook._id;
        done();
    });

    afterEach(done => {
        mongo.closed();
        done();
    })
    test("Create a book", (done) => {
        resolvers.Mutation.createBook(null,{input: { book }}).then( (data) => {
            expect(book).toEqual(data);
        });
        done();
    });

    test("Update a book", (done) => {
        resolvers.Mutation.updateBook(null,{_id: id, input: book}).then( (data) => {
            expect(book).toEqual(data);
        });
        done();
    });

    test("Delete a book", (done) => {
        resolvers.Mutation.deleteBook(null,{_id: id}).then( (data) => {
            expect(book).toEqual(data);
        });
        done();
    });
});