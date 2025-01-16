import connectDB from "@/db/connectDB"
import matchFixtureModel from "@/models/matchFixtureModel"
import { NextResponse } from "next/server"


export async function GET(req, res) {
    try {
        await connectDB()
        const matchFixtureDetails = await matchFixtureModel.find()

        if (!matchFixtureDetails) {
            return NextResponse.json({
                sucess: false, messgae: "match fixture not found"
            }, { status: 404 })
        }

        return NextResponse.json({
            sucess: true, messgae: "Match fixture fetched successfully", matchFixtureDetails
        }, { status: 201 })
    } catch (error) {
        return NextResponse.json({
            sucess: false, messgae: "Internal server error"
        }, { status: 500 })

    }
}