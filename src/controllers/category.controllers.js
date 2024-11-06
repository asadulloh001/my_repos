import category from "../models/category.models.js";
import midCheck from '../schemas/category.schema.js'
import { paginate } from "../helpers/paginate.js";

export const createCategory = async (req, res, next) => {
    try {
        const {error, value} = midCheck(req.body)
        
        if(error) {
            return res.status(400).json({success: false, error: error.details[0].message})
        }

        const newCategory = new category(value)
        await newCategory.save()
        
        res.status(200).json({success: true, category_id: newCategory})
    } catch (error) {
        res.status(500).json({success: false, error: error.message})
    }
}

export const readCategorys = async (req, res, next) => {
    try {
        const categories = await category.find()
        if(!categories.length) {
            return res.status(400).json({success: false, message: "No category found"})
        }
        const paginated = paginate(req.query.page || 1, req.query.limit || 10, categories)

        return res.status(200).json({success: true, paginated})
    } catch (error) {
        res.status(500).json({success: false, error: error.message})
    }
}

export const updateCategory = async (req, res, next) => {
    try {
        const id = req.params.id

        const updatedCategory = await category.findByIdAndUpdate(id, req.body)
        res.status(200).send({success: true, updated: updatedCategory})
    } catch (error) {
        res.status(500).json({success: false, error: error.message})
    }
}

export const deleteCategory = async (req, res, next) => {
    try {
        const found = await category.find({_id: req.params.id})
        
        if(found.length) {
            const deletedCategory = await category.deleteOne({_id: req.params.id})
            res.status(200).json({success: true, deletedCategory})
        } else {
            res.status(404).json({success: false, message: 'category not found.'})
        }

    } catch (error) {
        res.status(500).json({success: false, error: error.message})
    }
}

export const readCategoryById = async (req, res, next) => {
    try {
        const theCategory = await category.find({_id: req.params.id})
        if(!theCategory.length)
            return res.status(400).json({success: false, message: "No category with this id was found"})
        return res.status(200).json({success: true, category: theCategory})
    } catch (error) {
        res.status(500).json({success: false, error: error.message})
    }
}

export const searchCategory = async (req, res, next) => {
    try {
        const theCategory = await category.find(req.query)
        if(!theCategory.length)
            return res.status(400).json({success: false, message: "No category was found"})
        return res.status(200).json({success: true, category: theCategory})
    } catch (error) {
        res.status(500).json({success: false, error: error.message})
    }
}