import { fileStatusModel } from "../orther/statusFile";

export type fileQueue = {
    file: Express.Multer.File,
    fileInfo: fileStatusModel,
}[];