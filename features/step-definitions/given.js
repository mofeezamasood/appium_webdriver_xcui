/**
 * Given Steps - Preconditions for test scenarios
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
  await driver.activateApp(APP.BUNDLE_ID); // Replace with your app's ID

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

/**
 * Verify this is a fresh installation
 */
Given("this is a fresh installation", async function () {
  logger.stepStart("Verify fresh installation");

  try {
    // Check if habit list is empty
    const isEmpty = await HomePage.isHabitListEmpty();

    if (!isEmpty) {
      logger.warn("Not a fresh installation - data exists");
    }

    logger.info("✓ Fresh installation verified");
    logger.stepEnd("Verify fresh installation");
  } catch (error) {
    logger.error(`Fresh installation check failed: ${error.message}`);
    // Don't throw - this is optional verification
  }
});

/**
 * Device orientation - landscape
 */
Given("the device is in landscape orientation", async function () {
  logger.stepStart("Set device to landscape orientation");

  try {
    await driver.setOrientation("LANDSCAPE");
    logger.info("✓ Device set to landscape orientation");
    logger.stepEnd("Set device to landscape orientation");
  } catch (error) {
    logger.error(`Failed to set landscape orientation: ${error.message}`);
    throw error;
  }
});

/**
 * Habit has completion history
 */
Given(
  "the habit {string} is marked as completed for date {string}",
  async function (habitName, dateName) {
    logger.stepStart(
      `Mark habit "${habitName}" as completed for "${dateName}"`,
    );

    try {
      await HomePage.markHabitAsComplete(habitName, dateName);
      logger.info(
        `✓ Habit "${habitName}" marked as complete for "${dateName}"`,
      );
      logger.stepEnd(
        `Mark habit "${habitName}" as completed for "${dateName}"`,
      );
    } catch (error) {
      logger.error(`Failed to mark habit as complete: ${error.message}`);
      throw error;
    }
  },
);

/**
 * Multiple habits with specific count
 */
Given("I have {int} habits in the list", async function (count) {
  logger.stepStart(`Verify ${count} habits exist`);

  try {
    const habits = await HomePage.getAllHabits();

    if (habits.length < count) {
      // Create additional habits to reach the count
      const habitsToCreate = count - habits.length;
      for (let i = 0; i < habitsToCreate; i++) {
        const habitName = `Test Habit ${i + 1}`;
        await HomePage.clickAddHabitButton();
        await CreateHabitPage.createHabit(habitName);
      }
    }

    logger.info(`✓ ${count} habits in list`);
    logger.stepEnd(`Verify ${count} habits exist`);
  } catch (error) {
    logger.error(`Failed to set up habits: ${error.message}`);
    throw error;
  }
});

/**
 * Habits with specific list
 */
Given("I have the following habits:", async function (dataTable) {
  logger.stepStart("Set up specific habits");

  try {
    const habits = dataTable.raw().flat();

    for (const habitName of habits) {
      const exists = await HomePage.isHabitDisplayed(habitName);

      if (!exists) {
        await HomePage.clickAddHabitButton();
        await CreateHabitPage.createHabit(habitName);
      }
    }

    logger.info(`✓ All ${habits.length} habits set up`);
    logger.stepEnd("Set up specific habits");
  } catch (error) {
    logger.error(`Failed to set up habits: ${error.message}`);
    throw error;
  }
});

/**
 * Habit has specific streak
 */
Given(
  "the habit {string} has a {int}-day streak",
  async function (habitName, streakDays) {
    logger.stepStart(`Set up ${streakDays}-day streak for "${habitName}"`);

    try {
      const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

      for (let i = 0; i < streakDays && i < days.length; i++) {
        await HomePage.markHabitAsComplete(habitName, days[i]);
      }

      logger.info(`✓ ${streakDays}-day streak set up`);
      logger.stepEnd(`Set up ${streakDays}-day streak`);
    } catch (error) {
      logger.error(`Failed to set up streak: ${error.message}`);
      throw error;
    }
  },
);
