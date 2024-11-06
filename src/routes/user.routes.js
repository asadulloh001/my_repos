import { Router } from "express";
import { createUser, deleteUser, readUserById, readUsers, searchUser, updateUser } from '../controllers/user.controllers.js'
import { adminCheck, superCheck } from "../middlewares/tokenCheckMid.js";

const router = Router()

router.post('/', adminCheck, createUser)
router.get('/search', adminCheck, searchUser)
router.get('/:id', adminCheck, readUserById)
router.get('/', adminCheck, readUsers)
router.put('/:id', adminCheck, updateUser)
router.delete('/:id', superCheck, deleteUser)

export default router