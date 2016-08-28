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
    let button = element(by.buttonText('Who?'));
    browser.wait(protractor.ExpectedConditions.elementToBeClickable(button), 2000);
    return button.click();
  }
}
