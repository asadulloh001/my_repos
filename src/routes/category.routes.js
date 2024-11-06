import { Router } from "express";
import { createCategory, deleteCategory, readCategoryById, readCategorys, searchCategory, updateCategory } from '../controllers/category.controllers.js'
import { adminCheck, superCheck, userCheck } from "../middlewares/tokenCheckMid.js";

const router = Router()

router.post('/', adminCheck, createCategory)
router.get('/search', userCheck, searchCategory)
router.get('/:id', userCheck, readCategoryById)
router.get('/', userCheck, readCategorys)
router.put('/:id', adminCheck, updateCategory)
router.delete('/:id', superCheck, deleteCategory)

export default router