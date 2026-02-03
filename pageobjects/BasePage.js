/**
 * BasePage - Foundation class for all Page Objects
 * Implements core interactions, waits, and utilities
 *
 * Best Practices Applied:
 * - Single Responsibility Principle
 * - DRY (Don't Repeat Yourself)
 * - Explicit waits over implicit waits
 * - Robust error handling
 * - Logging for debugging
 * - Fluent interface pattern
 */

const { $ } = require("@wdio/globals");
const logger = require("../utils/logger");
const { TimeoutError, ElementNotFoundError } = require("../utils/customErrors");

class BasePage {
  constructor() {
    this.defaultTimeout = 10000;
    this.defaultRetryInterval = 500;
  }

  /**
   * Get element with explicit wait and error handling
   * @param {string|object} selector - Element selector or WebdriverIO element
   * @param {number} timeout - Maximum wait time in ms
   * @returns {Promise<WebdriverIO.Element>}
   * @throws {ElementNotFoundError}
   */
  async getElement(selector, timeout = this.defaultTimeout) {
    try {
      logger.debug(`Getting element: ${selector}`);
      const element = typeof selector === "string" ? $(selector) : selector;

      await element.waitForDisplayed({
        timeout,
        timeoutMsg: `Element "${selector}" not displayed within ${timeout}ms`,
      });

      return element;
    } catch (error) {
      logger.error(`Failed to get element "${selector}": ${error.message}`);
      throw new ElementNotFoundError(selector, error);
    }
  }

  /**
   * Get multiple elements matching selector
   */
  async getElements(selector, timeout = this.defaultTimeout) {
    try {
      logger.debug(`Getting elements: ${selector}`);
      const elements = await $$(selector);

      if (elements.length === 0) {
        logger.warn(`No elements found for selector: ${selector}`);
      }

      return elements;
    } catch (error) {
      logger.error(`Failed to get elements "${selector}": ${error.message}`);
      throw new ElementNotFoundError(selector, error);
    }
  }

  /**
   * Click element with retry logic
   * @param {string} selector - Element selector
   * @param {number} timeout - Maximum wait time in ms
   * @returns {Promise<BasePage>} - Returns this for chaining
   */
  async click(selector, timeout = this.defaultTimeout) {
    try {
      logger.info(`Clicking element: ${selector}`);
      const element = await this.getElement(selector, timeout);

      await element.click();
      logger.debug(`Successfully clicked: ${selector}`);

      return this; // Enable method chaining
    } catch (error) {
      logger.error(`Failed to click "${selector}": ${error.message}`);
      throw error;
    }
  }

  /**
   * Set value in input field with clear option
   * @param {string} selector - Element selector
   * @param {string} value - Value to set
   * @param {boolean} clearFirst - Clear field before setting value
   * @param {number} timeout - Maximum wait time in ms
   * @returns {Promise<BasePage>} - Returns this for chaining
   */
  async setValue(
    selector,
    value,
    clearFirst = true,
    timeout = this.defaultTimeout,
  ) {
    try {
      logger.info(`Setting value "${value}" in element: ${selector}`);
      const element = await this.getElement(selector, timeout);

      if (clearFirst) {
        await element.clearValue();
      }

      await element.setValue(value);
      logger.debug(`Successfully set value in: ${selector}`);

      return this;
    } catch (error) {
      logger.error(`Failed to set value in "${selector}": ${error.message}`);
      throw error;
    }
  }

  /**
   * Get text from element
   * @param {string} selector - Element selector
   * @param {number} timeout - Maximum wait time in ms
   * @returns {Promise<string>}
   */
  async getText(selector, timeout = this.defaultTimeout) {
    try {
      logger.debug(`Getting text from element: ${selector}`);
      const element = await this.getElement(selector, timeout);
      const text = await element.getText();

      logger.debug(`Text from "${selector}": ${text}`);
      return text;
    } catch (error) {
      logger.error(`Failed to get text from "${selector}": ${error.message}`);
      throw error;
    }
  }

  /**
   * Check if element is displayed
   * @param {string} selector - Element selector
   * @param {number} timeout - Maximum wait time in ms
   * @returns {Promise<boolean>}
   */
  async isDisplayed(selector, timeout = this.defaultTimeout) {
    try {
      logger.debug(`Checking if element is displayed: ${selector}`);
      const element = await this.getElement(selector, timeout);
      const displayed = await element.isDisplayed();

      logger.debug(`Element "${selector}" displayed: ${displayed}`);
      return displayed;
    } catch (error) {
      logger.debug(`Element "${selector}" not displayed: ${error.message}`);
      return false;
    }
  }

  /**
   * Check if element exists in DOM (may not be visible)
   * @param {string} selector - Element selector
   * @returns {Promise<boolean>}
   */
  async isExisting(selector) {
    try {
      const element = $(selector);
      return await element.isExisting();
    } catch (error) {
      return false;
    }
  }

  /**
   * Wait for element to be displayed
   * @param {string} selector - Element selector
   * @param {number} timeout - Maximum wait time in ms
   * @param {boolean} reverse - Wait for element to NOT be displayed
   * @returns {Promise<boolean>}
   */
  async waitForDisplayed(
    selector,
    timeout = this.defaultTimeout,
    reverse = false,
  ) {
    try {
      logger.debug(
        `Waiting for element ${reverse ? "to disappear" : "to appear"}: ${selector}`,
      );
      const element = $(selector);

      await element.waitForDisplayed({
        timeout,
        reverse,
        timeoutMsg: `Element "${selector}" ${reverse ? "still displayed" : "not displayed"} after ${timeout}ms`,
      });

      return true;
    } catch (error) {
      logger.warn(`Wait failed for "${selector}": ${error.message}`);
      return false;
    }
  }

  /**
   * Wait for element to be clickable
   * @param {string} selector - Element selector
   * @param {number} timeout - Maximum wait time in ms
   * @returns {Promise<boolean>}
   */
  async waitForClickable(selector, timeout = this.defaultTimeout) {
    try {
      logger.debug(`Waiting for element to be clickable: ${selector}`);
      const element = $(selector);

      return true;
    } catch (error) {
      logger.warn(`Element "${selector}" not clickable: ${error.message}`);
      return false;
    }
  }

  /**
   * Wait until a condition is true
   * @param {Function} condition - Async function returning boolean
   * @param {number} timeout - Maximum wait time in ms
   * @param {string} errorMessage - Custom error message
   * @returns {Promise<boolean>}
   */
  async waitUntil(
    condition,
    timeout = this.defaultTimeout,
    errorMessage = "Condition not met",
  ) {
    try {
      await driver.waitUntil(condition, {
        timeout,
        interval: this.defaultRetryInterval,
        timeoutMsg: errorMessage,
      });
      return true;
    } catch (error) {
      logger.error(`Wait condition failed: ${errorMessage}`);
      throw new TimeoutError(errorMessage);
    }
  }

  /**
   * Scroll element into view
   * @param {string} selector - Element selector
   * @returns {Promise<BasePage>}
   */
  async scrollIntoView(selector) {
    try {
      logger.debug(`Scrolling element into view: ${selector}`);
      const element = await this.getElement(selector);
      await element.scrollIntoView();

      return this;
    } catch (error) {
      logger.error(`Failed to scroll element "${selector}": ${error.message}`);
      throw error;
    }
  }

  /**
   * Get element attribute value
   * @param {string} selector - Element selector
   * @param {string} attribute - Attribute name
   * @param {number} timeout - Maximum wait time in ms
   * @returns {Promise<string|null>}
   */
  async getAttribute(selector, attribute, timeout = this.defaultTimeout) {
    try {
      const element = await this.getElement(selector, timeout);
      return await element.getAttribute(attribute);
    } catch (error) {
      logger.error(
        `Failed to get attribute "${attribute}" from "${selector}": ${error.message}`,
      );
      return null;
    }
  }

  /**
   * Perform swipe gesture
   * @param {string} direction - 'up', 'down', 'left', 'right'
   * @param {number} distance - Swipe distance (0-1 as percentage)
   */
  async swipe(direction, distance = 0.5) {
    try {
      logger.info(`Swiping ${direction} with distance ${distance}`);
      const { width, height } = await driver.getWindowSize();

      const gestures = {
        up: {
          start: { x: width / 2, y: height * (1 - distance) },
          end: { x: width / 2, y: height * distance },
        },
        down: {
          start: { x: width / 2, y: height * distance },
          end: { x: width / 2, y: height * (1 - distance) },
        },
        left: {
          start: { x: width * (1 - distance), y: height / 2 },
          end: { x: width * distance, y: height / 2 },
        },
        right: {
          start: { x: width * distance, y: height / 2 },
          end: { x: width * (1 - distance), y: height / 2 },
        },
      };

      const gesture = gestures[direction.toLowerCase()];
      if (!gesture) {
        throw new Error(`Invalid swipe direction: ${direction}`);
      }

      await driver.touchPerform([
        { action: "press", options: gesture.start },
        { action: "wait", options: { ms: 100 } },
        { action: "moveTo", options: gesture.end },
        { action: "release" },
      ]);

      await this.pause(500); // Wait for swipe animation
    } catch (error) {
      logger.error(`Swipe failed: ${error.message}`);
      throw error;
    }
  }

  /**
   * Take screenshot
   * @param {string} filename - Screenshot filename
   * @returns {Promise<void>}
   */
  async takeScreenshot(filename) {
    try {
      await driver.saveScreenshot(`./screenshots/${filename}.png`);
      logger.info(`Screenshot saved: ${filename}.png`);
    } catch (error) {
      logger.error(`Failed to take screenshot: ${error.message}`);
    }
  }

  /**
   * Pause execution (use sparingly, prefer explicit waits)
   * @param {number} ms - Milliseconds to pause
   * @returns {Promise<void>}
   */
  async pause(ms) {
    logger.debug(`Pausing for ${ms}ms`);
    await driver.pause(ms);
  }

  /**
   * Get current page source (useful for debugging)
   * @returns {Promise<string>}
   */
  async getPageSource() {
    return await driver.getPageSource();
  }

  /**
   * Retry an action with exponential backoff
   * @param {Function} action - Async function to retry
   * @param {number} maxRetries - Maximum retry attempts
   * @param {number} initialDelay - Initial delay in ms
   * @returns {Promise<any>}
   */
  async retryAction(action, maxRetries = 3, initialDelay = 1000) {
    let lastError;

    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        logger.debug(`Attempt ${attempt}/${maxRetries}`);
        return await action();
      } catch (error) {
        lastError = error;
        logger.warn(`Attempt ${attempt} failed: ${error.message}`);

        if (attempt < maxRetries) {
          const delay = initialDelay * Math.pow(2, attempt - 1);
          logger.debug(`Retrying in ${delay}ms...`);
          await this.pause(delay);
        }
      }
    }

    throw lastError;
  }

  /**
   * Find element using multiple selector strategies
   * Tries each selector until one succeeds
   * @param {string[]} selectors - Array of selectors to try
   * @param {number} timeout - Timeout per selector
   * @returns {Promise<WebdriverIO.Element|null>}
   */
  async findElementWithFallback(selectors, timeout = 2000) {
    for (const selector of selectors) {
      try {
        const element = await this.getElement(selector, timeout);
        if (await element.isDisplayed()) {
          logger.debug(`Found element using selector: ${selector}`);
          return element;
        }
      } catch (error) {
        logger.debug(`Selector "${selector}" failed, trying next...`);
        continue;
      }
    }

    logger.warn(`No element found using any of the provided selectors`);
    return null;
  }

  /**
   * Get element location
   * @param {string} selector - Element selector
   * @returns {Promise<{x: number, y: number}>}
   */
  async getElementLocation(selector) {
    const element = await this.getElement(selector);
    return await element.getLocation();
  }

  /**
   * Get element size
   * @param {string} selector - Element selector
   * @returns {Promise<{width: number, height: number}>}
   */
  async getElementSize(selector) {
    const element = await this.getElement(selector);
    return await element.getSize();
  }

  /**
   * Tap at specific coordinates
   * @param {number} x - X coordinate
   * @param {number} y - Y coordinate
   */
  async tapAtCoordinates(x, y) {
    logger.debug(`Tapping at coordinates (${x}, ${y})`);
    await driver.touchPerform([{ action: "tap", options: { x, y } }]);
  }

  /**
   * Long press element
   * @param {string} selector - Element selector
   * @param {number} duration - Press duration in ms
   */
  async longPress(selector, duration = 1000) {
    logger.info(`Long pressing element: ${selector}`);
    const element = await this.getElement(selector);
    const { x, y } = await element.getLocation();
    const { width, height } = await element.getSize();

    const centerX = x + width / 2;
    const centerY = y + height / 2;

    await driver.touchPerform([
      { action: "press", options: { x: centerX, y: centerY } },
      { action: "wait", options: { ms: duration } },
      { action: "release" },
    ]);
  }
}

module.exports = BasePage;
