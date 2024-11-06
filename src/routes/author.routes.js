import { Router } from "express";
import { createAuthor, deleteAuthor, readAuthorById, readAuthors, searchAuthor, updateAuthor } from '../controllers/author.controllers.js'
import { adminCheck, superCheck, userCheck } from "../middlewares/tokenCheckMid.js";

const router = Router()

router.post('/', adminCheck, createAuthor)
router.get('/search', userCheck, searchAuthor)
router.get('/:id', userCheck, readAuthorById)
router.get('/', userCheck, readAuthors)
router.put('/:id', adminCheck, updateAuthor)
router.delete('/:id', superCheck, deleteAuthor)

export default router