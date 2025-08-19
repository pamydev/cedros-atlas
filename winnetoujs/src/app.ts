import {
  updateTranslations,
  changeLang,
} from "winnetoujs/modules/translations";
import strings from "./strings";

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

  private render() {}
}
