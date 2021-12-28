
import { resolvers } from "../src/domain/resolvers";

const book =  {
    "_id": "61ca5837faab2e06f0be6eb0",
    "title": "testMock",
    "author": "testMock",
    "pages": 1,
    "status": "AVAILABLE"
};

jest.mock('../src/repository/BookMongoRepository', () => () => ({
    delete:(id) => book
}));

jest.mock('../src/repository/BookRedisRepository', () => () => ({
    setData:(key, data, length) => null,
    getData:(key) => null,
    clearAll:() => null
}));

test("Delete a book", async () => {
    let data = await resolvers.Mutation.deleteBook(null, {_id: "61ca5837faab2e06f0be6eb0"});
    expect(book).toEqual(data);
});