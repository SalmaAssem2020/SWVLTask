var elements = require('./GistsHomeElements')

class GistsHomePage{

    
     ClickSignIn()
    {
        cy.get(elements.SignIn_Button).click()
    } 

    AssertUserLoggedIn(UserName)
    {
        cy.get("[alt = '@" + UserName + "']").should('be.visible')
    }

}

export const gistsHomePage = new GistsHomePage()