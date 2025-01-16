import connectDB from "@/db/connectDB";
import playerModel from "@/models/playerModel";
import { NextResponse } from "next/server";


export async function POST(req, res) {
    try {
        await connectDB()

        const { fullName, gender, year, branch, house, mobile } = await req.json();

        if (!fullName || !gender || !year || !branch || !house || !mobile) {
            return NextResponse.json({
                sucess: false, messgae: "All field are required"
            }, { status: 400 })
        }

        const player = await playerModel.findOneAndUpdate(
            { mobile },
            {
                fullName,
                gender,
                year,
                branch,
                house,
                mobile
            },
            {
                new: true
            }
        ).select("-password");

        if (!player) {
            return NextResponse.json({
                sucess: false, messgae: "Player not found"
            }, { status: 400 })
        }

        return NextResponse.json({
            sucess: true, messgae: "Player details updated successfully", player
        }, { status: 201 })

    } catch (error) {
        return NextResponse.json({
            sucess: false, messgae: "Internal server error"
        }, { status: 500 })
    }
}