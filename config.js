require('dotenv').config();
module.exports = {
    MONGO_URI: `mongodb://dhimas:${process.env.MONGODB_PASSWORD}@cluster0-shard-00-00.ak6vz.mongodb.net:27017,cluster0-shard-00-01.ak6vz.mongodb.net:27017,cluster0-shard-00-02.ak6vz.mongodb.net:27017/test?ssl=true&replicaSet=atlas-rj1pq6-shard-0&authSource=admin&retryWrites=true&w=majority`
}