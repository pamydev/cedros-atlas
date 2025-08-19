import {
  updateTranslations,
  changeLang,
} from "winnetoujs/modules/translations";
import strings from "./strings";
import { $div } from "./common/common.wcto";
import { FileExplorer } from "./fileExplorer/fileExplorer";

updateTranslations({
  stringsClass: strings,
  translationsPublicPath: "/translations",
}).then(() => {
  new app();
});

class app {
  constructor() {
    this.render();
  }

  private render() {
    const mainDiv = new $div({ class: "mainDiv" }).create("#app").ids.div;
    const projectsDiv = new $div({
      class: "projectsDiv",
    }).create(mainDiv);

    const fileExplorerDiv = new $div({
      class: "fileExplorerDiv",
    }).create(mainDiv).ids.div;

    new FileExplorer({
      output: fileExplorerDiv,
    });
  }
}
