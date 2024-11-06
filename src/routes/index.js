import { Router } from "express";
const router = Router()
import authorRouter from './author.routes.js'
import catRouter from './category.routes.js'
import userRouter from './user.routes.js'
import authRouter from './auth.routes.js'

router.use('/authors', authorRouter)
router.use('/categories',  catRouter)
router.use('/users', userRouter)
router.use('/auth', authRouter)

export default router