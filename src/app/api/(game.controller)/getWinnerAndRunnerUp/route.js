import connectDB from "@/db/connectDB";
import winnerRunnerUp from "@/models/winnerRunnerUp";
import { NextResponse } from "next/server";

export async function GET(req, res) {
    await connectDB()

    const winnerDetails = await winnerRunnerUp.find();

    if (!winnerDetails || winnerDetails.length === 0) {
        return NextResponse.json({
            sucess: false, messgae: "Winner and Runner-Up details not found"
        }, { status: 404 })

    }

    return NextResponse.json({
        sucess: true, messgae: "Winner and Runner", winnerDetails
    }, { status: 201 })
}