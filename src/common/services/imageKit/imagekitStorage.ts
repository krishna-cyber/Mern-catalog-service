import ImageKit from "imagekit";
import { FileStorage } from "../../types/storageTypes";
import config from "config";
import fs from "node:fs";
import { Logger } from "winston";

export class ImagekitStorage implements FileStorage {
    private readonly client: ImageKit;
    constructor(private readonly logger: Logger) {
        this.client = new ImageKit({
            publicKey: config.get("imageKit.PUBLIC_KEY"),
            privateKey: config.get("imageKit.PRIVATE_KEY"),
            urlEndpoint: config.get("imageKit.URL_ENDPOINT"),
        });
    }

    async uploadSingle(file: Express.Multer.File) {
        try {
            const uploadResult = await this.client.upload({
                file: fs.createReadStream(file.path),
                fileName: file.filename,
            });

            fs.unlink(file.path, (err) => {
                if (err) {
                    throw err;
                }
                this.logger.info(`File deleted and uploaded`);
            });

            return uploadResult;
        } catch (error) {
            fs.unlink(file.path, (err) => {
                if (err) {
                    throw err;
                }
                this.logger.info(`File deleted and uploaded`);
            });
            throw new Error(`Error uploading a file`);
        }
    }

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
            throw new Error("Error uploading files");
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
