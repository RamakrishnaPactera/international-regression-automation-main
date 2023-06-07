//---------------------------------------------------------------------------------------------------------------
//List to all Fields data to search results in expand view with the below Minion terms//
//Test Cases List
//Authored By                   : Babu Velagada
//Date                          : 01-03-2023
//Functions/Calling References  : crmPortFolioPage,crmIndustryData,crmInteractionsPage,crmInteractionData,commonData,utilities
//Test case Included            : ME-129539- Can I Verify view Portfolio  Interactions search result in an expanded table view on Interactions Tab > portFolia > interactions
//---------------------------------------------------------------------------------------------------------------

import {
  clickFirstElementIn,
  getMinionValues,
  getTDMData,
  verifyClosePopup,
  verifyExists,
  verifyTableColumnsHeaders,
  viewFullPage,
  waitSometime,
} from '../../../utilities/commonUtils/genericUtils';
import crmPortFolioPage from '../../../pageObjects/crm/crmPage/crmPortFolioPage.json';
import crmIndustryData from '../../../testData/crm/crmData/crmIndustryData.json';
import { loginToApplication } from '../../../utilities/appSpecificUtils/loginUtils/loginUtils';
import {
  carrotButtonClickExpand,
  createInteractionLogRecd,
  createInteractionScheduleRecd,
  getDateAndMonth,
  navigateToPortfolioInteractionsTab,
  verifyEntityType,
  verifyInteractionsTabFilters,
} from '../../../utilities/crmUtils/portFolioUtils';
import crmInteractionsPage from '../../../pageObjects/crm/crmPage/crmInteractionsPage.json';
import crmInteractionData from '../../../testData/crm/crmData/crmInteractionsData.json';
import commonData from '../../../testData/staticData/commonData/commonData.json';
import { searchCustomer } from '../../../utilities/customerUtils/customerUtils';
import { searchCarrier } from '../../../utilities/carrierUtils/carrierUtils';
const {
  entityTypeCarrier,
  entityTypeCustomer,
  interactionTableColumnHeaders,
} = crmInteractionData.staticData;
const {
  tdmAddCarrierReq,
  tdmAddCustomerReq,
  tdmCarrierData,
  tdmCarrierNewScenario,
  tdmCustomerData,
  tdmCustomerScenario,
} = crmIndustryData.staticData;
const { shortWait, moreWait } = commonData;
const {
  entityTypeColFilter,
  entityTypeColValExp,
} = crmPortFolioPage;
const {
  tabCrmCarrier,
  tabCrmCustomer,
} = crmInteractionsPage;
const {
  tabInteractions,
  tblInteractionsHeaderExp,
} = crmInteractionsPage;
const { userName: usernameText, password: passwordText } =
  Cypress.env('users')[Cypress.env('appLoginUser')];
let customerNameVal, carrierNameVal, interactionsObjectiveVal;
describe(' Can I Verify view Portfolio  Interactions search result in an expanded table view on Interactions Tab > portFolia > interactions > Interactions Tab [ME-129539]', () => {
  beforeEach(() => {
    getMinionValues('customerCrmInteractionsObjective', 1).then((interactionObjective) => {
      interactionsObjectiveVal = interactionObjective[0];
    });
    cy.log('***creating new carrier***');
    getTDMData({ dataType: tdmCarrierData, dataCondition: tdmAddCarrierReq, dataScenario: tdmCarrierNewScenario });
    cy.then(() => {
      carrierNameVal = Cypress.env('inputVal');
    });
    getTDMData({ dataType: tdmCustomerData, dataCondition: tdmAddCustomerReq, dataScenario: tdmCustomerScenario });
    cy.then(() => {
      customerNameVal = Cypress.env('inputVal');
    });
    loginToApplication({ username: usernameText, password: passwordText });
    viewFullPage();
  });

  it('ME-129539- Can I Verify view Portfolio  Interactions search result in an expanded table view on Interactions Tab > portFolia > interactions | PortFolia Regression | Sprint Regression',
    {
      tags: [
        '@crm',
        '@portFolio',
        '@interactions',
        '@p2',
        '@phase2',
      ],
    },
    () => {
      cy.log('***creating interaction record on both carrier and customer***');
      searchCarrier({ carrierName: carrierNameVal.carrierName });
      clickFirstElementIn({ locator: tabCrmCarrier });
      waitSometime(shortWait);
      createInteractionLogRecd({ objective: interactionsObjectiveVal });
      createInteractionScheduleRecd();
      searchCustomer({ customerName: customerNameVal.customerName });
      clickFirstElementIn({ locator: tabCrmCustomer });
      createInteractionLogRecd({ objective: interactionsObjectiveVal });
      createInteractionScheduleRecd();
      waitSometime(moreWait);
      navigateToPortfolioInteractionsTab();
      cy.log('***validations in Expand view***');
      carrotButtonClickExpand();
      verifyInteractionsTabFilters();
      verifyTableColumnsHeaders({ locator: tblInteractionsHeaderExp, columnNames: interactionTableColumnHeaders });
      getDateAndMonth();
      cy.log('***verify entityType with Carrier***');
      waitSometime(shortWait);
      verifyEntityType({ locator: entityTypeColFilter, element: entityTypeColValExp, dataText: entityTypeCarrier, verifyText: entityTypeCarrier });
      cy.log('***verify entityType with Customer***');
      verifyEntityType({ locator: entityTypeColFilter, element: entityTypeColValExp, dataText: entityTypeCustomer, verifyText: entityTypeCustomer });
      verifyClosePopup();
      verifyExists({ element: tabInteractions });
    });
});