import {User} from '../models/usermodel.js';
import bcrypt from 'bcrypt'
import { generateToken } from '../utils/generateToken.js';
import { option } from '../utils/option.js';
// import { UploadOnCloadinary } from '../utils/uploadOnCloudinary.js';

const register = async (req, res) => {
    try {
        const { name, address, phone, email, password } = req.body;
        if (!name || !address || !phone || !email || !password) {
            return res.status(404).json({
                message: 'Name, address, phone, email, and password are required',
            })
        }

        if (password.length < 8) {
            return res.status(400).json({
                message: 'Password must be at least 8 characters long',
            })
        }

        const verifyUser = await User.findOne({
            $or: [{ email: email.toLowerCase() }, { phone }],
        }).select('-password');
        if (verifyUser) {
            return res.status(400).json({
                message: 'Email or phone number is already registered',
            })
        }
        // const profile = req.file.path;
        // const profileURL = await UploadOnCloadinary(profile);
        // if(!profileURL) {
        //     return res.status(500).json({
        //         message: 'Unable to upload profile picture',
        //     })
        // }

        const hashedPassword = await bcrypt.hash(password, 10)
        const user = await User.create({
            name,
            address,
            phone,
            email,
            password: hashedPassword,
            // profile: profileURL,
        })

        res.status(201).json({
            message: 'User created successfully',
            user: user.name,
        })
    } catch (error) {
        if (error.name === 'ValidationError') {
            return res.status(400).json({ message: error.message })
        }

        res.status(500).json({
            message: 'Unable to create user', error
        })
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body
        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password are required' })
        }

        const user = await User.findOne({ email: email.trim().toLowerCase() })
        const passwordMatches = user && await bcrypt.compare(password, user.password)
        if (!passwordMatches) {
            return res.status(401).json({ message: 'Invalid email or password' })
        }

        const token = await generateToken(user);
        if (!token) {
            return res.status(404).json({
                message: "Token not provided"
            })
        }

        return res.status(200)
            .cookie("AccessToken", token, option)
            .json({
                message: 'Login successful',
                user: { id: user._id, name: user.name, email: user.email },
            })
    } catch (error) {
        console.log('error',error);
        
        return res.status(500).json({ message: 'Unable to verify your login', error })
    }
}

const fetchUser = async (req, res) => {
    try {
        const users = await User.find().select('-password');
        return res.status(200).json({ users });
    } catch (e) {
        return res.status(500).json({ message: 'Unable to fetch users' })
    }
}

const logout = async (req, res) => {
    const user = req.user;
    if(!user){
        return res.status(401).json({ message: 'User must be logged in to be logout' });
    }
    res.clearCookie("AccessToken", option);
    return res.status(200).json({ message: 'Logged out successfully' });
}

const profile = async (req, res) => {
    const userId = req.user._id;
    if(!userId){
        return res.status(400).json({ message: 'User ID is required' });
    }

    const user = await User.findById(userId).select('-password');
    if(!user){
        return res.status(404).json({ message: 'User not found' });
    }
    return res.status(200).json({ message: 'User profile fetched successfully', user });
}

export {
    register,
    login,
    fetchUser,
    logout,
    profile
}