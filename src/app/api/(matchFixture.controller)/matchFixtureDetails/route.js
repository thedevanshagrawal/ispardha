import connectDB from "@/db/connectDB"
import matchFixtureModel from "@/models/matchFixtureModel"
import { NextResponse } from "next/server"
import userModel from "@/models/userModel";
import playerModel from "@/models/playerModel";

export async function POST(req, res) {
    try {
        await connectDB()

        const { userDataId } = await req.json();



        // Validate inputId
        if (!userDataId) {
            return NextResponse.json({
                sucess: false, messgae: "User ID is required."
            }, { status: 400 })
        }

        // const userId = new mongoose.Types.ObjectId(userDataId);

        // Fetch user details
        const userDetail = await userModel.findById(userDataId).lean();
        if (!userDetail) {
            return NextResponse.json({
                sucess: false, messgae: "User not found."
            }, { status: 400 })
        }

        const houseCompare = userDetail.house;
        if (!houseCompare) {
            return NextResponse.json({
                sucess: false, messgae: "User does not belong to any house."
            }, { status: 400 })
        }

        // Fetch match fixtures and players in parallel
        const [matchFixture, playerDetail] = await Promise.all([
            matchFixtureModel.find({ 'teams.house': houseCompare }).lean(),
            playerModel.find({ house: houseCompare }).lean()
        ]);

        // Process player details
        const result = playerDetail.map(({ fullName, branch, year, gender }) => ({
            fullName,
            branch,
            year,
            gender
        }));

        // Process matches with the specific house
        const matchesWithHouse = matchFixture.map((match) => {
            const house = match.teams.find((team) => team.house === houseCompare);
            if (house) {
                return {
                    matchNumber: match.matchNumber,
                    gameName: match.gameName || null,
                    house: house.house,
                    players: house.players,
                    gender: match.gender,
                };
            }
            return null;
        }).filter(Boolean);

        if (!matchesWithHouse.length) {
            return NextResponse.json({
                sucess: false, messgae: "No matches found for the specified house."
            }, { status: 404 })
        }

        return NextResponse.json({
            sucess: true, messgae: "Match fixture fetched successfully", matchesWithHouse, houseCompare, result
        }, { status: 201 })
    } catch (error) {
        console.log("error: ", error)
        return NextResponse.json({
            sucess: false, messgae: "Internal server error"
        }, { status: 500 })

    }
}