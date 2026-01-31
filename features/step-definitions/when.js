/**
 * When Steps - User actions
 *
 * Best Practices Applied:
 * - Action-oriented steps
 * - Descriptive logging
 * - Error handling
 * - Page object encapsulation
 */

const { When } = require("@wdio/cucumber-framework");
const HomePage = require("../../pageobjects/HomePage");
const CreateHabitPage = require("../../pageobjects/CreateHabitPage");
const logger = require("../../utils/logger");
const { APP } = require("../../config/constants");

/**
 * Launch the app (redundant with Given, but kept for flexibility)
 */
When("I launch the Habo app", async function () {
  logger.stepStart("Launch Habo app");

  try {
    await driver.activateApp(APP.BUNDLE_ID);

    const isOnHomePage = await HomePage.isOnHomePage();

    if (!isOnHomePage) {
      throw new Error("App launch failed - home page not displayed");
    }

    logger.info("✓ App launched successfully");
    logger.stepEnd("Launch Habo app");
  } catch (error) {
    logger.error(`App launch failed: ${error.message}`);
    throw error;
  }
});

/**
 * Navigate to create habit page
 */
When("I tap on the Add Habit button", async function () {
  logger.stepStart("Tap Add Habit button");

  try {
    await HomePage.clickAddHabitButton();

    // Verify navigation succeeded
    const isOnCreatePage = await CreateHabitPage.isOnCreateHabitPage();

    if (!isOnCreatePage) {
      throw new Error("Failed to navigate to create habit page");
    }

    logger.info("✓ Navigated to create habit page");
    logger.stepEnd("Tap Add Habit button");
  } catch (error) {
    logger.error(`Failed to tap Add Habit button: ${error.message}`);
    throw error;
  }
});

/**
 * Enter habit name
 */
When("I enter {string} as the habit name", async function (habitName) {
  logger.stepStart(`Enter habit name: "${habitName}"`);

  try {
    await CreateHabitPage.enterHabitName(habitName);

    logger.info(`✓ Entered habit name: "${habitName}"`);
    logger.stepEnd(`Enter habit name: "${habitName}"`);
  } catch (error) {
    logger.error(`Failed to enter habit name: ${error.message}`);
    throw error;
  }
});

/**
 * Save the habit
 */
When("I tap on the Save Habit button", async function () {
  logger.stepStart("Tap Save Habit button");

  try {
    await CreateHabitPage.clickSaveButton();

    // Verify navigation back to home page
    const isOnHomePage = await HomePage.isOnHomePage();

    if (!isOnHomePage) {
      logger.warn("Did not return to home page after save");
    }

    logger.info("✓ Saved habit successfully");
    logger.stepEnd("Tap Save Habit button");
  } catch (error) {
    logger.error(`Failed to save habit: ${error.message}`);
    throw error;
  }
});

/**
 * Mark habit as complete for specific date
 */
When(
  "I mark the habit {string} as completed for date {string}",
  async function (habitName, dateName) {
    logger.stepStart(`Mark habit "${habitName}" complete for "${dateName}"`);

    try {
      await HomePage.markHabitAsComplete(habitName, dateName);

      logger.info(`✓ Marked "${habitName}" as complete for "${dateName}"`);
      logger.stepEnd(`Mark habit "${habitName}" complete for "${dateName}"`);
    } catch (error) {
      logger.error(`Failed to mark habit as complete: ${error.message}`);
      throw error;
    }
  },
);

/**
 * Click modify button for habit
 */
When("I click on modify button for {string}", async function (habitName) {
  logger.stepStart(`Click modify button for "${habitName}"`);

  try {
    await HomePage.clickModifyButtonForHabit(habitName);

    // Verify navigation to edit page
    const isOnEditPage = await CreateHabitPage.isOnCreateHabitPage();

    if (!isOnEditPage) {
      throw new Error("Failed to navigate to edit habit page");
    }

    logger.info(`✓ Navigated to edit page for "${habitName}"`);
    logger.stepEnd(`Click modify button for "${habitName}"`);
  } catch (error) {
    logger.error(`Failed to click modify button: ${error.message}`);
    throw error;
  }
});

/**
 * Delete habit from edit page
 */
When("I delete the habit", async function () {
  logger.stepStart("Delete habit");

  try {
    await CreateHabitPage.clickDeleteButton();

    logger.info("✓ Deleted habit");
    logger.stepEnd("Delete habit");
  } catch (error) {
    logger.error(`Failed to delete habit: ${error.message}`);
    throw error;
  }
});

/**
 * Edit habit name
 */
When("I change the habit name to {string}", async function (newHabitName) {
  logger.stepStart(`Change habit name to: "${newHabitName}"`);

  try {
    await CreateHabitPage.enterHabitName(newHabitName);

    logger.info(`✓ Changed habit name to: "${newHabitName}"`);
    logger.stepEnd(`Change habit name to: "${newHabitName}"`);
  } catch (error) {
    logger.error(`Failed to change habit name: ${error.message}`);
    throw error;
  }
});

/**
 * Clear habit name field
 */
When("I clear the habit name field", async function () {
  logger.stepStart("Clear habit name field");

  try {
    await CreateHabitPage.clearHabitName();

    logger.info("✓ Cleared habit name field");
    logger.stepEnd("Clear habit name field");
  } catch (error) {
    logger.error(`Failed to clear habit name: ${error.message}`);
    throw error;
  }
});

/**
 * Cancel habit creation/editing
 */
When("I tap on the Cancel button", async function () {
  logger.stepStart("Tap Cancel button");

  try {
    await CreateHabitPage.clickCancelButton();

    logger.info("✓ Cancelled operation");
    logger.stepEnd("Tap Cancel button");
  } catch (error) {
    logger.error(`Failed to cancel: ${error.message}`);
    throw error;
  }
});

/**
 * Scroll to find habit
 */
When("I scroll to find the habit {string}", async function (habitName) {
  logger.stepStart(`Scroll to find habit: "${habitName}"`);

  try {
    const found = await HomePage.scrollToHabit(habitName);

    if (!found) {
      throw new Error(`Habit "${habitName}" not found after scrolling`);
    }

    logger.info(`✓ Found habit: "${habitName}"`);
    logger.stepEnd(`Scroll to find habit: "${habitName}"`);
  } catch (error) {
    logger.error(`Failed to scroll to habit: ${error.message}`);
    throw error;
  }
});

/**
 * Create habit using composite action
 */
When("I create a new habit named {string}", async function (habitName) {
  logger.stepStart(`Create new habit: "${habitName}"`);

  try {
    await HomePage.clickAddHabitButton();
    await CreateHabitPage.createHabit(habitName);

    logger.info(`✓ Created habit: "${habitName}"`);
    logger.stepEnd(`Create new habit: "${habitName}"`);
  } catch (error) {
    logger.error(`Failed to create habit: ${error.message}`);
    throw error;
  }
});

When("I terminate the app", async () => {
  logger.stepStart("Terminate the app");

  try {
    await driver.terminateApp(APP.BUNDLE_ID);

    logger.info("✓ App terminated successfully");
    logger.stepEnd("Terminate the app");
  } catch (error) {
    logger.error(`Failed to terminate app: ${error.message}`);
    throw error;
  }
});
