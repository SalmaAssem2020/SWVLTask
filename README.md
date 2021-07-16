SWVL Automation Project:
Tool: Cypress
Coverage: API and UI Tests for the following cases:
- Login
- Add Gist
- Edit Gist
- Comment To Gist
- Delete Comment From Gist


Notes:
- All testcases are independant
- Authorization type selected for authorizing apis is the user personal access token generated from his settings
- if the apis fires 403 forbidden error, maybe the user account is flagged due to many runs, wait some hours or change the user details in cypress.json
