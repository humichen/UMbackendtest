require('dotenv').config();

const uri = `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@cluster0.j51e3.mongodb.net/borrowweb?retryWrites=true&w=majority`;
module.exports = {
  MONGODB_URL: "mongodb://localhost/test",
  MONGODB_ATLAS_URL: uri,
  JWT_SECRET: process.env.JWT_SECRET || "somethingsecret",
};