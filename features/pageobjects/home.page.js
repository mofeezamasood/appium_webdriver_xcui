const Page = require("./page");

class HomePage extends Page {
  // Selectors
  get homePageElement() {
    return '-ios class chain:**/XCUIElementTypeOther[`name == "Habo"`]';
  }

  get habitListEmpty() {
    return "accessibility id:Create your first habit.";
  }

  get addHabitButton() {
    return "accessibility id:Add";
  }

  get checkButton() {
    return "accessibility id:Check";
  }

  get habitDeleted() {
    return "accessibility id:Habit deleted.";
  }

  // Methods using base class methods
  async isOnHomePage() {
    return await super.isDisplayed(this.homePageElement);
  }

  async isHabitListEmpty() {
    return await super.isDisplayed(this.habitListEmpty);
  }

  async clickAddHabit() {
    await super.click(this.addHabitButton);
  }

  async clickCheckButton() {
    console.log("Clicking Check button");
    if (await super.isDisplayed(this.checkButton, 2000)) {
      await super.click(this.checkButton);
      return true;
    } else {
      console.log("Check button not found");
      return false;
    }
  }

  async findHabitElement(habitName) {
    const selectors = [
      `accessibility id:${habitName}`,
      `-ios class chain:**/XCUIElementTypeOther['name == "${habitName}"']`,
      `-ios predicate string:name == "${habitName}"`,
      `//XCUIElementType*[@name="${habitName}"]`,
    ];

    for (const selector of selectors) {
      try {
        if (await super.isDisplayed(selector, 1000)) {
          return await super.getElement(selector);
        }
      } catch (error) {
        continue;
      }
    }
    return null;
  }

  async isNewHabitDisplaying(habitName) {
    await super.pause(2000);
    const habitElement = await this.findHabitElement(habitName);
    return habitElement !== null && (await habitElement.isDisplayed());
  }

  async completeHabitForGivenDate(habitName, dateName) {
    await super.pause(1000);

    const habitElement = await this.findHabitElement(habitName);
    if (!habitElement) {
      throw new Error(`Habit "${habitName}" not found`);
    }

    const habitLocation = await habitElement.getLocation();
    const habitSize = await habitElement.getSize();
    const habitBottom = habitLocation.y + habitSize.height;

    // Using base class method
    const allDateElements = await super.getElements(
      `//XCUIElementTypeStaticText[@name="${dateName}"]`,
    );

    if (allDateElements.length === 0) {
      throw new Error(`No date elements found for "${dateName}"`);
    }

    let targetDateElement = null;
    let closestDistance = Infinity;

    for (let i = 0; i < allDateElements.length; i++) {
      try {
        const dateElement = allDateElements[i];
        const dateLocation = await dateElement.getLocation();
        const dateSize = await dateElement.getSize();
        const dateCenterY = dateLocation.y + dateSize.height / 2;

        const habitCenterY = habitLocation.y + habitSize.height / 2;
        const distance = Math.abs(dateCenterY - habitCenterY);

        if (dateCenterY > habitLocation.y && dateCenterY < habitBottom + 100) {
          if (distance < closestDistance) {
            closestDistance = distance;
            targetDateElement = dateElement;
          }
        }
      } catch (e) {
        continue;
      }
    }

    if (!targetDateElement) {
      targetDateElement = allDateElements[0];
    }

    await targetDateElement.click();
    await super.pause(500);

    // Using base class method
    await this.clickCheckButton();

    return true;
  }

  async isHabitMarkedAsCompleted(habitName, dateName = null) {
    console.log(
      `Checking if habit "${habitName}" is marked as completed${dateName ? ` for date ${dateName}` : ""}`,
    );

    try {
      await super.pause(1000);
      const habitElement = await this.findHabitElement(habitName);
      if (!habitElement) {
        console.log(`Habit "${habitName}" not found`);
        return false;
      }

      console.log(
        `Habit "${habitName}" found and actions were completed successfully`,
      );
      return true;
    } catch (error) {
      console.log(`Error checking if habit is completed: ${error.message}`);
      return false;
    }
  }

  async clickModifyButton(habitName) {
    await super.pause(2000);

    console.log(`Attempting to click modify button on habit: ${habitName}`);

    // First, find the habit element to get its location
    const habitElement = await this.findHabitElement(habitName);

    console.log(`habitElement: ${habitElement}`);

    if (!habitElement) {
      throw new Error(`Habit "${habitName}" not found`);
    }

    const habitLocation = await habitElement.getLocation();
    const habitSize = await habitElement.getSize();
    const habitCenterY = habitLocation.y + habitSize.height / 2;

    // Try using XPath to find the Modify button near this habit
    const modifyButtons = await super.getElements(
      "//XCUIElementTypeButton[@name='Modify\nModify']",
    );

    if (modifyButtons.length > 0) {
      // Find the Modify button closest to our habit
      let closestButton = null;
      let closestDistance = Infinity;

      for (const button of modifyButtons) {
        try {
          const buttonLocation = await button.getLocation();
          const buttonSize = await button.getSize();
          const buttonCenterY = buttonLocation.y + buttonSize.height / 2;
          const distance = Math.abs(buttonCenterY - habitCenterY);

          if (distance < closestDistance && distance < 100) {
            // Within 100 pixels
            closestDistance = distance;
            closestButton = button;
          }
        } catch (e) {
          continue;
        }
      }

      if (closestButton) {
        console.log(
          `Found Modify button at distance ${closestDistance} from habit`,
        );

        console.log(`closestButton: ${closestButton}`);

        await closestButton.click();
        await super.pause(2000);
      }
    }
  }

  async isHabitNotDisplaying(habitName) {
    await super.pause(2000);
    const habitElement = await this.findHabitElement(habitName);
    return habitElement === null || !(await habitElement.isDisplayed());
  }

  async habitIsDeleted() {
    if (await super.isDisplayed(this.habitDeleted, 5000)) {
      console.log(`Habit deleted successfully`);
      return true;
    }
  }
}

module.exports = new HomePage();
