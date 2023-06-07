/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------
 Validating Current Location and Route & History cards removed in Driver search
 Test Cases List
 Authored By : Sainath
 Date : 13-04-2023,
 Functions/Calling References : genericUtils, loginUtils, resourceUtils
 Test case Included : ME-141506 : [FE]Driver Search-verify 'Current Location' and 'Route & History' cards removed or not in Driver > Resources |  Assets - Driver General Tab | Regression
-----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
import { loginToApplication } from '../../../../../utilities/appSpecificUtils/loginUtils/loginUtils';
import { navigateToDriverSearch } from '../../../../../utilities/assetUtils/resourceUtilis';
import { verifyDoesNotExist, viewFullPage } from '../../../../../utilities/commonUtils/genericUtils';
import driverSearchPage from '../../../../../pageObjects/assets/driver/driverSearch/driverSearchPage.json';

const { labelCurrentLocation, labelRouteHistory } = driverSearchPage;
const { userName: usernameText, password: passwordText } = Cypress.env('users')[Cypress.env('appLoginUser')];

describe('Validating Current Location and Route & History cards removed in Driver > Resources [ME-141506]', () => {
  beforeEach(() => {
    cy.then(() => {
      viewFullPage();
      loginToApplication({ username: usernameText, password: passwordText });
    });
  });
  it("ME-141506 : [FE]Driver Search-verify 'Current Location' and 'Route & History' cards removed or not in Driver > Resources |  Assets - Driver General Tab | Regression",
    {
      tags: [
        '@assets',
        '@resources',
        '@driver',
        '@driverSearch',
        '@p2',
        '@phase2',
      ],
    },
    () => {
      navigateToDriverSearch();
      verifyDoesNotExist({ element: labelCurrentLocation });
      verifyDoesNotExist({ element: labelRouteHistory });
    });
});