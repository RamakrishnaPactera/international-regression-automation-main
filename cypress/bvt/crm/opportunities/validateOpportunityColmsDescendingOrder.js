/*---------------------------------------------------------------------------------------------------------------
Validating order of opportunity table column data
Test Cases List
Authored By                   : Dasari Santhosh
Date                          : 25-04-2023
Functions/Calling References  : customerUtils,carrierUtils,opportunityUtils,genericUtils
Test case Included            : ME-146448 Verify the Updated Date/Time and Status column should sort by Descending order by-default in Opportunities Table
---------------------------------------------------------------------------------------------------------------*/

import { loginToApplication } from '../../../utilities/appSpecificUtils/loginUtils/loginUtils';
import {
  clickAction,
  getTDMData,
  generateRandomNumber,
  viewFullPage,
  getMinionValues,
  waitSometime,
  verifyDateListInDescendingOrder,
  verifyColumnDataInDescendingOrder,
} from '../../../utilities/commonUtils/genericUtils';
import { searchCarrier } from '../../../utilities/carrierUtils/carrierUtils';
import { addAndSaveOpportunityWithMandatoryFiedls, addOpportunity, navigateToCrmTab, openAddOpportunityModal, switchToClosedStatus } from '../../../utilities/opportunitiesUtils/opportunitiesUtils';
import { searchCustomer } from '../../../utilities/customerUtils/customerUtils';
import crmContactsData from '../../../testData/crm/crmData/crmContactsData.json';
import crmOpportunitiesPage from '../../../pageObjects/crm/opportunitiesPage/crmOpportunitiesPage.json';
import crmIndustryData from '../../../testData/crm/crmData/crmIndustryData.json';
import commonData from '../../../testData/staticData/commonData/commonData.json';
const { shortWait, moreWait, MinuteWait } = commonData;
const { tdmAddCarrierReq, tdmCarrierData, tdmCarrierScenario } = crmContactsData.staticData;
const { btnSaveOpportunity, updatedDateTimeColumnValues, statusColumnValues } = crmOpportunitiesPage;
const { tdmAddCustomerReq, tdmCustomerData, tdmCustomerScenario } = crmIndustryData.staticData;
const { userName: usernameText, password: passwordText } =
  Cypress.env('users')[Cypress.env('appLoginUser')];

let carrierNameVal, customerNameVal, opportunityTypeValue;
describe('Validating order of opportunity table column data [ME-146448]', () => {
  before(() => {
    cy.log('***creating new carrier***');
    //creating carrier using TDM
    getTDMData({ dataType: tdmCarrierData, dataCondition: tdmAddCarrierReq, dataScenario: tdmCarrierScenario });
    cy.then(() => {
      carrierNameVal = Cypress.env('inputVal');
    });

    //creating customer using TDM
    getTDMData({ dataType: tdmCustomerData, dataCondition: tdmAddCustomerReq, dataScenario: tdmCustomerScenario });
    cy.then(() => {
      customerNameVal = Cypress.env('inputVal');
    });

    getMinionValues('customerCrmOpportunityType', 1).then((opportunityType) => {
      opportunityTypeValue = opportunityType[0];
    });
  });
  beforeEach(() => {
    loginToApplication({ username: usernameText, password: passwordText });
    viewFullPage();
  });
  it('ME-146448 Verify the Updated Date/Time and Status column should sort by Descending order by-default in Opportunities Table > CRM > Opportunities',
    {
      tags: ['@customer', '@carrier', '@crm', '@opportunities', '@p1', '@bvt'],
    },
    () => {
      //carrier
      //opening existing carrier
      searchCarrier({ carrierName: carrierNameVal.carrierName });

      navigateToCrmTab();

      //adding 2 opportunity records
      addAndSaveOpportunityWithMandatoryFiedls({ nameField: generateRandomNumber(), opportunityTypeField: opportunityTypeValue });
      waitSometime(MinuteWait); //to validate updated date time column data giving 1 minute waiting period between 2 records
      addAndSaveOpportunityWithMandatoryFiedls({ nameField: generateRandomNumber(), opportunityTypeField: opportunityTypeValue });

      //verifying order of updated Data/Time column data in descending or not
      verifyDateListInDescendingOrder({ locator: updatedDateTimeColumnValues });
      switchToClosedStatus();
      waitSometime(shortWait);

      waitSometime(shortWait);
      openAddOpportunityModal();
      addOpportunity({ nameField: generateRandomNumber(), opportunityTypeField: opportunityTypeValue });
      clickAction({ locator: btnSaveOpportunity });
      waitSometime(moreWait);

      //verifying order of status column data in descending or not
      verifyColumnDataInDescendingOrder({ locator: statusColumnValues });

      //customer
      //opening existing carrier
      searchCustomer({ customerName: customerNameVal.customerName });
      navigateToCrmTab();

      //adding 2 opportunity records
      addAndSaveOpportunityWithMandatoryFiedls({ nameField: generateRandomNumber(), opportunityTypeField: opportunityTypeValue });
      waitSometime(MinuteWait);
      addAndSaveOpportunityWithMandatoryFiedls({ nameField: generateRandomNumber(), opportunityTypeField: opportunityTypeValue });

      //verifying order of updated Data/Time column data in descending or not
      verifyDateListInDescendingOrder({ locator: updatedDateTimeColumnValues });
      switchToClosedStatus();
      waitSometime(shortWait);

      //to validate updated date time column data giving 1 minute waiting period between 2 records
      openAddOpportunityModal();
      addOpportunity({ nameField: generateRandomNumber(), opportunityTypeField: opportunityTypeValue });
      clickAction({ locator: btnSaveOpportunity });
      waitSometime(moreWait);

      //verifying order of status column data in descending or not
      verifyColumnDataInDescendingOrder({ locator: statusColumnValues });
    });
});