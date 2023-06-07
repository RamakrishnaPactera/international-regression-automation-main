//---------------------------------------------------------------------------------------------------------------
//List to all Fields Data to edit verify filters, UI validations with the below Minion terms//
//Test Cases List
//Authored By                   : Babu Velagada
//Date                          : 01-03-2023
//Functions/Calling References  : crmPortFolioPage,crmIndustryData,crmInteractionsPage,crmInteractionData,commonData,utilities
//Test case Included            : ME-129539 - Can I Verify view Portfolio  Interactions search result in an expanded table view on Interactions Tab > portFolia > interactions
//---------------------------------------------------------------------------------------------------------------

import {
  clickFirstElementIn,
  getMinionValues,
  getTDMData,
  verifyAttrText,
  verifyClosePopup,
  verifyExists,
  verifyTableColumnsHeaders,
  verifyToExist,
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
  verifyEntityTypeMultiSelect,
  verifyPortInteractionsFilters,
} from '../../../utilities/crmUtils/portFolioUtils';
import crmInteractionsPage from '../../../pageObjects/crm/crmPage/crmInteractionsPage.json';
import crmInteractionData from '../../../testData/crm/crmData/crmInteractionsData.json';
import commonData from '../../../testData/staticData/commonData/commonData.json';
import { searchCustomer } from '../../../utilities/customerUtils/customerUtils';
import { searchCarrier } from '../../../utilities/carrierUtils/carrierUtils';
const {
  attrTitle,
  entityTypeCarrier,
  entityTypeCustomer,
  interactionTableColumnHeaders,
  scheduleVal,
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
  drpDwnSchedule,
  entityTypeColFilter,
  entityTypeColVal,
  entityTypeColValExp,
} = crmPortFolioPage;
const {
  assignedRepsFilter,
  completedByFilter,
  completedDateFilter,
  createdByFilter,
  createdDateFilter,
  detailsFilter,
  directionFilter,
  documentFilter,
  entityNameFilter,
  entityTypeFilter,
  lastUpdatedByFilter,
  lastUpdatedDateFilter,
  objectiveFilter,
  opportunityFilter,
  originalDateFilter,
  outcomeFilter,
  rescheduledFilter,
  scheduleDateTimeFilter,
  scheduleFilter,
  tabCrmCarrier,
  tabCrmCustomer,
  viaFilter,
} = crmInteractionsPage;

const interactionsFilters = [
  entityTypeFilter,
  entityNameFilter,
  scheduleFilter,
  scheduleDateTimeFilter,
  objectiveFilter,
  directionFilter,
  viaFilter,
  detailsFilter,
  outcomeFilter,
  documentFilter,
  opportunityFilter,
  assignedRepsFilter,
  createdDateFilter,
  createdByFilter,
  originalDateFilter,
  rescheduledFilter,
  lastUpdatedDateFilter,
  lastUpdatedByFilter,
  completedDateFilter,
  completedByFilter,
];
const {
  tabInteractions,
  tblInteractionsHeaderExp,
  tblInteractionsHeader,
} = crmInteractionsPage;
const { userName: usernameText, password: passwordText } =
  Cypress.env('users')[Cypress.env('appLoginUser')];
let customerNameVal, carrierNameVal, interactionsObjectiveVal;
describe('Can I Verify view Portfolio  Interactions search result in an expanded table view on Interactions Tab > portFolia > interactions > Interactions Tab [ME-129539]', () => {
  beforeEach(() => {
    cy.log('***creating new carrier***');
    getTDMData({ dataType: tdmCarrierData, dataCondition: tdmAddCarrierReq, dataScenario: tdmCarrierNewScenario });
    cy.then(() => {
      carrierNameVal = Cypress.env('inputVal');
    });
    getMinionValues('customerCrmInteractionsObjective', 1).then((interactionsObjective) => {
      interactionsObjectiveVal = interactionsObjective[0];
    });
    getTDMData({ dataType: tdmCustomerData, dataCondition: tdmAddCustomerReq, dataScenario: tdmCustomerScenario });
    cy.then(() => {
      customerNameVal = Cypress.env('inputVal');
    });
    loginToApplication({ username: usernameText, password: passwordText });
    viewFullPage();
  });

  it('ME-129539 - Can I Verify view Portfolio  Interactions search result in an expanded table view on Interactions Tab > portFolia > interactions | PortFolia Regression | Sprint Regression',
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
      cy.log('***validations in Default view***');
      navigateToPortfolioInteractionsTab();
      getDateAndMonth();
      verifyAttrText({ locator: drpDwnSchedule, attribute: attrTitle, verifyText: scheduleVal });
      cy.log('***verify entityType with Carrier***');
      verifyEntityType({ locator: entityTypeColFilter, element: entityTypeColVal, dataText: entityTypeCarrier, verifyText: entityTypeCarrier });
      waitSometime(shortWait);
      cy.log('***verify entityType with Customer***');
      verifyEntityType({ locator: entityTypeColFilter, element: entityTypeColVal, dataText: entityTypeCustomer, verifyText: entityTypeCustomer });
      verifyPortInteractionsFilters();
      interactionsFilters.forEach((value) => {
        verifyToExist({ element: value });
      });
      verifyTableColumnsHeaders({ locator: tblInteractionsHeader, columnNames: interactionTableColumnHeaders });
      cy.log('***validations in Expand view***');
      carrotButtonClickExpand();
      getDateAndMonth();
      verifyAttrText({ locator: drpDwnSchedule, attribute: attrTitle, verifyText: scheduleVal });
      cy.log('***verify entityType with Carrier***');
      verifyEntityType({ locator: entityTypeColFilter, element: entityTypeColValExp, dataText: entityTypeCarrier, verifyText: entityTypeCarrier });
      waitSometime(shortWait);
      cy.log('***verify entityType with Customer***');
      verifyEntityType({ locator: entityTypeColFilter, element: entityTypeColValExp, dataText: entityTypeCustomer, verifyText: entityTypeCustomer });
      verifyEntityTypeMultiSelect();
      verifyPortInteractionsFilters();
      interactionsFilters.forEach((value) => {
        verifyToExist({ element: value });
      });
      verifyTableColumnsHeaders({ locator: tblInteractionsHeaderExp, columnNames: interactionTableColumnHeaders });
      verifyClosePopup();
      verifyExists({ element: tabInteractions });
    });
});