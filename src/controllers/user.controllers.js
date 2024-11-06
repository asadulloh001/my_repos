import { paginate } from "../helpers/paginate.js";
import user from "../models/user.models.js";
import midCheck from '../schemas/user.schema.js'

export const createUser = async (req, res, next) => {
    try {
        const {error, value} = midCheck(req.body)
        
        if(error) {
            return res.status(400).json({success: false, error: error.details[0].message})
        }

        const newUser = new user(value)
        await newUser.save()
        res.status(200).json({success: true, user_id: newUser})
    } catch (error) {
        res.status(500).json({success: false, error: error.message})
    }
}

export const readUsers = async (req, res, next) => {
    try {
        const Users = await user.find()
        if(!Users.length) {
            return res.status(400).json({success: false, message: "No Users found"})
        }

        const paginated = paginate(req.query.page || 1, req.query.limit || 10, Users)
        return res.status(200).json({success: true, paginated})
    } catch (error) {
        res.status(500).json({success: false, error: error.message})
    }
}

export const updateUser = async (req, res, next) => {
    try {
        const id = req.params.id
       
        const updatedUser = await user.findByIdAndUpdate(id, req.body)

        res.status(200).send({success: true, updated: updatedUser})
    } catch (error) {
        res.status(500).json({success: false, error: error.message})
    }
}

export const deleteUser = async (req, res, next) => {
    try {
        const found = await user.find({_id: req.params.id})
        
        if(found.length) {
            const deletedUser = await user.deleteOne({_id: req.params.id})
            res.status(200).json({success: true, deletedUser})
        } else {
            res.status(404).json({success: false, message: 'User not found.'})
        }

    } catch (error) {
        res.status(500).json({success: false, error: error.message})
    }
}

export const readUserById = async (req, res, next) => {
    try {
        const theUser = await user.find({_id: req.params.id})
        if(!theUser.length)
            return res.status(400).json({success: false, message: "No User with this id was found"})
        return res.status(200).json({success: true, User: theUser})
    } catch (error) {
        res.status(500).json({success: false, error: error.message})
    }
}

export const searchUser = async (req, res, next) => {
    try {
        const theUser = await user.find(req.query)
        if(!theUser.length)
            return res.status(400).json({success: false, message: "No User was found"})
        return res.status(200).json({success: true, User: theUser})
    } catch (error) {
        res.status(500).json({success: false, error: error.message})
    }
}