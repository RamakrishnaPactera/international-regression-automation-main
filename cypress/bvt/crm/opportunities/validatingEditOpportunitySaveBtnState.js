/*---------------------------------------------------------------------------------------------------------------
Validating save button state in edit opportunity model popup Carrier/Customer
Test Cases List
Authored By                   : Dasari Santhosh
Date                          : 24-04-2023
Functions/Calling References  : customerUtils,carrierUtils,opportunityUtils,genericUtils
Test case Included            : ME-146452 Verify Save Opportunity button should enabled after editing existing value/s in  required and optional fields in Edit Opportunity Modal
                                ME-146454 Verify Save Opportunity button should disabled until editing/entering  value/s in  required and optional fields in Edit Opportunity Modal
---------------------------------------------------------------------------------------------------------------*/

import { loginToApplication } from '../../../utilities/appSpecificUtils/loginUtils/loginUtils';
import {
  clickAction,
  getTDMData,
  generateRandomNumber,
  viewFullPage,
  verifyIfDisabled,
  clickFirstElementIn,
  clearTextType,
  verifyIfEnabled,
} from '../../../utilities/commonUtils/genericUtils';
import { searchCarrier } from '../../../utilities/carrierUtils/carrierUtils';
import { navigateToCrmTab } from '../../../utilities/opportunitiesUtils/opportunitiesUtils';
import { searchCustomer } from '../../../utilities/customerUtils/customerUtils';
import crmContactsData from '../../../testData/crm/crmData/crmContactsData.json';
import crmOpportunitiesPage from '../../../pageObjects/crm/opportunitiesPage/crmOpportunitiesPage.json';
import opportunityPage from '../../../pageObjects/crm/opportunityPage/opportunityPage.json';
import crmIndustryData from '../../../testData/crm/crmData/crmIndustryData.json';
const { tdmAddCarrierReq, tdmCarrierData, tdmCarrierWithOpportunity } = crmContactsData.staticData;
const { btnSaveOpportunity, xIcon } = crmOpportunitiesPage;
const { tdmAddCustomerReq, tdmCustomerData, tdmCustomerWithOpportunity } = crmIndustryData.staticData;
const { userName: usernameText, password: passwordText } =
  Cypress.env('users')[Cypress.env('appLoginUser')];

let carrierNameVal, customerNameVal;
describe('Validating save button state in edit opportunity model popup Carrier/Customer > CRM > Opportunities Tab > Edit Opportunity [ME-146452,ME-146454]', () => {
  before(() => {
    cy.log('***creating new carrier***');
    //creating carrier using TDM
    getTDMData({ dataType: tdmCarrierData, dataCondition: tdmAddCarrierReq, dataScenario: tdmCarrierWithOpportunity });
    cy.then(() => {
      carrierNameVal = Cypress.env('inputVal');
    });

    //creating customer using TDM
    getTDMData({ dataType: tdmCustomerData, dataCondition: tdmAddCustomerReq, dataScenario: tdmCustomerWithOpportunity });
    cy.then(() => {
      customerNameVal = Cypress.env('inputVal');
    });
  });
  beforeEach(() => {
    loginToApplication({ username: usernameText, password: passwordText });
    viewFullPage();
  });
  it('ME-146452 Verify Save Opportunity button should enabled after editing existing value/s in  required and optional fields in Edit Opportunity Modal > CRM > Opportunities > Add Opportunities | Carrier Regression',
    {
      tags: ['@carrier', '@crm', '@ccarrierOpportunities', '@p1', '@bvt'],
    },
    () => {
      //carrier
      //opening existing carrier
      searchCarrier({ carrierName: carrierNameVal.carrierName });
      navigateToCrmTab();

      //opening edit opportunity popup
      clickFirstElementIn({ locator: crmOpportunitiesPage.btnKabob });
      clickFirstElementIn({ locator: crmOpportunitiesPage.btnEditOpportunities });

      //validating save button state after updating fields in popup and closing popup
      clearTextType({ element: opportunityPage.txtOpportunityName, typeText: generateRandomNumber() });
      verifyIfEnabled({ locator: btnSaveOpportunity });
      clickAction({ locator: xIcon });

      //customer
      //opening existing customer
      searchCustomer({ customerName: customerNameVal.customerName });
      navigateToCrmTab();

      //opening edit opportunity popup
      clickFirstElementIn({ locator: crmOpportunitiesPage.btnKabob });
      clickFirstElementIn({ locator: crmOpportunitiesPage.btnEditOpportunities });

      //validating save button state after updating fields in popup and closing popup
      clearTextType({ element: opportunityPage.txtOpportunityName, typeText: generateRandomNumber() });
      verifyIfEnabled({ locator: btnSaveOpportunity });
      clickAction({ locator: xIcon });
    });
  it('ME-146454 Verify Save Opportunity button should disabled until editing/entering  value/s in  required and optional fields in Edit Opportunity Modal > CRM > Opportunities > Add Opportunities | Customer Regression',
    {
      tags: ['@customer', '@crm', '@customerOpportunities', '@p1', '@bvt'],
    },
    () => {
      //carrier
      //opening existing carrier
      searchCarrier({ carrierName: carrierNameVal.carrierName });
      navigateToCrmTab();

      //opening edit opportunity popup
      clickFirstElementIn({ locator: crmOpportunitiesPage.btnKabob });
      clickFirstElementIn({ locator: crmOpportunitiesPage.btnEditOpportunities });

      //validating save button state before updating any fields in popup and closing popup
      verifyIfDisabled({ locator: btnSaveOpportunity });
      clickAction({ locator: xIcon });

      //customer
      //opening existing carrier
      searchCustomer({ customerName: customerNameVal.customerName });
      navigateToCrmTab();

      //opening edit opportunity popup
      clickFirstElementIn({ locator: crmOpportunitiesPage.btnKabob });
      clickFirstElementIn({ locator: crmOpportunitiesPage.btnEditOpportunities });

      //validating save button state before updating any fields in popup and closing popup
      verifyIfDisabled({ locator: btnSaveOpportunity });
      clickAction({ locator: xIcon });
    });
});