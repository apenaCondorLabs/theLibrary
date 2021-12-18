import { resolvers } from '../src/resolvers';
import mongo from '../src/mongoHelper';
import BookModel from '../src/Models/Book';
var sinon = require('sinon');

describe('When creating the connection to mongo database', () => {
    const book = {title: 'Bob', author: 'Bob', pager: 1, status: 'AVAILABLE'};
    const resp = {book};
    let bookMock;
    beforeEach(() => {
        sinon.stub(mongo, 'connect').callsFake(() => {
            bookMock = sinon
                .mock(BookModel)
                .expects('create')
                .resolves({})
                .withArgs(book);;
        });
    });
        
        
    afterEach(() => {
        mongo.connect.restore();
        userMock.restore();
    });
});