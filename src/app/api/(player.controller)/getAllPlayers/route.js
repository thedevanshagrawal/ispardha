import connectDB from "@/db/connectDB";
import playerModel from "@/models/playerModel";
import { NextResponse } from "next/server";


export async function GET(req, res) {
    try {
        await connectDB()

        const { searchParams } = new URL(req.url);

        const house = searchParams.get('house');
        const gender = searchParams.get('gender');
        let filter = {};


        if (house) {
            filter.house = house;
        }

        if (gender) {
            filter.gender = gender;
        }

        const playerData = await playerModel.find(filter);

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