import connectDB from "@/db/connectDB"
import matchFixtureModel from "@/models/matchFixtureModel"
import playerModel from "@/models/playerModel";
import { NextResponse } from "next/server"


export async function POST(req, res) {
    try {
        await connectDB()

        const { matchNumber, house, players, gender } = await req.json();

        if (!matchNumber || !house || !gender) {
            return NextResponse.json({
                sucess: false, messgae: "All field are required"
            }, { status: 400 })

        } 

        if (!Array.isArray(players) || players.length === 0) {
            return NextResponse.json({
                sucess: false, messgae: "At least one player must be selected."
            }, { status: 400 })
        }

        // Fetch the match fixture
        const matchFixture = await matchFixtureModel.findOne({ matchNumber });

        if (!matchFixture) {
            throw new ApiError(404, "Match fixture not found.");
        }

        // Check if the house exists in the fixture
        const team = matchFixture.teams.find(
            (team) => team.house === house.toLowerCase()
        );

        if (!team) {
            return NextResponse.json({
                sucess: false, messgae: `House ${house} not found in this match fixture.`
            }, { status: 400 })
        }

        // Validate each player
        for (const playerName of players) {
            const player = await playerModel.findOne({
                fullName: playerName,
                house: house.toLowerCase(),
            });

            if (!player) {
                return NextResponse.json({
                    sucess: false, messgae: `Player ${playerName} not found in house ${house}.`
                }, { status: 400 })
            }

            if (player.gender !== gender) {
                return NextResponse.json({
                    sucess: false, messgae: `Player ${player.fullName} does not match the gender ${gender} specified for this match.`
                }, { status: 400 })
            }

            // Add the player to the team if not already added
            if (!team.players.includes(player._id)) {
                team.players.push(player._id);
            }
        }

        // Save the updated match fixture
        await matchFixture.save();

        return NextResponse.json({
            sucess: true, messgae: "Players successfully added to the match fixture.", matchFixture
        }, { status: 201 })
    } catch (error) {
        return NextResponse.json({
            sucess: false, messgae: "Internal server error"
        }, { status: 500 })

    }
}