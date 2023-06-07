/*---------------------------------------------------------------------------------------------------------------
Verify to validate Opportunities tab records count from Portfolio screen Opportunities tab//
Authored By                   : Madhu Manyam
Date                          : 29-03-2023
Functions/Calling References  : crmPortFolioPage,crmIndustryData,crmInteractionsPage,crmInteractionData,commonData,utilities
Test case Included            : ME-106065 User can see opportunities record count, In Opportunities Tab > PortFolia > Opportunities
-------------------------------------------------------------------------------------------------------------------*/
import crmPortFolioPage from '../../../pageObjects/crm/crmPage/crmPortFolioPage.json';
import * as portFolioUtils from '../../../utilities/crmUtils/portFolioUtils';
import * as genericUtils from '../../../utilities/commonUtils/genericUtils';
import { loginToApplication } from '../../../utilities/appSpecificUtils/loginUtils/loginUtils';
import crmOpportunitesData from '../../../testData/crm/crmData/crmOpportunitesData.json';
const {
  lblOpportunities,
  btnOpportunitiesStatus,
} = crmPortFolioPage;
const {
  title,
  status,
  statusType,
} = crmOpportunitesData.userDefined;
const { userName: usernameText, password: passwordText } =
  Cypress.env('users')[Cypress.env('appLoginUser')];

describe('User Verify Opportunities count in Portfolio Opportunities Tab > portFolio > opportunities > Opportunities Tab [ME-134201]', () => {
  beforeEach(() => {
    loginToApplication({ username: usernameText, password: passwordText });
    genericUtils.viewFullPage();
  });

  it('ME-134201 - User verifies Opportunities count on Opportunities Tab > portFolia > Opportunities | PortFolia Regression | Sprint Regression',
    {
      tags: [
        '@crm',
        '@portFolio',
        '@opportunities',
        '@p3',
        '@phase2',
      ],
    },
    () => {
      portFolioUtils.navigateToPorFolioOpportunitiesTab();
      genericUtils.verifyText({ locator: lblOpportunities, verifyText: title });
      genericUtils.verifyTextContains({ locator: btnOpportunitiesStatus, containsText: status });
      portFolioUtils.verifyOpportunitiesTabRecordsCount();
      portFolioUtils.selectOpportunitiesStatusType(statusType);
      portFolioUtils.verifyOpportunitiesTabRecordsCount();
    });
});