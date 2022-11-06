const mongoose = require('mongoose')

const conectDatabase = () => {
    mongoose.connect("mongodb://localhost/kothar").then(() => {
        console.log("Mongoose Connected");
    }).catch((error) => {
        console.log(error);
    });
}


module.exports = conectDatabase;