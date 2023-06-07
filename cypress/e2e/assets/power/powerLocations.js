/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------
 Add and edit Power location details in operations tab//
 Test Cases List
 Authored By                   : Mamatha Polapalli
 Date                          : 29-05-2023,
 Functions/Calling References  : dateTimeUtils, staticAssets, utilities, genericUtils, loginUtils
 Test case Included            : ME-138131 Add Power location details in operations tab > Resources |  Assets - Power | Regression
-----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
import * as resourceUtilis from '../../../utilities/assetUtils/resourceUtilis';
import * as genericUtils from '../../../utilities/commonUtils/genericUtils';
import * as powerData from '../../../testData/assets/power/powerDetails/powerData.json';
import { loginToApplication } from '../../../utilities/appSpecificUtils/loginUtils/loginUtils';
import * as powerDetailsPage from '../../../pageObjects/assets/power/powerDetails/powerDetailsPage.json';
import * as addPowerPage from '../../../pageObjects/assets/power/addPower/addPowerPage.json';

const {
  userName: usernameText,
  password: passwordText,
} = Cypress.env('users')[Cypress.env('appLoginUser')];
describe('Add location details in operations tab[ME-138131]', () => {
  beforeEach(() => {
    cy.then(() => {
      genericUtils.viewFullPage();
      loginToApplication({ username: usernameText, password: passwordText });
    });
  });
  it('ME-138131 Add Power location details in operations tab  > Resources |  Assets - Power | Regression',
    {
      tags: [
        '@assets',
        '@resources',
        '@power',
        '@p2',
      ],
    }, () => {
      resourceUtilis.navigateToAddPowerNewPage();
      resourceUtilis.addPower();
      genericUtils.clickAction({ locator: powerDetailsPage.tabOperations });
      resourceUtilis.addPowerLocations();
      //Edit Location details
      genericUtils.typeText({ locator: powerDetailsPage.txtFacilityLocation, dataText: powerData.expectedData.lastFacility });
      genericUtils.clickAction({ locator: addPowerPage.btnPowerSave });
    });
});