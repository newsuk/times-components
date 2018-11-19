describe("Topic", () => {
    beforeEach(() => {
        cy.visit("/topic/canada");
    });

    it("Topic head has required elements", () => {
        cy.get('#main-container > div:nth-child(1)');
        cy.get('#main-container h1').first().contains('Canada');
        cy.get('div[data-testid="topic-description"]');
    });

    it("Topic has article elememts on the page", () => {
        cy.get('div[data-testid="97c64f20-cb67-11e4-a202-50ac5def393a.0"]');
    });

    it("Click on Topic list takes you to an article", () => {
        cy.get('div[data-testid="97c64f20-cb67-11e4-a202-50ac5def393a.0"]').click();
        cy.url().should('eq', 'http://localhost:3000/article/97c64f20-cb67-11e4-a202-50ac5def393a');
    });

    it("Next and Previous Pagination works", () => {
        cy.get('div[data-testid="pagination-button-next"]').first().click();
        cy.get('div[data-testid="pagination-button-previous"]').first().click();
        cy.get('div[data-testid="pagination-button-next"]');
    });

})