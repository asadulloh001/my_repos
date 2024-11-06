import mongoose from 'mongoose';
import {config} from 'dotenv';

config()

const database = process.env.MONGO_URI
const connect = mongoose.connect(database)

export function connectDB() {
    connect.then(() => {
        console.log('Connected to database successfully!');
        
    }).catch(() => {
        console.log('Failed to connect to database :(');
    })
}

