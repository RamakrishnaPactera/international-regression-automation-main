/*---------------------------------------------------------------------------------------------------------------
Validating edit and save opportunity functionality for Carrier/Customer
Test Cases List
Authored By                   : Dasari Santhosh
Date                          : 27-04-2023
Functions/Calling References  : customerUtils,carrierUtils,opportunityUtils,genericUtils
Test case Included            : ME-146456 Verify user able to save a Opportunity via Kabob menu
---------------------------------------------------------------------------------------------------------------*/

import { loginToApplication } from '../../../utilities/appSpecificUtils/loginUtils/loginUtils';
import {
  getTDMData,
  generateRandomNumber,
  viewFullPage,
} from '../../../utilities/commonUtils/genericUtils';
import { searchCarrier } from '../../../utilities/carrierUtils/carrierUtils';
import { navigateToCrmTab } from '../../../utilities/opportunitiesUtils/opportunitiesUtils';
import { editOpportunitiesFields, searchCustomer } from '../../../utilities/customerUtils/customerUtils';
import crmOpportunitiesData from '../../../testData/crm/crmData/crmOpportunitiesData.json';
const { tdmAddCarrierReq, tdmCarrierData, tdmCarrierNewOppOpen, tdmAddCustomerReq, tdmCustomerData, tdmCustomerNewOppOpen } = crmOpportunitiesData.staticData;
const { userName: usernameText, password: passwordText } = Cypress.env('users')[Cypress.env('appLoginUser')];

let carrierNameVal, customerNameVal;
describe('Validating edit and save opportunity functionality for Carrier/Customer > CRM > Opportunities Tab > Edit Opportunity [ME-146456]', () => {
  before(() => {
    cy.log('***creating new carrier***');
    //creating carrier using TDM
    getTDMData({ dataType: tdmCarrierData, dataCondition: tdmAddCarrierReq, dataScenario: tdmCarrierNewOppOpen });
    cy.then(() => {
      carrierNameVal = Cypress.env('inputVal');
    });

    //creating customer using TDM
    getTDMData({ dataType: tdmCustomerData, dataCondition: tdmAddCustomerReq, dataScenario: tdmCustomerNewOppOpen });
    cy.then(() => {
      customerNameVal = Cypress.env('inputVal');
    });
  });
  beforeEach(() => {
    loginToApplication({ username: usernameText, password: passwordText });
    viewFullPage();
  });
  it('ME-146456 Verify user able to save a Opportunity via Kabob menu > CRM > Opportunities > Edit Opportunities',
    {
      tags: ['@carrier', '@customer', '@crm', '@Opportunities', '@p1', '@bvt'],
    },
    () => {
      //carrier
      //opening existing carrier
      searchCarrier({ carrierName: carrierNameVal.carrierName });

      navigateToCrmTab();
      const randomOppCarrierName = generateRandomNumber();
      editOpportunitiesFields(randomOppCarrierName);

      //customer
      //opening existing customer
      searchCustomer({ customerName: customerNameVal.customerName });
      navigateToCrmTab();

      const randomOppCustomerName = generateRandomNumber();
      editOpportunitiesFields(randomOppCustomerName);
    });
});