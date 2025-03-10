describe('Post Functionality', () => {
  const validJwtToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImprdGVjaHRlc3RAZ21haWwuY29tIiwiZmlyc3ROYW1lIjoiSktUZWNoX1Rlc3QiLCJwaWN0dXJlIjoiaHR0cHM6Ly9saDMuZ29vZ2xldXNlcmNvbnRlbnQuY29tL2EvQUNnOG9jSklPb25lSV95M0V5SktFM29wNm5JdGRDTE9FTS1CQTg4M1RWdC1PaDRMdVBpcWd3PXM5Ni1jIiwiYWNjZXNzVG9rZW4iOiJ5YTI5LmEwQWVYUlBwNko0OUxxR0ZEaGlHWkZVS2NfU1pBMjFtTFFoWnRTTkw2VkgtYTBqNnZjR3lCM1VxZXloNl9icTZaSjZtTm1jM3UwWWp2bENXUTktRTRybkNlcFdZSWdnM1JiZnNrR1NHQi1VbzU0WlBCN3ZNTklSUndLM05NZEJkdXdYZWFlR0p4R0VFRzdFTGxyM2tIUUphU09JYzBrcXluLWNOVTBDNGNfYUNnWUtBYkFTQVJJU0ZRSEdYMk1pcERCdWtZV1hqRFFnUUYyZEZvSUhCUTAxNzUiLCJpYXQiOjE3NDE2MTkwMzMsImV4cCI6MTc0MTYyMjYzM30.6TojAo7p3OemnDjmYCbfgjZBwErk7UMzufpJo5QgZPc';
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