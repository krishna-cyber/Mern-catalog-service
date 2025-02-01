import ImageKit from "imagekit";
import { FileStorage } from "../../types/storageTypes";
import config from "config";
import fs from "fs";

export class ImagekitStorage implements FileStorage {
    private readonly client: ImageKit;
    constructor() {
        this.client = new ImageKit({
            publicKey: config.get("imageKit.PUBLIC_KEY"),
            privateKey: config.get("imageKit.PRIVATE_KEY"),
            urlEndpoint: config.get("imageKit.URL_ENDPOINT"),
        });
    }

    //todo
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async upload(data: Express.Multer.File[]) {
        try {
            if (!data) {
                return;
            }

            if (Array.isArray(data)) {
                const uploadPromises = data.map(async (file) => {
                    return await this.client
                        .upload({
                            file: fs.createReadStream(file.path), //required
                            fileName: file.filename, //required
                        })
                        .then((res) => {
                            fs.unlink(file.path, (err) => {
                                if (err) {
                                    throw err;
                                }
                            });
                            return res;
                        });
                });
                return Promise.all(uploadPromises);
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
