const MongoClient = require('mongodb').MongoClient;

const uri = 'mongodb://gilson:gmj192168@cluster0-shard-00-00-xfoek.mongodb.net:27017,cluster0-shard-00-01-xfoek.mongodb.net:27017,cluster0-shard-00-02-xfoek.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin';

const conn = callback => {
  MongoClient.connect(uri, callback);
};

module.exports = conn;
