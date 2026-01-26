const { Then } = require("@wdio/cucumber-framework");
const { expect, $ } = require("@wdio/globals");
const HomePage = require("../pageobjects/home.page");

const pages = {
  home: HomePage,
};

Then("an empty habit list should be visible on first launch", async () => {
  console.log("Checking to see if the habit list is visible");

  const myPage = pages["home"];
  const myelemt = await myPage.habitListIsVisible();

  await expect(myelemt).toBe(false);
  console.log("List is not visible (Empty)");
});

Then("the home screen should be displayed", async () => {
  console.log("Checking to see if the home page is displayed");

  const myPage = pages["home"];
  const myelemt = await myPage.isOnHomePage();

  await expect(myelemt).toBe(true);
  console.log("App is launched");
});

Then("the habit {string} should appear in the habit list", (s) => {
  // Write code here that turns the phrase above into concrete actions
});

Then("the habit {string} should be marked as completed", (s) => {
  // Write code here that turns the phrase above into concrete actions
});

Then("the habit {string} should not appear in the habit list", (s) => {
  // Write code here that turns the phrase above into concrete actions
});

Then("the habit should not be added", () => {
  // Write code here that turns the phrase above into concrete actions
});

Then("an error message should be displayed", () => {
  // Write code here that turns the phrase above into concrete actions
});

Then(
  "the habit name should be truncated or an error should be displayed",
  () => {
    // Write code here that turns the phrase above into concrete actions
  },
);

Then("the app should prevent duplicate habits or show a warning", () => {
  // Write code here that turns the phrase above into concrete actions
});

Then("all habits should be accessible", () => {
  // Write code here that turns the phrase above into concrete actions
});

Then("no habit data should be lost", () => {
  // Write code here that turns the phrase above into concrete actions
});

Then("the UI should adjust correctly", () => {
  // Write code here that turns the phrase above into concrete actions
});
