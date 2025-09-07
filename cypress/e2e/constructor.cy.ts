/// <reference types="cypress" />
import login from "../fixtures/login.json";

const sel = {
  card: '[data-cy="ingredient-card"]',
  modal: '[data-cy="modal"]',
  modalClose: '[data-cy="modal-close"]',
  dropzone: '[data-cy="constructor-dropzone"]',
  createOrder: '[data-cy="create-order"]',
};

describe("Burger Constructor — e2e", () => {
  beforeEach(() => {
    cy.intercept("GET", "**/api/ingredients", {
      fixture: "ingredients.json",
    }).as("getIngredients");

    cy.intercept("POST", "**/api/auth/login", {
      statusCode: 200,
      body: {
        success: true,
        user: { email: login.email, name: "Test" },
        accessToken: "Bearer test-token",
        refreshToken: "refresh-token",
      },
    }).as("login");

    cy.intercept("POST", "**/api/orders", {
      statusCode: 200,
      body: { success: true, name: "Test Order", order: { number: 12345 } },
    }).as("postOrder");
  });

  it("показывает и закрывает модалку ингредиента", () => {
    cy.visit("/");
    cy.wait("@getIngredients");

    cy.get(sel.card, { timeout: 10000 }).its("length").should("be.gte", 1);
    cy.get(sel.card).as("cards");
    cy.get(sel.modal).as("modal");
    cy.get(sel.modalClose).as("modalClose");

    cy.get("@cards").first().click();
    cy.get("@modal").should("exist").contains("Детали ингредиента");
    cy.get("@modalClose").click();
    cy.get("@modal").should("not.exist");
  });

  it("перетаскивает ингредиенты и создаёт заказ (с логином)", () => {
    cy.visit("/");
    cy.wait("@getIngredients");

    cy.get(sel.card, { timeout: 10000 }).its("length").should("be.gte", 1);
    cy.get(sel.card).as("cards");
    cy.get(sel.dropzone).as("dropzone");
    cy.get(sel.createOrder).as("createOrder");
    cy.get(sel.modal).as("modal");
    cy.get(sel.modalClose).as("modalClose");

    cy.fixture("ingredients.json").then(({ data }) => {
      const bun = data.find((i: any) => i.type === "bun");
      const main = data.find((i: any) => i.type === "main");

      const dt = new DataTransfer();

      cy.contains(sel.card, bun.name).as("bunCard");
      cy.contains(sel.card, main.name).as("mainCard");

      cy.get("@bunCard")
        .should("exist")
        .trigger("dragstart", { dataTransfer: dt, force: true });
      cy.get("@dropzone")
        .trigger("dragover", { dataTransfer: dt, force: true })
        .trigger("drop", { dataTransfer: dt, force: true });

      cy.get("@mainCard")
        .should("exist")
        .trigger("dragstart", { dataTransfer: dt, force: true });
      cy.get("@dropzone")
        .trigger("dragover", { dataTransfer: dt, force: true })
        .trigger("drop", { dataTransfer: dt, force: true });
    });

    cy.get("@createOrder").click();

    cy.url().should("include", "/login");
    cy.get('input[name="email"]').type(login.email);
    cy.get('input[name="password"]').type(login.password);
    cy.contains("button", "Войти").click();
    cy.wait("@login");

    cy.url().should("include", "/");
    cy.wait("@getIngredients");

    cy.fixture("ingredients.json").then(({ data }) => {
      const bun = data.find((i: any) => i.type === "bun");
      const main = data.find((i: any) => i.type === "main");

      const dt = new DataTransfer();

      cy.contains(sel.card, bun.name).as("bunCard");
      cy.contains(sel.card, main.name).as("mainCard");

      cy.get("@bunCard").trigger("dragstart", {
        dataTransfer: dt,
        force: true,
      });
      cy.get("@dropzone")
        .trigger("dragover", { dataTransfer: dt, force: true })
        .trigger("drop", { dataTransfer: dt, force: true });

      cy.get("@mainCard").trigger("dragstart", {
        dataTransfer: dt,
        force: true,
      });
      cy.get("@dropzone")
        .trigger("dragover", { dataTransfer: dt, force: true })
        .trigger("drop", { dataTransfer: dt, force: true });
    });

    cy.get("@createOrder").should("not.be.disabled").click();
    cy.wait("@postOrder");
    cy.get("@modal").should("exist").contains("Идентификатор заказа");

    cy.get("@modalClose").click();
    cy.get("@modal").should("not.exist");
  });
});
