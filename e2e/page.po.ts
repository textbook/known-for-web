export class WebPage {
  path: string;

  navigateTo() {
    return browser.get(this.path);
  }

  getTitleText() {
    return element(by.css('h2')).getText();
  }

  clickButton(buttonText: string) {
    let button = element(by.buttonText(buttonText));
    browser.wait(
      protractor.ExpectedConditions.elementToBeClickable(button),
      2000,
      `"${buttonText}" was never clickable`
    );
    return button.click();
  }
}

