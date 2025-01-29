import { Request, Response } from "express"
import multer from "multer";
import { formatExcel } from "../services/formatExcel.services";
/*//Local test// import * as fs from 'fs';
import path from 'path';*/

// Configure Multer to handle file upload
const upload = multer({ storage: multer.memoryStorage() });

// Controller function to handle the Excel file upload
export const uploadExcel = [
    upload.single('file'),  
    async (req: Request, res: Response): Promise<void> => {
        try {
            /*//Local test// const filePath = path.join(__dirname, '../test/ไฟล์ตัวอย่างการ Implement.xlsx');
            const fileBuffer = fs.readFileSync(filePath);*/

            // CHECK IF FILE EXIST IN REQUST 
            //Local test// if (!fileBuffer) {
            if (req.file) {
                const excelBuffer: Buffer = await formatExcel(req.file.buffer);
                //const data = await formatExcel(fileBuffer);  
                if (excelBuffer.length > 0) {
                    // Set response headers for file download
                    res.setHeader("Content-Disposition", "attachment; filename=processed.xlsx");
                    res.setHeader("Content-Type", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");

                    res.status(200).send(excelBuffer);
                } else {
                    res.status(500).json({ message: 'Fail to format excel file' });
                }
            } else {
                res.status(400).send('No file uploaded.');
            }
        } catch (error) {
            console.error("Error processing file:", error);
            res.status(500).send('Error processing file.');
        }
    }
];


