module.exports = app => {
    const mongoose = require("mongoose");
    const db = require("../config/key");
    mongoose.connect(db.mongoURI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });

   
}