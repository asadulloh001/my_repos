import mongoose  from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minLength: [3, 'Name must be at least 3 letter long!'],
        maxLength: [100, 'Ayooo, you have crazy long name']
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        match: [/.+@.+\..+/, 'Email is not valid'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Password is required']
    },
    role: {
        type: String,
        enum: ['admin', 'superadmin', 'user'],
        required: true,
        default: 'user'
    }
}, 
{
    timestamps: true,
})

const users = mongoose.model('user', userSchema)

export default users