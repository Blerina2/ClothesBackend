'use strict';
const serverConfig = require('../configs/server.config');
const bcrypt = require('bcryptjs'); // https://www.npmjs.com/package/bcryptjs
const jwt = require('jsonwebtoken'); // https://www.npmjs.com/package/jsonwebtoken
const mongoose = require('mongoose');// https://www.npmjs.com/package/mongoose
const {PASSWORD_REGEX_PATTERN, EMAIL_REGEX_PATTERN} = require("../middlewares/utils/constantslist");
const userSchema = new mongoose.Schema({

    firstname: {
        type: String,
        trim: true,
        required: [true, 'Please add your firstname'],
        maxLength: 50
    },

    lastname: {
        type: String,
        trim: true,
        required: [true, 'Please add your lastname'],
        maxLength: 50
    },

    address: {
        type: String,
        trim: true,
        required: [true, 'Please add your address'],
        maxLength: 50
    },

    phone: {
        type: String,
        trim: true,
        required: [true, 'Please add your phone'],
        maxLength: 50
    },

    birthday: {
        type: String,
        trim: true,
        required: [true, 'Please add your birthday in this format month/day/year'],
        maxLength: 50
    },

    email: {
        type: String,
        trim: true,
        required: [true, 'Please add a e-mail'],
        maxLength: 50,
        unique: true,
        // validations of email, Regex for e-mail, see https://stackoverflow.com/questions/4964691/super-simple-email-validation-with-javascript
        match: [
            EMAIL_REGEX_PATTERN,
            'Please add a valid e-mail'
        ]
    },
    password: {
        type: String,
        trim: true,
        required: [true, 'Please add a password'],
        minLength: [5, 'Password must have at least five(5) characters'],
        // validations of password, Regex for password, see https://stackoverflow.com/questions/12090077/javascript-regular-expression-password-validation-having-special-characters
        // Minimum 5 characters {5}
        // At least one uppercase character (?=.*[A-Z])
        // At least one lowercase character (?=.*[a-z])
        // At least one digit (?=.*\d)
        // At least one special character (?=.*[a-zA-Z >>!#$%&? "<<])[a-zA-Z0-9 >>!#$%&?<< ]
        match: [
            PASSWORD_REGEX_PATTERN,
            'Minimum 5 character. Password must contain at least one uppercase character, one lowercase character, one digit, one special character'
        ]
    },
    role: {
        type: Number,
        default: 0, // 0 ist for customer, and 1 for system-manager
    }
}, {timestamps: true});

// encrypting password before saving into database
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        next();
    }
    this.password = await bcrypt.hash(this.password, 10);
});

// verify the passwordToCompare is the same as saved in the database.
userSchema.methods.comparePassword = async function (passwordToCompare) {
    return await bcrypt.compare(passwordToCompare, this.password);
}

// Generate the json web token (jwt) and return it. Expires in 1 hour.
// The generate jwt token will be in the session context.
// To see the content of the token, go to https://jwt.io/ and past the token that was generated.
userSchema.methods.generateJWTToken = async function () {
    return jwt.sign({id: this.id}, serverConfig.web.JWT_TOKEN_SECRET, {expiresIn: serverConfig.web.JWT_EXPIRE_TOKEN});
}


module.exports = mongoose.model('User', userSchema);