import { ElementFinder } from 'protractor';

import { WebPage } from './page.po';

export class KnownForWebPage extends WebPage {
  path = '';

  getActorName() {
    return this.getTitleText();
  }

  getMovies() {
    return element.all(by.css('kf-movie .movie-details'));
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

  getTitleInput() {
    return element(by.name('movieTitle'))
  }

  inputMovieTitle(title: string) {
   this.getTitleInput().sendKeys(title);
  }

  guessMovieTitle(title: string) {
    this.inputMovieTitle(title);
    this.clickGuessButton();
  }

  getCurrentGuess() {
    return this.getTitleInput().getText();
  }

  getSuggestions() {
    return element.all(by.css('.suggestion'));
  }

  getGuesses() {
    return element.all(by.css('.guess'));
  }

  removeGuess() {
    this.getTitleInput().sendKeys(
      protractor.Key.CONTROL, 'a', protractor.Key.NULL,
      protractor.Key.BACK_SPACE
    );
  }

  countEmptyMovieReleaseYears() {
    return element.all(by.className('movie-release')).filter((el: ElementFinder) => {
      return el.getText().then(text => text === ' ');
    }).count();
  }

  clickHintButton() {
    this.clickButton('Hint');
  }
}
