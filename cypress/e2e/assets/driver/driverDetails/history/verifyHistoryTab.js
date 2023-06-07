/*-----------------------------------------------------------------------------------------------------------------------------------------------------
History tab and its cards visibility in the Driver Asset_Regression Testcase
Test Cases List
Authored By                   : pruthviraj
Date                          : 15-05-2023
Functions/Calling References  : resourceUtilis, genericUtils, loginUtils, dateTimeUtils, utilities
Test Cases Included           : ME-137513 Can User verify History tab and its cards visibility in the Driver Asset_Regression Testcase |  Assets - Driver Training | Regression
--------------------------------------------------------------------------------------------------------------------------------------------------------*/
import historyPage from '../../../../../pageObjects/assets/driver/driverDetails/history/historyPage.json';
import historyData from '../../../../../testData/assets/driver/driverDetails/history/historyData.json';
import addDriverData from '../../../../../testData/assets/driver/addDriver/addDriverData.json';
import { driverSaveAction, enterDriverMandatoryFields, navigateToDriverAddNewPage } from '../../../../../utilities/assetUtils/resourceUtilis';
import { clickAction, verifyToExist, viewFullPage, toastWithMsg, verifyTextContains } from '../../../../../utilities/commonUtils/genericUtils';
import { loginToApplication } from '../../../../../utilities/appSpecificUtils/loginUtils/loginUtils';
const {
  tabDriverHistory,
  tabTrainingTitle,
  tabIncidents,
  tabObservations,
} = historyPage;
const { historyTableTitle } = historyData.staticData;
const { msgUpdated } = addDriverData.expectedData;
const { userName: usernameText, password: passwordText } = Cypress.env('users')[Cypress.env('appLoginUser')];

describe('Can User verify History tab - [ME-137513]', () => {
  beforeEach(() => {
    cy.then(() => {
      viewFullPage();
      loginToApplication({ username: usernameText, password: passwordText });
    });
  });

  it('ME-98395 Can User Edit Training with editing Due Date field Driver > Resources | Assets - Driver Training | Regression',
    { tags: ['@assets', '@resources', '@driver', '@driverHistory', '@P1'] }, () => {
      //Navigating to Driver - Add New page
      navigateToDriverAddNewPage();
      //Creating Driver with Mandatory fields and General Information
      enterDriverMandatoryFields(false);
      //Save Driver
      driverSaveAction();
      toastWithMsg({ message: msgUpdated });
      //verifying the Driver History Tab
      verifyToExist({ element: tabDriverHistory });
      clickAction({ locator: tabDriverHistory });
      verifyTextContains({ locator: tabTrainingTitle, containsText: historyTableTitle[0] });
      verifyTextContains({ locator: tabIncidents, containsText: historyTableTitle[1] });
      verifyTextContains({ locator: tabObservations, containsText: historyTableTitle[2] });
    });
});