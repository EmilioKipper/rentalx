export type IFolder = "avatar" | "cars";

export interface IStorageProvider {
  save(file: string, folder: IFolder): Promise<string>;
  delete(file: string, folder: IFolder): Promise<void>;
}
