const { When } = require("@wdio/cucumber-framework");
const { expect, $ } = require("@wdio/globals");
const HomePage = require("../pageobjects/home.page");

const pages = {
  home: HomePage,
};

When("I launch the Habo app", async () => {
  console.log("Checking to see if the app is launched");

  const myPage = pages["home"];
  const myelemt = await myPage.isOnHomePage();

  // await expect(await pages["home"].isOnHomePage());

  await expect(myelemt).toBe(true);
  console.log("App is launched");
});

When("I tap on the Save Habit button", () => {
  // Write code here that turns the phrase above into concrete actions
});

When("I enter {string} as the habit name", (s) => {
  // Write code here that turns the phrase above into concrete actions
});

When("I tap on the Add Habit button", () => {
  // Write code here that turns the phrase above into concrete actions
});

When("I mark the habit {string} as completed", (s) => {
  // Write code here that turns the phrase above into concrete actions
});

When("I save the habit changes", () => {
  // Write code here that turns the phrase above into concrete actions
});

When("I update the habit name to {string}", (s) => {
  // Write code here that turns the phrase above into concrete actions
});

When("I open the habit {string}", (s) => {
  // Write code here that turns the phrase above into concrete actions
});

When("I confirm the deletion", () => {
  // Write code here that turns the phrase above into concrete actions
});

When("I delete the habit {string}", (s) => {
  // Write code here that turns the phrase above into concrete actions
});

When("I relaunch the Habo app", () => {
  // Write code here that turns the phrase above into concrete actions
});

When("I close the Habo app", () => {
  // Write code here that turns the phrase above into concrete actions
});

When("I leave the habit name empty", () => {
  // Write code here that turns the phrase above into concrete actions
});

When("I enter a very long habit name", () => {
  // Write code here that turns the phrase above into concrete actions
});

When("I try to add another habit named {string}", (s) => {
  // Write code here that turns the phrase above into concrete actions
});

When("I scroll the habit list", () => {
  // Write code here that turns the phrase above into concrete actions
});

When("I rotate the device", () => {
  // Write code here that turns the phrase above into concrete actions
});
