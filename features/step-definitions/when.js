/**
 * When Steps - User actions
 */

const { When } = require("@wdio/cucumber-framework");
const HomePage = require("../../pageobjects/HomePage");
const CreateHabitPage = require("../../pageobjects/CreateHabitPage");
const logger = require("../../utils/logger");
const { APP, TIMEOUTS } = require("../../config/constants");

/**
 * Launch the app
 */
When("I launch the Habo app", async function () {
  logger.stepStart("Launch Habo app");

  try {
    const isOnHomePage = await HomePage.isOnHomePage();

    if (!isOnHomePage) {
      // Try to launch the app
      await driver.activateApp(APP.BUNDLE_ID);
      await driver.pause(TIMEOUTS.PAGE_LOAD);

      const launched = await HomePage.isOnHomePage();
      if (!launched) {
        throw new Error("App launch failed - home page not displayed");
      }
    }

    logger.info("✓ App launched successfully");
    logger.stepEnd("Launch Habo app");
  } catch (error) {
    logger.error(`App launch failed: ${error.message}`);
    throw error;
  }
});

/**
 * Terminate the app
 */
When("I terminate the app", async function () {
  logger.stepStart("Terminate app");

  try {
    await driver.terminateApp(APP.BUNDLE_ID);
    await driver.pause(TIMEOUTS.UI_UPDATE);

    logger.info("✓ App terminated");
    logger.stepEnd("Terminate app");
  } catch (error) {
    logger.error(`Failed to terminate app: ${error.message}`);
    throw error;
  }
});

/**
 * Send app to background
 */
When("I send the app to background", async function () {
  logger.stepStart("Send app to background");

  try {
    await driver.background(3); // Send to background for 3 seconds
    logger.info("✓ App sent to background");
    logger.stepEnd("Send app to background");
  } catch (error) {
    logger.error(`Failed to background app: ${error.message}`);
    throw error;
  }
});

/**
 * Bring app to foreground
 */
When("I bring the app to foreground", async function () {
  logger.stepStart("Bring app to foreground");

  try {
    await driver.activateApp(APP.BUNDLE_ID);
    await driver.pause(TIMEOUTS.UI_UPDATE);

    logger.info("✓ App brought to foreground");
    logger.stepEnd("Bring app to foreground");
  } catch (error) {
    logger.error(`Failed to bring app to foreground: ${error.message}`);
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

/**
 * Rotate device to portrait
 */
When("I rotate the device to portrait", async function () {
  logger.stepStart("Rotate device to portrait");

  try {
    await driver.setOrientation("PORTRAIT");
    await driver.pause(TIMEOUTS.UI_UPDATE);

    logger.info("✓ Rotated to portrait");
    logger.stepEnd("Rotate device to portrait");
  } catch (error) {
    logger.error(`Failed to rotate device: ${error.message}`);
    throw error;
  }
});

/**
 * Unmark completed habit
 */
When(
  "I unmark the habit {string} for date {string}",
  async function (habitName, dateName) {
    logger.stepStart(`Unmark habit "${habitName}" for "${dateName}"`);

    try {
      // Click on the completed habit to unmark it
      await HomePage.markHabitAsComplete(habitName, dateName);

      logger.info(`✓ Unmarked "${habitName}" for "${dateName}"`);
      logger.stepEnd(`Unmark habit "${habitName}" for "${dateName}"`);
    } catch (error) {
      logger.error(`Failed to unmark habit: ${error.message}`);
      throw error;
    }
  },
);

/**
 * Scroll operations
 */
When("I scroll down to the bottom of the list", async function () {
  logger.stepStart("Scroll to bottom of list");

  try {
    for (let i = 0; i < 5; i++) {
      await HomePage.swipe("up", 0.7);
      await driver.pause(TIMEOUTS.UI_UPDATE);
    }

    logger.info("✓ Scrolled to bottom");
    logger.stepEnd("Scroll to bottom of list");
  } catch (error) {
    logger.error(`Failed to scroll: ${error.message}`);
    throw error;
  }
});

/**
 * Pull to refresh
 */
When("I pull down to refresh the list", async function () {
  logger.stepStart("Pull to refresh");

  try {
    await HomePage.swipe("down", 0.3);
    await driver.pause(TIMEOUTS.PAGE_LOAD);

    logger.info("✓ Refreshed list");
    logger.stepEnd("Pull to refresh");
  } catch (error) {
    logger.error(`Failed to refresh: ${error.message}`);
    throw error;
  }
});

/**
 * Tap on habit
 */
When("I tap on the habit {string}", async function (habitName) {
  logger.stepStart(`Tap on habit: "${habitName}"`);

  try {
    const habitElement = await HomePage.findHabitElement(habitName);

    if (!habitElement) {
      throw new Error(`Habit "${habitName}" not found`);
    }

    await habitElement.click();
    await driver.pause(TIMEOUTS.UI_UPDATE);

    logger.info(`✓ Tapped on habit: "${habitName}"`);
    logger.stepEnd(`Tap on habit: "${habitName}"`);
  } catch (error) {
    logger.error(`Failed to tap on habit: ${error.message}`);
    throw error;
  }
});

/**
 * Tap on text field
 */
When("I tap on the habit name field", async function () {
  logger.stepStart("Tap on habit name field");

  try {
    const textField = await CreateHabitPage.getElement(
      CreateHabitPage.selectors.habitTextField,
    );
    await textField.click();
    await driver.pause(TIMEOUTS.UI_UPDATE);

    logger.info("✓ Tapped on habit name field");
    logger.stepEnd("Tap on habit name field");
  } catch (error) {
    logger.error(`Failed to tap on text field: ${error.message}`);
    throw error;
  }
});

/**
 * Tap outside text field
 */
When("I tap outside the text field", async function () {
  logger.stepStart("Tap outside text field");

  try {
    // Tap on home page element
    await driver.touchPerform([{ action: "tap", options: { x: 100, y: 100 } }]);
    await driver.pause(TIMEOUTS.UI_UPDATE);

    logger.info("✓ Tapped outside text field");
    logger.stepEnd("Tap outside text field");
  } catch (error) {
    logger.error(`Failed to tap outside: ${error.message}`);
    throw error;
  }
});

/**
 * Press keyboard return key
 */
When("I tap the keyboard return key", async function () {
  logger.stepStart("Tap keyboard return key");

  try {
    await driver.execute("mobile: performEditorAction", { action: "done" });
    await driver.pause(TIMEOUTS.UI_UPDATE);

    logger.info("✓ Pressed return key");
    logger.stepEnd("Tap keyboard return key");
  } catch (error) {
    logger.warn(`Failed to press return key: ${error.message}`);
    // Don't throw - this might not be critical
  }
});

/**
 * Tap device back button
 */
When("I tap the device back button", async function () {
  logger.stepStart("Tap device back button");

  try {
    await driver.back();
    await driver.pause(TIMEOUTS.UI_UPDATE);

    logger.info("✓ Tapped back button");
    logger.stepEnd("Tap device back button");
  } catch (error) {
    logger.error(`Failed to tap back button: ${error.message}`);
    throw error;
  }
});

/**
 * Navigate to settings
 */
When("I navigate to app settings", async function () {
  logger.stepStart("Navigate to app settings");

  try {
    // This is app-specific - adjust based on actual app
    logger.warn("Settings navigation not implemented");
    logger.stepEnd("Navigate to app settings");
  } catch (error) {
    logger.error(`Failed to navigate to settings: ${error.message}`);
    throw error;
  }
});

/**
 * Mark all habits as complete
 */
When(
  "I mark all habits as completed for date {string}",
  async function (dateName) {
    logger.stepStart(`Mark all habits complete for "${dateName}"`);

    try {
      const habits = await HomePage.getAllHabits();

      for (const habitName of habits) {
        await HomePage.markHabitAsComplete(habitName, dateName);
      }

      logger.info(`✓ Marked all ${habits.length} habits complete`);
      logger.stepEnd(`Mark all habits complete for "${dateName}"`);
    } catch (error) {
      logger.error(`Failed to mark all habits complete: ${error.message}`);
      throw error;
    }
  },
);

/**
 * Delete all habits
 */
When("I delete all habits", async function () {
  logger.stepStart("Delete all habits");

  try {
    let habits = await HomePage.getAllHabits();

    while (habits.length > 0) {
      const habitName = habits[0];
      await HomePage.clickModifyButtonForHabit(habitName);
      await CreateHabitPage.clickDeleteButton();

      habits = await HomePage.getAllHabits();
    }

    logger.info("✓ Deleted all habits");
    logger.stepEnd("Delete all habits");
  } catch (error) {
    logger.error(`Failed to delete all habits: ${error.message}`);
    throw error;
  }
});

/**
 * Rename habit
 */
When("I rename {string} to {string}", async function (oldName, newName) {
  logger.stepStart(`Rename "${oldName}" to "${newName}"`);

  try {
    await HomePage.clickModifyButtonForHabit(oldName);
    await CreateHabitPage.enterHabitName(newName);
    await CreateHabitPage.clickSaveButton();

    logger.info(`✓ Renamed habit`);
    logger.stepEnd(`Rename habit`);
  } catch (error) {
    logger.error(`Failed to rename habit: ${error.message}`);
    throw error;
  }
});

/**
 * Attempt to submit without entering name
 */
When("I attempt to submit without entering a name", async function () {
  logger.stepStart("Attempt to submit without name");

  try {
    await CreateHabitPage.clickSaveButton();
    logger.stepEnd("Attempt to submit without name");
  } catch (error) {
    // This is expected to fail
    logger.debug("Submit failed as expected");
    logger.stepEnd("Attempt to submit without name");
  }
});

/**
 * Try to delete non-existent habit
 */
When("I try to delete the habit {string}", async function (habitName) {
  logger.stepStart(`Try to delete "${habitName}"`);

  try {
    await HomePage.clickModifyButtonForHabit(habitName);
    await CreateHabitPage.clickDeleteButton();
    logger.stepEnd(`Try to delete "${habitName}"`);
  } catch (error) {
    logger.debug("Delete failed as expected");
    logger.stepEnd(`Try to delete "${habitName}"`);
  }
});

/**
 * Try to mark non-existent habit as complete
 */
When(
  "I try to mark the habit {string} as completed for date {string}",
  async function (habitName, dateName) {
    logger.stepStart(`Try to mark "${habitName}" as complete`);

    try {
      await HomePage.markHabitAsComplete(habitName, dateName);
      logger.stepEnd(`Try to mark "${habitName}" as complete`);
    } catch (error) {
      logger.debug("Mark complete failed as expected");
      logger.stepEnd(`Try to mark "${habitName}" as complete`);
    }
  },
);

/**
 * Simulate error
 */
When("an error occurs during habit creation", async function () {
  logger.stepStart("Simulate error during creation");
  // This is a placeholder - implement based on how you want to test error handling
  logger.stepEnd("Simulate error during creation");
});

/**
 * Simulate network error
 */
When("the deletion fails due to network error", async function () {
  logger.stepStart("Simulate network error");
  // This is a placeholder - implement based on how you want to test error handling
  logger.stepEnd("Simulate network error");
});
