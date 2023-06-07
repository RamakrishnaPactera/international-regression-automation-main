/*---------------------------------------------------------------------------------------------------------------
Verify Schedule Interaction - UI Changes
Test Cases List
Authored By                   : K.Santhosh
Date                          : 13-04-2023
Functions/Calling References  : crmNotesPage, crmNotesData, utilities
User Stories Included         : ME-137484 Can user validate Schedule Interaction > CRM > Interactions | Regression
------------------------------------------------------------------------------------------------------------------*/
import crmNotesData from '../../../../../../../testData/crm/crmData/crmNotesData.json';
import crmIndustryData from '../../../../../../../testData/crm/crmData/crmIndustryData.json';
import * as crmInteractionsPage from '../../../../../../../pageObjects/crm/crmPage/crmInteractionsPage.json';
import * as customerUtils from '../../../../../../../utilities/customerUtils/customerUtils';
import crmInteractionData from '../../../../../../../testData/crm/crmData/crmInteractionsData.json';
import {
  navigateToDocumentsTab,
  navigatescheduleLocationField,
} from '../../../../../../../utilities/carrierUtils/carrierUtils';
import * as genericUtils from '../../../../../../../utilities/commonUtils/genericUtils';
import { loginToApplication } from '../../../../../../../utilities/appSpecificUtils/loginUtils/loginUtils';
import * as portFolioUtils from '../../../../../../../utilities/crmUtils/portFolioUtils';
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

describe('Can user validate Schedule Interaction > Carrier > CRM > Interactions | Carrier Regression | Regression [ME-137484]', () => {
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

  it('ME-142074 Can user validate Customer Schedule Interaction Location > CRM > Interactions | Customer Regression | Regression',
    {
      tags: ['@carrier', '@crm', '@carrierDocuments', '@p1', '@phase1'],
    },
    () => {
      cy.log('***verifying Customer Schedule Interaction view***');
      customerUtils.searchCustomer({ customerName: customerNameVal.customerName });
      genericUtils.clickFirstElementIn({ locator: crmInteractionsPage.tabCrmCustomer });
      navigatescheduleLocationField();
      portFolioUtils.scheduleLocationVal(locationBulkData);
    },
  );
  it('ME-142080 Can user validate Customer Schedule Interaction Location > CRM > Interactions | Carrier Regression | Regression',
    {
      tags: ['@carrier', '@crm', '@carrierDocuments', '@p1', '@phase1'],
    },
    () => {
      cy.log('***verifying Customer Create Schedule Interaction create***');
      customerUtils.searchCustomer({ customerName: customerNameVal.customerName });
      genericUtils.clickFirstElementIn({ locator: crmInteractionsPage.tabCrmCustomer });
      navigatescheduleLocationField();
      portFolioUtils.scheduleLocationFreeTextVal(txtLocationAddress, txtLocationPhno, txtLocationUrl);
    },
  );
  it('ME-142124 Can user validate Carrier View Schedule Interaction Location > CRM > Interactions | Carrier Regression | Regression',
    {
      tags: ['@carrier', '@crm', '@carrierDocuments', '@p1', '@phase1'],
    },
    () => {
      cy.log('***verifying Carrier Schedule Interaction view***');
      navigateToDocumentsTab({ carrierName: carrierNameVal.carrierName });
      navigatescheduleLocationField();
      portFolioUtils.scheduleLocationVal(locationBulkData);
    },
  );
  it('ME-142130 Can user  validate Carrier Create Schedule Interaction Location > CRM > Interactions | Carrier Regression | Regression',
    {
      tags: ['@carrier', '@crm', '@carrierDocuments', '@p1', '@phase1'],
    },
    () => {
      cy.log('***verifying Carrier Schedule Interaction view***');
      navigateToDocumentsTab({ carrierName: carrierNameVal.carrierName });
      navigatescheduleLocationField();
      portFolioUtils.scheduleLocationFreeTextVal(txtLocationAddress, txtLocationPhno, txtLocationUrl);
    },
  );
});