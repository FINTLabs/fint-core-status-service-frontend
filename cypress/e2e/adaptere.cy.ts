describe("AdapterStatus Page", () => {
  beforeEach(() => {
    // Load fixture data
    cy.fixture("adaptere").as("adaptereData");
    cy.visit("/adaptere");
  });

  it("should display adaptere table with data", () => {
    cy.contains("AdapterStatus").should("be.visible");
    cy.contains("Oversikt over adaptere og deres status").should("be.visible");

    // Wait for API data to load
    cy.waitForAPI();

    // Check if table headers are present
    cy.contains("Status").should("be.visible");
    cy.contains("Organisasjon").should("be.visible");
    cy.contains("Domene").should("be.visible");

    // Check if data is displayed
    cy.contains("fintlabs_no").should("be.visible");
    cy.contains("personvern").should("be.visible");
    cy.contains("utdanning").should("be.visible");
    cy.contains("vestfoldfylke_no").should("be.visible");
    cy.contains("helse").should("be.visible");
  });

  it("should filter data by organisation", () => {
    cy.waitForAPI();

    // Select organisation filter
    cy.get("select").first().select("fintlabs_no");

    // Check that only fintlabs_no data is shown
    cy.contains("fintlabs_no").should("be.visible");
    cy.contains("vestfoldfylke_no").should("not.exist");
  });

  it("should filter data by domain", () => {
    cy.waitForAPI();

    // Select domain filter
    cy.get("select").eq(1).select("personvern");

    // Check that only personvern data is shown
    cy.contains("personvern").should("be.visible");
    cy.contains("utdanning").should("not.exist");
    cy.contains("helse").should("not.exist");
  });

  it("should navigate to adapter detail when row is clicked", () => {
    cy.waitForAPI();

    // Click on first row
    cy.get("tbody tr").first().click();

    // Should navigate to adapter detail page
    cy.url().should("include", "/adaptere/");
    cy.contains("Adapter Detaljer").should("be.visible");
  });

  it("should display breadcrumbs on detail page", () => {
    cy.waitForAPI();

    // Navigate to detail page
    cy.get("tbody tr").first().click();

    // Check breadcrumbs
    cy.contains("AdapterStatus").should("be.visible");
    cy.get("nav").should("contain", "→");
  });
});
