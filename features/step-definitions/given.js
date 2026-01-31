/**
 * Given Steps - Preconditions for test scenarios
 *
 * Best Practices Applied:
 * - Clear step descriptions
 * - Proper error handling
 * - Page object usage
 * - Logging for traceability
 */

const { Given } = require("@wdio/cucumber-framework");
const HomePage = require("../../pageobjects/HomePage");
const logger = require("../../utils/logger");
const { APP } = require("../../config/constants");

/**
 * Verify app is installed
 */
Given("the Habo app is installed", async function () {
  logger.stepStart("Verify Habo app is installed");

  try {
    const isInstalled = await driver.isAppInstalled(APP.BUNDLE_ID);

    if (!isInstalled) {
      throw new Error(`App with bundle ID "${APP.BUNDLE_ID}" is not installed`);
    }

    logger.info(`✓ App is installed: ${APP.BUNDLE_ID}`);
    logger.stepEnd("Verify Habo app is installed");
  } catch (error) {
    logger.error(`App installation verification failed: ${error.message}`);
    throw error;
  }
});

/**
 * Verify app is launched and on home page
 */
Given("the Habo app is launched", async function () {
  logger.stepStart("Verify Habo app is launched");

  try {
    const isOnHomePage = await HomePage.isOnHomePage();

    if (!isOnHomePage) {
      throw new Error(
        "App did not launch successfully - home page not displayed",
      );
    }

    logger.info("✓ App launched successfully");
    logger.stepEnd("Verify Habo app is launched");
  } catch (error) {
    logger.error(`App launch verification failed: ${error.message}`);
    throw error;
  }
});

/**
 * Verify specific habit exists
 */
Given("a habit named {string} exists", async function (habitName) {
  logger.stepStart(`Verify habit "${habitName}" exists`);

  try {
    const habitExists = await HomePage.isHabitDisplayed(habitName);

    if (!habitExists) {
      throw new Error(`Habit "${habitName}" does not exist in the habit list`);
    }

    logger.info(`✓ Habit "${habitName}" exists`);
    logger.stepEnd(`Verify habit "${habitName}" exists`);
  } catch (error) {
    logger.error(`Habit existence verification failed: ${error.message}`);
    throw error;
  }
});

/**
 * Verify habit list is empty (first launch scenario)
 */
Given("the habit list is empty", async function () {
  logger.stepStart("Verify habit list is empty");

  try {
    const isEmpty = await HomePage.isHabitListEmpty();

    if (!isEmpty) {
      throw new Error("Habit list is not empty");
    }

    logger.info("✓ Habit list is empty");
    logger.stepEnd("Verify habit list is empty");
  } catch (error) {
    logger.error(`Empty list verification failed: ${error.message}`);
    throw error;
  }
});

/**
 * Verify user is on home page
 */
Given("I am on the home page", async function () {
  logger.stepStart("Verify user is on home page");

  try {
    const isOnHomePage = await HomePage.isOnHomePage();

    if (!isOnHomePage) {
      throw new Error("Not on home page");
    }

    logger.info("✓ User is on home page");
    logger.stepEnd("Verify user is on home page");
  } catch (error) {
    logger.error(`Home page verification failed: ${error.message}`);
    throw error;
  }
});

/**
 * Verify multiple habits exist
 */
Given("the following habits exist:", async function (dataTable) {
  logger.stepStart("Verify multiple habits exist");

  try {
    const habits = dataTable.raw().flat();

    for (const habitName of habits) {
      const exists = await HomePage.isHabitDisplayed(habitName);

      if (!exists) {
        throw new Error(`Habit "${habitName}" does not exist`);
      }

      logger.debug(`✓ Verified: ${habitName}`);
    }

    logger.info(`✓ All ${habits.length} habits verified`);
    logger.stepEnd("Verify multiple habits exist");
  } catch (error) {
    logger.error(`Multiple habits verification failed: ${error.message}`);
    throw error;
  }
});
