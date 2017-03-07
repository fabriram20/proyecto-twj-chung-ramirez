import { TiendaDeRopaFrontEndPage } from './app.po';

describe('tienda-de-ropa-front-end App', () => {
  let page: TiendaDeRopaFrontEndPage;

  beforeEach(() => {
    page = new TiendaDeRopaFrontEndPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
