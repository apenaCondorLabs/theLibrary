
import { resolvers } from "../src/service/resolvers";

const book =  {
    "_id": "61ca5837faab2e06f0be6eb0",
    "title": "testMock",
    "author": "testMock",
    "pages": 1,
    "status": "AVAILABLE"
};

const id = "61ca5837faab2e06f0be6eb0";

jest.mock('../src/repository/BookMongoRepository', () => () => ({
    create:(data) => book,
    update:(id) => book,
    delete:(id) => book
}));

jest.mock('../src/repository/BookRedisRepository', () => () => ({
    setData:(key, data, length) => null,
    getData:(key) => null,
    clearAll:() => null
}));

describe("Test of resolvers", () => {
    const id = "61ca5837faab2e06f0be6eb0";

    test("Create a book", async() => {
        let data = await resolvers.Mutation.createBook(null, {input: book});
        expect(book).toEqual(data);
    });

    test("Update a book", async() => {
        let data = await resolvers.Mutation.updateBook(null, {_id: id, input: book});
        expect(book).toEqual(data);
    });

    test("Delete a book", async () => {
        let data = await resolvers.Mutation.deleteBook(null, {_id: id});
        expect(book).toEqual(data);
    });
});