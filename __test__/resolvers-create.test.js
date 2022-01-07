
import { resolvers } from "../src/domain/resolvers";

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
    find:(id) => []
}));

jest.mock('../src/repository/BookRedisRepository', () => () => ({
    setData:(key, data, length) => null,
    getData:(key) => null,
    clearAll:() => null
}));

test("Create a book", async() => {
    let data = await resolvers.Mutation.createBook(null, {input: book});
    expect(book).toEqual(data);
});