/*---------------------------------------------------------------------------------------------------------------
Verify Log Interaction all fields, labels and tabing - UI Changes
Test Cases List
Authored By                   : Lingaswamy Kottha
Date                          : 10-04-2023
Functions/Calling References  : crmNotesPage, crmNotesData, utilities
Test case Included            : ME-140871 Can user validate Log Interaction > CRM > Interactions | Regression
------------------------------------------------------------------------------------------------------------------*/
import crmNotesData from '../../../../../testData/crm/crmData/crmNotesData.json';
import crmIndustryData from '../../../../../testData/crm/crmData/crmIndustryData.json';
import crmInteractionData from '../../../../../testData/crm/crmData/crmInteractionsData.json';
import * as crmInteractionsPage from '../../../../../pageObjects/crm/crmPage/crmInteractionsPage.json';
import * as customerUtils from '../../../../../utilities/customerUtils/customerUtils';
import {
  navigateToDocumentsTab,
  navigateInteractionsLog,
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
describe('Can user validate Log Interaction > Carrier > CRM > Interactions | Carrier Regression | Regression [ME-137133, ME-142084, ME-142086, ME-141373, ME-142086, ME-141386]', () => {
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
  //Verify Verify Log Interaction all fields, labels
  it('ME-137133 Can user validate Carrier View Log Interaction  > CRM > Interactions | Carrier Regression | Regression',
    {
      tags: ['@carrier', '@crm', '@carrierInteractins', '@p1', '@phase1'],
    },
    () => {
      cy.log('***verifying Carrier > Log Interaction view***');
      navigateToDocumentsTab({ carrierName: carrierNameVal.carrierName });
      navigateInteractionsLog();
    },
  );
  it('ME-142084 Can user  validate Carrier Create Log Interaction  > CRM > Interactions | Carrier Regression | Regression',
    {
      tags: ['@carrier', '@crm', '@carrierInteractins', '@p1', '@phase1'],
    },
    () => {
      cy.log('***verifying Carrier Log Interaction create***');
      detailsVal = Math.random().toString(36);
      navigateToDocumentsTab({ carrierName: carrierNameVal.carrierName });
      portFolioUtils.createNewLogInteraction(interactionsObjectiveVal, interactionLogVia, interactionLogOutCome, interactionLogType, durationVal, durationVal, detailsVal);
    },
  );
  it('ME-142086 Can user validate Customer View Log Interaction  > CRM > Interactions | Carrier Regression | Regression',
    {
      tags: ['@carrier', '@crm', '@CustomerInteractins', '@p1', '@phase1'],
    },
    () => {
      cy.log('***verifying Customer Log Interaction view***');
      customerUtils.searchCustomer({ customerName: customerNameVal.customerName });
      genericUtils.clickFirstElementIn({ locator: crmInteractionsPage.tabCrmCustomer });
      navigateInteractionsLog();
    },
  );
  it('ME-141373 Can user validate Customer Log Interaction  > CRM > Interactions | Carrier Regression | Regression',
    {
      tags: ['@carrier', '@crm', '@CustomerInteractins', '@p1', '@phase1'],
    },
    () => {
      detailsVal = Math.random().toString(36);
      cy.log('***verifying Customer Create Log Interaction create***');
      customerUtils.searchCustomer({ customerName: customerNameVal.customerName });
      genericUtils.clickFirstElementIn({ locator: crmInteractionsPage.tabCrmCustomer });
      portFolioUtils.createNewLogInteraction(interactionsObjectiveVal, interactionLogVia, interactionLogOutCome, interactionLogType, durationVal, durationVal, detailsVal);
    },
  );
  //Verify Log Interaction all fields, labels and tabing
  it('ME-142086 Can user validate Carrier Log Interaction fields order with Tab key > CRM > Interactions | Carrier Regression | Regression',
    {
      tags: ['@carrier', '@crm', '@carrierInteractins', '@p1', '@phase1'],
    },
    () => {
      navigateToDocumentsTab({ carrierName: carrierNameVal.carrierName });
      navigateInteractionsLog();
      portFolioUtils.enterTabNewLogInteraction();
    },
  );
  it('ME-141386 Can user validate Customer Log Interaction fields order with Tab key > CRM > Interactions | Carrier Regression | Regression',
    {
      tags: ['@carrier', '@crm', '@carrierInteractins', '@p1', '@phase1'],
    },
    () => {
      customerUtils.searchCustomer({ customerName: customerNameVal.customerName });
      genericUtils.clickFirstElementIn({ locator: crmInteractionsPage.tabCrmCustomer });
      navigateInteractionsLog();
      portFolioUtils.enterTabNewLogInteraction();
    },
  );
});