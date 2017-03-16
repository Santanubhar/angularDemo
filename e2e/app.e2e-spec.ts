import { AngularPocPage } from './app.po';

describe('angular-poc App', function() {
  let page: AngularPocPage;

  beforeEach(() => {
    page = new AngularPocPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
