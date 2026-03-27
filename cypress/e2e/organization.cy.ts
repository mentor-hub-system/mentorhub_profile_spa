describe('Organization Domain', () => {
  beforeEach(() => {
    cy.login()
  })

  it('should display organizations list page', () => {
    cy.visit('/organizations')
    cy.get('h1').contains('Organizations').should('be.visible')
    cy.get('[data-automation-id="organization-list-new-button"]').should('be.visible')
  })

  it('should navigate to new organization page', () => {
    cy.visit('/organizations')
    cy.get('[data-automation-id="organization-list-new-button"]').click()
    cy.url().should('include', '/organizations/new')
    cy.get('h1').contains('New Organization').should('be.visible')
  })

  it('should create a new organization', () => {
    cy.visit('/organizations/new')
    
    const timestamp = Date.now()
    const itemName = `test-organization-${timestamp}`
    
    // Use automation IDs for reliable element selection
    cy.get('[data-automation-id="organization-new-name-input"]').type(itemName)
    cy.get('[data-automation-id="organization-new-description-input"]').type('Test description for Cypress')
    cy.get('[data-automation-id="organization-new-submit-button"]').click()
    
    // Should redirect to edit page after creation
    cy.url().should('include', '/organizations/')
    cy.url().should('not.include', '/organizations/new')
    
    // Verify the organization name is displayed on edit page
    cy.get('[data-automation-id="organization-edit-name-input"]').find('input').should('have.value', itemName)
  })

  it('should update a organization', () => {
    // First create a organization
    cy.visit('/organizations/new')
    const timestamp = Date.now()
    const itemName = `test-organization-update-${timestamp}`
    const updatedName = `updated-organization-${timestamp}`
    
    cy.get('[data-automation-id="organization-new-name-input"]').type(itemName)
    cy.get('[data-automation-id="organization-new-description-input"]').type('Original description')
    cy.get('[data-automation-id="organization-new-submit-button"]').click()
    
    // Wait for redirect to edit page
    cy.url().should('include', '/organizations/')
    
    // Update the name field (auto-save on blur)
    cy.get('[data-automation-id="organization-edit-name-input"]').find('input').clear().type(updatedName)
    cy.get('[data-automation-id="organization-edit-name-input"]').find('input').blur()
    
    // Wait for save to complete
    cy.wait(1000)
    
    // Verify the update was saved
    cy.get('[data-automation-id="organization-edit-name-input"]').find('input').should('have.value', updatedName)
    
    // Update description
    cy.get('[data-automation-id="organization-edit-description-input"]').find('textarea').clear().type('Updated description')
    cy.get('[data-automation-id="organization-edit-description-input"]').find('textarea').blur()
    cy.wait(1000)
    
    // Update status
    cy.get('[data-automation-id="organization-edit-status-select"]').click()
    cy.get('.v-list-item').contains('archived').click()
    cy.wait(1000)
    
    // Navigate back to list and verify the organization appears with updated name
    cy.get('[data-automation-id="organization-edit-back-button"]').click()
    cy.url().should('include', '/organizations')
    
    // Search for the updated organization
    cy.get('[data-automation-id="organization-list-search"]').find('input').type(updatedName)
    // Wait for debounce (300ms) plus API call
    cy.wait(800)
    
    // Verify the organization appears in the search results
    cy.get('table').should('contain', updatedName)
    
    // Clear search and verify all organizations are shown again
    cy.get('[data-automation-id="organization-list-search"]').find('input').clear()
    cy.wait(800)
    cy.get('table').should('exist')
  })

  it('should search for organizations', () => {
    // First create a organization with a unique name
    cy.visit('/organizations/new')
    const timestamp = Date.now()
    const itemName = `search-test-${timestamp}`
    
    cy.get('[data-automation-id="organization-new-name-input"]').type(itemName)
    cy.get('[data-automation-id="organization-new-description-input"]').type('Search test description')
    cy.get('[data-automation-id="organization-new-submit-button"]').click()
    cy.url().should('include', '/organizations/')
    
    // Navigate to list page
    cy.visit('/organizations')
    
    // Wait for initial load
    cy.get('table').should('exist')
    
    // Search for the organization
    cy.get('[data-automation-id="organization-list-search"]').find('input').type(itemName)
    // Wait for debounce (300ms) plus API call
    cy.wait(800)
    
    // Verify the search results contain the organization
    cy.get('table tbody').should('contain', itemName)
    
    // Clear search and verify all organizations are shown again
    cy.get('[data-automation-id="organization-list-search"]').find('input').clear()
    cy.wait(800)
    cy.get('table').should('exist')
  })
})
