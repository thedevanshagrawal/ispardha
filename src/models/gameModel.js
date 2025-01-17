import mongoose from "mongoose";


const gameSchema = new mongoose.Schema(
    {
        gameName: {
            type: String,
            lowercase: true,
            trim: true
        },
    },
    { timestamps: true }
)

export default mongoose.models.Game || mongoose.model("Game", gameSchema);