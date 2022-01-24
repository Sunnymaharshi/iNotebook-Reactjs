const mongoose = require("mongoose");
const mongoUri =
  "mongodb://localhost:27017/inotebook?readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false";

const connectMongo = () => {
  mongoose.connect(mongoUri, () => {
    console.log("connected to mongo");
  });
};

module.exports = connectMongo;
