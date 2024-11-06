import { getTokens } from "../helpers/jwt.js"
import users from "../models/user.models.js"
import userSchema from "../schemas/user.schema.js"

export async function loginUser(req, res, next) {
    try {
        const {email, password} = req.body
        if(!email || !password) return res.status(409).json({success: false, message: 'Please, enter your email and password'})

        const theUser = await users.find({email, password})
        if(!theUser.length) return res.status(404).json({success: false, message: "User not found"})
        
        const token = getTokens(theUser[0])
        return res.status(200).json({success: true, token})
    
    } catch (error) {
        return res.status(500).json({success: false, 
            message: 'Something went wrong',
            error: error.message})
    }
}

export async function registerUser(req, res, next) {
    try {
        const {name, email, password, confirm_password} = req.body
        const {value, error} = userSchema({name, email, password, confirm_password})
        if(error) {
            return res.status(409).json({success: false, error: error.details[0].message})
        }
        const newUser = new users(value)
        await newUser.save()
        
        return res.status(201).json({success: true, _id: newUser._id})
    } catch (error) {
        return res.status(500).json({success: false, 
            message: 'Something went wrong',
            error: error.message})
    }
}