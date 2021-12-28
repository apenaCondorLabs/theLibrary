
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
    find:(id) => [book]
}));

jest.mock('../src/repository/BookRedisRepository', () => () => ({
    setData:(key, data, length) => null,
    getData:(key) => null,
    clearAll:() => null
}));

test("Create a book", async() => {
    try {
        await resolvers.Mutation.createBook(null, {input: book});
    } catch (error) {
        expect(error.message).toEqual("Error: This title is in database"); 
    }
});