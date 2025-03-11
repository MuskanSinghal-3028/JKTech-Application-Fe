describe('Post Functionality', () => {
  const validJwtToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im11c2thbnNpbmdoYWxvZmZpY2lhbEBnbWFpbC5jb20iLCJmaXJzdE5hbWUiOiJNdXNrYW4iLCJsYXN0TmFtZSI6InNpbmdoYWwiLCJwaWN0dXJlIjoiaHR0cHM6Ly9saDMuZ29vZ2xldXNlcmNvbnRlbnQuY29tL2EvQUNnOG9jSXJTb05DdUVRZk1wai0tQTA2Z3YyWF9iR1EzWlJvLVJ0NzlIRTNiaFlsWm1ZaElnPXM5Ni1jIiwiYWNjZXNzVG9rZW4iOiJ5YTI5LmEwQWVYUlBwNFRZNmtZRXFSVUtTUlRFUnA0VkhUQURfd3llQVlHbGxsd3VLUUdIbFkxVUtiUzJsaUZUSThjSTl0d1haSmV0WkN4d1lSZ2FtYzN0MEJVd25GdFliSkMyNnpKc290YjJFelR0QzZwcTJXZjZ0S3RrWjlSbXZQbUs0M0wwenpUQll2QXpLVlhBOXFEWEcyNjBIdlBZOERYN2JnRDc3blBJYk1jbWdhQ2dZS0FZTVNBUklTRlFIR1gyTWlCcU5mbmsya21YcGhwMWRrRzl1aEZRMDE3NyIsImlhdCI6MTc0MTY4MDkyN30.yXNZ0s6_KPpDcCd5PMorrqbiJOl04Qb6RmEKz-sgHJ0'
      beforeEach(() => {
    cy.visit(`/login`);
    cy.window().then((window) => {
      window.localStorage.setItem('access_token', validJwtToken);
    });
    cy.visit(`/dashboard`);
  });
 
  it('should create a new post', () => {
    cy.visit(`/dashboard`);

    cy.get('button').contains('Post').click();

    cy.get('input[name="title"]').type('Sample Title');

    cy.get('textarea[name="content"]').type('Sample Description');

    cy.contains('Publish').click();
    cy.visit(`/dashboard`);

    cy.contains('Sample Title', { timeout: 5000 }).should('be.visible'); 

  });

  it('should open post detail', () => {
    cy.visit(`/dashboard`);

   
    cy.contains('Sample Title').click();

  });
  it('should update post', () => {
    cy.visit(`/dashboard`);

    cy.contains('Sample Title').click();

    cy.get('[data-testid="EditIcon"]').click();

    cy.get('input[name="title"]')
    .type('Sample Title')
    .should('have.value', 'Sample Title');
    cy.get('textarea[name="content"]').type('Sample Description').should('have.value',  'Sample Description');
    ;
    cy.get('textarea[name="content"]').type('Updated');
    cy.contains('Update').click();

    cy.contains('Updated',{ timeout: 5000 }).should('be.visible');

  });
  it('should delete post', () => {
    cy.visit(`/dashboard`);

    cy.contains('Sample Title').click();

    cy.get('[data-testid="DeleteIcon"]').click();
    cy.contains('Delete').click();


    cy.contains('Sample',{ timeout: 5000 }).should('not.exist');

  });
})