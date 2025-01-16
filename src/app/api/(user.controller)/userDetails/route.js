import connectDB from "@/db/connectDB";
import userModel from "@/models/userModel";
import { NextResponse } from "next/server";

export async function GET(req, res) {
    try {
        await connectDB()

        const userDetails = await userModel.find()

        if (!userDetails) {
            return NextResponse.json({
                sucess: false, messgae: "No user found"
            }, { status: 400 })
        }

        return NextResponse.json({
            sucess: true, message: "User found", userDetails
        }, { status: 200 })

    } catch (error) {
        console.log(`Internal server error ${error}`)
        return NextResponse.json({
            sucess: false, messgae: "Internal server error"
        }, { status: 400 })
    }
}