
import { resolvers } from "../src/domain/resolvers";

const book =  {
    "_id": "61ca5837faab2e06f0be6eb0",
    "title": "testMock",
    "author": "testMock",
    "pages": 1,
    "status": "AVAILABLE"
};

const bookError =  {
    "_id": "61ca5837faab2e06f0be6eb1",
    "title": "testMock",
    "author": "testMock",
    "pages": 1,
    "status": "AVAILABLE"
};

jest.mock('../src/repository/BookMongoRepository', () => () => ({
    update:(id) => book,
    find:(id) => [bookError]
}));

jest.mock('../src/repository/BookRedisRepository', () => () => ({
    setData:(key, data, length) => null,
    getData:(key) => null,
    clearAll:() => null
}));

test("Update a book", async() => {
    try {
        let data = await resolvers.Mutation.updateBook(null, {_id: book._id, input: book});
        
    } catch (error) {
        expect(error.message).toEqual("Error: This title is in database"); 
    }
});