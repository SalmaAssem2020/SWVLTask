var elements = require('./GistAddingElements')

class GistAddingPage{
    
     gistTypes = {"Public" : "public", "Secret" : "secret"}

     CreateGist(gistType, description, fileName, content)
    {

        cy.get(elements.Description_Input).clear().type(description)
        cy.get(elements.FileName_Input).clear().type(fileName)
        cy.get(elements.Content_Input).type(content)
        cy.get(elements.CreateGistOptions_Menu).click()
        cy.get("[class='select-menu-item-heading']").contains(gistType).click()
        cy.get(elements.CreateGist_Button).click()
    } 

    AssertUserLoggedIn(UserName)
    {
        cy.get("[alt = '@" + UserName + "']").should('be.visible')
    }

    ClickAddFile()
    {
        cy.get(elements.AddFile_Button).click()
    }

    AddAnotherFileDetails(fileName, content)
    {
        let countOfElement = 0
        cy.get(elements.FileName_Input).then($foundElements => {
            countOfElement = $foundElements.length
            
            cy.get(elements.FileName_Input).eq(countOfElement - 1).clear().type(fileName)
            cy.get(elements.Content_Input).eq(countOfElement - 1).type(content)
        });
        
    }

    ClickUpdate()
    {
        cy.get(elements.Update_Button).click()
    }

}

export const gistAddingPage = new GistAddingPage()