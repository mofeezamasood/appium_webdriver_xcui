const { When } = require("@wdio/cucumber-framework");
const HomePage = require("../pageobjects/home.page");
const CreatePage = require("../pageobjects/create.habit.page");

const pages = {
  home: HomePage,
  habit: CreatePage,
};

When("I launch the Habo app", async () => {
  await expect(await pages["home"].isOnHomePage()).toBe(true);
});

When("I tap on the Save Habit button", async () => {
  await pages["habit"].clickSaveHabitButton();
  await driver.pause(2000); // Wait for save to complete and return to home
});

When("I enter {string} as the habit name", async (habitName) => {
  await pages["habit"].enterHabitText(habitName);
});

When("I tap on the Add Habit button", async () => {
  await pages["home"].clickAddHabit();
  await driver.pause(2000); // Wait for add habit screen to load
});

When(
  "I mark the habit {string} as completed for date {string}",
  async (habitName, dateName) => {
    await pages["home"].completeHabitForGivenDate(habitName, dateName);
  },
);

When("I delete the habit", async () => {
  await pages["habit"].clickDeleteHabitButton();
});

When("I click on modify button for {string}", async (habitName) => {
  await pages["home"].clickModifyButton(habitName);
});
