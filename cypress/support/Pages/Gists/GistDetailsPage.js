var elements = require('./GistDetailsElements')
require("cypress-xpath")

class GistDetailsPage{
    
     AssertGistIsDisplayed(description, fileName, content)
    {

        cy.get(elements.Description_Label).should('contain', description)
        cy.get(elements.FileName_Label).should('contain', fileName)
        cy.get(elements.Content_Label).should('contain', content)
    }

    ClickEditGist()
    {
        cy.get(elements.Edit_Button).click()
    }

    AccessGist(userName, gistId)
    {
        cy.visit(Cypress.env('url') + userName + '/' + gistId)
    }

    CommentToGist(comment)
    {
        cy.get(elements.Comment_Input).type(comment)

        let countOfElement = 0
        cy.get(elements.Comment_Button).then($foundElements => {
            countOfElement = $foundElements.length
          cy.get(elements.Comment_Button).eq(countOfElement - 1).click()
        })

    }

    AssertCommentIsDisplayed(comment)
    {
        cy.get(elements.Comment_Label).should('contain', comment)
    }

    AssertCommentNotDisplayed(comment)
    {
        cy.get(elements.Comment_Label).should('not.contain', comment)
    }

    DeleteComment(comment)
    {
      cy.xpath("//div[descendant::p[text() = '" + comment + "'] and contains(@class, 'timeline-comment')]//*[@class='timeline-comment-actions flex-shrink-0']").click()

      cy.on('window:confirm', () => true);

      cy.xpath("(//div[descendant::p[text() = '" + comment + "'] and contains(@class, 'timeline-comment')]//*[@aria-label='Delete comment'])[2]").click()

    }

   
}

export const gistDetailsPage = new GistDetailsPage()