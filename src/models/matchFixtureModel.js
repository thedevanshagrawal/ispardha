import mongoose from 'mongoose';

const matchFixtureSchema = new mongoose.Schema(
    {
        matchNumber: {
            type: String,
            lowercase: true,
            trim: true
        },
        date: {
            type: String,
            trim: true
        },
        // game: {
        //     type: mongoose.Schema.Types.ObjectId,
        //     ref: 'Game',
        // },
        gameName: {
            type: String,
            lowercase: true,
            trim: true
        },
        teams: [
            {
                house: {
                    type: String,
                    lowercase: true,
                    enum: ['dominators', 'terminators', 'challengers', 'avengers'],
                    trim: true

                },
                players: [
                    {
                        type: mongoose.Schema.Types.ObjectId,
                        ref: 'Player',
                        trim: true
                    },
                ],
            },
        ],
        gender: {
            type: String,
            lowercase: true,
            enum: ['boy', 'girl'],
            trim: true
        },
    },
    {
        timestamps: true,
    }
);

matchFixtureSchema.pre('save', function (next) {
    if (this.date) {
        const originalDate = new Date(this.date);
        const formattedDate = originalDate
            .toLocaleDateString('en-GB') // Format as dd-mm-yyyy
            .split('/')
            .join('-'); // Replace "/" with "-"
        this.date = formattedDate;
    }
    next();
});

export default mongoose.models.MatchFixture || mongoose.model("MatchFixture", matchFixtureSchema);
