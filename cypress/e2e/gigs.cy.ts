describe('Gigs Page - Premium SQLite Data Grid', () => {
  const GIGS_ROUTE = '/gigs';

  describe('Unauthenticated / Free User State', () => {
    it('should show pro lock container when not a premium user', () => {
      cy.visit(GIGS_ROUTE);

      // Verify lock prompt
      cy.contains('Upgrade to Pro to View Gigs').should('be.visible');
    });

    it('should open Auth Modal when clicking Upgrade button', () => {
      cy.visit(GIGS_ROUTE);
      cy.contains('button', 'Upgrade to Pro').click();

      cy.get('.modal, app-auth-modal, [role="dialog"], .pro-notice-container')
        .should('exist');
    });
  });

  describe('Pro User - Data Grid Functionality', () => {
    beforeEach(() => {
      // Intercept SQLite backend API
      cy.intercept('GET', '/api/gigs', {
        statusCode: 200,
        body: [
          {
            id: 1,
            title: 'Indie Feature - "Echoes"',
            role_type: 'Lead',
            production_type: 'Film',
            pay_rate: '$350/day',
            location: 'New York, NY',
            submission_deadline: '2026-10-15',
            status: 'Open'
          }
        ]
      }).as('getGigs');

      cy.visit(GIGS_ROUTE);
    });

    it('should render SQLite data grid rows correctly', () => {
      cy.wait('@getGigs');
      cy.get('table tbody tr').should('have.length', 1);
      cy.contains('Indie Feature - "Echoes"').should('be.visible');
      cy.contains('$350/day').should('be.visible');
    });

    it('should filter jobs using the search input', () => {
      cy.get('input[placeholder*="Search"]').type('New York');
      cy.get('table tbody tr').should('have.length', 1);

      cy.get('input[placeholder*="Search"]').clear().type('NonExistentRole');
      cy.contains('No matching acting jobs found.').should('be.visible');
    });
  });
});
