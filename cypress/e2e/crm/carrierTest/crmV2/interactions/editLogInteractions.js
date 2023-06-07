/*---------------------------------------------------------------------------------------------------------------
Verify Log Interaction Edit and tabing - UI Changes
Test Cases List
Authored By                   : Lingaswamy Kottha
Date                          : 11-04-2023
Functions/Calling References  : crmNotesPage, crmNotesData, utilities
Test case Included            : ME-137136 Can user validate Log Interaction > CRM > Interactions | Regression
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
  locationVal,
  interactionLogOutComeDeadEnd,
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
detailsVal = Math.random().toString(36);

describe('Can user validate Log Interaction > Edit > CRM > Interactions | Carrier Regression | Regression [ME-141576, ME-142103, ME-142105, ME-141580]', () => {
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
  it('ME-141576 Can user validate Customer Log Interaction Edit > CRM > Interactions | Customer Regression | Regression',
    {
      tags: ['@carrier', '@crm', '@customerInteractins', '@p1', '@phase1'],
    },
    () => {
      detailsVal = Math.random().toString(36);
      cy.log('***verifying Customer Create Log Interaction create***');
      customerUtils.searchCustomer({ customerName: customerNameVal.customerName });
      genericUtils.clickFirstElementIn({ locator: crmInteractionsPage.tabCrmCustomer });
      portFolioUtils.createNewLogInteraction(interactionsObjectiveVal, interactionLogVia, interactionLogOutCome, interactionLogType, durationVal, durationVal, detailsVal);
      portFolioUtils.editNewLogInteraction(interactionLogOutComeDeadEnd, durationVal, locationVal);
    },
  );
  it('ME-142103 Can user validate Carrier Log Interaction Edit > CRM > Interactions | Carrier Regression | Regression',
    {
      tags: ['@carrier', '@crm', '@carrierInteractins', '@p1', '@phase1'],
    },
    () => {
      detailsVal = Math.random().toString(36);
      navigateToDocumentsTab({ carrierName: carrierNameVal.carrierName });
      portFolioUtils.createNewLogInteraction(interactionsObjectiveVal, interactionLogVia, interactionLogOutCome, interactionLogType, durationVal, durationVal, detailsVal);
      portFolioUtils.editNewLogInteraction(interactionLogOutComeDeadEnd, durationVal, locationVal);
    },
  );
  it('ME-142105 Can user validate Carrier Log Interaction Edit fields order with Tab key > CRM > Interactions | Carrier Regression | Regression',
    {
      tags: ['@carrier', '@crm', '@carrierInteractins', '@p1', '@phase1'],
    },
    () => {
      detailsVal = Math.random().toString(36);
      navigateToDocumentsTab({ carrierName: carrierNameVal.carrierName });
      portFolioUtils.createNewLogInteraction(interactionsObjectiveVal, interactionLogVia, interactionLogOutCome, interactionLogType, durationVal, durationVal, detailsVal);
      portFolioUtils.enterTabEditLogInteraction();
    },
  );
  it('ME-141580 Can user validate Customer Log Interaction Edit fields order with Tab key > CRM > Interactions | Carrier Regression | Regression',
    {
      tags: ['@carrier', '@crm', '@customerInteractins', '@p1', '@phase1'],
    },
    () => {
      customerUtils.searchCustomer({ customerName: customerNameVal.customerName });
      genericUtils.clickFirstElementIn({ locator: crmInteractionsPage.tabCrmCustomer });
      portFolioUtils.createNewLogInteraction(interactionsObjectiveVal, interactionLogVia, interactionLogOutCome, interactionLogType, durationVal, durationVal, detailsVal);
      portFolioUtils.enterTabEditLogInteraction();
    },
  );
});