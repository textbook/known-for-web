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
}
