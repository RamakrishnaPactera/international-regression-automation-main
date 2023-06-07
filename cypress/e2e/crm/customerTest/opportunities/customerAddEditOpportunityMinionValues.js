/*---------------------------------------------------------------------------------------------------------------
Verify Customer CRM Opportunity Add and Edit opportunity and verify source and close reason dropdown values with minion values//
Test Cases List
Authored By                   : Mamatha Polapalli
Date                          : 28-03-2023
Functions/Calling References  : crmOpportunitiesPage,crmOpportunitiesData,opportunityUtils,utilities
Test case Included            : ME-130434 - Can I Validate Add and Edit Opportunity and Validate Minion Values in Customer > CRM > Opportunities > Add Opportunities
---------------------------------------------------------------------------------------------------------------*/

import {
  clickAction,
  dropDownContainsTextClick,
  getTDMData,
  getMinionValues,
  generateRandomNumber,
  viewFullPage,
  verifyIfDisabled,
  waitSometime,
} from '../../../../utilities/commonUtils/genericUtils';
import commondata from '../../../../testData/staticData/commonData/commonData.json';
import { loginToApplication } from '../../../../utilities/appSpecificUtils/loginUtils/loginUtils';
import { searchCustomer } from '../../../../utilities/customerUtils/customerUtils';
import crmOpportunitiesPage from '../../../../pageObjects/crm/opportunitiesPage/crmOpportunitiesPage.json';
import crmIndustryData from '../../../../testData/crm/crmData/crmIndustryData.json';
import crmOpportunitiesData from '../../../../testData/crm/crmData/crmOpportunitiesData.json';
import {
  addNameAndTypeOfOpportunity,
  chooseCloseReasonValue,
  navigateToCrmTab,
  openAddOpportunityModal,
  openEditOpportunityModal,
  openOpportunityInExpandView,
  switchToClosedStatus,
  verifyCloseReasonDropDownValues,
  verifyAddOpportunityDropDownValues,
} from '../../../../utilities/opportunitiesUtils/opportunitiesUtils';
const { longWait, shortWait } = commondata;
const {
  tdmAddCustomerReq,
  tdmCustomerData,
  tdmCustomerScenario,
} = crmIndustryData.staticData;
const {
  btnSaveOpportunity,
  drpdwnSource,
  drpdwnStage,
  drpdwnCloseReason,
} = crmOpportunitiesPage;
const {
  opportunityName,
} = crmOpportunitiesData.userDefined;
const { userName: usernameText, password: passwordText } = Cypress.env('users')[Cypress.env('appLoginUser')];
let opportunityNameValue, customerNameVal, opportunityTypeValue, opportunitySourceValue, crmOpportunityStage;
describe('Can I Validate Add and Edit Opportunity and Validate Minion Values in Customer > CRM > Opportunities Tab > Add Opportunity [ME-130434]', () => {
  beforeEach(() => {
    getMinionValues('customerCrmOpportunityType', 1).then((opportunityType) => {
      opportunityTypeValue = opportunityType[0];
    });
    getMinionValues('customerCrmOpportunitySource', 1).then((opportunitySource) => {
      opportunitySourceValue = opportunitySource[0];
    });
    getMinionValues('carrierCrmOpportunityStage', 1).then((opportunityStageField) => {
      crmOpportunityStage = opportunityStageField[0];
    });
    getTDMData({ dataType: tdmCustomerData, dataCondition: tdmAddCustomerReq, dataScenario: tdmCustomerScenario });
    cy.then(() => {
      customerNameVal = Cypress.env('inputVal');
    });
    loginToApplication({ username: usernameText, password: passwordText });
    viewFullPage();
  });
  it('ME-130434 Can I Validate Add and Edit Opportunity and Validate Minion Values in the Customer > CRM > Opportunities > Add Opportunities | Customer Regression | Sprint Regression', {
    tags: [
      '@customer',
      '@crm',
      '@customeropportunities',
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
    addNameAndTypeOfOpportunity({ nameField: opportunityNameValue, opportunityTypeField: opportunityTypeValue });
    verifyAddOpportunityDropDownValues();
    waitSometime(shortWait);
    dropDownContainsTextClick({ element: drpdwnSource, typeText: opportunitySourceValue, exactText: opportunitySourceValue });
    cy.log('***Verify If CloseReason Field is Disabled***');
    verifyIfDisabled({ locator: drpdwnCloseReason });
    verifyCloseReasonDropDownValues();
    dropDownContainsTextClick({ element: drpdwnStage, typeText: crmOpportunityStage, exactText: crmOpportunityStage });
    chooseCloseReasonValue({ stageField: crmOpportunityStage });
    clickAction({ locator: btnSaveOpportunity });
    //openOpportunityInExpandView();
    waitSometime(shortWait);
    switchToClosedStatus();
    cy.log('***Edit Recently Added Opportunity***');
    openEditOpportunityModal();
    opportunityNameValue = opportunityName + generateRandomNumber();
    addNameAndTypeOfOpportunity({ nameField: opportunityNameValue, opportunityTypeField: opportunityTypeValue });
    verifyAddOpportunityDropDownValues();
    dropDownContainsTextClick({ element: drpdwnSource, typeText: opportunitySourceValue, exactText: opportunitySourceValue });
    verifyCloseReasonDropDownValues();
    dropDownContainsTextClick({ element: drpdwnStage, typeText: crmOpportunityStage, exactText: crmOpportunityStage });
    chooseCloseReasonValue({ stageField: crmOpportunityStage });
    clickAction({ locator: btnSaveOpportunity });
  });
});