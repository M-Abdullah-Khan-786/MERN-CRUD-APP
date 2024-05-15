const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    first_name: {
        type: String,
        required: [true, "First Name required"],
    },
    last_name: {
        type: String,
        required: [true, "Last Name required"],
    },
    email: {
        type: String,
        required: [true, "Email required"],
        unique: true,
    },
    phone: {
        type: String,
        required: [true, "Phone Number required"],
    }
});


const User = mongoose.model('User', userSchema);
module.exports = User