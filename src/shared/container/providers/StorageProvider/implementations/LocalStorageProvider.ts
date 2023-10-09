import fs from "fs";
import { resolve } from "path";

import upload from "@config/upload";

import { IFolder, IStorageProvider } from "../IStorageProvider";

class LocalStorageProvider implements IStorageProvider {
  async delete(file: string, folder: IFolder): Promise<void> {
    const filename = resolve(`${upload.tmpFolder}/${folder}`, file);

    try {
      await fs.promises.stat(filename);
    } catch {
      return;
    }

    await fs.promises.unlink(filename);
  }

  async save(file: string, folder: IFolder): Promise<string> {
    await fs.promises.rename(
      resolve(upload.tmpFolder, file),
      resolve(`${upload.tmpFolder}/${folder}`, file)
    );

    return file;
  }
}

export { LocalStorageProvider };
