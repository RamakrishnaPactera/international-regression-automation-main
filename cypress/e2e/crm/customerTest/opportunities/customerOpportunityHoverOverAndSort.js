/*---------------------------------------------------------------------------------------------------------------
Verify Customer CRM Opportunity Mousehover Over Columns and sorting the columns//
Test Cases List
Authored By                   : Mamatha Polapalli
Date                          : 28-03-2023
Functions/Calling References  : crmOpportunitiesPage,crmOpportunitiesData,opportunityUtils,utilities
Test case Included            : ME-130491 - Can I Validate Opportunity Tab Mouse Hover Over Column And Sort Columns > CRM > Opportunities > Add Opportunities
---------------------------------------------------------------------------------------------------------------*/

import {
  clickAction,
  clickAndVerifyGridAlignment,
  dropDownContainsTextClick,
  getTDMData,
  getMinionValues,
  generateRandomNumber,
  viewFullPage,
  waitSometime,
} from '../../../../utilities/commonUtils/genericUtils';
import commondata from '../../../../testData/staticData/commonData/commonData.json';
import { loginToApplication } from '../../../../utilities/appSpecificUtils/loginUtils/loginUtils';
import { searchCustomer } from '../../../../utilities/customerUtils/customerUtils';
import crmOpportunitiesPage from '../../../../pageObjects/crm/opportunitiesPage/crmOpportunitiesPage.json';
import crmIndustryData from '../../../../testData/crm/crmData/crmIndustryData.json';
import crmOpportunitiesData from '../../../../testData/crm/crmData/crmOpportunitiesData.json';
import crmInteractionsPage from '../../../../pageObjects/crm/crmPage/crmInteractionsPage.json';
import {
  addOpportunity,
  addSourceCloseReason1,
  addSourceCloseReason2,
  navigateToCrmTab,
  openAddOpportunityModal,
  openOpportunityInExpandView,
  switchToClosedStatus,
  verifyColHoverOverOpportunityTabs,
} from '../../../../utilities/opportunitiesUtils/opportunitiesUtils';
const { longWait, shortWait } = commondata;
const {
  tdmAddCustomerReq,
  tdmCustomerData,
  tdmCustomerScenario,
} = crmIndustryData.staticData;
const {
  btnSaveOpportunity,
  colSource,
  closeReasonHeader,
  drpdwnSource,
} = crmOpportunitiesPage;
const {
  tabExpandInteraction,
} = crmInteractionsPage;
const {
  opportunityName,
} = crmOpportunitiesData.userDefined;
const {
  sourceVal1,
} = crmOpportunitiesData.staticData;
const columnLocators = [
  colSource,
  closeReasonHeader,
];
const { userName: usernameText, password: passwordText } = Cypress.env('users')[Cypress.env('appLoginUser')];
let opportunityNameValue, customerNameVal, opportunityStageVal, opportunityTypeValue;
describe('Can I Validate Mousehover Over columns and sort columns in Customer > CRM > Opportunities Tab > Add Opportunity [ME-130491]', () => {
  beforeEach(() => {
    getMinionValues('customerCrmOpportunityType', 1).then((opportunityType) => {
      opportunityTypeValue = opportunityType[0];
    });
    getTDMData({ dataType: tdmCustomerData, dataCondition: tdmAddCustomerReq, dataScenario: tdmCustomerScenario });
    cy.then(() => {
      customerNameVal = Cypress.env('inputVal');
    });
    loginToApplication({ username: usernameText, password: passwordText });
    viewFullPage();
  });

  it('ME-130491 Can I Validate Mousehover Over columns and sort columns in the Customer > CRM > Opportunities > Add Opportunities | Customer Regression | Sprint Regression', {
    tags: [
      '@customer',
      '@crm',
      '@customerOpportunities',
      '@p3',
      '@phase2',
    ],
  },
  () => {
    searchCustomer({ customerName: customerNameVal.customerName });
    navigateToCrmTab();
    openOpportunityInExpandView();
    waitSometime(longWait);
    //Adding opportunity
    openAddOpportunityModal();
    opportunityNameValue = opportunityName + generateRandomNumber();
    addOpportunity({ nameField: opportunityNameValue, opportunityTypeField: opportunityTypeValue });
    dropDownContainsTextClick({ element: drpdwnSource, typeText: sourceVal1, exactText: sourceVal1 });
    clickAction({ locator: btnSaveOpportunity });
    waitSometime(shortWait);
    openAddOpportunityModal();
    opportunityNameValue = opportunityName + generateRandomNumber();
    addOpportunity({ nameField: opportunityNameValue, opportunityTypeField: opportunityTypeValue, opportunityStageField: opportunityStageVal });
    addSourceCloseReason1();
    waitSometime(shortWait);
    openAddOpportunityModal();
    opportunityNameValue = opportunityName + generateRandomNumber();
    addOpportunity({ nameField: opportunityNameValue, opportunityTypeField: opportunityTypeValue, opportunityStageField: opportunityStageVal });
    addSourceCloseReason2();
    switchToClosedStatus();
    cy.log('***Opportunity table Source and CloseReason Column Hover over validations in Expand View***');
    verifyColHoverOverOpportunityTabs();
    cy.log('***Verifying sorting for Source and CloseReason Column header***');
    columnLocators.forEach((value) => {
      clickAndVerifyGridAlignment({ locator: tabExpandInteraction, element: value });
    });
  });
});