import { KnownForWebPage } from './app.po';

describe('known-for-web App', function() {
  let page: KnownForWebPage;

  beforeEach(() => {
    page = new KnownForWebPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
