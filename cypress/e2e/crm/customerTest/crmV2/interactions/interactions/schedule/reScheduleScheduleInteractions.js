/*---------------------------------------------------------------------------------------------------------------
Verify Schedule Interaction - UI Changes reSchedule
Test Cases List
Authored By                   : K.Santhosh
Date                          : 12-04-2023
Functions/Calling References  : crmNotesPage, crmNotesData, utilities
User Stories Included         : ME-137949 Can user validate Schedule Interaction > CRM > Interactions | Regression
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
  interactionLogReason,
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

describe('Can user validate Schedule Interaction ReSchedule > Carrier > CRM > Interactions | Carrier Regression | Regression [ME-137949]', () => {
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

  it('ME-142066 Can user validate Customer ReSchedule > Schedule Interaction  > CRM > Interactions | Carrier Regression | Regression',
    {
      tags: ['@carrier', '@crm', '@carrierDocuments', '@p1', '@phase1'],
    },
    () => {
      detailsVal = Math.random().toString(36);
      cy.log('***verifying Customer Create Schedule Interaction create***');
      customerUtils.searchCustomer({ customerName: customerNameVal.customerName });
      genericUtils.clickFirstElementIn({ locator: crmInteractionsPage.tabCrmCustomer });
      portFolioUtils.createNewScheduleInteraction(interactionsObjectiveVal, interactionLogVia, interactionLogOutCome, interactionLogType, durationVal, durationVal, detailsVal);
      portFolioUtils.reScheduleNewSceduleInteraction(interactionLogReason, detailsVal);
    },
  );
  it('ME-142115 Can user validate Carrier ReSchedule > Schedule Interaction  > CRM > Interactions | Carrier Regression | Regression',
    {
      tags: ['@carrier', '@crm', '@carrierDocuments', '@p1', '@phase1'],
    },
    () => {
      detailsVal = Math.random().toString(36);
      cy.log('***verifying Carrier Create Schedule Interaction ReSchedule***');
      detailsVal = Math.random().toString(36);
      navigateToDocumentsTab({ carrierName: carrierNameVal.carrierName });
      portFolioUtils.createNewScheduleInteraction(interactionsObjectiveVal, interactionLogVia, interactionLogOutCome, interactionLogType, durationVal, durationVal, detailsVal);
      portFolioUtils.reScheduleNewSceduleInteraction(interactionLogReason, detailsVal);
    },
  );
});