import mongoose from 'mongoose';

const authorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    }
},
{
    timestamps: true
});

const author = new mongoose.model('author', authorSchema)

export default author