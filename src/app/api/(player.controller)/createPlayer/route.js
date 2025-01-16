import connectDB from "@/db/connectDB";
import playerModel from "@/models/playerModel";
import { NextResponse } from "next/server";


export async function POST(req, res) {
    try {
        await connectDB()

        const { fullName, gender, branch, house, mobile } = await req.json();

        if ([fullName, gender, branch, house].some((field) => field?.trim() === "")) {
            return NextResponse.json({
                sucess: false, messgae: "All fields are required"
            }, { status: 400 })
        }

        const playerData = { fullName, gender, branch, house, mobile };

        const player = await playerModel.create(playerData);

        if (!player) {
            return NextResponse.json({
                sucess: false, messgae: "player not created"
            }, { status: 400 })
        }

        return NextResponse.json({
            sucess: true, messgae: "player created successfully", player
        }, { status: 201 })

    } catch (error) {
        return NextResponse.json({
            sucess: false, messgae: `Internal server error ${error}`
        }, { status: 500 })
    }
}