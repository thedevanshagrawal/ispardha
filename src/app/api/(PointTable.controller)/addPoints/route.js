import connectDB from "@/db/connectDB";
import pointTableModel from "@/models/pointTableModel";
import { NextResponse } from "next/server";

export async function POST(req, res) {
    try {
        await connectDB()

        const { house, gameName, points } = await req.json();

        if (!house || !gameName || points === undefined) {
            return NextResponse.json({
                sucess: false, messgae: "House, gameName, and points are required"
            }, { status: 400 })
        }


        // Find the point entry and update the points, or create a new entry if not found
        const pointEntry = await pointTableModel.findOneAndUpdate(
            { house, gameName },
            { $inc: { points } }, // Increment the points field
            { new: true, upsert: true } // If not found, create new entry
        );

        return NextResponse.json({
            sucess: true, messgae: "Points updated successfully", pointEntry
        }, { status: 200 })

    } catch (error) {

        return NextResponse.json({
            sucess: false, messgae: "Failed to update points"
        }, { status: 500 })
    }

}