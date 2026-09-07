import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    baseUrl: 'https://actors-toolkit.vercel.app', // or 'http://localhost:4200'
    supportFile: 'cypress/support/e2e.ts',
    specPattern: 'cypress/e2e/**/*.cy.ts'
  }
});
