const User = require('../models/User');
const { validationResult } = require('express-validator');

exports.signup = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { username, email, password } = req.body;

        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: 'User already exists' });
        }

        user = new User({ username, email, password });

        await user.save();

        res.status(201).json({
            message: 'User created successfully.',
            user_id: user.id
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        let user = await User.findOne({
            email,
            password
        });

        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        res.status(200).json({
            message: 'Login Successful.'
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};