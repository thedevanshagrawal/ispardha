import connectDB from "@/db/connectDB";
import pointTableModel from "@/models/pointTableModel";
import { NextResponse } from "next/server";

export async function POST(req, res) {
    try {
        await connectDB()

        const { gameName } = await req.json();
        if (!gameName) {
            return NextResponse.json({
                sucess: false, messgae: "gameName are required"
            }, { status: 400 })
        }

        const deletedEntry = await pointTableModel.findOneAndDelete({ gameName });

        if (!deletedEntry) {
            return NextResponse.json({
                sucess: false, messgae: "game not found"
            }, { status: 400 })
        }

        return NextResponse.json({
            sucess: true, messgae: "game deleted successfully", deletedEntry
        }, { status: 200 })

    } catch (error) {

        return NextResponse.json({
            sucess: false, messgae: "Failed to update points"
        }, { status: 500 })
    }

}