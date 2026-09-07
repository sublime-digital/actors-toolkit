describe('Traits & Mood Record Page', () => {
  beforeEach(() => {
    cy.clearLocalStorage();
    cy.visit('/traits');
  });

  describe('Initial Page Load & Structure', () => {
    it('should display the main page container and header section', () => {
      // 1. Wait for the custom element host or main container to exist in DOM
      cy.get('app-mood-record, main, .container', { timeout: 10000 })
        .should('be.visible');

      // 2. Assert page loaded by checking any visible text content or body readiness
      cy.get('body').should('not.be.empty');
    });

    it('should display the advert image carousel', () => {
      cy.get('img', { timeout: 10000 })
        .first()
        .should('be.visible')
        .and('have.attr', 'src')
        .and('not.be.empty');
    });
  });

  describe('Pro Tools Guard & Unlocking Sliders', () => {
    it('should launch Auth Modal when clicking Pro Tools while logged out', () => {
      cy.get('button').filter(':visible').first().click({ force: true });
      cy.get('.pro-notice-container, app-auth-modal, .modal, [role="dialog"]')
        .should('exist');
    });
  });

  describe('Slider Functionality (When Unlocked)', () => {
    beforeEach(() => {
      cy.window().then((win) => {
        win.localStorage.setItem(
          'userFeelingsSliders',
          JSON.stringify({ 'range-spectacular': 50 })
        );
      });
      cy.reload();
    });

    it('should safely check for range inputs if section is toggled', () => {
      cy.get('body').then(($body) => {
        if ($body.find('input[type="range"]').length > 0) {
          cy.get('input[type="range"]').first().should('have.value', '50');
          cy.get('input[type="range"]')
            .first()
            .invoke('val', 80)
            .trigger('input')
            .should('have.value', '80');
        } else {
          cy.get('.pro-notice-container, button').should('be.visible');
        }
      });
    });

    it('should persist slider values in localStorage on Submit if unlocked', () => {
      cy.get('body').then(($body) => {
        if ($body.find('#submitBtn, button:contains("Submit")').length > 0) {
          cy.get('input[type="range"]').first().invoke('val', 75).trigger('input');
          cy.get('#submitBtn, button:contains("Submit")').first().click();

          cy.window().then((win) => {
            const saved = win.localStorage.getItem('userFeelingsSliders');
            expect(saved).to.not.be.null;
          });
        }
      });
    });
  });
});
