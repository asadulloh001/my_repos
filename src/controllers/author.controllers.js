import { paginate } from "../helpers/paginate.js";
import author from "../models/author.models.js";
import midCheck from '../schemas/author.schema.js'

export const createAuthor = async (req, res, next) => {
    try {
        const {error, value} = midCheck(req.body)
        
        if(error) {
            return res.status(400).json({success: false, error: error.details[0].message})
        }

        const newAuthor = new author(value)
        await newAuthor.save()
        res.status(200).json({success: true, author_id: newAuthor})
    } catch (error) {
        res.status(500).json({success: false, error: error.message})
    }
}

export const readAuthors = async (req, res, next) => {
    try {
        const authors = await author.find()
        if(!authors.length) {
            return res.status(400).json({success: false, message: "No authors found"})
        }
        const paginated = paginate(req.query.page || 1, req.query.limit || 10, authors)
        return res.status(200).json({success: true, paginated})
    } catch (error) {
        res.status(500).json({success: false, error: error.message})
    }
}

export const updateAuthor = async (req, res, next) => {
    try {
        const id = req.params.id

        const updatedAuthor = await author.findByIdAndUpdate(id, req.body)
        res.status(200).send({success: true, updated: updatedAuthor})
    } catch (error) {
        res.status(500).json({success: false, error: error.message})
    }
}

export const deleteAuthor = async (req, res, next) => {
    try {
        const found = await author.find({_id: req.params.id})
        
        if(found.length) {
            const deletedAuthor = await author.deleteOne({_id: req.params.id})
            res.status(200).json({success: true, deletedAuthor})
        } else {
            res.status(404).json({success: false, message: 'Author not found.'})
        }

    } catch (error) {
        res.status(500).json({success: false, error: error.message})
    }
}

export const readAuthorById = async (req, res, next) => {
    try {
        const theAuthor = await author.find({_id: req.params.id})
        if(!theAuthor.length)
            return res.status(400).json({success: false, message: "No author with this id was found"})
        return res.status(200).json({success: true, author: theAuthor})
    } catch (error) {
        res.status(500).json({success: false, error: error.message})
    }
}

export const searchAuthor = async (req, res, next) => {
    try {
        const theAuthor = await author.find(req.query)
        if(!theAuthor.length)
            return res.status(400).json({success: false, message: "No Author was found"})
        
        return res.status(200).json({success: true, author: theAuthor})
    } catch (error) {
        res.status(500).json({success: false, error: error.message})
    }
}