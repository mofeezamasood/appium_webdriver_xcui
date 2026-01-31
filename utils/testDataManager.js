/**
 * Test Data Manager
 *
 * Best Practice: Centralized test data management
 * - Keeps test data separate from test logic
 * - Enables data-driven testing
 * - Easy to maintain and update
 */

const fs = require("fs");
const path = require("path");
const logger = require("./logger");

class TestDataManager {
  constructor() {
    this.data = {};
    this.dataDir = path.join(__dirname, "../testdata");
  }

  /**
   * Load test data from JSON file
   * @param {string} filename - Name of the data file
   * @returns {object} Test data
   */
  loadData(filename) {
    try {
      const filePath = path.join(this.dataDir, `${filename}.json`);

      if (!fs.existsSync(filePath)) {
        logger.warn(`Test data file not found: ${filePath}`);
        return {};
      }

      const rawData = fs.readFileSync(filePath, "utf8");
      this.data[filename] = JSON.parse(rawData);

      logger.debug(`Loaded test data from: ${filename}.json`);
      return this.data[filename];
    } catch (error) {
      logger.error(
        `Failed to load test data from ${filename}: ${error.message}`,
      );
      return {};
    }
  }

  /**
   * Get test data by key
   * @param {string} dataKey - Data key (format: "filename.property")
   * @returns {any} Test data value
   */
  getData(dataKey) {
    try {
      const [filename, ...propertyPath] = dataKey.split(".");

      if (!this.data[filename]) {
        this.loadData(filename);
      }

      let value = this.data[filename];

      for (const prop of propertyPath) {
        value = value[prop];
        if (value === undefined) {
          logger.warn(`Property not found: ${dataKey}`);
          return null;
        }
      }

      return value;
    } catch (error) {
      logger.error(`Failed to get data for key ${dataKey}: ${error.message}`);
      return null;
    }
  }

  /**
   * Get random item from array in test data
   * @param {string} dataKey - Data key pointing to array
   * @returns {any} Random item
   */
  getRandomItem(dataKey) {
    const data = this.getData(dataKey);

    if (!Array.isArray(data)) {
      logger.warn(`Data at ${dataKey} is not an array`);
      return null;
    }

    if (data.length === 0) {
      logger.warn(`Array at ${dataKey} is empty`);
      return null;
    }

    const randomIndex = Math.floor(Math.random() * data.length);
    return data[randomIndex];
  }

  /**
   * Generate unique habit name
   * @param {string} prefix - Prefix for habit name
   * @returns {string} Unique habit name
   */
  generateUniqueHabitName(prefix = "Habit") {
    const timestamp = Date.now();
    const random = Math.floor(Math.random() * 1000);
    return `${prefix}_${timestamp}_${random}`;
  }

  /**
   * Save test data to file
   * @param {string} filename - Name of the data file
   * @param {object} data - Data to save
   */
  saveData(filename, data) {
    try {
      const filePath = path.join(this.dataDir, `${filename}.json`);

      // Ensure directory exists
      if (!fs.existsSync(this.dataDir)) {
        fs.mkdirSync(this.dataDir, { recursive: true });
      }

      fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf8");
      logger.debug(`Saved test data to: ${filename}.json`);
    } catch (error) {
      logger.error(`Failed to save test data to ${filename}: ${error.message}`);
    }
  }

  /**
   * Clear all loaded test data
   */
  clearData() {
    this.data = {};
    logger.debug("Cleared all test data from memory");
  }

  /**
   * Get all habit names from test data
   * @returns {string[]} Array of habit names
   */
  getAllHabitNames() {
    const habits = this.getData("habits.valid") || [];
    return habits.map((h) => h.name || h);
  }

  /**
   * Get invalid habit test cases
   * @returns {array} Array of invalid test cases
   */
  getInvalidHabits() {
    return this.getData("habits.invalid") || [];
  }

  /**
   * Get valid habit test cases
   * @returns {array} Array of valid test cases
   */
  getValidHabits() {
    return this.getData("habits.valid") || [];
  }
}

// Export singleton instance
module.exports = new TestDataManager();
