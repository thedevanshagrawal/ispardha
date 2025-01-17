import connectDB from "@/db/connectDB";
import userModel from "@/models/userModel";
import { NextResponse } from "next/server";


export async function POST(req, res) {
    try {
        await connectDB();
        const { fullName, username, password, role, house } = await req.json();

        console.log("fullName: ", fullName)
        console.log("username: ", username)
        console.log("password: ", password)
        console.log("role: ", role)
        console.log("house: ", house)

        if (!fullName || !username || !password || !role) {
            return NextResponse.json({
                sucess: false, messgae: "All fields are required"
            }, { status: 400 })
        }

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
            }, { status: 500 })

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
