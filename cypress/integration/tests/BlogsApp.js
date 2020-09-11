describe('Blog app primary functions', function() {
    beforeEach(function (){
        cy.visit('http://localhost:3000')
    })

    it('front page can be opened', function() {
        cy.contains('Bloggie')
    })

    it('should return success when logging with a valid username', function () {
        cy.get('input:first').type('root')
        cy.get('input:last').type('Sekret123!')
        cy.get('button').should('have.text', 'Login').click()
        cy.contains('Admin')
    });

    it('should return error logging with an non-existing username', function () {
        cy.get('input:first').type('KEKKIIIISZ9Z99191JJJ')
        cy.get('input:last').type('JSJSJJSJJSJSJSJJSJS')
        // eslint-disable-next-line no-undef
        cy.get('button').should('have.text', 'Login').click()
        cy.contains('invalid username or password')
    })
})

describe('when logged in', function() {
    beforeEach(function() {
        cy.login({ username: 'root', password: 'Sekret123!' })
    })

    it('It shows user blogs', function() {
        cy.contains('Modern HTML Explained For Dinosaurs')
    })

})