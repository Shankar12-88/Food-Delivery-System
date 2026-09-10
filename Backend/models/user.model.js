import bcrypt from 'bcrypt'
import mongoose from 'mongoose'

const userSchema = new mongoose.Schema(
  {
    name: { 
        type: String, 
        required: true, 
        trim: true 
    },
    address: { 
        type: String,
         required: true, 
         trim: true 
        },
    phone: {
         type: String,
          required: true, 
          trim: true,
           unique: true
         },
    email: {
         type: String,
          required: true,
           trim: true,
            lowercase: true,
             unique: true
             },
    password: {
         type: String,
          required: true,
           minlength: 8,
            select: false
         },
         image:{
            type: String
         },
         refreshToken:{
            type:String
         },
         otp:{
            type:Number
         }
  },
  { timestamps: true },
)

export default mongoose.model('User', userSchema)
