const mongoDb = require("mongodb");
const MongoClient = mongoDb.MongoClient;
const passwords = require("../config/passwords");

//since this variable will be used only in this file, underscore put
let _db;

const mongoDbConnect = callback => {
  MongoClient.connect(passwords.mongoDbUrl, { useUnifiedTopology: true })
    .then(client => {
      console.log("MongoDB connected...");
      _db = client.db();
      callback();
    })
    .catch(err => {
      console.log(err);
      throw err;
    });
};

const getDb = () => {
  if (_db) {
    return _db;
  }
  throw "No database found";
};

exports.mongoDbConnect = mongoDbConnect;
exports.getDb = getDb;
