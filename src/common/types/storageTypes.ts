export interface fileType {
    fileName: string;
    fileUrl: string;
    fileData: ArrayBuffer;
}

export interface FileStorage {
    upload(data: fileType): void;
    delete(fileName: string): void;
    getObjectUri(fileName: string): void;
}
