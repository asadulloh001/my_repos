import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    }
});

const category = new mongoose.model('category', categorySchema)

export default category