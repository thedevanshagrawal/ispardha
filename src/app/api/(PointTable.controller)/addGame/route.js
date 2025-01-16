import connectDB from "@/db/connectDB";
import pointTableModel from "@/models/pointTableModel";
import { NextResponse } from "next/server";

export async function POST(req, res) {
    try {
        await connectDB()

        const { gameName } = await req.json();
        if (!gameName) {
            return NextResponse.json({
                sucess: false, messgae: "Game name is required"
            }, { status: 400 })
        }

        // Add a new entry for the game without points
        await pointTableModel.create({ house: "Dominator", gameName, points: 0 });

        return NextResponse.json({
            sucess: true, messgae: "Game added successfully"
        }, { status: 200 })

    } catch (error) {

        return NextResponse.json({
            sucess: false, messgae: "Failed to update points"
        }, { status: 500 })
    }

}