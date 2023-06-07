/*---------------------------------------------------------------------------------------------------------------
View opportunity records in status filter order, Open, closed, on-hold
Test Cases List
Authored By                   : Mamatha Polapalli
Date                          : 25-04-2023
Functions/Calling References  : opportunitiesPage,carrierUtils,genericUtils,loginUtils
Test case Included            : ME-146465 - Validate opportunity records in status filteropen, closed, on-hold from Carrier & Customer > CRM  > Opportunities Tab > Edit Opportunity
---------------------------------------------------------------------------------------------------------------*/

import * as loginUtils from '../../../utilities/appSpecificUtils/loginUtils/loginUtils';
import * as genericUtils from '../../../utilities/commonUtils/genericUtils';
import * as carrierUtils from '../../../utilities/carrierUtils/carrierUtils';
import * as crmNotesData from '../../../testData/crm/crmData/crmNotesData.json';
import * as customerUtils from '../../../utilities/customerUtils/customerUtils';
import * as crmOpportunitiesPage from '../../../pageObjects/crm/opportunitiesPage/crmOpportunitiesPage.json';
import * as opportunitiesUtils from '../../../utilities/opportunitiesUtils/opportunitiesUtils';
import * as crmOpportunitiesData from '../../../testData/crm/crmData/crmOpportunitiesData.json';

const { userName: usernameText, password: passwordText } =
  Cypress.env('users')[Cypress.env('appLoginUser')];
let customerNameVal, carrierNameVal, opportunityTypeValue, opportunityNameValue;

describe('User Verifies opportunity records in status filteropen, closed, on-hold from Customer & Carrier > CRM > Opportunity Tab [ME-146465]', () => {
  beforeEach(() => {
    cy.log('***Creating Customer***');
    genericUtils.getTDMData({
      dataType: crmOpportunitiesData.staticData.tdmCustomerData,
      dataCondition: crmOpportunitiesData.staticData.tdmAddCustomerReq,
      dataScenario: crmOpportunitiesData.staticData.tdmCustomerScenario,
    });
    cy.then(() => {
      customerNameVal = Cypress.env('inputVal');
    });
    cy.log('***creating new carrier***');
    genericUtils.getTDMData({
      dataType: crmNotesData.staticData.tdmCarrierData,
      dataCondition: crmNotesData.staticData.tdmAddCarrierReq,
      dataScenario: crmNotesData.staticData.tdmCarrierScenarioNew,
    });
    cy.then(() => {
      carrierNameVal = Cypress.env('inputVal');
    });
    genericUtils.getMinionValues('customerCrmOpportunityType', 1).then((opportunityType) => {
      opportunityTypeValue = opportunityType[0];
    });
    loginUtils.loginToApplication({ username: usernameText, password: passwordText });
    genericUtils.viewFullPage();
  });
  it('[ME-146465] - Verify opportunity records in status filteropen, closed, on-hold from Customer && Carrier > CRM > Opportunity Tab | Customer Regression | Sprint Regression',
    {
      tags: [
        '@carrier',
        '@customer',
        '@crm',
        '@opportunities',
        '@p2',
      ],
    },
    () => {
      cy.log('***Validations in Customer CRM Tab***');
      customerUtils.navigateToOpportunitiesTab({ customerName: customerNameVal.customerName });
      opportunitiesUtils.openAddOpportunityModal();
      opportunityNameValue = crmOpportunitiesData.userDefined.opportunityName + genericUtils.generateRandomNumber();
      opportunitiesUtils.addOpportunity({ nameField: opportunityNameValue, opportunityTypeField: opportunityTypeValue });
      genericUtils.clickAction({ locator: crmOpportunitiesPage.btnSaveOpportunity });
      opportunitiesUtils.selectOpportunityStatusType(crmOpportunitiesData.expectedData.statusValue);
      opportunitiesUtils.selectOpportunityStatusType(crmOpportunitiesData.staticData.tblStatusArray[0]);
      cy.log('***Validations in Carrier CRM Tab***');
      carrierUtils.navigateToOpportunitiesTab({ carrierName: carrierNameVal.carrierName });
      opportunitiesUtils.openAddOpportunityModal();
      opportunityNameValue = crmOpportunitiesData.userDefined.opportunityName + genericUtils.generateRandomNumber();
      opportunitiesUtils.addOpportunity({ nameField: opportunityNameValue, opportunityTypeField: opportunityTypeValue });
      genericUtils.clickAction({ locator: crmOpportunitiesPage.btnSaveOpportunity });
      opportunitiesUtils.selectOpportunityStatusType(crmOpportunitiesData.expectedData.statusValue);
      opportunitiesUtils.selectOpportunityStatusType(crmOpportunitiesData.staticData.tblStatusArray[0]);
    });
});