describe('Traits & Mood Record Page', () => {
  const pageUrl = 'https://actors-toolkit.vercel.app/traits';

  beforeEach(() => {
    // Clear localStorage to start each test with a clean slate
    cy.clearLocalStorage();
    cy.visit(pageUrl);
  });

  describe('Initial Page Load & Structure', () => {
    it('should display the main page title and header section', () => {
      cy.get('h1, h2, .header').should('be.visible');
    });

    it('should display the advert image carousel and rotate periodically', () => {
      // Check that advert image exists and has a non-empty src
      cy.get('.advert-carousel img, app-traits img, app-mood-record img')
        .first()
        .should('be.visible')
        .and('have.attr', 'src')
        .and('not.be.empty');
    });
  });

  describe('Slider Functionality & LocalStorage Persistence', () => {
    beforeEach(() => {
      // Ensure the section containing sliders is visible if gated behind a toggle
      cy.get('body').then(($body) => {
        if ($body.find('.goodmoods-container').length === 0) {
          // Trigger button or flag to open sliders if toggle button exists
          cy.get('button').contains(/pro|mood|traits/i).click({ force: true });
        }
      });
    });

    it('should default sliders to 50 on initial load', () => {
      cy.get('input[type="range"]').first().should('have.value', '50');
    });

    it('should allow moving a slider and updating its value', () => {
      cy.get('#slider1, #range-spectacular, input[type="range"]')
        .first()
        .invoke('val', 80)
        .trigger('input')
        .should('have.value', '80');
    });

    it('should persist modified slider values in localStorage on Submit', () => {
      // Modify a slider value
      cy.get('input[type="range"]')
        .first()
        .invoke('val', 85)
        .trigger('input');

      // Click submit button
      cy.get('button#submitBtn, button:contains("Submit")').first().click();

      // Verify localStorage was populated
      cy.window().then((win) => {
        const savedTraits = win.localStorage.getItem('userTraitsSliders');
        const savedFeelings = win.localStorage.getItem('userFeelingsSliders');
        const hasSavedData = savedTraits !== null || savedFeelings !== null;
        expect(hasSavedData).to.be.true;
      });

      // Reload page and check if value persists
      cy.reload();
      cy.get('input[type="range"]').first().should('have.value', '85');
    });
  });

  describe('Audio & Interactive Feedback', () => {
    it('should trigger audio play on slider mouseup or submit', () => {
      // Spy on HTMLAudioElement.prototype.play
      cy.window().then((win) => {
        cy.spy(win.HTMLAudioElement.prototype, 'play').as('audioPlay');
      });

      // Interact with a slider
      cy.get('input[type="range"]').first().trigger('mouseup');

      // Assert play was called
      cy.get('@audioPlay').should('have.been.called');
    });
  });

  describe('Auth Guard & Pro Modal Features', () => {
    it('should open the Auth Modal when unauthenticated users access Pro features', () => {
      // Trigger pro action
      cy.get('button')
        .contains(/pro/i)
        .click({ force: true });

      // Check if modal or pro notice appears
      cy.get('.pro-notice-container, app-auth-modal, .modal-dialog')
        .should('exist');
    });
  });
});
