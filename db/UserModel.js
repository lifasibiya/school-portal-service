const mongoose = require('mongoose');

const userScheme = new mongoose.Schema({
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: [true, 'Email already exists'],
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        unique: false
    },
});

module.exports = mongoose.model.Users || mongoose.model('Users', userScheme);
