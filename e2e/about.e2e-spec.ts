import { AboutWebPage } from './pages';

describe('About Page', function() {
  let page: AboutWebPage;

  beforeEach(() => {
    page = new AboutWebPage();
    page.navigateTo();
  });

  it('should display the page title', () => {
    expect(page.getTitleText()).toEqual('About');
  });

  it('should provide a button to return to the game', () => {
    page.clickButton('Home');
    expect(page.getTitleText()).not.toEqual('About');
  });
});
