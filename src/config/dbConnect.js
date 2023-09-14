import mongoose from 'mongoose';

mongoose.connect(process.env.CONNECTION_STRING_DB, {
    dbName: process.env.DB
});

let db = mongoose.connection;

export default db;