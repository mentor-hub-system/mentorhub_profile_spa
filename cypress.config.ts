import { defineConfig } from 'cypress'

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:8388',
    supportFile: 'cypress/support/e2e.ts',
    specPattern: [
      'cypress/e2e/**/*.cy.{js,jsx,ts,tsx}',
      'node_modules/@mentor-hub-system/mentorhub_spa_utils/cypress/e2e/pages/login-app.cy.ts',
      'node_modules/@mentor-hub-system/mentorhub_spa_utils/cypress/e2e/pages/admin-app.cy.ts',
    ],
    video: false,
    screenshotOnRunFailure: true,
  },
})