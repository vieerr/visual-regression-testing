describe("UI snapshots", () => {
  it("homepage visual test", () => {
    cy.visit("https://dearmom.vercel.app"); // URL de tu deploy en Vercel
    cy.percySnapshot("Homepage");
  });
});

