describe('Navigation Drawer', () => {
  beforeEach(() => {
    cy.login()
  })

  it('should open navigation drawer with hamburger menu', () => {
    cy.visit('/profiles')
    cy.get('[data-automation-id="nav-drawer-toggle"]').should('be.visible')
    cy.get('[data-automation-id="nav-drawer-toggle"]').click()
    
    // Check that drawer is visible with domain sections
    cy.contains('PROFILE DOMAIN').should('be.exist')
    cy.contains('ORGANIZATION DOMAIN').should('be.exist')
    cy.contains('EVENT DOMAIN').should('be.exist')
    cy.contains('IDENTITY DOMAIN').should('be.exist')
  })
  it('should have all profile domain links in drawer', () => {
    cy.visit('/profiles')
    cy.get('[data-automation-id="nav-drawer-toggle"]').click()
    
    cy.get('[data-automation-id="nav-profiles-list-link"]').should('be.visible')
    cy.get('[data-automation-id="nav-profiles-new-link"]').should('be.visible')
  })
  it('should have all organization domain links in drawer', () => {
    cy.visit('/organizations')
    cy.get('[data-automation-id="nav-drawer-toggle"]').click()
    
    cy.get('[data-automation-id="nav-organizations-list-link"]').should('be.visible')
    cy.get('[data-automation-id="nav-organizations-new-link"]').should('be.visible')
  })
  it('should have all event domain links in drawer', () => {
    cy.visit('/profiles')
    cy.get('[data-automation-id="nav-drawer-toggle"]').click()
    
    cy.get('[data-automation-id="nav-events-list-link"]').scrollIntoView().should('be.visible')
    cy.get('[data-automation-id="nav-events-new-link"]').scrollIntoView().should('be.visible')
  })
  it('should have identity domain link in drawer', () => {
    cy.visit('/profiles')
    cy.get('[data-automation-id="nav-drawer-toggle"]').click()
    
    cy.get('[data-automation-id="nav-identitys-list-link"]').scrollIntoView().should('be.visible')
  })

  it('should have admin and logout at bottom of drawer', () => {
    // Login with admin role to see admin link
    cy.login(['admin'])
    cy.visit('/profiles')
    cy.get('[data-automation-id="nav-drawer-toggle"]').click()
    
    // Admin and Logout should be visible in the drawer
    cy.get('[data-automation-id="nav-admin-link"]').scrollIntoView().should('be.visible')
    cy.get('[data-automation-id="nav-logout-link"]').scrollIntoView().should('be.visible')
  })

  it('should navigate to different pages from drawer', () => {
    cy.visit('/profiles')
    cy.get('[data-automation-id="nav-drawer-toggle"]').click()
    
    cy.get('[data-automation-id="nav-events-list-link"]').scrollIntoView().click()
    cy.url().should('include', '/events')
  })

  it('should close drawer after navigation', () => {
    cy.visit('/profiles')
    cy.get('[data-automation-id="nav-drawer-toggle"]').click()
    
    cy.get('[data-automation-id="nav-events-list-link"]').scrollIntoView().click()
    
    // Drawer should close after navigation (temporary drawer)
    cy.wait(500)
    cy.contains('PROFILE DOMAIN').should('not.be.visible')
  })
})