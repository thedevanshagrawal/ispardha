import mongoose from 'mongoose'

const connectDB = async () => {
    try {
        const connection = await mongoose.connect(`${process.env.MONGODB_URI}i-spardha`, {
            useNewUrlParser: true,
        });
        console.log(`MongoDB Connected: ${connection.connection.host}`)
    } catch (error) {
        console.error(error.message)
        process.exit(1)
    }
}

export default connectDB;