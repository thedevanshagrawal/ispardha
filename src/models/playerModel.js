import mongoose from "mongoose";

const playerSchema = new mongoose.Schema(
    {
        fullName: {
            type: String,
            lowercase: true,
            trim: true
        },
        gender: {
            type: String,
            lowercase: true,
            enum: ["boy", "girl"],
            trim: true
        },
        branch: {
            type: String,
            lowercase: true,
            lowercase: true,
            trim: true
        },
        year: {
            type: Number,
            trim: true
        },
        house: {
            type: String,
            lowercase: true,
            enum: ['dominators', 'terminators', 'challengers', 'avengers'],
            trim: true
        },
        mobile: {
            type: Number,
            trim: true
        },
        game: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Game",
            trim: true
        }
    },
    {
        timestamps: true
    }
)

export default mongoose.models.Player || mongoose.model("Player", playerSchema);
