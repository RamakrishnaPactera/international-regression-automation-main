/*---------------------------------------------------------------------------------------------------------------
Verify Duration field Log Interaction
Test Cases List
Authored By                   : Utkarsh Mandavkar
Date                          : 12-05-2023
Functions/Calling References  : customerUtils, genericUtils, carrierUtils,portFolioUtils,loginUtils
Test case Included            : [ME-151966, ME-152032] Can user validate Duration field in Log Interaction > Edit > CRM > Interactions | Carrier Regression | Regression
------------------------------------------------------------------------------------------------------------------*/
import crmNotesData from '../../../../../testData/crm/crmData/crmNotesData.json';
import crmIndustryData from '../../../../../testData/crm/crmData/crmIndustryData.json';
import crmInteractionData from '../../../../../testData/crm/crmData/crmInteractionsData.json';
import * as crmInteractionsPage from '../../../../../pageObjects/crm/crmPage/crmInteractionsPage.json';
import * as customerUtils from '../../../../../utilities/customerUtils/customerUtils';
import * as carrierUtils from '../../../../../utilities/carrierUtils/carrierUtils';
import * as genericUtils from '../../../../../utilities/commonUtils/genericUtils';
import { loginToApplication } from '../../../../../utilities/appSpecificUtils/loginUtils/loginUtils';
import * as portFolioUtils from '../../../../../utilities/crmUtils/portFolioUtils';
const { userName: usernameText, password: passwordText } =
  Cypress.env('users')[Cypress.env('appLoginUser')];
const {
  durationVal,
  interactionLogOutComeval,
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

describe('Can user validate Duration field in Log Interaction > Edit > CRM > Interactions | Carrier Regression | Regression [ME-151966, ME-152032]', () => {
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
  it('ME-151966 Can user validate Duration field in Log Interaction > CRM > Interactions | Customer Regression | Regression',
    {
      tags: ['@carrier', '@crm', '@customerInteractins', '@p1', '@phase1'],
    },
    () => {
      detailsVal = Math.random().toString(36);
      cy.log('***verifying Customer Create Log Interaction create***');
      customerUtils.searchCustomer({ customerName: customerNameVal.customerName });
      genericUtils.clickFirstElementIn({ locator: crmInteractionsPage.tabCrmCustomer });
      portFolioUtils.createNewLogInteractionWithDuration(interactionsObjectiveVal, interactionLogVia, interactionLogOutComeval, interactionLogType, durationVal, durationVal, detailsVal);
      portFolioUtils.enterTabEditLogInteraction(interactionsObjectiveVal, interactionLogVia, interactionLogOutComeval, interactionLogType, durationVal, durationVal, detailsVal);
    },
  );
  it('ME-152032 Can user validate Duration field in Log Interaction > CRM > Interactions | Carrier Regression | Regression',
    {
      tags: ['@carrier', '@crm', '@carrierInteractins', '@p1', '@phase1'],
    },
    () => {
      detailsVal = Math.random().toString(36);
      cy.log('***verifying Carrier Create Log Interaction create***');
      carrierUtils.searchCarrier({ carrierName: carrierNameVal.carrierName });
      genericUtils.clickFirstElementIn({ locator: crmInteractionsPage.tabCrmCarrier });
      portFolioUtils.createNewLogInteractionWithDuration(interactionsObjectiveVal, interactionLogVia, interactionLogOutComeval, interactionLogType, durationVal, durationVal, detailsVal);
      portFolioUtils.enterTabEditLogInteraction(interactionsObjectiveVal, interactionLogVia, interactionLogOutComeval, interactionLogType, durationVal, durationVal, detailsVal);
    },
  );
});