import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:4200',
    supportFile: 'cypress/support/e2e.ts',
    specPattern: 'cypress/e2e/**/*.cy.ts'
  },
  component: {
    devServer: {
      framework: 'angular',
      bundler: 'webpack',
    },
    // Restrict component specs to src/ or use a distinct extension (.component-cy.ts)
    specPattern: 'src/**/*.cy.ts',
    supportFile: 'cypress/support/component.ts'
  }
});
