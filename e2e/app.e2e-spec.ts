import { KnownForWebPage } from './pages';

describe('Home Page', function() {
  let page: KnownForWebPage;

  beforeEach(() => {
    page = new KnownForWebPage();
    page.navigateTo();
  });

  it('should show actor details', () => {
    expect(page.getActorName()).not.toBeNull();
    expect(page.getMovies().count()).toBeGreaterThan(0);
  });

  it('should provide an input for guessing movie titles', () => {
    const title = 'Watch This';

    page.guessMovieTitle(title);

    validateGuess(title.toLowerCase());
  });

  it('should focus the input when a movie is clicked', () => {
    page.getMovies().first().click();
    page.validateInputFocused();
  });

  it('should provide suggested titles to be guessed', done => {
    page.inputMovieTitle('hello');
    expect(page.getSuggestions().count()).toBeGreaterThan(0);

    const guess = page.getSuggestions().first();
    guess.getText().then(text => {
      guess.click();
      validateGuess(text);
      done();
    });
  });

  xit('should clear suggestions when a guess is removed', () => {
    expect(page.getSuggestions().count()).toBe(0);
    page.inputMovieTitle('fight club');
    expect(page.getSuggestions().count()).toBeGreaterThan(0);

    page.removeGuess();

    expect(page.getSuggestions().count()).toBe(0);
  });

  it('should show a button to change the displayed actor', () => {
    const lastActor = page.getActorName();
    page.inputMovieTitle('some guess');

    page.clickSkipButton();

    expect(page.getActorName()).not.toEqual(lastActor);
    checkCleared();
  });

  it('should show a hint button to reveal more information', done => {
    page.countEmptyMovieReleaseYears().then(originalCount => {
      page.clickHintButton();
      expect(page.countEmptyMovieReleaseYears()).toBe(originalCount - 1);
      done();
    });
  });

  it('should show a button to get more information about the app', () => {
    page.clickAboutButton();

    expect(page.getTitleText()).toEqual('About');
  });

  function validateGuess(text) {
    expect(page.getGuesses().last().getText()).toBe(text.toLowerCase());
    checkCleared();
  }

  function checkCleared() {
    expect(page.getCurrentGuess()).toEqual('');
    expect(page.getSuggestions().count()).toBe(0);
  }
});
