import category from "../models/category.models";
import midCheck from '../schemas/collection.schema.js'

export const createCategory = async (req, res, next) => {
    try {
        const {error, value} = midCheck(req.body)
        
        if(error) {
            return res.status(400).json({success: false, error: error.details[0].message})
        }

        const newCategory = await category(value)
        newCategory.save()
        res.status(200).json({success: true, user_id: newCategory})
    } catch (error) {
        res.status(500).json({success: false, error: error.message})
    }
}

export const readCategorys = async (req, res, next) => {
    try {
        const categorys = await category.find().offset(req.query.offset || 0).limit(req.query.limit || 10)
        if(!categorys.length) {
            return res.status(400).json({success: false, message: "No category found"})
        }

        return res.status(200).json({success: true, categorys})
    } catch (error) {
        res.status(500).json({success: false, error: error.message})
    }
}

export const updateCategory = async (req, res, next) => {
    try {
        const id = req.params.id
        const {error, value} = midCheck(req.body)
        
        if(error || !id) {
            return res.status(400).json({success: false, error: error?.details[0]?.message})
        }

        const updatedCategory = await category.findByIdAndUpdate(id, value)
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