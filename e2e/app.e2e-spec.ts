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

  it('should show a person\'s name', () => {
    page.navigateTo();
    expect(page.getActorName()).not.toBeNull();
  });

  it('should show three movies the person is known for', () => {
    page.navigateTo();
    expect(page.getMovieCount()).toEqual(3);
  });
});
