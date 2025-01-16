import mongoose from 'mongoose';

const winnerRunnerUpSchema = new mongoose.Schema(
    {
        gameName: {
            type: String,
            required: true,
        },
        winnerName: {
            type: String,
            required: true,
        },
        winnerHouse: {
            type: String,
            lowercase: true,
            enum: ['dominator', 'terminator', 'challengers', 'avengers'],
        },
        runnerUpName: {
            type: String,
            required: true,
        },
        runnerUpHouse: {
            type: String,
            lowercase: true,
            enum: ['dominator', 'terminator', 'challengers', 'avengers'],
        },
    },
    { timestamps: true }
);

export default mongoose.models.WinnerRunnerUp || mongoose.model("WinnerRunnerUp", winnerRunnerUpSchema);;