/// <reference types="cypress" />

export {};

declare global {
  namespace Cypress {
    interface Chainable {
      mockIngredients(): Chainable<void>;
      mockLogin(): Chainable<void>;
      mockCreateOrder(): Chainable<void>;
      waitIngredients(): Chainable<void>;
      getCards(): Chainable<JQuery<HTMLElement>>;
      getDropzone(): Chainable<JQuery<HTMLElement>>;
      getCreateOrder(): Chainable<JQuery<HTMLElement>>;
      openIngredientModal(index?: number): Chainable<void>;
      closeModal(): Chainable<void>;
      dragIngredientToConstructorByName(name: string): Chainable<void>;
      addBunAndMainFromFixture(): Chainable<void>;
      loginUI(email: string, password: string): Chainable<void>;
      createOrderAndAssert(): Chainable<void>;
    }
  }
}

const sel = {
  card: '[data-cy="ingredient-card"]',
  modal: '[data-cy="modal"]',
  modalClose: '[data-cy="modal-close"]',
  dropzone: '[data-cy="constructor-dropzone"]',
  createOrder: '[data-cy="create-order"]',
};

Cypress.Commands.add('mockIngredients', () => {
  cy.intercept('GET', '**/api/ingredients', { fixture: 'ingredients.json' }).as('getIngredients');
});

Cypress.Commands.add('mockLogin', () => {
  cy.fixture('login.json').then((login) => {
    cy.intercept('POST', '**/api/auth/login', {
      statusCode: 200,
      body: {
        success: true,
        user: { email: login.email, name: 'Test' },
        accessToken: 'Bearer test-token',
        refreshToken: 'refresh-token',
      },
    }).as('login');
  });
});

Cypress.Commands.add('mockCreateOrder', () => {
  cy.intercept('POST', '**/api/orders', {
    statusCode: 200,
    body: { success: true, name: 'Test Order', order: { number: 12345 } },
  }).as('postOrder');
});

Cypress.Commands.add('waitIngredients', () => {
  cy.wait('@getIngredients');
  cy.get(sel.card, { timeout: 10000 }).its('length').should('be.gte', 1);
});

Cypress.Commands.add('getCards', () => cy.get(sel.card));
Cypress.Commands.add('getDropzone', () => cy.get(sel.dropzone));
Cypress.Commands.add('getCreateOrder', () => cy.get(sel.createOrder));

Cypress.Commands.add('openIngredientModal', (index: number = 0) => {
  cy.get(sel.card).eq(index).click();
  cy.get(sel.modal, { timeout: 10000 }).should('exist');
});

Cypress.Commands.add('closeModal', () => {
  cy.get(sel.modalClose).click();
  cy.get(sel.modal).should('not.exist');
});

Cypress.Commands.add('dragIngredientToConstructorByName', (name: string) => {
  const dt = new DataTransfer();
  cy.contains(sel.card, name)
    .should('exist')
    .trigger('dragstart', { dataTransfer: dt, force: true });
  cy.get(sel.dropzone)
    .trigger('dragover', { dataTransfer: dt, force: true })
    .trigger('drop', { dataTransfer: dt, force: true });
});

Cypress.Commands.add('addBunAndMainFromFixture', () => {
  cy.fixture('ingredients.json').then(({ data }) => {
    const bun = data.find((i: any) => i.type === 'bun');
    const main = data.find((i: any) => i.type === 'main');
    cy.dragIngredientToConstructorByName(bun.name);
    cy.dragIngredientToConstructorByName(main.name);
  });
});

Cypress.Commands.add('loginUI', (email: string, password: string) => {
  cy.get('input[name="email"]').type(email);
  cy.get('input[name="password"]').type(password);
  cy.contains('button', 'Войти').click();
  cy.wait('@login');
});

Cypress.Commands.add('createOrderAndAssert', () => {
  cy.get(sel.createOrder).should('not.be.disabled').click();
  cy.wait('@postOrder');
  cy.get(sel.modal, { timeout: 10000 }).should('exist').contains('Идентификатор заказа');
  cy.get(sel.modalClose).click();
  cy.get(sel.modal).should('not.exist');
});

