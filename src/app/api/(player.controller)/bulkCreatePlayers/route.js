import { NextResponse } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';
import * as XLSX from 'xlsx';
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

const uploadToCloudinary = async (fileBuffer) => {
    return new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream({ resource_type: 'auto' }, (error, result) => {
            if (error) {
                console.log('Cloudinary upload error:', error);
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

        const buffer = Buffer.from(await file.arrayBuffer());
        const cloudinaryResponse = await uploadToCloudinary(buffer);

        const workbook = XLSX.read(buffer, { type: 'buffer' });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const data = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

        const players = [];
        let headers = [];
        let currentSection = null;

        data.forEach((row, index) => {
            if (row.length === 1 && (row[0] === 'BOYS' || row[0] === 'GIRLS')) {
                currentSection = row[0];
                headers = [];
                return;
            }

            if (row.length > 1) {
                if (!headers.length) {
                    headers = row;
                } else {
                    const playerData = {};
                    headers.forEach((header, idx) => {
                        playerData[header] = row[idx];
                    });

                    const { fullName, gender, branch, house, mobile } = playerData;
                    if (fullName && gender && branch && house) {
                        players.push({ fullName, gender, branch, house, mobile, section: currentSection });

                        playerModel.create({ fullName, gender, branch, house, mobile, section: currentSection })
                    }
                }
            }
        });

        return NextResponse.json({
            success: true,
            message: 'Bulk upload successful',
            cloudinaryResponse,
            players,
        }, { status: 200 });

    } catch (error) {
        console.error('Server error:', error);
        return NextResponse.json({
            success: false,
            message: 'Server error',
        }, { status: 500 });
    }
}
