/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------
 Verify Gray out Project and Program fields within Organizational Details in Add New driver and Search Driver under General Tab in Driver//
 Test Cases List
 Authored By : Nikhil kumar
 Date : 13-04-2023,
 Functions/Calling References : utilities, genericUtils, loginUtils, resourceUtils
 Test case Included : [FE]Driver-Verify Gray out Project and Program fields within Organizational Details in Add New driver and Search Driver
-----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
import { loginToApplication } from '../../../../../utilities/appSpecificUtils/loginUtils/loginUtils';
import { navigateToDriverAddNewPage, searchDriverWithCode } from '../../../../../utilities/assetUtils/resourceUtilis';
import { clickAction, verifyBackGroundColour, viewFullPage } from '../../../../../utilities/commonUtils/genericUtils';
import driverAddNewPage from '../../../../../pageObjects/assets/driver/addDriver/addDriverPage.json';
import generalData from '../../../../../testData/assets/driver/driverDetails/general/generalData.json';
import driverCommonPage from '../../../../../pageObjects/assets/driver/driverCommonPage.json';

const { driverCode } = generalData.userDefinedData;
const { txtFieldOrgProjectTerm, txtFieldOrgProgramTerm } = driverAddNewPage;
const { tabDriverGeneral } = driverCommonPage;
const { colorCodeGrey } = generalData.expectedData;
const { userName: usernameText, password: passwordText } = Cypress.env('users')[Cypress.env('appLoginUser')];

describe('[FE] Driver Record - Gray out Project and Program fields within Organizational Details [ME-142182]', () => {
  beforeEach(() => {
    cy.then(() => {
      viewFullPage();
      loginToApplication({ username: usernameText, password: passwordText });
    });
  });
  it('ME-142182 [FE]Driver-Verify Gray out Project and Program fields within Organizational Details in Add New driver and Search Driver > Resources | Assets - Driver General Tab | Regression',
    {
      tags: [
        '@assets',
        '@resources',
        '@driver',
        '@driverGeneral',
        '@p2',
      ],
    },
    () => {
      navigateToDriverAddNewPage();

      //verifying the background colour for Project Term
      verifyBackGroundColour({ locator: txtFieldOrgProjectTerm, colourValue: colorCodeGrey });

      //verifying the background colour for Program Term
      verifyBackGroundColour({ locator: txtFieldOrgProgramTerm, colourValue: colorCodeGrey });

      //searching the driver record with code
      searchDriverWithCode({ driverCode });
      clickAction({ locator: tabDriverGeneral });

      //verifying the background colour for Project Term
      verifyBackGroundColour({ locator: txtFieldOrgProjectTerm, colourValue: colorCodeGrey });

      //verifying the background colour for Program Term
      verifyBackGroundColour({ locator: txtFieldOrgProgramTerm, colourValue: colorCodeGrey });
    });
});