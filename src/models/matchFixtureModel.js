import mongoose from 'mongoose';

const matchFixtureSchema = new mongoose.Schema(
    {
        matchNumber: {
            type: String,
            lowercase: true,
            trim: true,
        },
        date: {
            type: String,
            trim: true,
            set: function (value) {
                if (value) {
                    const originalDate = new Date(value);
                    if (!isNaN(originalDate)) {
                        return originalDate
                            .toLocaleDateString('en-GB') // Format as dd-mm-yyyy
                            .split('/')
                            .join('-'); // Replace "/" with "-"
                    }
                }
                return value;
            },
        },
        gameName: {
            type: String,
            lowercase: true,
            trim: true,
        },
        teams: [
            {
                house: {
                    type: String,
                    lowercase: true,
                    enum: ['dominators', 'terminators', 'challengers', 'avengers'],
                    trim: true,
                },
                players: [
                    {
                        type: mongoose.Schema.Types.ObjectId,
                        ref: 'Player',
                        trim: true,
                    },
                ],
            },
        ],
        gender: {
            type: String,
            lowercase: true,
            enum: ['boy', 'girl'],
            trim: true,
        },
    },
    {
        timestamps: true,
    }
);

export default mongoose.models.MatchFixture || mongoose.model("MatchFixture", matchFixtureSchema);
