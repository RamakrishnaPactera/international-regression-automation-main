/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------
 Validate the labels on Power - General and Operations Page
 Test Cases List
 Authored By                   : Sourabh
 Date                          : 31-05-2023,
 Functions/Calling References  : resourceUtils, staticAssets, utilities, genericUtils, loginUtils
 Test case Included            : ME-68972  Verify the text labels of Power - General tab > Resources |  Assets - Power | Regression
                               : ME-69170  Verify the text labels of Power - Operations tab > Resources |  Assets - Power | Regression
-----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
import * as resourceUtilis from '../../../utilities/assetUtils/resourceUtilis';
import * as genericUtils from '../../../utilities/commonUtils/genericUtils';
import * as powerData from '../../../testData/assets/power/powerDetails/powerData.json';
import { loginToApplication } from '../../../utilities/appSpecificUtils/loginUtils/loginUtils';
import * as powerDetailsPage from '../../../pageObjects/assets/power/powerDetails/powerDetailsPage.json';
import commonData from '../../../testData/staticData/commonData/commonData.json';
const { shortWait } = commonData;
const {
  userName: usernameText,
  password: passwordText,
} = Cypress.env('users')[Cypress.env('appLoginUser')];
const OperationTabLabelValue = new Map([[powerDetailsPage.labelOperatingStatus, powerData.staticDataPower.lblOperationStatus], [powerDetailsPage.labelServiceStatus, powerData.staticDataPower.lblServiceStatus], [powerDetailsPage.labelLastPingDtTm, powerData.staticDataPower.lblLastPingDtTm], [powerDetailsPage.labelMaintenanceType, powerData.staticDataPower.lblMaintenanceType], [powerDetailsPage.labelMaintenanceSeverity, powerData.staticDataPower.lblMaintenanceSeverity]]);
describe('Validate the labels on Power - General and Operations Page[ME-69170, ME-68972]', () => {
  beforeEach(() => {
    cy.then(() => {
      genericUtils.viewFullPage();
      loginToApplication({ username: usernameText, password: passwordText });
    });
  });
  it('ME-68972  Verify the text labels of Power - General tab > Resources |  Assets - Power | Regression',
    {
      tags: [
        '@assets',
        '@resources',
        '@power',
        '@p2',
        '@phase2',
      ],
    }, () => {
      resourceUtilis.navigateToAddPowerNewPage();
      genericUtils.waitSometime(shortWait);
      resourceUtilis.verifyPowerGeneralLabels();
    });
  it('ME-69170  Verify the text labels of Power - Operations tab > Resources |  Assets - Power | Regression',
    {
      tags: [
        '@assets',
        '@resources',
        '@power',
        '@p2',
        '@phase2',
      ],
    }, () => {
      resourceUtilis.navigateToAddPowerNewPage();
      resourceUtilis.addPower();
      genericUtils.waitSometime(shortWait);
      genericUtils.clickAction({ locator: powerDetailsPage.tabOperations });
      genericUtils.verifyLabelUsingMapArray({ map: OperationTabLabelValue });
    });
});