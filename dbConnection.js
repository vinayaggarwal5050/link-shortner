const mongoose = require("mongoose");

const connectToMongoDB = async (uri) => {
  return mongoose.connect(uri);
} 

module.exports = connectToMongoDB;