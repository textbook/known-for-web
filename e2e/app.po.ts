import { WebPage } from './page.po';

export class KnownForWebPage extends WebPage {
  path = '';

  getAppTitleText() {
    return element(by.css('kf-root h1')).getText();
  }

  getActorName() {
    return this.getTitleText();
  }

  getMovieCount() {
    return element.all(by.css('kf-movie .movie-details')).count();
  }

  clickSkipButton() {
    this.clickButton('Skip');
  }

  clickAboutButton() {
    this.clickButton('About Known For');
  }

  guessMovieTitle(title: string) {
    element(by.name('movieTitle')).sendKeys(title);
    this.clickButton('Guess');
  }

  getGuesses() {
    return element.all(by.css('p.guess'));
  }
}
