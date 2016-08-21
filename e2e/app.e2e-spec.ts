import { KnownForWebPage } from './app.po';

describe('known-for-web App', function() {
  let page: KnownForWebPage;

  beforeEach(() => {
    page = new KnownForWebPage();
  });

  it('should display website title', () => {
    page.navigateTo();
    expect(page.getTitleText()).toEqual('Known For');
  });
});
