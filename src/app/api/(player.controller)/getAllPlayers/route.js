import connectDB from "@/db/connectDB";
import playerModel from "@/models/playerModel";
import { NextResponse } from "next/server";


export async function GET(req, res) {
    try {
        await connectDB()

        await connectDB();

        const { searchParams } = new URL(req.url);
        const house = searchParams.get('house');
        let filter = {}; // Initialize filter object

        if (house) {
            filter.house = house; // If house filter is present, apply the filter
        }
        const playerData = await playerModel.find(); // Fetch players with the filter applied

        if (!playerData || playerData.length === 0) {
            return NextResponse.json({
                sucess: false, messgae: "No players found"
            }, { status: 400 })
        }

        return NextResponse.json({
            sucess: true, messgae: "players fetched successfully", playerData
        }, { status: 200 })

    } catch (error) {
        return NextResponse.json({
            sucess: false, messgae: `Internal server error ${error} `
        }, { status: 500 })
    }
}