import connectDB from "@/db/connectDB"
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

        const houseDetail = userDetail.house;
        if (!houseDetail) {
            return NextResponse.json({
                sucess: false, messgae: "User does not belong to any house."
            }, { status: 400 })
        }

        const playerData = await playerModel.find({ house: houseDetail }).lean();

        if (!playerData) {
            return NextResponse.json({
                sucess: false, messgae: "No players found for the specified house."
            }, { status: 404 })
        }

        return NextResponse.json({
            sucess: true, messgae: "player found", playerData
        }, { status: 201 })
    } catch (error) {
        console.log("error: ", error)
        return NextResponse.json({
            sucess: false, messgae: "Internal server error"
        }, { status: 500 })

    }
}