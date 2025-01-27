import connectDB from "@/db/connectDB";
import userModel from "@/models/userModel";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt"

export async function POST(req, res) {
    try {
        await connectDB();

        const { userDataId, oldPassword, newPassword } = await req.json();

        // Validate input
        if (!userDataId || !oldPassword || !newPassword) {
            return NextResponse.json(
                {
                    success: false,
                    message: "userDataId, oldPassword, and newPassword are required",
                },
                { status: 400 }
            );
        }

        // Fetch user details
        const userDetail = await userModel.findById(userDataId).select("+password").lean();
        if (!userDetail) {
            return NextResponse.json(
                {
                    success: false,
                    message: "User not found.",
                },
                { status: 400 }
            );
        }

        // Check if old password matches
        const isPasswordCorrect = await bcrypt.compare(oldPassword, userDetail.password);
        if (!isPasswordCorrect) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Old password is incorrect.",
                },
                { status: 400 }
            );
        }

        // Hash and update the new password
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        const updatedUser = await userModel.findByIdAndUpdate(
            userDataId,
            { password: hashedPassword },
            { new: true }
        );

        if (!updatedUser) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Failed to update the password.",
                },
                { status: 400 }
            );
        }

        return NextResponse.json(
            {
                success: true,
                message: "Password updated successfully.",
            },
            { status: 200 }
        );
    } catch (error) {
        console.error("Error updating password:", error);
        return NextResponse.json(
            {
                success: false,
                message: "Internal server error.",
            },
            { status: 500 }
        );
    }
}
