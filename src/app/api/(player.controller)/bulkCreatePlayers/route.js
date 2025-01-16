import path from 'path';
import fs from 'fs';
import { parse } from 'csv-parse';
import { NextResponse } from 'next/server';
import playerModel from '@/models/playerModel';

// Disable the default body parser to allow formData to handle the file upload
export const config = {
    api: {
        bodyParser: false, // Disable the default body parser to allow formData to handle file
    },
};

export async function POST(req) {
    try {
        // Handle the formData
        const formData = await req.formData();
        const file = formData.get('file'); // Get the file from the formData

        // Check if a file was uploaded
        if (!file) {
            return NextResponse.json({
                success: false,
                message: 'No file uploaded',
            }, { status: 400 });
        }

        // Generate a unique file name to store the file
        const filePath = path.join(process.cwd(), 'public/uploads', `${Date.now()}_${file.name}`);

        const buffer = await file.arrayBuffer();
        fs.writeFileSync(filePath, Buffer.from(buffer)); // Save the file to disk

        const players = [];

        // Read and parse the CSV file
        try {
            const data = fs.readFileSync(filePath, 'utf8');

            parse(data, {
                columns: true, // This assumes the CSV file has column headers
                skip_empty_lines: true,
            })
                .on('data', async (row) => {
                    players.push(row); // Collect all rows from the CSV file

                    // Create a new player entry for each row in the database
                    const { fullName, gender, branch, house, mobile } = row;
                    try {
                        const playerData = { fullName, gender, branch, house, mobile };
                        const addedPlayer = await playerModel.create(playerData); // Save player data to the database
                        return NextResponse.json({
                            success: true,
                            message: 'Bulk upload successful',
                            addedPlayer,
                        }, { status: 200 });
                    } catch (dbError) {
                        console.log('Error saving player to DB:', dbError);
                    }
                })

            return NextResponse.json({
                success: true,
                message: 'Bulk upload successful',
            }, { status: 200 });


        } catch (error) {
            console.log('Error reading or parsing file:', error);
            return NextResponse.json({
                success: false,
                message: 'Failed to process file',
            }, { status: 500 });
        }
    } catch (error) {
        console.log('Error:', error);
        return NextResponse.json({
            success: false,
            message: 'Server error',
        }, { status: 500 });
    }
}
