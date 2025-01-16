import connectDB from "@/db/connectDB";
import pointTableModel from "@/models/pointTableModel";
import { NextResponse } from "next/server";

export async function GET(req, res) {
    await connectDB()

    const allGames = await pointTableModel.distinct("gameName");

    return NextResponse.json({
        sucess: true, messgae: "Games fetched successfully", allGames
    }, { status: 201 })
}