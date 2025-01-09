import { UploadedFile } from "express-fileupload";

export interface fileType {
    fileName: string;
    fileUrl: string;
    fileData: ArrayBuffer;
}

export interface FileStorage {
    upload(data: UploadedFile | UploadedFile[]): void;
    delete(fileName: string): void;
    getObjectUri(fileName: string): void;
}
