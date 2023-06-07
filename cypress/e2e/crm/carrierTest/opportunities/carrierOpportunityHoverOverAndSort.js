/*---------------------------------------------------------------------------------------------------------------
Verify Carrier CRM Opportunity Mousehover Over Columns and sorting the columns//
Test Cases List
Authored By                   : Mamatha Polapalli
Date                          : 28-03-2023
Functions/Calling References  : crmOpportunitiesPage,crmOpportunitiesData,opportunityUtils,utilities
Test case Included            : ME-130927 - Can I Validate Opportunity Tab Mouse Hover Over Column And Sort Columns > CRM > Opportunities > Add Opportunities
---------------------------------------------------------------------------------------------------------------*/

import commonData from '../../../../testData/staticData/commonData/commonData.json';
import { loginToApplication } from '../../../../utilities/appSpecificUtils/loginUtils/loginUtils';
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
import crmContactsData from '../../../../testData/crm/crmData/crmContactsData.json';
import crmOpportunitiesPage from '../../../../pageObjects/crm/opportunitiesPage/crmOpportunitiesPage.json';
import { searchCarrier } from '../../../../utilities/carrierUtils/carrierUtils';
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
import crmOpportunitiesData from '../../../../testData/crm/crmData/crmOpportunitiesData.json';
import crmInteractionsPage from '../../../../pageObjects/crm/crmPage/crmInteractionsPage.json';
const {
  tdmAddCarrierReq,
  tdmCarrierData,
  tdmCarrierScenario,
} = crmContactsData.staticData;
const {
  btnSaveOpportunity,
  colSource,
  closeReasonHeader,
  drpdwnSource,
} = crmOpportunitiesPage;
const {
  sourceVal1,
} = crmOpportunitiesData.staticData;
const {
  tabExpandInteraction,
} = crmInteractionsPage;
const {
  opportunityName,
} = crmOpportunitiesData.userDefined;
const columnLocators = [
  colSource,
  closeReasonHeader,
];
const { shortWait, longWait } = commonData;
const { userName: usernameText, password: passwordText } =
  Cypress.env('users')[Cypress.env('appLoginUser')];

let carrierNameVal, opportunityTypeValue, opportunityStageVal, opportunityNameValue;
describe('Can I Validate MouseHover Over columns and sort columns in the Carrier > CRM > Opportunities Tab > Add Opportunity [ME-130927]', () => {
  before(() => {
    cy.log('***creating new carrier***');
    getTDMData({ dataType: tdmCarrierData, dataCondition: tdmAddCarrierReq, dataScenario: tdmCarrierScenario });
    cy.then(() => {
      carrierNameVal = Cypress.env('inputVal');
    });
    getMinionValues('customerCrmOpportunityType', 1).then((opportunityType) => {
      opportunityTypeValue = opportunityType[0];
    });
  });
  beforeEach(() => {
    loginToApplication({ username: usernameText, password: passwordText });
    viewFullPage();
  });
  it('ME-130927 Can I Validate MouseHover Over columns and sort columns in the Carrier > CRM > Opportunities > Add Opportunities | Carrier Regression | Sprint Regression',
    {
      tags: [
        '@carrier',
        '@crm',
        '@carrierDetails',
        '@carrierIndustries',
        '@p1',
      ],
    },
    () => {
      searchCarrier({ carrierName: carrierNameVal.carrierName });
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