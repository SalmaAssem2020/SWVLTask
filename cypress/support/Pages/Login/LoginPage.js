var elements = require('./LoginElements')

class LoginPage{


     Login(UserName, Password)
    {
        cy.get(elements.Email_TextBox).clear().type(UserName)
        cy.get(elements.Password_TextBox).clear().type(Password)
        cy.get(elements.Login_Button).click()
    } 

}

export const loginPage = new LoginPage()