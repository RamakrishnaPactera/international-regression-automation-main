/*---------------------------------------------------------------------------------------------------------------
User can Create Contact in Driver
Test Cases List
Authored By                   : K.Santhosh
Date                          : 17-05-2023
Functions/Calling References  : loginUtils, genericUtils, resourceUtilis
Test case Included            : [ME-156230, ME-156231, ME-156233, ME-156234, ME-156235]
----------------------------------------------------------------------------------------------------------------*/
import { loginToApplication } from '../../../../../utilities/appSpecificUtils/loginUtils/loginUtils';
import * as addDriverData from '../../../../../testData/assets/driver/addDriver/addDriverData.json';
import * as addDriverPage from '../../../../../pageObjects/assets/driver/addDriver/addDriverPage.json';
import * as genericUtils from '../../../../../utilities/commonUtils/genericUtils';
import * as resourceUtilis from '../../../../../utilities/assetUtils/resourceUtilis';
const { userName: usernameText, password: passwordText } = Cypress.env('users')[Cypress.env('appLoginUser')];
describe('Driver scenarios: Create Contact in Driver > Resources | Assets - Driver General Tab | Regression [ME-156230, ME-156231, ME-156233, ME-156234, ME-156235]', () => {
  before(() => {
  });
  beforeEach(() => {
    cy.then(() => {
      genericUtils.viewFullPage();
      loginToApplication({ username: usernameText, password: passwordText });
    });
  });
  it('[ME-156230, ME-156231, ME-156233, ME-156234, ME-156235] Verify user can able to create, Edit, Delete Contact in Driver > Driver > Resources | Assets - Driver General Tab | Regression',
    {
      tags: ['@assets', '@resources', '@driverGeneral', '@p1'],
    },
    () => {
      resourceUtilis.navigateToDriverAddNewPage();
      resourceUtilis.enterDriverMandatoryFields();
      resourceUtilis.addDriverWithContact();
      resourceUtilis.driverSaveAction();
      genericUtils.toastWithMsg({ message: addDriverData.expectedData.msgUpdated });
      resourceUtilis.editDriverWithContactAndVal();
      genericUtils.clickAction({ locator: addDriverPage.btnKabobMenu });
      genericUtils.clickAction({ locator: addDriverPage.deleteButton });
      genericUtils.clickOkOnWindowAlert();
      resourceUtilis.driverSaveAction();
      genericUtils.toastWithMsg({ message: addDriverData.expectedData.msgUpdated });
    });
});