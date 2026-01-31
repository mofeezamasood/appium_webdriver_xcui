/**
 * Simplified working version
 */
exports.config = {
  // ====================
  // Runner Configuration
  // ====================
  runner: "local",
  port: 4723,

  // ==================
  // Specify Test Files
  // ==================
  specs: ["./features/**/*.feature"],
  exclude: [],

  // ============
  // Capabilities
  // ============
  maxInstances: 1,

  capabilities: [
    {
      platformName: "iOS",
      "appium:automationName": "XCUITest",
      "appium:deviceName": "iPhone 17", // Hardcode for testing
      "appium:platformVersion": "26.2", // Hardcode for testing
      "appium:app": "com.pavlenko.Habo.mofi",
      "appium:noReset": "true", // Use string format
      "appium:fullReset": "false", // Use string format
      "appium:newCommandTimeout": 300,
      "appium:launchTimeout": 90000,
    },
  ],

  // ===================
  // Test Configurations
  // ===================
  logLevel: "info",
  bail: 0,
  waitforTimeout: 10000,
  connectionRetryTimeout: 120000,
  connectionRetryCount: 1,

  // ========
  // Services
  // ========
  // Start with minimal service config
  services: [["appium"]],

  // =========
  // Framework
  // =========
  framework: "cucumber",

  // =========
  // Reporters
  // =========
  reporters: ["spec"],

  // ===============
  // Cucumber Options
  // ===============
  cucumberOpts: {
    require: ["./step-definitions/**/*.js"],
    backtrace: false,
    requireModule: [],
    dryRun: false,
    failFast: false,
    name: [],
    snippets: true,
    source: true,
    strict: false,
    tagExpression: "",
    timeout: 60000,
    ignoreUndefinedDefinitions: false,
  },

  // =====
  // Hooks
  // =====

  /**
   * Minimal onPrepare hook
   */
  onPrepare: function (config, capabilities) {
    console.log("=".repeat(80));
    console.log("🚀 Test Execution Started");
    console.log(`Device: iPhone 17`);
    console.log(`Platform: iOS 26.2`);
    console.log("=".repeat(80));
  },

  /**
   * Before hook - set timeouts
   */
  before: async function () {
    // Use 'browser' instead of 'driver'
    await browser.setTimeout({ implicit: 5000 });
  },

  /**
   * Take screenshots on failure
   */
  // afterStep: async function (step, scenario, result) {
  //   if (!result.passed) {
  //     try {
  //       const timestamp = new Date().getTime();
  //       const filename = `screenshot_${timestamp}.png`;
  //       await browser.saveScreenshot(`./${filename}`);
  //       console.log(`📸 Screenshot saved: ${filename}`);
  //     } catch (error) {
  //       console.log(`Failed to save screenshot: ${error.message}`);
  //     }
  //   }
  // },

  /**
   * Summary on completion
   */
  onComplete: function (exitCode, config, capabilities, results) {
    console.log("\n" + "=".repeat(80));
    console.log("Test Execution Complete");
    console.log("=".repeat(80));
  },
};
