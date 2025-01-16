import connectDB from "@/db/connectDB";
import userModel from "@/models/userModel";
import { NextResponse } from "next/server";


export async function POST(req, res) {
    try {
        await connectDB()

        const { fullName, username, role, house } = await req.json()

        if (!username || !fullName) {
            return NextResponse.json({
                sucess: false, messgae: "username ot fullName is required"
            }, { status: 400 })
        }

        const updatedUser = await userModel.findOneAndUpdate(
            { username },
            {
                fullName, username, role, house
            },
            { new: true }
        ).select("-password");

        if (!updatedUser) {
            return NextResponse.json({
                sucess: false, messgae: "user not found"
            }, { status: 400 })
        }

        return NextResponse.json({
            sucess: true, messgae: "User updated successfully", updatedUser
        }, { status: 200 })

    } catch (error) {
        return NextResponse.json({
            sucess: false, messgae: "Internal server error"
        }, { status: 500 })
    }
}