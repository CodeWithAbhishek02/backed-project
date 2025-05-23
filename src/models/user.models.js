import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken";

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        index: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        match: [/^\S+@\S+\.\S+$/, "Please enter a valid email address"] // ✅ optional but recommended
    },
    fullname: {
        type: String,
        required: true,
        trim: true,
        index: true
    },
    avatar: { // ✅ Spelling fixed (was "avator")
        type: String, // Cloudinary URL
        required: true,
        trim: true
    },
    coverImage: {
        type: String, // Cloudinary URL
        trim: true,
        default: null
    },
    watchHistory: [
        {
            type: Schema.Types.ObjectId,
            ref: "Video"
        }
    ],
    password: {
        type: String,
        required: [true, 'Password is required'],
    },
    refreshToken: {
        type: String,
        default: null
    }
}, { timestamps: true });


// password hashing

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();

    try {
        this.password = await bcrypt.hash(this.password, 10)
        next()
    } catch (error) {
        return next(error);
    }
})

// compare hash passwors and plain password

userSchema.methods.iscorrectPassword = async function (password) {
    return await bcrypt.compare(password, this.password)
}

// TOKEN GENERATE
userSchema.methods.generateAccessToken = function () {
    return jwt.sign({
        _id: this._id,
        email: this.email,
        username: this.username,
    },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: process.env.ACCESS_TOKEN_EXPIRY })
}

userSchema.methods.refreshAccessToken = function () {
    return jwt.sign({
        _id: this._id
    },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: process.env.REFRESH_TOKEN_EXPIRY })
}
export const User = mongoose.model('User', userSchema);
