/// <reference types="cypress" />
import login from '../fixtures/login.json';

const API = 'https://norma.nomoreparties.space/api';

describe('Burger Constructor — e2e', () => {
beforeEach(() => {
cy.intercept('GET', `${API}/ingredients`, { fixture: 'ingredients.json' }).as('getIngredients');

cy.intercept('POST', `${API}/auth/login`, {
  statusCode: 200,
  body: {
    success: true,
    user: { email: login.email, name: 'Test' },
    accessToken: 'Bearer test-token',
    refreshToken: 'refresh-token',
  },
}).as('login');

cy.intercept('POST', `${API}/orders`, {
  statusCode: 200,
  body: { success: true, name: 'Test Order', order: { number: 12345 } },
}).as('postOrder');
});

it('показывает и закрывает модалку ингредиента', () => {
cy.visit('/');
cy.wait('@getIngredients');

cy.get('[data-cy="ingredient-card"]', { timeout: 10000 }).should('have.length.at.least', 1);

cy.get('[data-cy="ingredient-card"]').first().click();
cy.get('[data-cy="modal"]').should('exist');
cy.get('[data-cy="modal"]').contains('Детали ингредиента');
cy.get('[data-cy="modal-close"]').click();
cy.get('[data-cy="modal"]').should('not.exist');
});

it('перетаскивает ингредиенты и создаёт заказ (с логином)', () => {
cy.visit('/');
cy.wait('@getIngredients');

cy.get('[data-cy="ingredient-card"]', { timeout: 10000 }).should('have.length.at.least', 1);

cy.fixture('ingredients.json').then(({ data }) => {
  const bun = data.find((i: any) => i.type === 'bun');
  const main = data.find((i: any) => i.type === 'main');

  const dt = new DataTransfer();

  cy.contains('[data-cy="ingredient-card"]', bun.name)
    .should('exist')
    .trigger('dragstart', { dataTransfer: dt, force: true });
  cy.get('[data-cy="constructor-dropzone"]')
    .trigger('dragover', { dataTransfer: dt, force: true })
    .trigger('drop', { dataTransfer: dt, force: true });

  cy.contains('[data-cy="ingredient-card"]', main.name)
    .should('exist')
    .trigger('dragstart', { dataTransfer: dt, force: true });
  cy.get('[data-cy="constructor-dropzone"]')
    .trigger('dragover', { dataTransfer: dt, force: true })
    .trigger('drop', { dataTransfer: dt, force: true });
});

cy.get('[data-cy="create-order"]').click();

cy.url().should('include', '/login');
cy.get('input[name="email"]').type(login.email);
cy.get('input[name="password"]').type(login.password);
cy.contains('button', 'Войти').click();
cy.wait('@login');

cy.url().should('include', '/');
cy.wait('@getIngredients');

cy.fixture('ingredients.json').then(({ data }) => {
  const bun = data.find((i: any) => i.type === 'bun');
  const main = data.find((i: any) => i.type === 'main');

  const dt = new DataTransfer();

  cy.contains('[data-cy="ingredient-card"]', bun.name)
    .trigger('dragstart', { dataTransfer: dt, force: true });
  cy.get('[data-cy="constructor-dropzone"]')
    .trigger('dragover', { dataTransfer: dt, force: true })
    .trigger('drop', { dataTransfer: dt, force: true });

  cy.contains('[data-cy="ingredient-card"]', main.name)
    .trigger('dragstart', { dataTransfer: dt, force: true });
  cy.get('[data-cy="constructor-dropzone"]')
    .trigger('dragover', { dataTransfer: dt, force: true })
    .trigger('drop', { dataTransfer: dt, force: true });
});

cy.get('[data-cy="create-order"]').should('not.be.disabled').click();
cy.wait('@postOrder');
cy.get('[data-cy="modal"]').should('exist').contains('Идентификатор заказа');

cy.get('[data-cy="modal-close"]').click();
cy.get('[data-cy="modal"]').should('not.exist');
});
});