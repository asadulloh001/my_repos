import { Router } from "express";
import { createAuthor, deleteAuthor, readAuthorById, readAuthors, searchAuthor, updateAuthor } from '../controllers/author.controllers.js'

const router = Router()

router.post('/', createAuthor)
router.get('/search', searchAuthor)
router.get('/:id', readAuthorById)
router.get('/', readAuthors)
router.put('/:id', updateAuthor)
router.delete('/:id', deleteAuthor)

export default router