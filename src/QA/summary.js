import readline from "readline";
import { getHomeTest } from "./fileExplorerTests.js";
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

class Tests {
  constructor() {
    this.total = 0;
    this.pass = 0;
    this.fail = 0;
    this.testResults = [];
    this.menu();
  }

  menu() {
    console.clear();
    console.log("\x1b[36m" + "=".repeat(60) + "\x1b[0m");
    console.log(
      "\x1b[36m" +
        " ".repeat(18) +
        "CEDROS ATLAS QA SUITE" +
        " ".repeat(17) +
        "\x1b[0m"
    );
    console.log("\x1b[36m" + "=".repeat(60) + "\x1b[0m");
    console.log("");
    console.log("📋 Available Test Options:");
    console.log(
      "  \x1b[33m0\x1b[0m  - \x1b[32mComprehensive Test Suite\x1b[0m (Run all tests)"
    );
    console.log(
      "  \x1b[33m1\x1b[0m  - \x1b[32mFile Explorer Tests\x1b[0m (Individual tests)"
    );
    console.log("");

    rl.question(`\x1b[36m❯\x1b[0m Select option: `, answer => {
      switch (answer.trim()) {
        case "0":
          this.runComprehensiveTests();
          break;
        case "1":
          this.fileExplorer();
          break;
        default:
          console.log(
            "\x1b[31m❌ Invalid option. Please select 0 or 1.\x1b[0m"
          );
          setTimeout(() => this.menu(), 1500);
          break;
      }
    });
  }

  async runComprehensiveTests() {
    console.clear();
    console.log("\x1b[36m" + "=".repeat(60) + "\x1b[0m");
    console.log(
      "\x1b[36m" +
        " ".repeat(15) +
        "COMPREHENSIVE TEST SUITE" +
        " ".repeat(15) +
        "\x1b[0m"
    );
    console.log("\x1b[36m" + "=".repeat(60) + "\x1b[0m");
    console.log("");
    console.log("\x1b[33m🚀 Running all available tests...\x1b[0m");
    console.log("");

    // Run all file explorer tests
    await this.runFileExplorerTests();

    // Display final results
    this.displayTestSummary();
  }

  async runFileExplorerTests() {
    console.log("\x1b[34m📁 File Explorer Tests\x1b[0m");
    console.log("─".repeat(40));

    // Test 1: getHome
    const homeTestResult = await getHomeTest();
    this.recordTestResult(
      "getHome",
      "File Explorer",
      homeTestResult.pass,
      homeTestResult.error
    );

    // Add more tests here as they become available
    // Example: const anotherTestResult = await anotherTest();
    // this.recordTestResult("anotherTest", "File Explorer", anotherTestResult.pass, anotherTestResult.error);
  }

  fileExplorer() {
    console.clear();
    console.log("\x1b[36m" + "=".repeat(60) + "\x1b[0m");
    console.log(
      "\x1b[36m" +
        " ".repeat(18) +
        "FILE EXPLORER TESTS" +
        " ".repeat(17) +
        "\x1b[0m"
    );
    console.log("\x1b[36m" + "=".repeat(60) + "\x1b[0m");
    console.log("");
    console.log("📁 Available File Explorer Tests:");
    console.log("  \x1b[33m1\x1b[0m - \x1b[32mgetHome Test\x1b[0m");
    console.log("");

    rl.question("\x1b[36m❯\x1b[0m Select test: ", async answer => {
      switch (answer.trim()) {
        case "1":
          console.log("");
          console.log("\x1b[33m🧪 Running getHome test...\x1b[0m");
          console.log("");
          const res = await getHomeTest();
          this.recordTestResult(
            "getHome",
            "File Explorer",
            res.pass,
            res.error
          );
          this.displayTestSummary();
          break;
        default:
          console.log("\x1b[31m❌ Invalid option. Please select 1.\x1b[0m");
          setTimeout(() => this.fileExplorer(), 1500);
          break;
      }
    });
  }

  /**
   * Records a test result and displays it immediately
   * @param {string} testName - Name of the test
   * @param {string} category - Test category
   * @param {boolean} pass - Whether the test passed
   * @param {string|null} error - Error message if test failed
   */
  recordTestResult(testName, category, pass, error) {
    this.total++;
    const result = {
      testName,
      category,
      status: pass ? "PASS" : "FAIL",
      error: error || null,
      timestamp: new Date().toLocaleTimeString(),
    };

    this.testResults.push(result);

    if (pass) {
      this.pass++;
      console.log(
        `\x1b[32m✅ PASS\x1b[0m  ${testName.padEnd(20)} \x1b[90m(${category})\x1b[0m`
      );
    } else {
      this.fail++;
      console.log(
        `\x1b[31m❌ FAIL\x1b[0m  ${testName.padEnd(20)} \x1b[90m(${category})\x1b[0m`
      );
      if (error) {
        console.log(`\x1b[31m      ↳ Error: ${error}\x1b[0m`);
      }
    }
  }

  displayTestSummary() {
    console.log("");
    console.log("\x1b[36m" + "=".repeat(60) + "\x1b[0m");
    console.log(
      "\x1b[36m" + " ".repeat(22) + "TEST SUMMARY" + " ".repeat(22) + "\x1b[0m"
    );
    console.log("\x1b[36m" + "=".repeat(60) + "\x1b[0m");

    if (this.testResults.length > 0) {
      console.log("");
      console.log(
        "┌─" +
          "─".repeat(20) +
          "─┬─" +
          "─".repeat(15) +
          "─┬─" +
          "─".repeat(8) +
          "─┬─" +
          "─".repeat(10) +
          "─┐"
      );
      console.log(
        "│ " +
          "Test Name".padEnd(20) +
          " │ " +
          "Category".padEnd(15) +
          " │ " +
          "Status".padEnd(8) +
          " │ " +
          "Time".padEnd(10) +
          " │"
      );
      console.log(
        "├─" +
          "─".repeat(20) +
          "─┼─" +
          "─".repeat(15) +
          "─┼─" +
          "─".repeat(8) +
          "─┼─" +
          "─".repeat(10) +
          "─┤"
      );

      this.testResults.forEach(result => {
        const statusColor = result.status === "PASS" ? "\x1b[32m" : "\x1b[31m";
        const statusIcon = result.status === "PASS" ? "✅ PASS" : "❌ FAIL";
        console.log(
          "│ " +
            result.testName.padEnd(20) +
            " │ " +
            result.category.padEnd(15) +
            " │ " +
            (statusColor + statusIcon + "\x1b[0m").padEnd(17) +
            "│ " +
            result.timestamp.padEnd(10) +
            " │"
        );
      });

      console.log(
        "└─" +
          "─".repeat(20) +
          "─┴─" +
          "─".repeat(15) +
          "─┴─" +
          "─".repeat(8) +
          "─┴─" +
          "─".repeat(10) +
          "─┘"
      );
    }

    console.log("");
    console.log("\x1b[36m📊 Overall Results:\x1b[0m");
    console.log("─".repeat(20));
    console.log(`\x1b[37m📝 Total Tests:\x1b[0m    ${this.total}`);
    console.log(`\x1b[32m✅ Passed:\x1b[0m         ${this.pass}`);
    console.log(`\x1b[31m❌ Failed:\x1b[0m         ${this.fail}`);

    const successRate =
      this.total > 0 ? Math.round((this.pass / this.total) * 100) : 0;
    const rateColor =
      successRate >= 80
        ? "\x1b[32m"
        : successRate >= 60
          ? "\x1b[33m"
          : "\x1b[31m";
    console.log(
      `\x1b[37m📈 Success Rate: \x1b[0m  ${rateColor}${successRate}%\x1b[0m`
    );

    console.log("");
    if (this.fail > 0) {
      console.log(
        "\x1b[31m⚠️  Some tests failed. Please review the errors above.\x1b[0m"
      );
    } else if (this.total > 0) {
      console.log("\x1b[32m🎉 All tests passed successfully!\x1b[0m");
    }

    console.log("");
    console.log("\x1b[90mPress Ctrl+C to exit\x1b[0m");

    rl.close();
  }
}

new Tests();
