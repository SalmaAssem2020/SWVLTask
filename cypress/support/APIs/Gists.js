
class GistsAPIs{

    AddNewGist(accessToken, description, isPublic, files)
    {
        cy.request({
            method: 'POST',
            url: Cypress.env('APIURL') + 'gists',
            headers: {
                'Accept': Cypress.env('Accept'),
                Authorization: accessToken
            },
            body:{
                'description': description,
                'files': files,
                'public': isPublic
            }
        }).as('AddNewGist')
    }

    EditGist(accessToken, gistId, description, files)
    {
        cy.request({
            method: 'PATCH',
            url: Cypress.env('APIURL') + 'gists/' + gistId,
            headers: {
                'Accept': Cypress.env('Accept'),
                Authorization: accessToken
            },
            body:{
                'description': description,
                'files': files
            }
        }).as('EditGist')
    }

    GetGist(accessToken, gistId)
    {
        cy.request({
            method: 'GET',
            url: Cypress.env('APIURL') + 'gists/' + gistId,
            headers: {
                'Accept': Cypress.env('Accept'),
                Authorization: accessToken
            }
        }).as('GetGist')
    }

    CommentToGist(accessToken, gistId, comment)
    {
        cy.request({
            method: 'POST',
            url: Cypress.env('APIURL') + 'gists/' + gistId + '/comments',
            headers: {
                'Accept': Cypress.env('Accept'),
                Authorization: accessToken
            },
            body:{
                'body': comment
            }
        }).as('CommentToGist')
    }

    DeleteComment(accessToken, gistId, commentId)
    {
        cy.request({
            method: 'DELETE',
            url: Cypress.env('APIURL') + 'gists/' + gistId + '/comments/' + commentId,
            headers: {
                'Accept': Cypress.env('Accept'),
                Authorization: accessToken
            }
        }).as('DeleteComment')
    }

    ListComments(accessToken, gistId)
    {
        cy.request({
            method: 'GET',
            url: Cypress.env('APIURL') + 'gists/' + gistId + '/comments',
            headers: {
                'Accept': Cypress.env('Accept'),
                Authorization: accessToken
            }
        }).as('ListComments')
    }

} 

export const gistsAPIs = new GistsAPIs()