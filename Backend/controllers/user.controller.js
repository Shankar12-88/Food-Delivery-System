import User from '../models/user.model.js';


const register = async (req, res) => {
    try {
        const { name, address, phone, email, password } = req.body ?? {};
        if(!name || !address || !phone || !email || !password){
            return res.status(400).json({
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
        if(verifyUser){
            return res.status(400).json({
                message: 'Email or phone number is already registered',
            })
        }

        const user = await User.create({
            name, 
            address,
            phone,
            email,
            password
        })

        res.status(201).json({
            message: 'User created successfully',
            user: user.name,
        })
    } catch(error) {
        if (error.name === 'ValidationError') {
            return res.status(400).json({ message: error.message })
        }

        res.status(500).json({
            message: 'Unable to create user',
        })
    }
};

export {
    register
}