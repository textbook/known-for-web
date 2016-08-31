export class KnownForWebPage {
  navigateTo() {
    return browser.get('/');
  }

  getTitleText() {
    return element(by.css('app-root h1')).getText();
  }

  getActorName() {
    return element(by.css('app-root h2.actor-name')).getText();
  }

  getMovieCount() {
    return element.all(by.css('kf-movie .movie-details')).count();
  }

  clickSkipButton() {
    this.clickButton('Who?');
  }

  guessMovieTitle(title: string) {
    element(by.name('movieTitle')).sendKeys(title);
    this.clickButton('Guess');
  }

  getGuesses() {
    return element.all(by.css('p.guess'));
  }

  clickButton(buttonText: string) {
    let button = element(by.buttonText(buttonText));
    browser.wait(protractor.ExpectedConditions.elementToBeClickable(button), 2000);
    return button.click();
  }
}
