describe('Races', () => {
  const race = {
    id: 12,
    name: 'Paris',
    ponies: [
      { id: 1, name: 'Gentle Pie', color: 'YELLOW' },
      { id: 2, name: 'Big Soda', color: 'ORANGE' },
      { id: 3, name: 'Gentle Bottle', color: 'PURPLE' },
      { id: 4, name: 'Superb Whiskey', color: 'GREEN' },
      { id: 5, name: 'Fast Rainbow', color: 'BLUE' }
    ],
    startInstant: '2020-02-18T08:02:00Z'
  };

  const user = {
    id: 1,
    login: 'cedric',
    money: 1000,
    registrationInstant: '2015-12-01T11:00:00Z',
    token: 'eyJhbGciOiJIUzI1NiJ9.eyJ1c2VySWQiOjF9.5cAW816GUAg3OWKWlsYyXI4w3fDrS5BpnmbyBjVM7lo'
  };

  function startBackend(): void {
    cy.intercept('GET', 'api/races?status=PENDING', [
      race,
      {
        id: 13,
        name: 'Tokyo',
        ponies: [
          { id: 6, name: 'Fast Rainbow', color: 'BLUE' },
          { id: 7, name: 'Gentle Castle', color: 'GREEN' },
          { id: 8, name: 'Awesome Rock', color: 'PURPLE' },
          { id: 9, name: 'Little Rainbow', color: 'YELLOW' },
          { id: 10, name: 'Great Soda', color: 'ORANGE' }
        ],
        startInstant: '2020-02-18T08:03:00Z'
      }
    ]).as('getRaces');
  }

  function storeUserInLocalStorage(): void {
    localStorage.setItem('rememberMe', JSON.stringify(user));
  }

  beforeEach(() => startBackend());

  it('should display a race list', () => {
    cy.visit('/races');

    // not logged, so redirected
    cy.location('pathname')
      .should('eq', '/')
      .then(() => storeUserInLocalStorage());

    cy.visit('/races');
    cy.wait('@getRaces');
    cy.get('h2').should('have.length', 2);
    cy.get('p').should('have.length', 2).and('contain', 'ago');
  });

  it('should display ponies', () => {
    storeUserInLocalStorage();
    cy.visit('/races');
    cy.wait('@getRaces');
    cy.get('figure').should('have.length', 10);
    cy.get('img').should('have.length', 10);
    cy.get('figcaption').should('have.length', 10);
  });
});
