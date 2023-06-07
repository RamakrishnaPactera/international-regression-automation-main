/*---------------------------------------------------------------------------------------------------------------
Verify Schedule Interaction - UI Changes
Test Cases List
Authored By                   : K.Santhosh
Date                          : 11-04-2023
Functions/Calling References  : crmNotesPage, crmNotesData, utilities
User Stories Included         : ME-137135 Can user validate Schedule Interaction > CRM > Interactions | Regression
------------------------------------------------------------------------------------------------------------------*/
import crmNotesData from '../../../../../../../testData/crm/crmData/crmNotesData.json';
import crmIndustryData from '../../../../../../../testData/crm/crmData/crmIndustryData.json';
import crmInteractionData from '../../../../../../../testData/crm/crmData/crmInteractionsData.json';
import * as crmInteractionsPage from '../../../../../../../pageObjects/crm/crmPage/crmInteractionsPage.json';
import * as customerUtils from '../../../../../../../utilities/customerUtils/customerUtils';
import {
  navigateToDocumentsTab,
  navigateInteractionsSchedule,
} from '../../../../../../../utilities/carrierUtils/carrierUtils';
import * as genericUtils from '../../../../../../../utilities/commonUtils/genericUtils';
import { loginToApplication } from '../../../../../../../utilities/appSpecificUtils/loginUtils/loginUtils';
import * as portFolioUtils from '../../../../../../../utilities/crmUtils/portFolioUtils';
const { userName: usernameText, password: passwordText } =
  Cypress.env('users')[Cypress.env('appLoginUser')];
const {
  durationVal,
  interactionLogOutCome,
  interactionLogType,
  interactionLogVia,
} = crmInteractionData.staticData;
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
let carrierNameVal, interactionsObjectiveVal, customerNameVal, detailsVal;

describe('Can user validate Schedule Interaction > Carrier > CRM > Interactions | Carrier Regression | Regression [ME-137135]', () => {
  before(() => {
    genericUtils.getMinionValues('customerCrmInteractionsObjective', 1).then((interactionsObjective) => {
      interactionsObjectiveVal = interactionsObjective[0];
    });
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

  it('ME-142094 Can user validate Carrier View Schedule Interaction  > CRM > Interactions | Carrier Regression | Regression',
    {
      tags: ['@carrier', '@crm', '@carrierDocuments', '@p1', '@phase1'],
    },
    () => {
      cy.log('***verifying Carrier Schedule Interaction view***');
      navigateToDocumentsTab({ carrierName: carrierNameVal.carrierName });
      navigateInteractionsSchedule();
    },
  );
  it('ME-142098 Can user  validate Carrier Create Schedule Interaction  > CRM > Interactions | Carrier Regression | Regression',
    {
      tags: ['@carrier', '@crm', '@carrierDocuments', '@p1', '@phase1'],
    },
    () => {
      cy.log('***verifying Carrier Schedule Interaction create***');
      detailsVal = Math.random().toString(36);
      navigateToDocumentsTab({ carrierName: carrierNameVal.carrierName });
      portFolioUtils.createNewScheduleInteraction(interactionsObjectiveVal, interactionLogVia, interactionLogOutCome, interactionLogType, durationVal, durationVal, detailsVal);
    },
  );
  it('ME-141477 Can user validate Customer View Schedule Interaction  > CRM > Interactions | Customer Regression | Regression',
    {
      tags: ['@carrier', '@crm', '@carrierDocuments', '@p1', '@phase1'],
    },
    () => {
      cy.log('***verifying Customer Schedule Interaction view***');
      customerUtils.searchCustomer({ customerName: customerNameVal.customerName });
      genericUtils.clickFirstElementIn({ locator: crmInteractionsPage.tabCrmCustomer });
      navigateInteractionsSchedule();
    },
  );
  it('ME-141491 Can user validate Customer Schedule Interaction  > CRM > Interactions | Carrier Regression | Regression',
    {
      tags: ['@carrier', '@crm', '@carrierDocuments', '@p1', '@phase1'],
    },
    () => {
      detailsVal = Math.random().toString(36);
      cy.log('***verifying Customer Create Schedule Interaction create***');
      customerUtils.searchCustomer({ customerName: customerNameVal.customerName });
      genericUtils.clickFirstElementIn({ locator: crmInteractionsPage.tabCrmCustomer });
      portFolioUtils.createNewScheduleInteraction(interactionsObjectiveVal, interactionLogVia, interactionLogOutCome, interactionLogType, durationVal, durationVal, detailsVal);
    },
  );
  it('ME-142097 Can user validate Carrier Schedule Interaction fields order with Tab key > CRM > Interactions | Carrier Regression | Regression',
    {
      tags: ['@carrier', '@crm', '@carrierDocuments', '@p1', '@phase1'],
    },
    () => {
      navigateToDocumentsTab({ carrierName: carrierNameVal.carrierName });
      navigateInteractionsSchedule();
      portFolioUtils.enterTabNewScheduleInteraction();
    },
  );
  it('ME-141486 Can user validate Customer Schedule Interaction fields order with Tab key > CRM > Interactions | Carrier Regression | Regression',
    {
      tags: ['@carrier', '@crm', '@carrierDocuments', '@p1', '@phase1'],
    },
    () => {
      customerUtils.searchCustomer({ customerName: customerNameVal.customerName });
      genericUtils.clickFirstElementIn({ locator: crmInteractionsPage.tabCrmCustomer });
      navigateInteractionsSchedule();
      portFolioUtils.enterTabNewScheduleInteraction();
    },
  );
});