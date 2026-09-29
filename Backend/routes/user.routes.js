import { Router } from 'express'
import multer from 'multer'
import {
    login,
    register,
    verifyRegistrationEmail,
    createAdmin,
    logout,
    profile,
    fetchUser,
    changePassword,
    updateProfile,
    uploadAvatar,
} from '../controllers/user.controller.js'
import verifyJWT from '../middlewares/verifyJWT.js'
import verifyAdmin from '../middlewares/adminVerifyJWT.js'

const userRouter = Router()
const upload = multer({ dest: 'uploads/' })

userRouter.post('/register', upload.single('profile'), register)
userRouter.post('/verify-registration-email', verifyRegistrationEmail)
userRouter.post('/admin', verifyAdmin, createAdmin)
userRouter.post('/login', login)
userRouter.post('/logout', verifyJWT, logout)
userRouter.get('/profile', verifyJWT, profile)
userRouter.get('/', fetchUser)
userRouter.post('/changepassword', verifyJWT, changePassword)

// ── Profile update ──
userRouter.put('/profile', verifyJWT, updateProfile)

// ── Avatar upload (Cloudinary via Multer) ──
userRouter.post('/profile/avatar', verifyJWT, upload.single('avatar'), uploadAvatar)

export default userRouter
