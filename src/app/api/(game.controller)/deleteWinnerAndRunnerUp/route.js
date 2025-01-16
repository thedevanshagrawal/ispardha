import connectDB from "@/db/connectDB";
import winnerRunnerUp from "@/models/winnerRunnerUp";
import { NextResponse } from "next/server";

export async function POST(req, res) {
    await connectDB()

    const { gameName } = await req.json();

    if (!gameName) {
        return NextResponse.json({
            sucess: false, message: "Game name is required"
        }, { status: 400 })
    }

    const WinnerAndRunnerUpDetails = await winnerRunnerUp.findOneAndDelete({ gameName });

    if (!WinnerAndRunnerUpDetails) {
        return NextResponse.json({
            sucess: false, message: 'Winner and Runner-Up details not found'
        }, { status: 404 })
        throw new ApiError(404, 'Winner and Runner-Up details not found');
    }

    return NextResponse.json({
        sucess: true, message: "Winner And Runner-Up Details deleted successfully", WinnerAndRunnerUpDetails
    }, { status: 201 })
}