import { AngularDemoappPage } from './app.po';

describe('angular-demoapp App', () => {
  let page: AngularDemoappPage;

  beforeEach(() => {
    page = new AngularDemoappPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
