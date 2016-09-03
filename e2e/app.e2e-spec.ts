import { KnownForWebPage } from './app.po';

describe('Home Page', function() {
  let page: KnownForWebPage;

  beforeEach(() => {
    page = new KnownForWebPage();
    page.navigateTo();
  });

  it('should display website title', () => {
    expect(page.getAppTitleText()).toEqual('Known For');
  });

  it('should show a person\'s name', () => {
    expect(page.getActorName()).not.toBeNull();
  });

  it('should show up to three movies the person is known for', () => {
    expect(page.getMovieCount()).toBeGreaterThan(0);
  });

  it('should provide an input for guessing movie titles', () => {
    var title = 'Watch This';
    page.guessMovieTitle(title);
    expect(page.getGuesses().last().getText()).toBe(title.toLowerCase());
  });

  it('should show a button to change the displayed actor', () => {
    let lastActor = page.getActorName();
    page.clickSkipButton();
    expect(page.getActorName()).not.toEqual(lastActor);
  });

  it('should show a button to get more information about the app', () => {
    page.clickAboutButton();
    expect(page.getTitleText()).toEqual('About');
  });
});
