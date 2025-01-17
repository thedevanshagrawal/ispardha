import mongoose from 'mongoose';

const pointTableSchema = new mongoose.Schema(
    {
        house: {
            type: String,
            lowercase: true,
            enum: ['dominators', 'terminators', 'challengers', 'avengers'],
            trim: true
        },
        gameName: {
            type: String,
            lowercase: true,
            trim: true
        },
        points: {
            type: Number,
            min: 0,
            trim: true
        },
    },
    { timestamps: true }
);

export default mongoose.models.PointTable || mongoose.model("PointTable", pointTableSchema);