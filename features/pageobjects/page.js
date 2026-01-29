const { $ } = require("@wdio/globals");

module.exports = class Page {
  async getElement(selector, timeout = 5000) {
    const element = $(selector);
    //    await element.waitForDisplayed({ timeout });
    return element;
  }

  async getElements(selector) {
    return await $$(selector);
  }

  async click(selector, timeout = 5000) {
    const element = await this.getElement(selector, timeout);
    await element.click();
  }

  async setValue(selector, value, timeout = 5000) {
    const element = await this.getElement(selector, timeout);
    await element.setValue(value);
  }

  async getText(selector, timeout = 5000) {
    const element = await this.getElement(selector, timeout);
    return await element.getText();
  }

  async isDisplayed(selector, timeout = 5000) {
    try {
      const element = await this.getElement(selector, timeout);
      return await element.isDisplayed();
    } catch (error) {
      return false;
    }
  }

  async pause(ms) {
    await driver.pause(ms);
  }
};
