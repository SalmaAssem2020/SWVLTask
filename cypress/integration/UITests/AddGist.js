const { gistsHomePage } = require("../../support/Pages/Gists/GistsHomePage")
const { loginPage } = require("../../support/Pages/Login/LoginPage")
const { gistAddingPage } = require("../../support/Pages/Gists/GistAddingPage")
const { gistDetailsPage } = require("../../support/Pages/Gists/GistDetailsPage")
const faker = require("faker")


describe('Add Gist Tests', () => {


    before(function()
    {
        cy.visit('/')

        //Login
        gistsHomePage.ClickSignIn()
        loginPage.Login(Cypress.env('email'), Cypress.env('password'))

        cy.visit('/')

    })



        it('Add New Public Gist', function()  {``
            
        //Generate Random Data For Gist Adding
        let randomDesc = faker.random.alpha(7)
        let randomFileName = faker.random.alpha(7)
        let randomContent = faker.random.alpha(7)


            //Add New Gist
           gistAddingPage.CreateGist(gistAddingPage.gistTypes.Public, randomDesc, randomFileName, randomContent)

           //Assert Gist is added
           gistDetailsPage.AssertGistIsDisplayed(randomDesc, randomFileName, randomContent)
        })

    })