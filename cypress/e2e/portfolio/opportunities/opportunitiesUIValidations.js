/*---------------------------------------------------------------------------------------------------------------
Verify to validate  Opportunities UI from Portfolio screen Opportunities tab//
Authored By                   : Madhu Manyam
Date                          : 13-03-2023
Functions/Calling References  : crmPortFolioPage,crmIndustryData,crmInteractionsPage,crmInteractionData,commonData,utilities
Test case Included            : ME-131694 User can see the Opportunities opportunities  In Opportunities Tab > PortFolia > Opportunities
-------------------------------------------------------------------------------------------------------------------*/
import * as portFolioUtils from '../../../utilities/crmUtils/portFolioUtils';
import * as genericUtils from '../../../utilities/commonUtils/genericUtils';
import { loginToApplication } from '../../../utilities/appSpecificUtils/loginUtils/loginUtils';
import crmPortFolioPage from '../../../pageObjects/crm/crmPage/crmPortFolioPage.json';
import crmInteractionsPage from '../../../pageObjects/crm/crmPage/crmInteractionsPage.json';
import crmOpportunitesData from '../../../testData/crm/crmData/crmOpportunitesData.json';
const {
  btnCarrotExpandCustomize,
  btnCustomize,
  btnExpandCustomize,
  customizeTable,
  drpdwnCarrotBtnInteractions,
} = crmInteractionsPage;
const {
  lblOpportunities,
  btnOpportunitiesStatus,
} = crmPortFolioPage;
const {
  title,
  status,
} = crmOpportunitesData.userDefined;
const { userName: usernameText, password: passwordText } =
  Cypress.env('users')[Cypress.env('appLoginUser')];

describe('User can validate Opportunities UI In Portfolio Opportunities Tab > portFolio > opportunities > Opportunities Tab [ME-131694]', () => {
  beforeEach(() => {
    loginToApplication({ username: usernameText, password: passwordText });
    genericUtils.viewFullPage();
  });

  it('ME-131694 - User can validate Opportunities UI In Opportunities Tab > portFolia > Opportunities | PortFolia Regression | Sprint Regression',
    {
      tags: [
        '@crm',
        '@portFolio',
        '@opportunities',
        '@p3',
        '@phase1',
      ],
    },
    () => {
      portFolioUtils.navigateToPorFolioOpportunitiesTab();
      genericUtils.verifyText({ locator: lblOpportunities, verifyText: title });
      genericUtils.verifyTextContains({ locator: btnOpportunitiesStatus, containsText: status });
      cy.log('***validations in Default view***');
      genericUtils.clickAction({ locator: drpdwnCarrotBtnInteractions });
      genericUtils.clickVisibleElement({ locator: btnCustomize });
      genericUtils.verifyToExist({ element: customizeTable });
      portFolioUtils.verifyCustomizeOpportunitiesAndDrgAndDwp();
      cy.log('***validations in Expand view***');
      portFolioUtils.carrotButtonClickExpand();
      genericUtils.clickVisibleElement({ locator: btnCarrotExpandCustomize });
      genericUtils.clickVisibleElement({ locator: btnExpandCustomize });
      genericUtils.verifyToExist({ element: customizeTable });
      portFolioUtils.verifyCustomizeOpportunitiesAndDrgAndDwp();
    });
});