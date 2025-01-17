import mongoose from "mongoose"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"

const userSchema = new mongoose.Schema(
    {
        fullName: {
            type: String,
            lowercase: true,
            trim: true
        },
        username: {
            type: String,
            unique: true,
            lowercase: true,
            trim: true
        },
        password: {
            type: String,
            trim: true
        },
        role: {
            type: String,
            lowercase: true,
            enum: ['admin', 'captain', 'house-representative'],
            trim: true
        },
        house: {
            type: String,
            lowercase: true,
            trim: true,
            enum: ['dominators', 'terminators', 'challengers', 'avengers', ""],
        },
        refreshToken: {
            type: String,
            trim: true
        },
    },
    { timestamps: true }
)


// encrypting password before saving to Db
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();

    this.password = await bcrypt.hash(this.password, 10)
    next()

})

//checking user given password and DB saved password
userSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password)
}

userSchema.methods.generateAccessToken = function () {
    return jwt.sign(
        {
            _id: this._id,
            email: this.email,
            fullName: this.fullName
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}

userSchema.methods.generateRefreshToken = function () {
    return jwt.sign(
        {
            _id: this._id,
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}

export default mongoose.models.User || mongoose.model("User", userSchema);;