const bcrypt = require('bcryptjs');

const User = require('../models/User');
const { registerValidator } = require('../utilities/validators');

const register = async (req, res) => {
    try {
        const validationResult = registerValidator.validate(req.body, { abortEarly: false });
        if (validationResult.error) {
            res.status(400).json(validationResult);
        } else {
            const { firstName, lastName, email, password } = req.body;
            const existingUser = await User.findOne({ email });
            if (existingUser) {
                res.status(401).json({
                    error: 'An account with this email exists already'
                });
                return;
            }
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);
            await new User({
                firstName,
                lastName,
                email,
                password: hashedPassword
            }).save();
            res.status(201).json({
                message: 'Account created successfully'
            });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }    
}

const login = async (req, res) => {

}

module.exports = {
    register,
    login
}