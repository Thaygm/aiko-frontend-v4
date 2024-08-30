// cypress/integration/equipment.spec.js

describe('Gestão de Equipamentos', () => {
    it('Deve carregar a página principal', () => {
      cy.visit('/');
      cy.contains('Gestão de Equipamentos');
    });
  
    it('Deve exibir equipamentos nas suas posições mais recentes', () => {
      cy.visit('/');
      cy.wait(5000);
      cy.get('.leaflet-marker-icon').should('exist');
  });
  
  it('Deve exibir informações do equipamento ao clicar no ícone do marcador', () => {
    cy.visit('/');
    cy.wait(5000);
    cy.get('.leaflet-marker-icon') 
      .first()
      .click({ force: true }); 
    cy.get('div').contains('Histórico de Posições:').should('be.visible'); // Ajuste o seletor conforme necessário
  });
  });
  