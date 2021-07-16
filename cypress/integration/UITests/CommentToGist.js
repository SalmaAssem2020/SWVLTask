const { gistsHomePage } = require("../../support/Pages/Gists/GistsHomePage")
const { loginPage } = require("../../support/Pages/Login/LoginPage")
const { gistDetailsPage } = require("../../support/Pages/Gists/GistDetailsPage")
const faker = require("faker")
const { gistsAPIs } = require("../../support/APIs/Gists")


describe('Comment To Gist Tests', () => {

    let firstComment
    let secondComment
    beforeEach(function()
    {
        cy.visit('/')

        //Login
        gistsHomePage.ClickSignIn()
        loginPage.Login(Cypress.env('email'), Cypress.env('password'))


        //Get the files data from GistFiles
        cy.fixture('GistFiles').then(function (files)  
        {
                
            //Add New Gist
             let randomDesc = faker.random.alpha(7)
             gistsAPIs.AddNewGist(Cypress.env('Authorization'), randomDesc, true,  files)

              //Extract the gist Id from the response
              cy.get('@AddNewGist').then((response) => {
                let gistId = response.body.id
                 cy.wrap(gistId).as('addedGistId') 

                 
            })  

             //Alias Gist Id to be used in other tests
             cy.get('@addedGistId').as('addedGistId')
                
           
        })
    })

   
        it('Comment To Gist', function()  {
          
            
            //Access Gist
            gistDetailsPage.AccessGist(Cypress.env('userName'), this.addedGistId)

            //Comment To Gist
            let comment = faker.random.alpha(7)
            gistDetailsPage.CommentToGist(comment)

            
            //Access Gist
            gistDetailsPage.AccessGist(Cypress.env('userName'), this.addedGistId)

            //Assert Comment Is Displayed
            gistDetailsPage.AssertCommentIsDisplayed(comment)

        })

        it('Delete Gist Comment', function()  {
           
          
            //Comment To Gist Twice 
            firstComment = faker.random.alpha(7)
            secondComment = faker.random.alpha(7)

           gistsAPIs.CommentToGist(Cypress.env('Authorization'), this.addedGistId, firstComment)
           gistsAPIs.CommentToGist(Cypress.env('Authorization'), this.addedGistId, secondComment)

           
            //Access Gist
            gistDetailsPage.AccessGist(Cypress.env('userName'), this.addedGistId)

            //Delete Last Comment
            gistDetailsPage.DeleteComment(secondComment)

            //Access Gist
            gistDetailsPage.AccessGist(Cypress.env('userName'), this.addedGistId)


            //Assert Comment Isnt Displayed
            gistDetailsPage.AssertCommentNotDisplayed(secondComment)
            gistDetailsPage.AssertCommentIsDisplayed(firstComment)

           
        })



    })