/*---------------------------------------------------------------------------------------------------------------
Verify Log Interaction location fields with different values - UI Changes
Test Cases List
Authored By                   : Lingaswamy Kottha
Date                          : 13-04-2023
Functions/Calling References  : crmNotesPage, crmNotesData, utilities
Test case Included            : ME-137448 Can user validate Log Interaction > CRM > Interactions | Regression
------------------------------------------------------------------------------------------------------------------*/
import crmNotesData from '../../../../../testData/crm/crmData/crmNotesData.json';
import crmIndustryData from '../../../../../testData/crm/crmData/crmIndustryData.json';
import * as crmInteractionsPage from '../../../../../pageObjects/crm/crmPage/crmInteractionsPage.json';
import * as customerUtils from '../../../../../utilities/customerUtils/customerUtils';
import crmInteractionData from '../../../../../testData/crm/crmData/crmInteractionsData.json';
import {
  navigateToDocumentsTab,
  //navigatescheduleLocationField,
  navigateInteractionsLog,
} from '../../../../../utilities/carrierUtils/carrierUtils';
import * as genericUtils from '../../../../../utilities/commonUtils/genericUtils';
import { loginToApplication } from '../../../../../utilities/appSpecificUtils/loginUtils/loginUtils';
import * as portFolioUtils from '../../../../../utilities/crmUtils/portFolioUtils';
const { userName: usernameText, password: passwordText } =
  Cypress.env('users')[Cypress.env('appLoginUser')];
const {
  locationBulkData,
  txtLocationAddress,
  txtLocationPhno,
  txtLocationUrl,
} = crmInteractionData.userDefinedData;
const {
  tdmAddCarrierReq,
  tdmCarrierData,
  tdmCarrierScenario,
} = crmNotesData.staticData;
const {
  tdmAddCustomerReq,
  tdmCustomerData,
  tdmCustomerScenario,
} = crmIndustryData.staticData;
let carrierNameVal, customerNameVal;
describe('Can user validate Log Interaction Localtion Field > Carrier > CRM > Interactions | Carrier Regression | Regression [ME-141479, ME-141497, ME-142138, ME-141493]', () => {
  before(() => {
    cy.log('***creating new carrier***');
    genericUtils.getTDMData({
      dataType: tdmCarrierData,
      dataCondition: tdmAddCarrierReq,
      dataScenario: tdmCarrierScenario,
    });
    cy.then(() => {
      carrierNameVal = Cypress.env('inputVal');
    });
    genericUtils.getTDMData({ dataType: tdmCustomerData, dataCondition: tdmAddCustomerReq, dataScenario: tdmCustomerScenario });
    cy.then(() => {
      customerNameVal = Cypress.env('inputVal');
    });
  });
  beforeEach(() => {
    loginToApplication({
      username: usernameText,
      password: passwordText,
    });
    genericUtils.viewFullPage();
  });
  //verify Location field with max limit ,box size should be stretched out
  //no * required field and  defaulted to blank
  it('ME-141479 Can user validate Customer Log Interaction Location > CRM > Interactions | Customer Regression | Regression',
    {
      tags: ['@carrier', '@crm', '@customerInteractins', '@p1', '@phase1'],
    },
    () => {
      cy.log('***verifying Customer Create Log Interaction Location Field***');
      customerUtils.searchCustomer({ customerName: customerNameVal.customerName });
      genericUtils.clickFirstElementIn({ locator: crmInteractionsPage.tabCrmCustomer });
      navigateInteractionsLog();
      portFolioUtils.scheduleLocationVal(locationBulkData);
    },
  );
  //Verify ocation field as URL, PhoneNumber, Address
  it('ME-141497 Can user validate Customer Log Interaction Location as URL > CRM > Interactions | Carrier Regression | Regression',
    {
      tags: ['@carrier', '@crm', '@customerInteractins', '@p1', '@phase1'],
    },
    () => {
      cy.log('***verifying Customer Create Log Interaction Location Field***');
      customerUtils.searchCustomer({ customerName: customerNameVal.customerName });
      genericUtils.clickFirstElementIn({ locator: crmInteractionsPage.tabCrmCustomer });
      navigateInteractionsLog();
      portFolioUtils.scheduleLocationFreeTextVal(txtLocationAddress, txtLocationPhno, txtLocationUrl);
    },
  );
  //verify Location field with max limit ,box size should be stretched out
  //no * required field and  defaulted to blank
  it('ME-142138 Can user validate Carrier View Log Interaction Location > CRM > Interactions | Carrier Regression | Regression',
    {
      tags: ['@carrier', '@crm', '@carrierInteractins', '@p1', '@phase1'],
    },
    () => {
      cy.log('***verifying Carrier Create Log Interaction Location Field***');
      navigateToDocumentsTab({ carrierName: carrierNameVal.carrierName });
      navigateInteractionsLog();
      portFolioUtils.scheduleLocationVal(locationBulkData);
    },
  );
  //Verify ocation field as URL, PhoneNumber, Address
  it('ME-141493 Can user  validate Carrier Create Log Interaction Location > CRM > Interactions | Carrier Regression | Regression',
    {
      tags: ['@carrier', '@crm', '@carrierInteractins', '@p1', '@phase1'],
    },
    () => {
      cy.log('***verifying Carrier Create Log Interaction Location Field***');
      navigateToDocumentsTab({ carrierName: carrierNameVal.carrierName });
      navigateInteractionsLog();
      portFolioUtils.scheduleLocationFreeTextVal(txtLocationAddress, txtLocationPhno, txtLocationUrl);
    },
  );
});