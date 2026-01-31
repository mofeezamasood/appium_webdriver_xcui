/**
 * HomePage - Represents the main screen of the Habo app
 *
 * Best Practices Applied:
 * - Separation of selectors and methods
 * - Descriptive method names
 * - Single responsibility per method
 * - Proper error handling
 * - No business logic in page objects
 * - Returns meaningful values for assertions
 */

const BasePage = require("./BasePage");
const logger = require("../utils/logger");
const { TIMEOUTS } = require("../config/constants");

class HomePage extends BasePage {
  constructor() {
    super();
    this.initializeSelectors();
  }

  /**
   * Initialize all selectors - centralized selector management
   */
  initializeSelectors() {
    this.selectors = {
      homePageElement:
        '-ios class chain:**/XCUIElementTypeOther[`name == "Habo"`]',
      habitListEmpty: "accessibility id:Create your first habit.",
      addHabitButton: "accessibility id:Add",
      checkButton: "accessibility id:Check",
      habitDeleted: "accessibility id:Habit deleted.",
      modifyButton: "//XCUIElementTypeButton[@name='Modify\nModify']",
      dateElement: (dateName) =>
        `//XCUIElementTypeStaticText[@name="${dateName}"]`,
    };
  }

  /**
   * Get multiple selector strategies for finding a habit
   * @param {string} habitName - Name of the habit
   * @returns {string[]} Array of selectors
   */
  getHabitSelectors(habitName) {
    return [
      `accessibility id:${habitName}`,
      `-ios class chain:**/XCUIElementTypeOther['name == "${habitName}"']`,
      `-ios predicate string:name == "${habitName}"`,
      `//XCUIElementType*[@name="${habitName}"]`,
    ];
  }

  // ==================== Verification Methods ====================

  /**
   * Verify if user is on home page
   * @returns {Promise<boolean>}
   */
  async isOnHomePage() {
    try {
      logger.info("Verifying home page is displayed");
      return await this.isDisplayed(
        this.selectors.homePageElement,
        TIMEOUTS.MEDIUM,
      );
    } catch (error) {
      logger.error(`Home page verification failed: ${error.message}`);
      return false;
    }
  }

  /**
   * Check if habit list is empty
   * @returns {Promise<boolean>}
   */
  async isHabitListEmpty() {
    try {
      logger.info("Checking if habit list is empty");
      return await this.isDisplayed(
        this.selectors.habitListEmpty,
        TIMEOUTS.SHORT,
      );
    } catch (error) {
      logger.debug("Habit list is not empty or element not found");
      return false;
    }
  }

  /**
   * Verify if habit is displayed in the list
   * @param {string} habitName - Name of the habit
   * @returns {Promise<boolean>}
   */
  async isHabitDisplayed(habitName) {
    try {
      logger.info(`Checking if habit "${habitName}" is displayed`);

      // Small wait for UI to update
      await this.pause(TIMEOUTS.UI_UPDATE);

      const habitElement = await this.findHabitElement(habitName);

      if (!habitElement) {
        logger.warn(`Habit "${habitName}" not found`);
        return false;
      }

      const isDisplayed = await habitElement.isDisplayed();
      logger.debug(`Habit "${habitName}" displayed: ${isDisplayed}`);

      return isDisplayed;
    } catch (error) {
      logger.error(`Error checking habit display: ${error.message}`);
      return false;
    }
  }

  /**
   * Verify if habit is NOT displayed in the list
   * @param {string} habitName - Name of the habit
   * @returns {Promise<boolean>}
   */
  async isHabitNotDisplayed(habitName) {
    try {
      logger.info(`Verifying habit "${habitName}" is not displayed`);

      await this.pause(TIMEOUTS.UI_UPDATE);

      const habitElement = await this.findHabitElement(habitName);

      if (!habitElement) {
        logger.debug(`Habit "${habitName}" not found (as expected)`);
        return true;
      }

      const isDisplayed = await habitElement.isDisplayed();
      return !isDisplayed;
    } catch (error) {
      logger.debug(`Habit "${habitName}" not displayed: ${error.message}`);
      return true;
    }
  }

  /**
   * Check if habit deletion confirmation is shown
   * @returns {Promise<boolean>}
   */
  async isHabitDeletedMessageShown() {
    try {
      logger.info("Checking for habit deleted message");
      return await this.isDisplayed(
        this.selectors.habitDeleted,
        TIMEOUTS.MEDIUM,
      );
    } catch (error) {
      logger.warn("Habit deleted message not shown");
      return false;
    }
  }

  // ==================== Action Methods ====================

  /**
   * Click Add Habit button
   * @returns {Promise<void>}
   */
  async clickAddHabitButton() {
    try {
      logger.info("Clicking Add Habit button");
      await this.click(this.selectors.addHabitButton, TIMEOUTS.MEDIUM);
      await this.pause(TIMEOUTS.PAGE_LOAD); // Wait for create habit page
    } catch (error) {
      logger.error(`Failed to click Add Habit button: ${error.message}`);
      throw error;
    }
  }

  /**
   * Click Check button (for marking habit as complete)
   * @returns {Promise<boolean>} True if button was clicked, false if not found
   */
  async clickCheckButton() {
    try {
      logger.info("Clicking Check button");

      if (await this.isDisplayed(this.selectors.checkButton, TIMEOUTS.SHORT)) {
        await this.click(this.selectors.checkButton);
        await this.pause(TIMEOUTS.UI_UPDATE);
        return true;
      }

      logger.warn("Check button not found");
      return false;
    } catch (error) {
      logger.error(`Failed to click Check button: ${error.message}`);
      return false;
    }
  }

  /**
   * Click modify button for a specific habit
   * @param {string} habitName - Name of the habit to modify
   * @returns {Promise<void>}
   */
  async clickModifyButtonForHabit(habitName) {
    try {
      logger.info(`Clicking modify button for habit: ${habitName}`);

      await this.pause(TIMEOUTS.UI_UPDATE);

      const habitElement = await this.findHabitElement(habitName);

      if (!habitElement) {
        throw new Error(`Habit "${habitName}" not found`);
      }

      const habitCenterY = await this.getElementCenterY(habitElement);
      const modifyButton = await this.findClosestModifyButton(habitCenterY);

      if (!modifyButton) {
        throw new Error(`Modify button not found for habit "${habitName}"`);
      }

      await modifyButton.click();
      await this.pause(TIMEOUTS.PAGE_LOAD);

      logger.debug(`Successfully clicked modify button for "${habitName}"`);
    } catch (error) {
      logger.error(`Failed to click modify button: ${error.message}`);
      throw error;
    }
  }

  /**
   * Mark habit as completed for a specific date
   * @param {string} habitName - Name of the habit
   * @param {string} dateName - Date to mark (e.g., "Mon", "Tue")
   * @returns {Promise<boolean>}
   */
  async markHabitAsComplete(habitName, dateName) {
    try {
      logger.info(
        `Marking habit "${habitName}" as complete for date "${dateName}"`,
      );

      await this.pause(TIMEOUTS.UI_UPDATE);

      const habitElement = await this.findHabitElement(habitName);

      if (!habitElement) {
        throw new Error(`Habit "${habitName}" not found`);
      }

      const dateElement = await this.findDateElementForHabit(
        habitElement,
        dateName,
      );

      if (!dateElement) {
        throw new Error(
          `Date "${dateName}" not found for habit "${habitName}"`,
        );
      }

      await dateElement.click();
      await this.pause(TIMEOUTS.UI_UPDATE);

      await this.clickCheckButton();

      logger.info(
        `Successfully marked "${habitName}" as complete for "${dateName}"`,
      );
      return true;
    } catch (error) {
      logger.error(`Failed to mark habit as complete: ${error.message}`);
      throw error;
    }
  }

  // ==================== Helper Methods ====================

  /**
   * Find habit element using multiple selector strategies
   * @param {string} habitName - Name of the habit
   * @returns {Promise<WebdriverIO.Element|null>}
   */
  async findHabitElement(habitName) {
    try {
      const selectors = this.getHabitSelectors(habitName);
      return await this.findElementWithFallback(selectors, TIMEOUTS.SHORT);
    } catch (error) {
      logger.debug(`Could not find habit "${habitName}": ${error.message}`);
      return null;
    }
  }

  /**
   * Find date element associated with a habit
   * @param {WebdriverIO.Element} habitElement - Habit element
   * @param {string} dateName - Date name
   * @returns {Promise<WebdriverIO.Element|null>}
   */
  async findDateElementForHabit(habitElement, dateName) {
    try {
      const habitLocation = await habitElement.getLocation();
      const habitSize = await habitElement.getSize();
      const habitBottom = habitLocation.y + habitSize.height;
      const habitCenterY = habitLocation.y + habitSize.height / 2;

      const dateElements = await this.getElements(
        this.selectors.dateElement(dateName),
      );

      if (dateElements.length === 0) {
        logger.warn(`No date elements found for "${dateName}"`);
        return null;
      }

      let closestElement = null;
      let minDistance = Infinity;

      for (const dateElement of dateElements) {
        try {
          const dateLocation = await dateElement.getLocation();
          const dateSize = await dateElement.getSize();
          const dateCenterY = dateLocation.y + dateSize.height / 2;

          // Check if date is within habit row (with some tolerance)
          if (
            dateCenterY >= habitLocation.y &&
            dateCenterY <= habitBottom + 100
          ) {
            const distance = Math.abs(dateCenterY - habitCenterY);

            if (distance < minDistance) {
              minDistance = distance;
              closestElement = dateElement;
            }
          }
        } catch (error) {
          logger.debug(`Error processing date element: ${error.message}`);
          continue;
        }
      }

      // If no element found within tolerance, use first element as fallback
      return closestElement || dateElements[0];
    } catch (error) {
      logger.error(`Error finding date element: ${error.message}`);
      return null;
    }
  }

  /**
   * Find the modify button closest to a specific Y coordinate
   * @param {number} targetY - Target Y coordinate
   * @returns {Promise<WebdriverIO.Element|null>}
   */
  async findClosestModifyButton(targetY) {
    try {
      const modifyButtons = await this.getElements(this.selectors.modifyButton);

      if (modifyButtons.length === 0) {
        return null;
      }

      let closestButton = null;
      let minDistance = Infinity;
      const maxDistance = 100; // Proximity threshold

      for (const button of modifyButtons) {
        try {
          const buttonCenterY = await this.getElementCenterY(button);
          const distance = Math.abs(buttonCenterY - targetY);

          if (distance < minDistance && distance < maxDistance) {
            minDistance = distance;
            closestButton = button;
          }
        } catch (error) {
          logger.debug(`Error processing modify button: ${error.message}`);
          continue;
        }
      }

      return closestButton;
    } catch (error) {
      logger.error(`Error finding modify button: ${error.message}`);
      return null;
    }
  }

  /**
   * Get the center Y coordinate of an element
   * @param {WebdriverIO.Element} element - Element
   * @returns {Promise<number>}
   */
  async getElementCenterY(element) {
    const location = await element.getLocation();
    const size = await element.getSize();
    return location.y + size.height / 2;
  }

  /**
   * Get all habits currently displayed
   * @returns {Promise<string[]>} Array of habit names
   */
  async getAllHabits() {
    try {
      logger.info("Getting all displayed habits");
      // Implementation depends on app structure
      // This is a placeholder for custom implementation
      return [];
    } catch (error) {
      logger.error(`Failed to get all habits: ${error.message}`);
      return [];
    }
  }

  /**
   * Scroll to find a habit (if list is long)
   * @param {string} habitName - Name of the habit
   * @param {number} maxScrolls - Maximum scroll attempts
   * @returns {Promise<boolean>}
   */
  async scrollToHabit(habitName, maxScrolls = 5) {
    try {
      logger.info(`Scrolling to find habit: ${habitName}`);

      for (let i = 0; i < maxScrolls; i++) {
        const isDisplayed = await this.isHabitDisplayed(habitName);

        if (isDisplayed) {
          logger.debug(`Found habit "${habitName}" after ${i} scrolls`);
          return true;
        }

        await this.swipe("up", 0.5);
        await this.pause(TIMEOUTS.UI_UPDATE);
      }

      logger.warn(`Habit "${habitName}" not found after ${maxScrolls} scrolls`);
      return false;
    } catch (error) {
      logger.error(`Error scrolling to habit: ${error.message}`);
      return false;
    }
  }
}

module.exports = new HomePage();
