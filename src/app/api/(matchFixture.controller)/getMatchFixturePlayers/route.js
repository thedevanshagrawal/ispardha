import connectDB from "@/db/connectDB"
import matchFixtureModel from "@/models/matchFixtureModel"
import playerModel from "@/models/playerModel"
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

        const matchResults = await Promise.all(
            matchFixtureDetails.map(async (match) => {
                const gameName = match.gameName;
                const teams = match.teams;

                const playerDataPromises = teams.map((team) =>
                    Promise.all(
                        team.players.map(async (playerId) => {
                            const playerData = await playerModel.findById(playerId);
                            return playerData;
                        })
                    )
                );
                const playersData = await Promise.all(playerDataPromises);
                return {
                    gameName,
                    players: playersData.flat(),
                };
            })
        );

        return NextResponse.json(
            {
                success: true,
                message: "Players fetched successfully",
                matchResults
            },
            { status: 200 }
        );

    } catch (error) {
        return NextResponse.json({
            sucess: false, message: "Internal server error"
        }, { status: 500 })

    }
}