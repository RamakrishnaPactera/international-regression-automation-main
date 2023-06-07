/*---------------------------------------------------------------------------------------------------------------
Portfolio > Interactions> Interactions option is visible and Enabled based on access and visiblity//
Test Cases List               : ME-151501, ME-151656
Authored By                   : Chandra obula reddy
Date                          : 11-05-2023
Functions/Calling References  : genericUitils, loginUtils, portFolioUtils
Test case Included            : ME-146322 - Portfolio - Interactions Tab - Feature Flag On - Access and Visibility
---------------------------------------------------------------------------------------------------------------*/
import { loginToApplication } from '../../../utilities/appSpecificUtils/loginUtils/loginUtils';
import * as genericUtils from '../../../utilities/commonUtils/genericUtils';
import * as portFolioUtils from '../../../utilities/crmUtils/portFolioUtils';
import crmInteractionData from '../../../testData/crm/crmData/crmInteractionsData.json';
import { interactionstab } from '../../../../cypress/pageObjects/crm/crmPage/crmPortFolioPage.json';

const {
  attrColor,
  blueClrInteractions,
} = crmInteractionData.staticData;

const { userName: usernameText, password: passwordText } =
  Cypress.env('users')[Cypress.env('appLoginUser')];
describe('Can I Verify  Interactions Tab > portFolia > interactions > Interactions Tab [ME-146322]', () => {
  beforeEach(() => {
    loginToApplication({ username: usernameText, password: passwordText });
    genericUtils.viewFullPage();
  });

  it('ME-151501 - Verify Interactions tab is Visible and Enabled based on Access and Visibility',
    {
      tags: [
        '@crm',
        '@portFolio',
        '@p2',

      ],
    },
    () => {
      cy.log('***Navigate to Interaction tab in port folio***');
      portFolioUtils.navigateToPorFolioTab();
      cy.log('***verifying Interactions tab is visible or not and If it is visible click on it');
      portFolioUtils.verifyInteractionsTab();
    });

  it('[ME-151656] - Verify default tab/focus should on Interactions when Interactions tab is visible AND Opportunities tab is visible',
    {
      tags: [
        '@crm',
        '@portFolio',
        '@p2',

      ],
    },
    () => {
      cy.log('***Navigate to Interaction tab in port folio***');
      portFolioUtils.navigateToPorFolioTab();
      cy.log('***Verify InteractionsTab is highlighted or not***');
      genericUtils.verifyTextOrBackGroundColor({ locator: interactionstab, color: attrColor, colorCode: blueClrInteractions });
    });
});