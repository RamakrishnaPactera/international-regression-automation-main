/*---------------------------------------------------------------------------------------------------------------
Portfolio table existing kabob menu options functionalities are working as expected when account type selects as 'Customer'
Test Cases List               : [ME-151387] Verify Spot Quote option is Enabled in Portfolio Customer Accounts Table'
Authored By                   : Chandra obula reddy
Date                          : 10-05-2023
Functions/Calling References  : genericUtils, portFolioUtils,crmPortFolioPage,,commonData,utilities
User Strories Included        : ME-122684- Portfolio - Customer Accounts Table - Kabob - Spot Quote - Access and Visibility
---------------------------------------------------------------------------------------------------------------*/
import { loginToApplication } from '../../../utilities/appSpecificUtils/loginUtils/loginUtils';
import * as genericUtils from '../../../utilities/commonUtils/genericUtils';
import * as portFolioUtils from '../../../utilities/crmUtils/portFolioUtils';
import crmPortFolioPage from '../../../pageObjects/crm/crmPage/crmPortFolioPage.json';

const { userName: usernameText, password: passwordText } =
  Cypress.env('users')[Cypress.env('appLoginUser')];
describe('Portfolio - Customer Accounts Table - Kabob - Spot Quote - Access and Visibility [ME-122684]', () => {
  beforeEach(() => {
    loginToApplication({ username: usernameText, password: passwordText });
    genericUtils.viewFullPage();
  });

  it('[ME-151387] Verify Spot Quote option is Enabled in Portfolio Customer Accounts Table',
    {
      tags: [
        '@crm',
        '@portFolio',
        '@p2',
      ],
    },
    () => {
      cy.log('*** Verifying the Spot quote option is enabled or not in Kabob menu***');
      //Verifying the Spot quote option is enabled or not
      portFolioUtils.navigateToPorFolioTab();
      portFolioUtils.selectPorfolioAccountType('Customer');
      portFolioUtils.verifyPorFolioKabobMenuOptions();
      genericUtils.verifyVisible({ element: crmPortFolioPage.btnSpotQuote });
    });
});