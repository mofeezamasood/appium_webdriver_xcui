const Page = require("./page");

class CreateHabit extends Page {
  // Selectors
  get habitTextField() {
    return "XCUIElementTypeTextField";
  }

  get saveHabitButton() {
    return "accessibility id:Save";
  }

  get deleteHabitButton() {
    return '//XCUIElementTypeButton[@name="Delete\nDelete"]';
  }

  // Methods using base class
  async enterHabitText(habitName) {
    await super.setValue(this.habitTextField, habitName);
  }

  async clickSaveHabitButton() {
    await super.click(this.saveHabitButton);
  }

  async clickDeleteHabitButton() {
    if (await super.isDisplayed(this.deleteHabitButton)) {
      console.log(`Clicking Delete button for habit`);
      await super.click(this.deleteHabitButton);
      await super.pause(2000);
    }
  }
}

module.exports = new CreateHabit();
