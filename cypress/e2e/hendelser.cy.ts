describe('Hendelser Page', () => {
  beforeEach(() => {
    // Load fixture data
    cy.fixture('hendelser').as('hendelserData');
    cy.fixture('hendelse-detail').as('hendelseDetailData');
    cy.visit('/hendelser');
  });

  it('should display hendelser table with data', () => {
    cy.contains('Hendelser').should('be.visible');
    cy.contains('Oversikt over hendelser og operasjoner').should('be.visible');
    
    // Wait for API data to load
    cy.waitForAPI();
    
    // Check if table headers are present
    cy.contains('Hendelse ID').should('be.visible');
    cy.contains('Operasjon').should('be.visible');
    cy.contains('Organisasjon').should('be.visible');
    cy.contains('Ressurser').should('be.visible');
    cy.contains('Status').should('be.visible');
    cy.contains('Overført').should('be.visible');
    
    // Check if data is displayed
    cy.contains('07c76...21eff').should('be.visible');
    cy.contains('CREATE').should('be.visible');
    cy.contains('rogfk.no').should('be.visible');
  });

  it('should filter data by search', () => {
    cy.waitForAPI();
    
    // Type in search box
    cy.get('input[type="search"]').type('rogfk');
    
    // Check that only matching data is shown
    cy.contains('rogfk.no').should('be.visible');
    cy.contains('telemarkfylke.no').should('not.exist');
  });

  it('should open modal when row is clicked', () => {
    cy.waitForAPI();
    
    // Click on first row
    cy.get('tbody tr').first().click();
    
    // Modal should open
    cy.contains('Hendelse Detaljer').should('be.visible');
    cy.contains('Request').should('be.visible');
    cy.contains('Response').should('be.visible');
  });

  it('should display request and response data in modal', () => {
    cy.waitForAPI();
    
    // Click on first row to open modal
    cy.get('tbody tr').first().click();
    
    // Check request tab
    cy.contains('Request').click();
    cy.contains('Correlation ID').should('be.visible');
    cy.contains('Organization').should('be.visible');
    cy.contains('Operation').should('be.visible');
    
    // Check response tab
    cy.contains('Response').click();
    cy.contains('Adapter ID').should('be.visible');
    cy.contains('Status').should('be.visible');
  });

  it('should close modal when close button is clicked', () => {
    cy.waitForAPI();
    
    // Open modal
    cy.get('tbody tr').first().click();
    cy.contains('Hendelse Detaljer').should('be.visible');
    
    // Close modal
    cy.contains('Lukk').click();
    
    // Modal should be closed
    cy.contains('Hendelse Detaljer').should('not.exist');
  });

  it('should clear filters when clear button is clicked', () => {
    cy.waitForAPI();
    
    // Set some filters
    cy.get('input[type="search"]').type('test');
    
    // Clear filters
    cy.contains('Tøm filtre').click();
    
    // Search box should be empty
    cy.get('input[type="search"]').should('have.value', '');
  });
});
