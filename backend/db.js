import mongoose  from "mongoose"
// mongoose = require('mongoose');
const mongoDBURL = "mongodb://localhost:27017/"

export const connectToMongoDB = async()=> {
    try {
        await mongoose.connect('mongodb://localhost:27017/mydatabase', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true
        });
        console.log('Connected to MongoDB successfully');
        // You can start using mongoose models and perform operations here
    } catch (error) {
        console.error('Error connecting to MongoDB:', error.message);
    }
}

// module.exports = connectToMongoDB;

