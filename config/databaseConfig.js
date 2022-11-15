const mongoose = require("mongoose");

localDb = "mongodb://localhost/kothar";
liveDb =
  "mongodb+srv://samkotaku@gmail.com:rootpassword@cluster0.k8vjql7.mongodb.net/kothar?retryWrites=true&w=majority";
const conectDatabase = () => {
  mongoose
    .connect(localDb)
    .then(() => {
      console.log("Mongoose Connected");
    })
    .catch((error) => {
      console.log(error);
    });
};

module.exports = conectDatabase;
