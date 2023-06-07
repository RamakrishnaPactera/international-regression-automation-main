/*---------------------------------------------------------------------------------------------------------------
Verify Carrier CRM Opportunity, source and close reason dropdown values with minion values
Test Cases List
Authored By                   : Mamatha Polapalli
Date                          : 28-03-2023
Functions/Calling References  : crmOpportunitiesPage,crmOpportunitiesData,opportunityUtils,utilities
Test case Included            : ME-130928 - Can I Validate Opportunity source and close reason dropdown values with minion values > CRM > Opportunities > Add Opportunities
---------------------------------------------------------------------------------------------------------------*/

import commonData from '../../../../testData/staticData/commonData/commonData.json';
import { loginToApplication } from '../../../../utilities/appSpecificUtils/loginUtils/loginUtils';
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
import crmContactsData from '../../../../testData/crm/crmData/crmContactsData.json';
import crmOpportunitiesPage from '../../../../pageObjects/crm/opportunitiesPage/crmOpportunitiesPage.json';
import { searchCarrier } from '../../../../utilities/carrierUtils/carrierUtils';
import {
  addNameAndTypeOfOpportunity,
  chooseCloseReasonValue,
  navigateToCrmTab,
  openEditOpportunityModal,
  openAddOpportunityModal,
  openOpportunityInExpandView,
  switchToClosedStatus,
  verifyAddOpportunityDropDownValues,
  verifyCloseReasonDropDownValues,
} from '../../../../utilities/opportunitiesUtils/opportunitiesUtils';
import crmOpportunitiesData from '../../../../testData/crm/crmData/crmOpportunitiesData.json';
const {
  tdmAddCarrierReq,
  tdmCarrierData,
  tdmCarrierScenario,
} = crmContactsData.staticData;
const {
  btnSaveOpportunity,
  drpdwnSource,
  drpdwnStage,
  drpdwnCloseReason,
} = crmOpportunitiesPage;
const {
  opportunityName,
} = crmOpportunitiesData.userDefined;
const { shortWait, longWait } = commonData;
const { userName: usernameText, password: passwordText } =
  Cypress.env('users')[Cypress.env('appLoginUser')];

let carrierNameVal, opportunityTypeValue, opportunitySourceValue, crmOpportunityStage, opportunityNameValue;
describe('Can I Validate MouseHover Over columns and sort columns in the Carrier > CRM > Opportunities Tab > Add Opportunity [ME-130928]', () => {
  before(() => {
    cy.log('***creating new carrier***');
    getTDMData({ dataType: tdmCarrierData, dataCondition: tdmAddCarrierReq, dataScenario: tdmCarrierScenario });
    cy.then(() => {
      carrierNameVal = Cypress.env('inputVal');
    });
    getMinionValues('customerCrmOpportunityType', 1).then((opportunityType) => {
      opportunityTypeValue = opportunityType[0];
    });
    getMinionValues('customerCrmOpportunitySource', 1).then((opportunitySource) => {
      opportunitySourceValue = opportunitySource[0];
    });
    getMinionValues('carrierCrmOpportunityStage', 1).then((opportunityStageField) => {
      crmOpportunityStage = opportunityStageField[0];
    });
  });
  beforeEach(() => {
    loginToApplication({ username: usernameText, password: passwordText });
    viewFullPage();
  });
  it('ME-130928 Can I Validate MouseHover Over columns and sort columns in the Carrier > CRM > Opportunities > Add Opportunities | Carrier Regression | Sprint Regression',
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