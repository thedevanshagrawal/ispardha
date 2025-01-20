import connectDB from "@/db/connectDB"
import matchFixtureModel from "@/models/matchFixtureModel"
import { NextResponse } from "next/server"


export async function POST(req, res) {
    try {
        await connectDB()

        const { matchNumber, gameName, date, house1, house2, gender, matchTime } = await req.json()

        if ([gameName, house1, house2, gender].some((field) => field?.trim() === "")) {
            return NextResponse.json({
                sucess: false, messgae: "all fields are required"
            }, { status: 400 })
        }

        const teams = [
            { house: house1.toLowerCase(), players: [] },
            { house: house2.toLowerCase(), players: [] }
        ]

        const matchFixture = await matchFixtureModel.create({
            matchNumber,
            date,
            matchTime,
            gameName,
            teams,
            gender
        })

        if (!matchFixture) {
            return NextResponse.json({
                sucess: false, messgae: "matchfixture error"
            }, { status: 400 })
        }

        return NextResponse.json({
            sucess: true, messgae: "Match fixture created successfully. Captains can now add players.", matchFixture
        }, { status: 201 })
    } catch (error) {
        return NextResponse.json({
            sucess: false, messgae: "Internal server error"
        }, { status: 500 })

    }
}