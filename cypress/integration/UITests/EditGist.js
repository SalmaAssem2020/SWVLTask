const { gistsHomePage } = require("../../support/Pages/Gists/GistsHomePage")
const { loginPage } = require("../../support/Pages/Login/LoginPage")
const { gistAddingPage } = require("../../support/Pages/Gists/GistAddingPage")
const { gistDetailsPage } = require("../../support/Pages/Gists/GistDetailsPage")
const { gistsAPIs } = require("../../support/APIs/Gists")
const faker = require("faker")



describe('Edit Gist Tests', () => {


    before(function()
    {
        cy.visit('/')

        //Login
        gistsHomePage.ClickSignIn()
        loginPage.Login(Cypress.env('email'), Cypress.env('password'))

        cy.visit('/')

    })

        it('Edit Public Gist', function()  {
           
           //Get the files data from GistFiles
            cy.fixture('GistFiles').then(function (files)  
            {
                    
                //Add New Gist
                let randomDesc = faker.random.alpha(7)
                gistsAPIs.AddNewGist(Cypress.env('Authorization'), randomDesc, true,  files)

                //Extract the gist Id from the response
                cy.get('@AddNewGist').then((response) => {
                    let gistId = response.body.id

                     //Access the added gist
                    gistDetailsPage.AccessGist(Cypress.env('userName'), gistId)

                })  

                 //Generate Random Data For Gist Update
                let newRandomFileName = faker.random.alpha(7)
                let newRandomContent = faker.random.alpha(7)

                //Update Gist
            gistDetailsPage.ClickEditGist()

            //Add New File
            gistAddingPage.ClickAddFile()

            gistAddingPage.AddAnotherFileDetails(newRandomFileName, newRandomContent)

            //Confirm Updating
            gistAddingPage.ClickUpdate()

            //Assert Gist Is Updated With the new File
            gistDetailsPage.AssertGistIsDisplayed(randomDesc, newRandomFileName, newRandomContent) 
        })

    })

    })