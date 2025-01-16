import connectDB from "@/db/connectDB";
import pointTableModel from "@/models/pointTableModel";
import { NextResponse } from "next/server";

export async function POST(req, res) {
    try {
        await connectDB()

        const resetResult = await pointTableModel.updateMany({}, { $set: { points: 0 } });

        if (!resetResult || resetResult.modifiedCount === 0) {
            return NextResponse.json({
                sucess: false, messgae: "Failed to reset points"
            }, { status: 400 })

        }

        return NextResponse.json({
            sucess: true, messgae: "Points reset successfully"
        }, { status: 200 })

    } catch (error) {

        return NextResponse.json({
            sucess: false, messgae: "Failed to update points"
        }, { status: 500 })
    }

}