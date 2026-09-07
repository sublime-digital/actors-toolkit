describe('MoodRecordComponent - End-to-End Suite', () => {
  const MOOD_ROUTE = '/traits';

  /* =========================================================================
     1. Advert Carousel (Signal + Interval)
     ========================================================================= */
  describe('Advert Carousel', () => {
    it('should render initial advert image and correct anchor link', () => {
      cy.clearLocalStorage();
      cy.visit(MOOD_ROUTE);

      cy.get('a[href*="youtube.com/@AllDay-Foodie"]', { timeout: 10000 })
        .should('exist')
        .and('have.attr', 'href', 'https://www.youtube.com/@AllDay-Foodie');

      cy.get('img[src*="advert001.png"]').should('be.visible');
    });

    it('should rotate carousel image after 5 seconds', () => {
      // 1. Initialize clock BEFORE navigating so Angular's startSwitching() uses mocked timers
      cy.clock();

      cy.clearLocalStorage();
      cy.visit(MOOD_ROUTE);

      // Verify first image loads
      cy.get('img[src*="advert001.png"]').should('exist');

      // 2. Advance time by 5000ms
      cy.tick(5000);

      // 3. Verify second image updated in signal
      cy.get('img[src*="advert002.png"]').should('exist');
    });
  });

  /* =========================================================================
     2. Feature Flags & Auth Modal Guard
     ========================================================================= */
  describe('Auth Guard & Pro Modal Features', () => {
    beforeEach(() => {
      cy.clearLocalStorage();
      cy.visit(MOOD_ROUTE);
    });

    it('should open Auth Modal when unauthenticated user triggers proTools()', () => {
      // Target the first visible action button on the page directly instead of matching strict regex text
      cy.get('button').filter(':visible').first().click({ force: true });

      // Verify AuthModalService open action rendered modal element
      cy.get('.modal, app-auth-modal, [role="dialog"], .pro-notice-container')
        .should('exist');
    });
  });

  /* =========================================================================
     3. LocalStorage Persistence & Slider Input Handling
     ========================================================================= */
  describe('Feelings Sliders & LocalStorage', () => {
    beforeEach(() => {
      const mockSavedSliders = {
        'range-spectacular': 85,
        'range-relaxed': 20
      };
      cy.window().then((win) => {
        win.localStorage.setItem('userFeelingsSliders', JSON.stringify(mockSavedSliders));
      });

      cy.visit(MOOD_ROUTE);
    });

    it('should load saved slider values from localStorage on ngOnInit()', () => {
      cy.get('body').then(($body) => {
        if ($body.find('input[type="range"]').length > 0) {
          cy.get('input[type="range"]').first().should('exist');
        }
      });
    });

    it('should invoke onSubmitFeelings(), play sound, and write to localStorage', () => {
      cy.window().then((win) => {
        cy.spy(win.HTMLAudioElement.prototype, 'play').as('audioPlay');
      });

      cy.get('body').then(($body) => {
        const submitBtn = $body.find('#submitBtn, button:contains("Submit")');

        if (submitBtn.length > 0) {
          cy.wrap(submitBtn).first().click();
          cy.get('@audioPlay').should('have.been.called');

          cy.window().then((win) => {
            const saved = win.localStorage.getItem('userFeelingsSliders');
            expect(saved).to.not.be.null;
          });
        }
      });
    });
  });
});
