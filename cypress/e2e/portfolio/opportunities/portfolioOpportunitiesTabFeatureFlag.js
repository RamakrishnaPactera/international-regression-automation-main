/*---------------------------------------------------------------------------------------------------------------
 Verifying the Opportunities Tab is visble and enabled and highlighted
 Test Cases List               : [ME-152038], [ME-152040]
 Authored By                   : Beemireddy Chandra obula reddy
 Date                          : 15-05-2023
 Functions/Calling References  : loginToApplication,genericUtils,crmPortFolioData,portFolioUtils,crmInteractionData,interactionstab
 User Story Included            : [ME-146331]-Portfolio - Opportunities Tab - Feature Flag On - Access and Visibility
---------------------------------------------------------------------------------------------------------------*/
import * as portFolioUtils from '../../../utilities/crmUtils/portFolioUtils';
import * as genericUtils from '../../../utilities/commonUtils/genericUtils';
import { loginToApplication } from '../../../utilities/appSpecificUtils/loginUtils/loginUtils';
import crmInteractionData from '../../../testData/crm/crmData/crmInteractionsData.json';
import { interactionstab } from '../../../../cypress/pageObjects/crm/crmPage/crmPortFolioPage.json';
const {
  attrColor,
  blueClrInteractions,
} = crmInteractionData.staticData;

const { userName: usernameText, password: passwordText } =
  Cypress.env('users')[Cypress.env('appLoginUser')];

describe('Portfolio - Opportunities Tab - Feature Flag On - Access and Visibility,[ME-146331]', () => {
  beforeEach(() => {
    loginToApplication({ username: usernameText, password: passwordText });
    genericUtils.viewFullPage();
  });

  it('ME-152038 - Verify Opportunities tab is Visible and Enabled based on Access and Visibility',
    {
      tags: [
        '@crm',
        '@portFolio',
        '@opportunities',
        '@p2',

      ],
    },
    () => {
      cy.log('***verifying the Opportunities Tab is Visble and Enabled');
      portFolioUtils.navigateToPorFolioOpportunitiesTab();
    });
  it('ME-152040 - Verify default tab/focus should on Interactions when Interactions tab is visible AND Opportunities tab is visible',
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