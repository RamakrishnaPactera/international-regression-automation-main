/*---------------------------------------------------------------------------------------------------------------
Validate Refresh Icon from Portfolio screen interactions//
Test Cases List
Authored By                   : Mamatha Polapalli
Date                          : 28-03-2023
Functions/Calling References  : crmPortFolioPage,crmIndustryData,crmInteractionsPage,crmInteractionData,commonData,utilities
Test case Included            : ME-137518 - Can I Verify Refresh Icon In Interactions Tab > portFolia > interactions | PortFolia Regression
-------------------------------------------------------------------------------------------------------------------*/
import {
  clickAction,
  getTDMData,
  scrollIntoView,
  scrollToRight,
  verifyVisible,
  viewFullPage,
  waitSometime,
} from '../../../utilities/commonUtils/genericUtils';
import { loginToApplication } from '../../../utilities/appSpecificUtils/loginUtils/loginUtils';
import crmIndustryData from '../../../testData/crm/crmData/crmIndustryData.json';
import commonData from '../../../testData/staticData/commonData/commonData.json';
import { searchCustomer } from '../../../utilities/customerUtils/customerUtils';
import {
  navigateToPortfolioInteractionsTab,
  navigateToCrmTab,
  verifyLastUpdatedDateTime,
  createInteractionScheduleRecd,
} from '../../../utilities/crmUtils/portFolioUtils';
import crmInteractionsPage from '../../../pageObjects/crm/crmPage/crmInteractionsPage.json';
const { shortWait } = commonData;
const {
  btnRefresh,
  scrollView,
} = crmInteractionsPage;
const {
  tdmAddCustomerReq,
  tdmCustomerData,
  tdmCustomerScenario,
} = crmIndustryData.staticData;
const { userName: usernameText, password: passwordText } =
  Cypress.env('users')[Cypress.env('appLoginUser')];
let customerNameVal;

describe('Can I Verify Refresh Icon In Interactions Tab > portFolia > interactions > Interactions Tab [ME-137518]', () => {
  beforeEach(() => {
    getTDMData({ dataType: tdmCustomerData, dataCondition: tdmAddCustomerReq, dataScenario: tdmCustomerScenario });
    cy.then(() => {
      customerNameVal = Cypress.env('inputVal');
    });
    loginToApplication({ username: usernameText, password: passwordText });
    viewFullPage();
  });

  it('ME-137518 - Can I Verify Refresh Icon In Interactions Tab > portFolia > interactions | PortFolia Regression | Sprint Regression',
    {
      tags: [
        '@crm',
        '@portFolio',
        '@interactions',
        '@p2',
        '@phase1',
      ],
    },
    () => {
      navigateToPortfolioInteractionsTab();
      scrollToRight();
      verifyVisible({ element: btnRefresh });
      clickAction({ locator: btnRefresh });
      verifyLastUpdatedDateTime();
      searchCustomer({ customerName: customerNameVal.customerName });
      navigateToCrmTab();
      waitSometime(shortWait);
      createInteractionScheduleRecd();
      navigateToPortfolioInteractionsTab();
      scrollIntoView({ locator: scrollView });
      scrollToRight();
      clickAction({ locator: btnRefresh });
      verifyLastUpdatedDateTime();
    });
});