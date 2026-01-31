/**
 * CreateHabitPage - Represents the habit creation/editing screen
 *
 * Best Practices Applied:
 * - Clear method naming
 * - Proper error handling
 * - Centralized selectors
 * - Validation methods
 */

const BasePage = require("./BasePage");
const logger = require("../utils/logger");
const { TIMEOUTS } = require("../config/constants");

class CreateHabitPage extends BasePage {
  constructor() {
    super();
    this.initializeSelectors();
  }

  /**
   * Initialize all selectors
   */
  initializeSelectors() {
    this.selectors = {
      habitTextField: "XCUIElementTypeTextField",
      saveButton: "accessibility id:Save",
      deleteButton: '//XCUIElementTypeButton[@name="Delete\nDelete"]',
      cancelButton: "accessibility id:Cancel",
      pageTitle: "accessibility id:Create Habit", // Adjust based on actual app
    };
  }

  // ==================== Verification Methods ====================

  /**
   * Verify if user is on create/edit habit page
   * @returns {Promise<boolean>}
   */
  async isOnCreateHabitPage() {
    try {
      logger.info("Verifying create habit page is displayed");
      return await this.isDisplayed(
        this.selectors.habitTextField,
        TIMEOUTS.MEDIUM,
      );
    } catch (error) {
      logger.error(`Create habit page verification failed: ${error.message}`);
      return false;
    }
  }

  /**
   * Check if save button is enabled
   * @returns {Promise<boolean>}
   */
  async isSaveButtonEnabled() {
    try {
      const saveButton = await this.getElement(this.selectors.saveButton);
      return await saveButton.isEnabled();
    } catch (error) {
      logger.error(`Error checking save button state: ${error.message}`);
      return false;
    }
  }

  /**
   * Check if delete button is displayed (only on edit mode)
   * @returns {Promise<boolean>}
   */
  async isDeleteButtonDisplayed() {
    try {
      return await this.isDisplayed(
        this.selectors.deleteButton,
        TIMEOUTS.SHORT,
      );
    } catch (error) {
      logger.debug("Delete button not displayed (might be in create mode)");
      return false;
    }
  }

  /**
   * Get current habit name from text field
   * @returns {Promise<string>}
   */
  async getCurrentHabitName() {
    try {
      logger.debug("Getting current habit name from text field");
      const textField = await this.getElement(this.selectors.habitTextField);
      return await textField.getText();
    } catch (error) {
      logger.error(`Failed to get habit name: ${error.message}`);
      return "";
    }
  }

  // ==================== Action Methods ====================

  /**
   * Enter habit name in text field
   * @param {string} habitName - Name of the habit
   * @param {boolean} clearFirst - Clear existing text first
   * @returns {Promise<void>}
   */
  async enterHabitName(habitName) {
    try {
      logger.info(`Entering habit name: "${habitName}"`);

      if (!habitName || typeof habitName !== "string") {
        throw new Error("Invalid habit name provided");
      }

      await this.setValue(
        this.selectors.habitTextField,
        habitName,
        true,
        TIMEOUTS.MEDIUM,
      );

      // Verify the text was entered correctly
      const enteredText = await this.getCurrentHabitName();

      if (enteredText !== habitName) {
        logger.warn(
          `Text mismatch. Expected: "${habitName}", Got: "${enteredText}"`,
        );
      }

      logger.debug(`Successfully entered habit name: "${habitName}"`);
    } catch (error) {
      logger.error(`Failed to enter habit name: ${error.message}`);
      throw error;
    }
  }

  /**
   * Clear habit name text field
   * @returns {Promise<void>}
   */
  async clearHabitName() {
    try {
      logger.info("Clearing habit name field");
      const textField = await this.getElement(this.selectors.habitTextField);
      await textField.clearValue();
    } catch (error) {
      logger.error(`Failed to clear habit name: ${error.message}`);
      throw error;
    }
  }

  /**
   * Click Save button to save habit
   * @returns {Promise<void>}
   */
  async clickSaveButton() {
    try {
      logger.info("Clicking Save button");

      // Verify button is enabled before clicking
      const isEnabled = await this.isSaveButtonEnabled();

      if (!isEnabled) {
        logger.warn("Save button is disabled");
        throw new Error("Cannot save - Save button is disabled");
      }

      await this.click(this.selectors.saveButton, TIMEOUTS.MEDIUM);
      await this.pause(TIMEOUTS.PAGE_LOAD); // Wait for navigation back to home

      logger.debug("Successfully clicked Save button");
    } catch (error) {
      logger.error(`Failed to click Save button: ${error.message}`);
      throw error;
    }
  }

  /**
   * Click Delete button to delete habit
   * @returns {Promise<void>}
   */
  async clickDeleteButton() {
    try {
      logger.info("Clicking Delete button");

      const isDisplayed = await this.isDeleteButtonDisplayed();

      if (!isDisplayed) {
        throw new Error("Delete button not found (might not be in edit mode)");
      }

      await this.click(this.selectors.deleteButton, TIMEOUTS.MEDIUM);
      await this.pause(TIMEOUTS.PAGE_LOAD);

      logger.debug("Successfully clicked Delete button");
    } catch (error) {
      logger.error(`Failed to click Delete button: ${error.message}`);
      throw error;
    }
  }

  /**
   * Click Cancel button to go back without saving
   * @returns {Promise<void>}
   */
  async clickCancelButton() {
    try {
      logger.info("Clicking Cancel button");
      await this.click(this.selectors.cancelButton, TIMEOUTS.MEDIUM);
      await this.pause(TIMEOUTS.PAGE_LOAD);
    } catch (error) {
      logger.error(`Failed to click Cancel button: ${error.message}`);
      throw error;
    }
  }

  // ==================== Composite Actions ====================

  /**
   * Create a new habit (enter name and save)
   * @param {string} habitName - Name of the habit
   * @returns {Promise<void>}
   */
  async createHabit(habitName) {
    try {
      logger.info(`Creating new habit: "${habitName}"`);
      await this.enterHabitName(habitName);
      await this.clickSaveButton();
      logger.info(`Successfully created habit: "${habitName}"`);
    } catch (error) {
      logger.error(`Failed to create habit: ${error.message}`);
      throw error;
    }
  }

  /**
   * Edit existing habit name
   * @param {string} newHabitName - New name for the habit
   * @returns {Promise<void>}
   */
  async editHabitName(newHabitName) {
    try {
      logger.info(`Editing habit to: "${newHabitName}"`);
      await this.enterHabitName(newHabitName);
      await this.clickSaveButton();
      logger.info(`Successfully edited habit to: "${newHabitName}"`);
    } catch (error) {
      logger.error(`Failed to edit habit: ${error.message}`);
      throw error;
    }
  }

  /**
   * Delete the current habit
   * @returns {Promise<void>}
   */
  async deleteHabit() {
    try {
      logger.info("Deleting habit");
      await this.clickDeleteButton();
      logger.info("Successfully deleted habit");
    } catch (error) {
      logger.error(`Failed to delete habit: ${error.message}`);
      throw error;
    }
  }

  // ==================== Validation Methods ====================

  /**
   * Validate habit name meets requirements
   * @param {string} habitName - Habit name to validate
   * @returns {Promise<{valid: boolean, errors: string[]}>}
   */
  async validateHabitName(habitName) {
    const errors = [];

    if (!habitName || habitName.trim() === "") {
      errors.push("Habit name cannot be empty");
    }

    if (habitName && habitName.length > 100) {
      errors.push("Habit name too long (max 100 characters)");
    }

    if (habitName && habitName.length < 2) {
      errors.push("Habit name too short (min 2 characters)");
    }

    return {
      valid: errors.length === 0,
      errors,
    };
  }

  /**
   * Verify error message is shown for invalid input
   * @param {string} errorMessage - Expected error message
   * @returns {Promise<boolean>}
   */
  async isErrorMessageShown(errorMessage) {
    try {
      const errorSelector = `accessibility id:${errorMessage}`;
      return await this.isDisplayed(errorSelector, TIMEOUTS.SHORT);
    } catch (error) {
      logger.debug("Error message not found");
      return false;
    }
  }
}

module.exports = new CreateHabitPage();
