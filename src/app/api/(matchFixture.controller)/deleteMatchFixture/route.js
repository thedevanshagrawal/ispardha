import connectDB from "@/db/connectDB"
import matchFixtureModel from "@/models/matchFixtureModel"
import { NextResponse } from "next/server"


export async function POST(req, res) {
    try {
        await connectDB()

        const { matchNumber } = await req.json()
        if (!matchNumber) {
            return NextResponse.json({
                sucess: false, messgae: "match number is required."
            }, { status: 400 })
        }

        const matchFixture = await matchFixtureModel.findOneAndDelete({ matchNumber })

        if (!matchFixture) {
            return NextResponse.json({
                sucess: false, messgae: "match fixture not found"
            }, { status: 400 })
        }

        return NextResponse.json({
            sucess: true, messgae: "match fixture deleted successfully.", matchFixture
        }, { status: 201 })
    } catch (error) {
        return NextResponse.json({
            sucess: false, messgae: "Internal server error"
        }, { status: 500 })

    }
}