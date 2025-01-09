import ImageKit from "imagekit";
import { FileStorage } from "../../types/storageTypes";
import config from "config";
import { UploadedFile } from "express-fileupload";

export class imagekitStorage implements FileStorage {
    private client: ImageKit;
    constructor() {
        this.client = new ImageKit({
            publicKey: config.get("imageKit.PUBLIC_KEY"),
            privateKey: config.get("imageKit.PRIVATE_KEY"),
            urlEndpoint: config.get("imageKit.URL_ENDPOINT"),
        });
    }

    //todo
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async upload(data: UploadedFile | UploadedFile[]) {
        try {
            if (!data) {
                return;
            }

            if (Array.isArray(data)) {
                const uploadPromises = data.map((file) =>
                    this.client.upload({
                        file: file.data,
                        fileName: file.name,
                    }),
                );
                return Promise.all(uploadPromises);
            } else {
                return this.client.upload({
                    file: data.data,
                    fileName: data.name,
                });
            }
        } catch (error) {
            throw new Error("Method not implemented.");
        }
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
