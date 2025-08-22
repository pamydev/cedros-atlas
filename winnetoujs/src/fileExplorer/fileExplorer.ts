import { get } from "@libs/fetch";
import { IApi } from "@contracts/common.types";
import { IGetHome } from "@contracts/fileExplorer.types";
import { $fileExplorer, $fileExplorerItem } from "./fileExplorer.wcto";
import { convertSize } from "@libs/sizes";
import { sortByAlphabetic, sortByFileType, sortBySize } from "@libs/sorts";
import { hideHiddenFiles } from "@libs/displayFilesOptions";
import { getFileExtension } from "@libs/extensions";

export class FileExplorer {
  output: string;
  constructor(args: { output: string }) {
    this.output = args.output;
    this.render();
    this.getHome();
  }

  private render() {
    this.output = new $fileExplorer({ title: "File Explorer" }).create(
      this.output
    ).ids.output;
  }

  private async getHome() {
    // create title
    new $fileExplorerItem({
      icon_src: "",
      name: "File name",
      size: "Size",
      type: "Type",
      isTitle: "__titleItem",
    }).create(this.output);

    let res: IApi<IGetHome> = await get("/fileExplorer/get/home");

    // Sort items: files first, then folders, both alphabetically
    const sortedData = sortBySize(res.data, "asc");
    // const visibleData = hideHiddenFiles(sortedData);

    sortedData.map((item, index) => {
      new $fileExplorerItem({
        icon_src: this.getIconFromFileType(item.type, item.name),
        name: item.name,
        size: item.type === "file" ? convertSize(item.size) : "",
        stripe: index % 2 === 0 ? "" : "striped",
        type: item.type === "folder" ? "Folder" : getFileExtension(item.name),
      }).create(this.output);
    });
  }

  private getIconFromFileType(type: string, name: string) {
    if (type === "folder") {
      return "/icons/folder.png";
    }
    if (type === "file") {
      const extension = name.split(".").pop()?.toLowerCase();
      switch (extension) {
        case "txt":
          return "/icons/txt.png";
          break;
        case "js":
          return "/icons/code.png";
          break;
        default:
          return "/icons/file.png";
          break;
      }
    }
  }
}
