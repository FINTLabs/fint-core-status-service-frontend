Cypress.on("uncaught:exception", (err) => {
  if (
    /hydrat/i.test(err.message) ||
    /Minified React error #418/.test(err.message) ||
    /Minified React error #423/.test(err.message) ||
    /ResizeObserver loop completed with undelivered notifications/.test(err.message)
  ) {
    return false;
  }
});

describe("Sync Page", () => {
  beforeEach(() => {
    // Load fixture data
    // cy.fixture("sync").as("syncData");
    cy.visit("/sync");

    // Wait for Novari theme to be applied
    cy.get('[data-theme="novari"]', { timeout: 10000 }).should("exist");
    cy.wait(1000);
  });

  it("should display sync table with data", () => {
    cy.contains("Synkronisering").should("be.visible");
    cy.contains("Oversikt over synkroniseringer").should("be.visible");

    // Wait for API data to load
    cy.waitForAPI();

    // Check if table headers are present
    cy.contains("Status").should("be.visible");
    cy.contains("Organisasjon").should("be.visible");
    cy.contains("Domene").should("be.visible");
    cy.contains("Pakke").should("be.visible");
    cy.contains("Ressurs").should("be.visible");
    cy.contains("Type").should("be.visible");
    cy.contains("Entiteter").should("be.visible");
    cy.contains("Sider").should("be.visible");
    cy.contains("Fremdrift").should("be.visible");

    // Check if data is displayed (should have 5 sync items)
    cy.get("[data-cy='sync-row']").should("have.length", 5);
  });

  it("should filter data by sync type", () => {
    cy.waitForAPI();

    // Initially all 5 items visible
    cy.get("[data-cy='sync-row']").should("have.length", 5);

    // Uncheck FULL
    cy.contains("label", "Full").click();

    // Should show only DELTA syncs (2 items)
    cy.get("[data-cy='sync-row']").should("have.length", 2);

    // Check FULL again and uncheck DELTA
    cy.contains("label", "Full").click();
    cy.contains("label", "Delta").click();

    // Should show only FULL syncs (3 items)
    cy.get("[data-cy='sync-row']").should("have.length", 3);
  });

  it("should filter data by status", () => {
    cy.waitForAPI();

    // Initially all 5 items visible
    cy.get("[data-cy='sync-row']").should("have.length", 5);

    // Uncheck "Fullført"
    cy.contains("label", "Fullført").click();

    // Should show only ongoing syncs (1 item)
    cy.get("[data-cy='sync-row']").should("have.length", 1);

    // Check "Fullført" again and uncheck "Pågår"
    cy.contains("label", "Fullført").click();
    cy.contains("label", "Pågår").click();

    // Should show only finished syncs (4 items)
    cy.get("[data-cy='sync-row']").should("have.length", 4);
  });

  it("should filter data by organisation", () => {
    cy.waitForAPI();

    // Wait for filters to be interactive
    cy.get("#organisation-filter").should("be.visible").and("not.be.disabled");

    // Select organisation filter
    cy.get("#organisation-filter").select("agderfk.no");

    // Should show only agderfk.no data (1 item)
    cy.get("[data-cy='sync-row']").should("have.length", 1);
  });

  it("should filter data by domain", () => {
    cy.waitForAPI();

    // Wait for filters to be interactive
    cy.get("#domain-filter").should("be.visible").and("not.be.disabled");

    // Select domain filter
    cy.get("#domain-filter").select("utdanning");

    // Should show only utdanning domain data (2 items)
    cy.get("[data-cy='sync-row']").should("have.length", 2);
  });

  it("should clear all filters", () => {
    cy.waitForAPI();

    // Apply multiple filters - uncheck Full to show only Delta
    cy.contains("label", "Full").click();

    // Wait for filter to apply
    cy.wait(300);

    // Should show only DELTA syncs (2 items)
    cy.get("[data-cy='sync-row']").should("have.length", 2);

    // Add organization filter
    cy.get("#organisation-filter").select("fintlabs.no");

    // Wait for filter to apply
    cy.wait(300);

    // Should have filtered results (fintlabs.no has 1 DELTA sync)
    cy.get("[data-cy='sync-row']").should("have.length", 1);

    // Clear filters
    cy.contains("Tøm filtre").click();

    // Should show all data again
    cy.get("[data-cy='sync-row']").should("have.length", 5);

    // Verify all checkboxes are checked
    cy.get('input[value="full"]').should("be.checked");
    cy.get('input[value="delta"]').should("be.checked");
    cy.get('input[value="finished"]').should("be.checked");
    cy.get('input[value="ongoing"]').should("be.checked");

    // Verify selects are reset
    cy.get("#organisation-filter").should("have.value", "");
    cy.get("#domain-filter").should("have.value", "");
  });

  it("should display progress bars correctly", () => {
    cy.waitForAPI();

    // Check that progress bars exist
    cy.get("[data-cy='sync-row']").should("have.length", 5);

    // Progress bars should be visible
    cy.get("[data-cy='sync-row']")
      .first()
      .within(() => {
        // Check for Aksel ProgressBar component
        cy.get("div[role='progressbar']").should("exist");
        cy.get("div[role='progressbar']").should("have.attr", "aria-valuenow");
        cy.get("div[role='progressbar']").should("have.attr", "aria-valuemax", "100");
      });

    // Check that percentage text is displayed
    cy.get("[data-cy='sync-row']").first().contains(/\d+%/).should("be.visible");
  });

  it("should show correct sync type badges", () => {
    cy.waitForAPI();

    // Check for FULL badge
    cy.contains(".bg-blue-100", "FULL").should("be.visible");

    // Check for DELTA badge
    cy.contains(".bg-purple-100", "DELTA").should("be.visible");
  });

  it("should display finished and ongoing status correctly", () => {
    cy.waitForAPI();

    // Filter to show only ongoing
    cy.contains("label", "Fullført").click();

    cy.get("[data-cy='sync-row']").should("have.length", 1);

    // Check for yellow indicator (ongoing)
    cy.get(".bg-yellow-100").should("exist");
    cy.get(".text-yellow-600").should("exist");

    // Reset and show only finished
    cy.contains("label", "Fullført").click();
    cy.contains("label", "Pågår").click();

    // Check for green indicators (finished)
    cy.get(".bg-green-100").should("exist");
    cy.get(".text-green-600").should("exist");
  });
});
