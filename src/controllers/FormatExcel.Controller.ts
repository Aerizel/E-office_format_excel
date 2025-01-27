import { Request, Response } from "express"
//import multer from "multer";
import { formatExcel } from "../services/formatExcel.services";
import * as fs from 'fs';
import path from 'path';
//import * as xlsx from 'xlsx';
//var xlsx = require("xlsx");

// Configure Multer to handle file upload
/*const storage = multer.memoryStorage();
const upload = multer({ storage: storage });*/


// Controller function to handle the Excel file upload
export const uploadExcel = [
    //upload.single('file'),  
    async (req: Request, res: Response): Promise<void> => {
        try {
            //Local xcel test
            const filePath = path.join(__dirname, '../test/ไฟล์ตัวอย่างการ Implement.xlsx');
            const fileBuffer = fs.readFileSync(filePath);

            // Check if file exists in the request
            if (!fileBuffer) {
            //if (!req.file) {
                res.status(400).send('No file uploaded.');
            } else {
                //const data = await formatExcel(req.file.buffer);
                const data = await formatExcel(fileBuffer);  
                if (data) {
                    res.status(200).json({ message: 'File processed successfully', data });
                } else {
                    res.status(500).json({ message: 'Fail to format excel file' });
                }
            }
        } catch (error) {
            res.status(500).send('Error processing file.');
        }
    }
];


