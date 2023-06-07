/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------
 Validate Next Available fields in operations tab//
 Test Cases List
 Authored By                   : Mamatha Polapalli
 Date                          : 29-05-2023,
 Functions/Calling References  : dateTimeUtils, staticAssets, utilities, genericUtils, loginUtils
 Test case Included            : ME-138157 verifyNext Available fields in operations tab > Resources |  Assets - Power | Regression
-----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
import * as resourceUtilis from '../../../utilities/assetUtils/resourceUtilis';
import * as genericUtils from '../../../utilities/commonUtils/genericUtils';
import { loginToApplication } from '../../../utilities/appSpecificUtils/loginUtils/loginUtils';
import * as powerDetailsPage from '../../../pageObjects/assets/power/powerDetails/powerDetailsPage.json';

const {
  userName: usernameText,
  password: passwordText,
} = Cypress.env('users')[Cypress.env('appLoginUser')];
describe('verifyNext Available fields in operations tab[ME-138157]', () => {
  beforeEach(() => {
    cy.then(() => {
      genericUtils.viewFullPage();
      loginToApplication({ username: usernameText, password: passwordText });
    });
  });
  it('ME-138157 verifyNext Available fields in operations tab  > Resources |  Assets - Power | Regression',
    {
      tags: [
        '@assets',
        '@resources',
        '@power',
        '@p2',
      ],
    }, () => {
      resourceUtilis.addPower();
      genericUtils.clickAction({ locator: powerDetailsPage.tabOperations });
      genericUtils.verifyIfEnabled({ locator: powerDetailsPage.nextAvailable.txtDateTime });
      genericUtils.verifyIfEnabled({ locator: powerDetailsPage.nextAvailable.txtFacility });
      genericUtils.verifyIfEnabled({ locator: powerDetailsPage.nextAvailable.txtCitySt });
      genericUtils.verifyIfEnabled({ locator: powerDetailsPage.nextAvailable.txtNextRoute });
    });
});