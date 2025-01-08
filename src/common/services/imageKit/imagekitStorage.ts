import ImageKit from "imagekit";
import { FileStorage, fileType } from "../../types/storageTypes";

export class imagekitStorage implements FileStorage {
    private client: ImageKit;
    constructor() {
        this.client = new ImageKit({
            publicKey: "df",
            privateKey: "dfd",
            urlEndpoint: "",
        });
    }

    //todo
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    upload(data: fileType): void {
        throw new Error("Method not implemented.");
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    delete(fileName: string): void {
        throw new Error("Method not implemented.");
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    getObjectUri(fileName: string): void {
        throw new Error("Method not implemented.");
    }
}
