const { gistsHomePage } = require("../../support/Pages/Gists/GistsHomePage")
const { loginPage } = require("../../support/Pages/Login/LoginPage")



describe('Login Tests', () => {

    beforeEach(function()
    {
        cy.visit('/')
        
    })


        it('Test Login Valid Credentials', function()  {
           
            //Click Sign In
            gistsHomePage.ClickSignIn()

            //Login
            loginPage.Login(Cypress.env('email'), Cypress.env('password'))

            //Assert User Is Logged In
            gistsHomePage.AssertUserLoggedIn(Cypress.env('userName'))
            
        })

    })