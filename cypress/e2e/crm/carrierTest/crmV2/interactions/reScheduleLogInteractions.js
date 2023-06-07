/*---------------------------------------------------------------------------------------------------------------
Verify Log Interaction in ReSchedule fields and tabing - UI Changes
Test Cases List
Authored By                   : Lingaswamy Kottha
Date                          : 11-04-2023
Functions/Calling References  : crmNotesPage, crmNotesData, utilities
Test case Included            : ME-137949 Can user validate Log Interaction > CRM > Interactions | Regression
------------------------------------------------------------------------------------------------------------------*/
import crmNotesData from '../../../../../testData/crm/crmData/crmNotesData.json';
import crmIndustryData from '../../../../../testData/crm/crmData/crmIndustryData.json';
import crmInteractionData from '../../../../../testData/crm/crmData/crmInteractionsData.json';
import * as crmInteractionsPage from '../../../../../pageObjects/crm/crmPage/crmInteractionsPage.json';
import * as customerUtils from '../../../../../utilities/customerUtils/customerUtils';
import {
  navigateToDocumentsTab,
} from '../../../../../utilities/carrierUtils/carrierUtils';
import * as genericUtils from '../../../../../utilities/commonUtils/genericUtils';
import { loginToApplication } from '../../../../../utilities/appSpecificUtils/loginUtils/loginUtils';
import * as portFolioUtils from '../../../../../utilities/crmUtils/portFolioUtils';
const { userName: usernameText, password: passwordText } =
  Cypress.env('users')[Cypress.env('appLoginUser')];
const {
  interactionLogOutCome,
  interactionLogType,
  interactionLogVia,
  durationVal,
  interactionLogReason,
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
describe('Can user validate Log Interaction ReSchedule > Carrier > CRM > Interactions | Carrier Regression | Regression [ME-142063, ME-142111, ME-142113, ME-142065]', () => {
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

  it('ME-142063 Can user validate Customer ReSchedule > Log Interaction  > CRM > Interactions | Carrier Regression | Regression',
    {
      tags: ['@carrier', '@crm', '@carrierInteractins', '@p1', '@phase1'],
    },
    () => {
      detailsVal = Math.random().toString(36);
      cy.log('***verifying Customer Create Log Interaction create***');
      customerUtils.searchCustomer({ customerName: customerNameVal.customerName });
      genericUtils.clickFirstElementIn({ locator: crmInteractionsPage.tabCrmCustomer });
      portFolioUtils.createNewLogInteraction(interactionsObjectiveVal, interactionLogVia, interactionLogOutCome, interactionLogType, durationVal, durationVal, detailsVal);
      portFolioUtils.reScheduleNewLogInteraction(interactionLogReason, detailsVal);
    },
  );
  it('ME-142111 Can user validate Carrier ReSchedule > Log Interaction  > CRM > Interactions | Carrier Regression | Regression',
    {
      tags: ['@carrier', '@crm', '@carrierInteractins', '@p1', '@phase1'],
    },
    () => {
      detailsVal = Math.random().toString(36);
      cy.log('***verifying Carrier Create Log Interaction ReSchedule***');
      detailsVal = Math.random().toString(36);
      navigateToDocumentsTab({ carrierName: carrierNameVal.carrierName });
      portFolioUtils.createNewLogInteraction(interactionsObjectiveVal, interactionLogVia, interactionLogOutCome, interactionLogType, durationVal, durationVal, detailsVal);
      portFolioUtils.reScheduleNewLogInteraction(interactionLogReason, detailsVal);
    },
  );
  it('ME-142113 Can user validate Carrier ReSchedule Order with Tab key   > Log Interaction  > CRM > Interactions | Carrier Regression | Regression',
    {
      tags: ['@carrier', '@crm', '@carrierInteractins', '@p1', '@phase1'],
    },
    () => {
      detailsVal = Math.random().toString(36);
      cy.log('***verifying Carrier Create Log Interaction ReSchedule***');
      detailsVal = Math.random().toString(36);
      navigateToDocumentsTab({ carrierName: carrierNameVal.carrierName });
      portFolioUtils.createNewLogInteraction(interactionsObjectiveVal, interactionLogVia, interactionLogOutCome, interactionLogType, durationVal, durationVal, detailsVal);
      portFolioUtils.reScheduleOrderWithTabKeyLogInteraction();
    },
  );
  it('ME-142065 Can user validate Customer ReSchedule Order with Tab key   > Log Interaction  > CRM > Interactions | Carrier Regression | Regression',
    {
      tags: ['@carrier', '@crm', '@CustomerInteractins', '@p1', '@phase1'],
    },
    () => {
      customerUtils.searchCustomer({ customerName: customerNameVal.customerName });
      genericUtils.clickFirstElementIn({ locator: crmInteractionsPage.tabCrmCustomer });
      portFolioUtils.createNewLogInteraction(interactionsObjectiveVal, interactionLogVia, interactionLogOutCome, interactionLogType, durationVal, durationVal, detailsVal);
      portFolioUtils.reScheduleOrderWithTabKeyLogInteraction();
    },
  );
});