import { fileQueue } from "../models/formatExcel/file_queue_model";
import { fileStatusModel } from "../models/orther/statusFile";
import { cutStringWithDash } from "../utils/formatString";

export function CreateQueueServices(files: Express.Multer.File[], formatStatus: boolean): { file: Express.Multer.File, fileInfo: fileStatusModel }[] {
    const fileQueue: fileQueue = [];
    const error = "เกิดข้อผิดพลาดในการอ่านชื่อไฟล์";

    //CREATE QUEUE
    files.forEach((file) => {
        // const name = decodeURIComponent(
        //     Buffer.from(file.originalname, "binary").toString("utf-8")
        // );
        //console.log('file name: '+file.originalname);

        const convertName = formatStatus ? Buffer.from(`${file.originalname.replace(/\.[^/.]+$/, "")}`, "latin1").toString("utf8") : file.originalname.replace(/\.[^/.]+$/, "");
        const filename = convertName + ' แก้ไข.xlsx';
        const cutName: string | null = cutStringWithDash(convertName);
        const orgName = cutName != null ? cutName : '';
        const fail_log = orgName != '' ? '' : error;

        fileQueue.push({
            file,
            fileInfo: {
                name: filename,
                orgName,
                fail_log,
                status: "pending"
            }
        });
    });

    return fileQueue;
}