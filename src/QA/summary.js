import readline from "readline";
import { getHomeTest } from "./fileExplorerTests.js";
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

class Tests {
  constructor() {
    this.menu();
    this.total = 0;
    this.pass = 0;
    this.fail = 0;
  }
  menu() {
    console.log("MENU");
    console.log("0  -  Comprehensive Test");
    console.log("1  -  File explorer tests");

    rl.question(`\n\nWrite option: `, answer => {
      if (answer === "1") {
        this.fileExplorer();
      }

      switch (answer) {
        case "0":
          break;
        case "1":
          this.fileExplorer();
          break;
      }
    });
  }
  fileExplorer() {
    console.clear();
    console.log("MENU");
    console.log("1 - getHome");
    rl.question("Select an option: ", async answer => {
      switch (answer) {
        case "1":
          let res = await getHomeTest();
          this.showResult(res.pass, "getHomeTest", res.error);
          this.final();
          break;
      }
    });
  }

  /**
   * @param {boolean} pass
   * @param {string} testName
   * @param {string} [message]
   */
  showResult(pass, testName, message) {
    this.total++;
    if (pass) {
      this.pass++;
      console.log(
        "\x1b[5m\x1b[42m PASS \x1b[0m " + `[${testName}] ${message ?? ""}`
      );
    } else {
      this.fail++;
      console.log(
        "\x1b[5m\x1b[41m FAIL \x1b[0m " + `[${testName}] ${message ?? ""}`
      );
    }
  }

  final() {
    console.log("Final Results");
    console.log(`Total tests: ${this.total}`);
    console.log(`Passed: ${this.pass}`);
    console.log(`Failed: ${this.fail}`);
    console.log(
      `Success rate: ${this.total > 0 ? Math.round((this.pass / this.total) * 100) : 0}%`
    );
    rl.close();
  }
}

new Tests();
