import { NextResponse } from 'next/server';
import { parse } from 'csv-parse';
import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';
import playerModel from '@/models/playerModel';

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const config = {
    api: {
        bodyParser: false,
    },
};

// Upload function for Cloudinary
const uploadToCloudinary = async (fileBuffer) => {
    return new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream({ resource_type: 'auto' }, (error, result) => {
            if (error) {
                reject(error);
            } else {
                resolve(result);
            }
        }).end(fileBuffer);
    });
};

export async function POST(req) {
    try {
        const formData = await req.formData();
        const file = formData.get('file');

        if (!file) {
            return NextResponse.json({
                success: false,
                message: 'No file uploaded',
            }, { status: 400 });
        }

        // Get the file buffer to upload to Cloudinary and parse CSV
        const buffer = Buffer.from(await file.arrayBuffer());

        // Upload file to Cloudinary
        const cloudinaryResponse = await uploadToCloudinary(buffer);

        // Parse the CSV data
        const players = [];
        const data = buffer.toString('utf8');

        const parsePromise = new Promise((resolve, reject) => {
            parse(data, {
                columns: true,
                skip_empty_lines: true,
            })
                .on('data', async (row) => {
                    players.push(row);
                    const { fullName, gender, branch, house, mobile } = row;
                    try {
                        const playerData = { fullName, gender, branch, house, mobile };
                        await playerModel.create(playerData); // Save player data to DB
                    } catch (dbError) {
                        console.log('Error saving player to DB:', dbError);
                    }
                })
                .on('end', () => {
                    resolve(); // Resolve the promise once parsing is done
                })
                .on('error', (err) => {
                    reject(err); // Reject the promise if parsing fails
                });
        });

        // Wait for parsing to finish before sending response
        await parsePromise;

        return NextResponse.json({
            success: true,
            message: 'Bulk upload successful',
            cloudinaryResponse,
        }, { status: 200 });

    } catch (error) {
        console.log('Error:', error);
        return NextResponse.json({
            success: false,
            message: 'Server error',
        }, { status: 500 });
    }
}
