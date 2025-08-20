export interface IGetHome {
  name: string;
  type: "folder" | "file";
  path: string;
  size: number;
}
