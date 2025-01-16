import connectDB from "@/db/connectDB";
import winnerRunnerUp from "@/models/winnerRunnerUp";
import { NextResponse } from "next/server";

export async function POST(req, res) {
    await connectDB()

    const { gameName, winnerName, winnerHouse, runnerUpName, runnerUpHouse } = await req.json();

    if (!gameName || !winnerName || !winnerHouse || !runnerUpName || !runnerUpHouse) {
        return NextResponse.json({
            sucess: false, message: 'All fields are required',
        }, { status: 400 })
    }

    const existingEntry = await winnerRunnerUp.findOne({ gameName });

    if (existingEntry) {
        return NextResponse.json({
            sucess: false, message: 'Winner and Runner-Up for this game already recorded',
        }, { status: 400 })
    }

    const newEntry = await winnerRunnerUp.create({
        gameName,
        winnerName,
        winnerHouse,
        runnerUpName,
        runnerUpHouse,
    });

    return NextResponse.json({
        sucess: true, message: 'Winner and Runner-Up saved successfully!',
        data: newEntry,
    }, { status: 201 })
}