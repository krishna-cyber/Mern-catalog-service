export interface fileType {
    fileName: string;
    fileUrl: string;
    fileData: ArrayBuffer;
}

export interface FileStorage {
    upload(data: Express.Multer.File[]): void;
    delete(fileName: string): void;
    getObjectUri(fileName: string): void;
}
