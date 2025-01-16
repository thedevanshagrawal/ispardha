import connectDB from "@/db/connectDB";
import pointTableModel from "@/models/pointTableModel";
import { NextResponse } from "next/server";

export async function GET(req, res) {
    try {
        await connectDB()

        const games = await pointTableModel.distinct("gameName");

        return NextResponse.json({
            sucess: true, messgae: "Games fetched successfully", games
        }, { status: 200 })

    } catch (error) {

        return NextResponse.json({
            sucess: false, messgae: "Failed to update points"
        }, { status: 500 })
    }

}