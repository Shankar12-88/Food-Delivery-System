import { Router } from 'express'
import multer from 'multer'
import { login, register, logout, profile } from '../controllers/user.controller.js'
import verifyJWT from '../middlewares/verifyJWT.js'

const userRouter = Router()
const upload = multer({ dest: 'uploads/' })

userRouter.post('/register', upload.single('profile'), register)
userRouter.post('/login', login)
userRouter.post('/logout',verifyJWT, logout)
userRouter.get('/profile', verifyJWT, profile)
export default userRouter
