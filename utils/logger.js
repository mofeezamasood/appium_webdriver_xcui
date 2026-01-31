/**
 * Logger - Custom logging utility
 *
 * Provides structured logging with levels and timestamps
 * Best Practice: Centralized logging for debugging and monitoring
 */

const { LOG_LEVELS } = require("../config/constants");

class Logger {
  constructor() {
    this.logLevel = process.env.LOG_LEVEL || LOG_LEVELS.INFO;
    this.enableTimestamps = true;
    this.enableColors = true;
  }

  /**
   * Log levels priority
   */
  get levels() {
    return {
      error: 0,
      warn: 1,
      info: 2,
      debug: 3,
    };
  }

  /**
   * ANSI color codes
   */
  get colors() {
    return {
      reset: "\x1b[0m",
      red: "\x1b[31m",
      yellow: "\x1b[33m",
      green: "\x1b[32m",
      blue: "\x1b[34m",
      gray: "\x1b[90m",
    };
  }

  /**
   * Check if should log at given level
   * @param {string} level - Log level
   * @returns {boolean}
   */
  shouldLog(level) {
    return this.levels[level] <= this.levels[this.logLevel];
  }

  /**
   * Get timestamp string
   * @returns {string}
   */
  getTimestamp() {
    if (!this.enableTimestamps) return "";

    const now = new Date();
    const time = now.toLocaleTimeString("en-US", { hour12: false });
    const ms = now.getMilliseconds().toString().padStart(3, "0");

    return `[${time}.${ms}]`;
  }

  /**
   * Format log message
   * @param {string} level - Log level
   * @param {string} message - Log message
   * @returns {string}
   */
  formatMessage(level, message) {
    const timestamp = this.getTimestamp();
    const levelStr = level.toUpperCase().padEnd(5);

    let formattedMsg = `${timestamp} ${levelStr} ${message}`;

    if (this.enableColors) {
      const colorMap = {
        error: this.colors.red,
        warn: this.colors.yellow,
        info: this.colors.green,
        debug: this.colors.blue,
      };

      const color = colorMap[level] || this.colors.reset;
      formattedMsg = `${this.colors.gray}${timestamp}${this.colors.reset} ${color}${levelStr}${this.colors.reset} ${message}`;
    }

    return formattedMsg;
  }

  /**
   * Generic log method
   * @param {string} level - Log level
   * @param {string} message - Log message
   * @param {object} data - Optional data object
   */
  log(level, message, data = null) {
    if (!this.shouldLog(level)) return;

    const formattedMsg = this.formatMessage(level, message);

    if (data) {
      console.log(formattedMsg, data);
    } else {
      console.log(formattedMsg);
    }
  }

  /**
   * Error level log
   * @param {string} message - Error message
   * @param {object} data - Optional error data
   */
  error(message, data = null) {
    this.log("error", message, data);
  }

  /**
   * Warning level log
   * @param {string} message - Warning message
   * @param {object} data - Optional data
   */
  warn(message, data = null) {
    this.log("warn", message, data);
  }

  /**
   * Info level log
   * @param {string} message - Info message
   * @param {object} data - Optional data
   */
  info(message, data = null) {
    this.log("info", message, data);
  }

  /**
   * Debug level log
   * @param {string} message - Debug message
   * @param {object} data - Optional data
   */
  debug(message, data = null) {
    this.log("debug", message, data);
  }

  /**
   * Log step start
   * @param {string} stepName - Step name
   */
  stepStart(stepName) {
    this.info(`▶ Starting: ${stepName}`);
  }

  /**
   * Log step completion
   * @param {string} stepName - Step name
   */
  stepEnd(stepName) {
    this.info(`✓ Completed: ${stepName}`);
  }

  /**
   * Log test scenario start
   * @param {string} scenarioName - Scenario name
   */
  scenarioStart(scenarioName) {
    this.info(`\n${"=".repeat(80)}`);
    this.info(`📋 SCENARIO: ${scenarioName}`);
    this.info(`${"=".repeat(80)}`);
  }

  /**
   * Log test scenario end
   * @param {string} scenarioName - Scenario name
   * @param {boolean} passed - Whether scenario passed
   */
  scenarioEnd(scenarioName, passed) {
    const status = passed ? "✅ PASSED" : "❌ FAILED";
    this.info(`${status}: ${scenarioName}`);
    this.info(`${"=".repeat(80)}\n`);
  }

  /**
   * Set log level dynamically
   * @param {string} level - New log level
   */
  setLogLevel(level) {
    if (this.levels[level] !== undefined) {
      this.logLevel = level;
      this.info(`Log level set to: ${level}`);
    } else {
      this.warn(`Invalid log level: ${level}`);
    }
  }

  /**
   * Enable/disable colored output
   * @param {boolean} enabled - Enable colors
   */
  setColors(enabled) {
    this.enableColors = enabled;
  }

  /**
   * Enable/disable timestamps
   * @param {boolean} enabled - Enable timestamps
   */
  setTimestamps(enabled) {
    this.enableTimestamps = enabled;
  }
}

// Export singleton instance
module.exports = new Logger();
