import readline from "readline";
import { getHomeTest } from "./fileExplorerTests.js";
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

class Tests {
  constructor() {
    this.menu();
  }
  menu() {
    console.log("MENU");
    console.log("1 - file explorer tests");

    rl.question("Select an option: ", answer => {
      console.log({ answer });
      if (answer === "1") {
        this.fileExplorer();
      }
    });
  }
  fileExplorer() {
    console.clear();
    console.log("MENU");
    console.log("1 - getHome");
    rl.question("Select an option: ", answer => {
      if (answer === "1") {
        getHomeTest();
      }
    });
  }
}

new Tests();
