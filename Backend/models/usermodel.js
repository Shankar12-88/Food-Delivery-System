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
      },
      role: {
         type: String,
         enum: ["admin", "user"],
         default: "user"
      }
   },
   { timestamps: true },
)

export const User = mongoose.model('User', userSchema)
