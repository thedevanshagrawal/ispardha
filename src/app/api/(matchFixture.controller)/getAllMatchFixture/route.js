import connectDB from "@/db/connectDB";
import matchFixtureModel from "@/models/matchFixtureModel";
import { NextResponse } from "next/server";

export async function GET(req, res) {
    try {
        await connectDB();

        const matchFixtureDetails = await matchFixtureModel.find();

        if (!matchFixtureDetails) {
            return NextResponse.json({
                success: false,
                message: "Match fixture not found",
            }, { status: 404 });
        }

        // Custom sorting: AM first, then PM, and within each group, sort by time
        const sortedMatchFixtures = matchFixtureDetails.sort((a, b) => {
            const isAM = (time) => time.toLowerCase().includes("am");
            const isPM = (time) => time.toLowerCase().includes("pm");

            if (isAM(a.matchTime) && isPM(b.matchTime)) return -1; // AM comes before PM
            if (isPM(a.matchTime) && isAM(b.matchTime)) return 1;  // PM comes after AM

            // If both are AM or both are PM, sort by actual time
            return new Date(`1970-01-01T${a.matchTime}`) - new Date(`1970-01-01T${b.matchTime}`);
        });

        return NextResponse.json({
            success: true,
            message: "Match fixture fetched successfully",
            matchFixtureDetails: sortedMatchFixtures,
        }, { status: 200 });
    } catch (error) {
        return NextResponse.json({
            success: false,
            message: "Internal server error",
        }, { status: 500 });
    }
}
