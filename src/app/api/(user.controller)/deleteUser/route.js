import connectDB from "@/db/connectDB";
import userModel from "@/models/userModel";
import { NextResponse } from "next/server";

export async function POST(req, res) {
    try {
        await connectDB()

        const { username } = await req.json()
    
        if (!username) {
            return NextResponse.json({
                sucess: false, messgae: "username is required"
            }, { status: 400 })
        }

        const user = await userModel.findOneAndDelete({ username })
       
        if (!user) {
            return NextResponse.json({
                sucess: false, messgae: "No user found"
            }, { status: 400 })
        }

        return NextResponse.json({
            sucess: true, messgae: "user deleted successfullyx"
        }, { status: 200 })

    } catch (error) {
        console.log("error: ", error)
        return NextResponse.json({
            sucess: false, messgae: "Internal server error"
        }, { status: 500 })
    }

}