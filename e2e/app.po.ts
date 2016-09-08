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

  clickGuessButton() {
    this.clickButton('Guess');
  }

  inputMovieTitle(title: string) {
    element(by.name('movieTitle')).sendKeys(title);
  }

  guessMovieTitle(title: string) {
    this.inputMovieTitle(title);
    this.clickGuessButton();
  }

  getCurrentGuess() {
    return element(by.name('movieTitle')).getText();
  }

  getSuggestions() {
    return element.all(by.css('li.suggestion'));
  }

  getGuesses() {
    return element.all(by.css('li.guess'));
  }
}
