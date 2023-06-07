/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------
 Add and Update Power operation rab status details//
 Test Cases List
 Authored By                   : Mamatha Polapalli
 Date                          : 29-05-2023,
 Functions/Calling References  : dateTimeUtils, staticAssets, utilities, genericUtils, loginUtils
 Test case Included            : ME-41355,ME-138136,ME-138834,ME-138836,ME-138837 Add and edit operation tab status details > Resources |  Assets - Power | Regression
-----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
import * as resourceUtilis from '../../../utilities/assetUtils/resourceUtilis';
import * as genericUtils from '../../../utilities/commonUtils/genericUtils';
import * as addPowerPage from '../../../pageObjects/assets/power/addPower/addPowerPage.json';
import { loginToApplication } from '../../../utilities/appSpecificUtils/loginUtils/loginUtils';
import * as powerDetailsPage from '../../../pageObjects/assets/power/powerDetails/powerDetailsPage.json';

const {
  userName: usernameText,
  password: passwordText,
} = Cypress.env('users')[Cypress.env('appLoginUser')];
let optStatus, serviceStatusValue;
describe('Add and Update operation tab status details[ME-41355,ME-138136,ME-138834,ME-138836,ME-138837]', () => {
  beforeEach(() => {
    genericUtils.getMinionValues('powerOperatingStatus', 1).then((operatingStatus) => {
      optStatus = operatingStatus[0];
    });
    genericUtils.getMinionValues('powerServiceStatus', 1).then((serviceStatus) => {
      serviceStatusValue = serviceStatus[0];
    });
    cy.then(() => {
      genericUtils.viewFullPage();
      loginToApplication({ username: usernameText, password: passwordText });
    });
  });
  it('ME-41355,ME-138136,ME-138834,ME-138836,ME-138837 User can Add and update operation tab status details  > Resources |  Assets - Power | Regression',
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
      resourceUtilis.addPowerStatusDetails(optStatus, serviceStatusValue);
      genericUtils.dropDownContainsTextClick({ element: powerDetailsPage.drpDwnServiceStatus, typeText: serviceStatusValue, exactText: serviceStatusValue });
      genericUtils.clickAction({ locator: addPowerPage.btnPowerSave });
      genericUtils.verifyContains({ locator: powerDetailsPage.drpDwnServiceStatus, containsText: serviceStatusValue });
    });
});