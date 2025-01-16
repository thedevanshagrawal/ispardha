import connectDB from "@/db/connectDB";
import playerModel from "@/models/playerModel";
import { NextResponse } from "next/server";


export async function POST(req, res) {
    try {
        await connectDB()

        const { playerId } = await req.json();
   
        const player = await playerModel.findByIdAndDelete(playerId);

        if (!player) {
            return NextResponse.json({
                sucess: false, messgae: "Player not found"
            }, { status: 400 })
        }

        return NextResponse.json({
            sucess: true, messgae: "Player deleted successfully"
        }, { status: 200 })

    } catch (error) {
        console.log(`Internal server error ${error} `)
        return NextResponse.json({
            sucess: false, messgae: `Internal server error ${error} `
        }, { status: 500 })
    }
}