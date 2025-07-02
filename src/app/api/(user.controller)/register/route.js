import connectDB from "@/db/connectDB";
import userModel from "@/models/userModel";
import { NextResponse } from "next/server";


export async function POST(req, res) {
    try {
        const { fullName, username, password, role, house } = await req.json();

        if (!fullName || !username || !password || !role) {
            return NextResponse.json({
                sucess: false, messgae: "All fields are required"
            }, { status: 400 })
        }

        await connectDB();
        const existingUser = await userModel.findOne({ username });
        if (existingUser) {
            return NextResponse.json({
                sucess: false, messgae: "User already exists"
            }, { status: 400 })
        }

        const user = userModel.create({ fullName, username, password, role, house });

        if (!user) {
            return NextResponse.json({
                sucess: false, messgae: "User not created"
            }, { status: 400 })

        }

        return NextResponse.json({
            sucess: true, message: "User registered successfully", user
        }, { status: 201 })

    } catch (error) {
        return NextResponse.json({
            sucess: false, message: "Internal server error"
        }, { status: 500 })
    }

};
