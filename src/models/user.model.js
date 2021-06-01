const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: { type: String, trim: true, required: true },
    email: { type: String, trim: true, required: true, email: true, lowercase: true },
    phone: { type: Number },
    role: { type: String, enum: ['admin', 'user'], default: 'admin' },
    password: { type: String, required: true, trim: true }
}, { timestamps: true })

const User = mongoose.model('User', UserSchema);
module.exports = { User }