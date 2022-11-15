const mongoose = require("mongoose");

localDb = "mongodb://localhost/kothar";
liveDb = "mongodb+srv://kothar:nepal@kothar-cluster.nmzydnv.mongodb.net/?retryWrites=true&w=majority";
const conectDatabase = () => {
  mongoose
    .connect(liveDb)
    .then(() => {
      console.log("Mongoose Connected");
    })
    .catch((error) => {
      console.log("Error conecting to database")
      console.log(error);
    });
};

module.exports = conectDatabase;
