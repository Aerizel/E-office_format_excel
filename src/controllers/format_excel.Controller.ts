import { Request, Response } from "express"
import multer from "multer";
import { FormatExcel } from "../services/format_excel.services";
import { fileStatusModel } from "../models/orther/statusFile";
// import * as fs from 'fs';
// import path from 'path';
import { responseModel } from "../models/orther/responseModel";
import { cutStringWithDash } from "../utils/formatString";

// Configure Multer to handle file upload
//const upload = multer({ storage: multer.memoryStorage() });
const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 50 * 1024 * 1024 } }); //limit size to 50 MB

// Single file upload method
// export const uploadExcel = [
//     upload.single('file'),
//     async (req: Request, res: Response): Promise<void> => {
//         try {
//             /*//Local test// const filePath = path.join(__dirname, '../test/ไฟล์ตัวอย่างการ Implement.xlsx');
//             const fileBuffer = fs.readFileSync(filePath);*/

//             // CHECK IF FILE EXIST IN REQUST 
//             //Local test// if (!fileBuffer) {

//             if (req.file) {
//                 const excelBuffer: Buffer = await formatExcel(req.file.buffer);
//                 //const data = await formatExcel(fileBuffer);  
//                 if (excelBuffer.length > 0) {
//                     const fileName = "ไฟล์ที่ถูกประมวลผล.xlsx"; 
//                     const encodedFileName = encodeURIComponent(fileName);

//                     res.setHeader(
//                         "Content-Disposition",
//                         `attachment; filename*=UTF-8''${encodedFileName}`
//                     );
//                     res.setHeader("Content-Type", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");

//                     /*res.setHeader("Content-Disposition", "attachment; filename=processed.xlsx");
//                     res.setHeader("Content-Type", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");*/

//                     res.status(200).send(excelBuffer);
//                 } else {
//                     res.status(500).json({ message: 'Fail to format excel file' });
//                 }
//             } else {
//                 res.status(400).send('No file uploaded.');
//             }
//         } catch (error) {
//             console.error("Error processing file:", error);
//             res.status(500).send('Error processing file.');
//         }
//     }
// ];

export const uploadExcelFromFront = [
    upload.array("files"),
    async (req: Request, res: Response): Promise<void> => {
        const files = req.files as Express.Multer.File[];

        if (files !== undefined) {
            const fileQueue: {
                file: Express.Multer.File,
                orgName: string,
                status: fileStatusModel,
            }[] = [];

            //CREATE QUEUE
            files.forEach((file) => {
                // const name = decodeURIComponent(
                //     Buffer.from(file.originalname, "binary").toString("utf-8")
                // );
                //console.log('file name: '+file.originalname);

                const convertName = Buffer.from(`${file.originalname.replace(/\.[^/.]+$/, "")}`, "latin1").toString("utf8");
                const filename = convertName + ' แก้ไข.xlsx';
                const cutName: string | null = cutStringWithDash(convertName);
                const orgName = cutName != null ? cutName : 'none';

                fileQueue.push({
                    file,
                    orgName,
                    status: {
                        name: filename,
                        status: "pending"
                    }
                })
            });

            ProcessQueue(fileQueue, res);

        } else {
            res.status(400).json({ message: 'กรุณาอัปโหลดไฟล์ Excel ก่อน' });
        }
    }
];

export const uploadExcelFromApi = [
    upload.array("files"),
    async (req: Request, res: Response): Promise<void> => {
        const files = req.files as Express.Multer.File[];

        if (files !== undefined) {
            const fileQueue: {
                file: Express.Multer.File,
                orgName: string,
                status: fileStatusModel,
            }[] = [];

            //CREATE QUEUE
            files.forEach((file) => {
                const convertName = file.originalname.replace(/\.[^/.]+$/, "");
                const filename = convertName + ' แก้ไข.xlsx';
                const cutName: string | null = cutStringWithDash(convertName);
                const orgName = cutName != null ? cutName : 'none';

                fileQueue.push({
                    file,
                    orgName,
                    status: {
                        name: filename,
                        status: "pending"
                    }
                })
            });

            ProcessQueue(fileQueue, res);

        } else {
            res.status(400).json({ message: 'กรุณาอัปโหลดไฟล์ Excel ก่อน' });
        }
    }
];

async function ProcessQueue(fileQueue: { file: Express.Multer.File, orgName: string, status: fileStatusModel }[], res: Response) {
    const responses: responseModel[] = [];

    while (fileQueue.length > 0) {
        const { file, orgName, status } = fileQueue.shift()!;

        try {
            let excelBuffer: Buffer = Buffer.alloc(0);
            let errorLog: string = '';

            //FORMAT EXCEL 
            [excelBuffer, errorLog] = await FormatExcel(file.buffer, orgName);

            if (excelBuffer.length > 0) {
                responses.push({
                    name: status.name,
                    status: 'success',
                    fail: errorLog,
                    file: excelBuffer.toString("base64"),
                });
            } else {
                //SET FAIL STATUS FOR THIS FILE
                responses.push({ name: status.name, status: "failed", fail: errorLog, file: '' });
            }

        } catch (error) {
            //SET FAIL STATUS FOR THIS FILE
            responses.push({ name: status.name, status: "failed", fail: 'เกิดข้อผิดพลาด', file: '' });
            console.log(error);
        }
    }

    if (fileQueue.length === 0) {
        try {
            res.status(200).json({ message: "Files processed", data: responses });
        } catch (error) {
            res.status(500).json({ message: "Error processing files." });
            console.log(error);
        }

        res.end();
    }
}



