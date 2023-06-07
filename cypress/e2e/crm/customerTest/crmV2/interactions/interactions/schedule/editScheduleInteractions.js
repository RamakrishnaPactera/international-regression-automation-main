/*---------------------------------------------------------------------------------------------------------------
Verify Schedule Interaction - UI Changes edit
Test Cases List
Authored By                   : K.Santhosh
Date                          : 12-04-2023
Functions/Calling References  : crmNotesPage, crmNotesData, utilities
User Stories Included         : ME-137135 Can user validate Schedule Interaction > CRM > Interactions | Regression
                              : ME-137484 Can user validate Schedule Interaction > CRM > Interactions | Regression
------------------------------------------------------------------------------------------------------------------*/
import crmNotesData from '../../../../../../../testData/crm/crmData/crmNotesData.json';
import crmIndustryData from '../../../../../../../testData/crm/crmData/crmIndustryData.json';
import crmInteractionData from '../../../../../../../testData/crm/crmData/crmInteractionsData.json';
import * as crmInteractionsPage from '../../../../../../../pageObjects/crm/crmPage/crmInteractionsPage.json';
import * as customerUtils from '../../../../../../../utilities/customerUtils/customerUtils';
import {
  navigateToDocumentsTab,
} from '../../../../../../../utilities/carrierUtils/carrierUtils';
import * as genericUtils from '../../../../../../../utilities/commonUtils/genericUtils';
import { loginToApplication } from '../../../../../../../utilities/appSpecificUtils/loginUtils/loginUtils';
import * as portFolioUtils from '../../../../../../../utilities/crmUtils/portFolioUtils';
const { userName: usernameText, password: passwordText } =
  Cypress.env('users')[Cypress.env('appLoginUser')];
const {
  durationVal,
  interactionLogOutCome,
  interactionLogOutComeDeadEnd,
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

describe('Can user validate Schedule Interaction > Edit > CRM > Interactions | Carrier Regression | Regression [ME-137135, ME-137484 ]', () => {
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
  it('ME-141495, ME-142083 Can user validate Customer Schedule Interaction Edit > CRM > Interactions | Customer Regression | Regression',
    {
      tags: ['@carrier', '@crm', '@carrierDocuments', '@p1', '@phase1'],
    },
    () => {
      detailsVal = Math.random().toString(36);
      cy.log('***verifying Customer Create Schedule Interaction create***');
      customerUtils.searchCustomer({ customerName: customerNameVal.customerName });
      genericUtils.clickFirstElementIn({ locator: crmInteractionsPage.tabCrmCustomer });
      portFolioUtils.createNewScheduleInteraction(interactionsObjectiveVal, interactionLogVia, interactionLogOutCome, interactionLogType, durationVal, durationVal, detailsVal);
      portFolioUtils.editNewScheduleInteraction(interactionLogOutComeDeadEnd, durationVal, durationVal);
    },
  );
  it('ME-142099, ME-142133 Can user validate Carrier Schedule Interaction Edit > CRM > Interactions | Carrier Regression | Regression',
    {
      tags: ['@carrier', '@crm', '@carrierDocuments', '@p1', '@phase1'],
    },
    () => {
      detailsVal = Math.random().toString(36);
      navigateToDocumentsTab({ carrierName: carrierNameVal.carrierName });
      portFolioUtils.createNewScheduleInteraction(interactionsObjectiveVal, interactionLogVia, interactionLogOutCome, interactionLogType, durationVal, durationVal, detailsVal);
      portFolioUtils.editNewScheduleInteraction(interactionLogOutComeDeadEnd, durationVal, durationVal);
    },
  );
});