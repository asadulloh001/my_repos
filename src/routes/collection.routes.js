import { Router } from "express";
import { createCategory, deleteCategory, readCategoryById, readCategorys, searchCategory, updateCategory } from '../controllers/category.controllers.js'

const router = Router()

router.post('/', createCategory)
router.get('/search', searchCategory)
router.get('/:id', readCategoryById)
router.get('/', readCategorys)
router.put('/:id', updateCategory)
router.delete('/:id', deleteCategory)

export default router