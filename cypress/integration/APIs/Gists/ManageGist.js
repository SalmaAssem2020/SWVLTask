const { gistsAPIs } = require("../../../support/APIs/Gists")
const faker = require("faker")

describe('Manage Gist APIs', () => {

    let randomDesc
    let firstComment
    let secondComment


        it('Add Gist', function()  {
            
            //Get the files data from GistFiles
            cy.fixture('GistFiles').then(function (files)  {
                
            //Add New Gist
              randomDesc = faker.random.alpha(7)
             gistsAPIs.AddNewGist(Cypress.env('Authorization'), randomDesc, true,  files)
 
             //Assert Gist Reponse Code Is Correct
             cy.get('@AddNewGist').should((response)=> {
                expect(response.status).to.eq(201);
             })
             //Extract the gist Id from the response
            cy.get('@AddNewGist').then((response) => {
               let gistId = response.body.id
                cy.wrap(gistId).as('gistId')
 
            })

            //Alias Gist Id to be used in other tests
            cy.get('@gistId').as('gistId')

            })
  
        })

        it('Get Gist', function()  {
            
            //Get Added Gist
             gistsAPIs.GetGist(Cypress.env('Authorization'), this.gistId)
 
             //Assert Gist Reponse Code Is Correct
             cy.get('@GetGist').should((response)=> {
                expect(response.status).to.eq(200);
             })

             //Assert Gist Reponse details Is Correct
             cy.get('@GetGist').should((response)=> {
                expect(response.body.description).to.eq(randomDesc);
             })
        })

        it('Edit Gist', function() {

            //Update description
             randomDesc = faker.random.alpha(7)
           
             //Use New files content details
            cy.fixture('GistFilesUpdated').then(function (files)  {

            //Edit the old added Gist
            gistsAPIs.EditGist(Cypress.env('Authorization'), this.gistId, randomDesc,  files)

            //Assert Gist Reponse Code Is Correct
            cy.get('@EditGist').should((response)=> {
                expect(response.status).to.eq(200);
            })

            //Assert Gist Is Updated
            cy.get('@EditGist').should((response)=> {
                expect(response.body.description).to.eq(randomDesc);
            })

        })
        })

        it('Comment To Gist Twice', function() {

            //Generate Random comment
             firstComment = faker.random.alpha(7)
             secondComment = faker.random.alpha(7)
           
             //Comment To Gist with first Comment
             gistsAPIs.CommentToGist(Cypress.env('Authorization'), this.gistId, firstComment)

            //Assert Gist Reponse Code Is Correct
            cy.get('@CommentToGist').should((response)=> {
                expect(response.status).to.eq(201);
            })

             //Assert Gist has comment
             cy.get('@CommentToGist').should((response)=> {
                expect(response.body.body).to.eq(firstComment);
             })

              //Comment To Gist with second Comment
              gistsAPIs.CommentToGist(Cypress.env('Authorization'), this.gistId, secondComment)
             
               //Extract the gist Id from the response
            cy.get('@CommentToGist').then((response) => {
                let commentId = response.body.id
                 cy.wrap(commentId).as('commentId')
  
             })

             
            //Alias comment Id to be used in other tests
            cy.get('@commentId').as('commentId')

        })

        it('Delete last Gist Comment', function() {

            
             //Delete Last Comment Added To Gist
             gistsAPIs.DeleteComment(Cypress.env('Authorization'), this.gistId, this.commentId)

            //Assert Gist Reponse Code Is Correct
            cy.get('@DeleteComment').should((response)=> {
                expect(response.status).to.eq(204);
            })

             //Assert Gist has only one comment
            gistsAPIs.ListComments(Cypress.env('Authorization'), this.gistId)

            //Assert Gist Reponse Code Is Correct
            cy.get('@ListComments').should((response)=> {
                expect(response.status).to.eq(200);
            })

            //Assert Gist Comments has only One Comment
            cy.get('@ListComments').should((response)=> {
                expect(response.body[0].body).to.eq(firstComment);
            })

        })

    })


