const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const _ = require('lodash');

const {MODEL_NAME} = require('@server/constants/db');
const {SERVER} = require('@root/config/server');

const userSchema = new mongoose.Schema(
    {
        email: {type: String, required: true, unique: true, lowercase: true},
        firstName: {type: String},
        lastName: {type: String},
        password: {type: String, required: true},
        phone: String,
        role: {type: String, required: true, enum: ['USER', 'REVIEWER', 'ADMIN'], default: 'USER'},
    },
    {
        timestamps: true,
    },
);

/**
 * Password hash middleware.
 */
userSchema.pre('save', async function (next) {
    const user = this;
    if (!user.isModified('password')) {
        return next();
    }
    try {
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
        next();
    } catch (e) {
        return next(e);
    }
});

/**
 * Helper method for validating user's password.
 * @param {String} candidatePassword
 * @return {Promise<boolean>}
 */
userSchema.methods.comparePassword = function (candidatePassword) {
    return bcrypt.compare(candidatePassword, this.password);
};

/**
 * Generate user's JWT token
 * @param {boolean} remember - Remember me
 * @return {String}
 */
userSchema.methods.generateJWT = function (remember) {
    const today = new Date();
    const expirationDays = remember ? SERVER.JWT_EXP_REMEMBER : SERVER.JWT_EXP_DEFAULT;
    const expirationDate = new Date(today);
    expirationDate.setDate(today.getDate() + expirationDays);

    return jwt.sign(
        {
            id: this.id,
            exp: _.round(expirationDate.getTime() / 1000), // ms to s
        },
        SERVER.JWT_SECRET,
        null,
        null,
    );
};

/**
 * Convert User document to JSON, omit password
 * @return {Object}
 */
userSchema.methods.toJSON = function () {
    return {
        id: this.id,
        email: this.email,
        firstName: this.firstName,
        lastName: this.lastName,
        phone: this.phone,
    };
};

module.exports = mongoose.model(MODEL_NAME.USER, userSchema);
