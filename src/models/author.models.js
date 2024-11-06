import mongoose from 'mongoose';

const authorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    }
});

const author = new mongoose.model('author', authorSchema)


export default author