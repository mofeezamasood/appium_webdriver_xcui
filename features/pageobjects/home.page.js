const { $ } = require("@wdio/globals");
const Page = require("./page");

class HomePage extends Page {
  get homePageElement() {
    return '-ios class chain:**/XCUIElementTypeOther[`name == "Habo"`]';
  }

  get archieveHabitsButton() {
    return '//XCUIElementTypeButton[@name="Archived Habits\nView archived habits"]';
  }

  get statisticsButton() {
    return '//XCUIElementTypeButton[@name=\"Statistics\nStatistics\"]';
  }

  get getSettingsButton() {
    return '//XCUIElementTypeButton[@name=\"Settings\nSettings\"]';
  }

  get habitListEmpty() {
    return `//XCUIElementTypeApplication[@name="Habo"]/XCUIElementTypeWindow[1]/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther[2]/XCUIElementTypeOther[2]/XCUIElementTypeOther[4]/XCUIElementTypeOther[1]`;
  }

  get habitListFilled() {
    return "//XCUIElementTypeWindow/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther[2]/XCUIElementTypeOther[2]/XCUIElementTypeOther[4]/XCUIElementTypeOther[2]/XCUIElementTypeScrollView";
  }

  async isOnHomePage() {
    if (
      (await super.getElement(this.homePageElement)).isDisplayed() &&
      (await super.getElement(this.archieveHabitsButton)).isDisplayed() &&
      (await super.getElement(this.statisticsButton)).isDisplayed() &&
      (await super.getElement(this.getSettingsButton)).isDisplayed()
    ) {
      console.log("User is on Homepage");
      return true;
    } else {
      return false;
    }
  }

  async habitListIsVisible() {
    if ((await super.getElement(this.habitListEmpty)).isDisplayed()) {
      console.log("list is empty");
      return false;
    } else if ((await super.getElement(this.habitListFilled)).isDisplayed()) {
      console.log("list is filled");
      return true;
    } else {
      return false;
    }
  }
}

module.exports = new HomePage();
