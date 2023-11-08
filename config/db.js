const mongoose = require("mongoose");
require("dotenv").config();
const MONGO_URI = process.env.MONGO_URI;

// connect to the database
// mongoose.connect(`${MONGO_URI}/cypher_bank`).then(() => {
//   console.log("database connected");
// });

mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Database connected");
  })
  .catch((error) => {
    console.error("Failed to connect to MongoDB", error);
 });