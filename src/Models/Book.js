const mongodb = require("@condor-labs/mongodb")();
const helperMongo = require("./../mongoHelper");

const BookSchema = mongodb.mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  pages: {
    type: Number,
    required: true,
  }
});


let bookModel = mongodb.mongoose.model('Book', BookSchema);

export default bookModel;
