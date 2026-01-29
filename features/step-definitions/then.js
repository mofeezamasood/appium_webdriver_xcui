const { Then } = require("@wdio/cucumber-framework");
const HomePage = require("../pageobjects/home.page");
const CreatePage = require("../pageobjects/create.habit.page");

const pages = {
  home: HomePage,
  habit: CreatePage,
};

Then("an empty habit list should be visible on first launch", async () => {
  await expect(await pages["home"].isHabitListEmpty()).toBe(true);
});

Then("the home screen should be displayed", async () => {
  await expect(await pages["home"].isOnHomePage()).toBe(true);
});

Then(
  "the habit {string} should appear in the habit list",
  async (habitName) => {
    await expect(await pages["home"].isNewHabitDisplaying(habitName)).toBe(
      true,
    );
  },
);

Then(
  "the habit {string} should be marked as completed for date {string}",
  async (habitName, dateName) => {
    await expect(
      await pages["home"].isHabitMarkedAsCompleted(habitName, dateName),
    ).toBe(true);
  },
);

Then(
  "the habit {string} should not appear in the habit list",
  async (habitName) => {
    await expect(await HomePage.isHabitNotDisplaying(habitName)).toBe(true);
  },
);

Then("the habit {string} gets deleted", async (habitName) => {
  await expect(await pages["home"].habitIsDeleted(habitName));
});
