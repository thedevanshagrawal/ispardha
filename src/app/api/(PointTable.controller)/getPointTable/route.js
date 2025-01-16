import connectDB from "@/db/connectDB";
import pointTableModel from "@/models/pointTableModel";
import { NextResponse } from "next/server";

export async function GET(req, res) {
    try {
        await connectDB()

        const pointTable = await pointTableModel.find().sort({ points: -1 });

        if (!pointTable || pointTable.length === 0) {
            return NextResponse.json({
                sucess: false, messgae: "Point table not found"
            }, { status: 400 })

        }


        return NextResponse.json({
            sucess: true, messgae: "Point table fetched successfully", pointTable
        }, { status: 200 })

    } catch (error) {

        return NextResponse.json({
            sucess: false, messgae: "Failed to update points"
        }, { status: 500 })
    }

}