import { get } from "@libs/fetch";
import { IApi } from "@contracts/common.types";
import { IGetHome } from "@contracts/fileExplorer.types";
import { $fileExplorer, $fileExplorerItem } from "./fileExplorer.wcto";

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
    let res: IApi<IGetHome> = await get("/fileExplorer/get/home");
    res.data.map((item, index) => {
      new $fileExplorerItem({
        icon: "",
        name: item.name,
        size: item.size,
        stripe: index % 2 === 0 ? "" : "striped",
      }).create(this.output);
    });
  }
}
