import mongoose from 'mongoose';

const winnerRunnerUpSchema = new mongoose.Schema(
    {
        gameName: {
            type: String,
            required: true,
            lowercase: true,
            trim: true
        },
        winnerName: {
            type: String,
            required: true,
            lowercase: true,
            trim: true
        },
        winnerHouse: {
            type: String,
            lowercase: true,
            enum: ['dominators', 'terminators', 'challengers', 'avengers'],
            trim: true
        },
        runnerUpName: {
            type: String,
            required: true,
            lowercase: true,
            trim: true
        },
        runnerUpHouse: {
            type: String,
            lowercase: true,
            enum: ['dominators', 'terminators', 'challengers', 'avengers'],
            trim: true
        },
    },
    { timestamps: true }
);

export default mongoose.models.WinnerRunnerUp || mongoose.model("WinnerRunnerUp", winnerRunnerUpSchema);;