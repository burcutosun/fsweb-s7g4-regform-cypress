import { errorMessages } from "../../src/components/Register";
describe('Register Page', () => {
  beforeEach(()=>{
    cy.visit('http://localhost:5173/');
  })
  describe('Error Messages', () => {
    it('First name input throws error for 2 chars', () => {      
      cy.get('[data-cy="firstName-input"]').type('bu');
      cy.contains(errorMessages.firstName);
    });
    it('Last name input throws error for 2 chars', () => {      
      cy.get('[data-cy="lastName-input"]').type('to');
      cy.contains(errorMessages.lastName);
    });
    it('Email input throws error for burcu@gmail.', () => {      
      cy.get('[data-cy="email-input"]').type('burcu@gmail.');
      cy.contains(errorMessages.email);
    });
    it('Password input throws error for 1234', () => {      
      cy.get('[data-cy="password-input"]').type('1234');
      cy.contains(errorMessages.password);
    });
    it('Button is disabled for unvalidated inputs', () => {      
      cy.get('[data-cy="password-input"]').type('1234');
      cy.get('[data-cy="submit-button"]').should('be.disabled');
    });
  });
  describe('Form inputs are validated', () => {
    it('Button is enabled for validated inputs', () => {      
      cy.get('[data-cy="firstName-input"]').type('burcu');
      cy.get('[data-cy="lastName-input"]').type('tosun');
      cy.get('[data-cy="email-input"]').type('burcu@gmail.com');
      cy.get('[data-cy="password-input"]').type('Burcu12.');
      cy.get('[data-cy="submit-button"]').should('not.be.disabled');
    });
    it('Show id when form is submitted', () => {      
      cy.get('[data-cy="firstName-input"]').type('burcu');
      cy.get('[data-cy="lastName-input"]').type('tosun');
      cy.get('[data-cy="email-input"]').type('burcu@gmail.com');
      cy.get('[data-cy="password-input"]').type('Burcu12.');
      cy.get('[data-cy="submit-button"]').click();
      cy.get('[data-cy="res-id"]').should('be.visible');
    });
  });
});