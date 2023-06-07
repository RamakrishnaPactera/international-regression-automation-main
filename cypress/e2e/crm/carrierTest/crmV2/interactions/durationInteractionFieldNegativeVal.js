/*---------------------------------------------------------------------------------------------------------------
Verify carrier and customer Interaction in Duration field - UI Changes
Test Cases List
Authored By                   : satyanarayana karadhi
Date                          : 11-05-2023
Functions/Calling References  : crmNotesPage, crmNotesData, utilities
Test case Included            : ME-138030 Can user validate Duration Field > Interaction > CRM > Interactions | InSprint
------------------------------------------------------------------------------------------------------------------*/
import crmNotesData from '../../../../../testData/crm/crmData/crmNotesData.json';
import crmIndustryData from '../../../../../testData/crm/crmData/crmIndustryData.json';
import crmIndustryPage from '../../../../../pageObjects/crm/crmPage/crmIndustryPage.json';
import crmInteractionData from '../../../../../testData/crm/crmData/crmInteractionsData.json';
import * as crmInteractionsPage from '../../../../../pageObjects/crm/crmPage/crmInteractionsPage.json';
import * as customerUtils from '../../../../../utilities/customerUtils/customerUtils';
import * as commonData from '../../../../../testData/staticData/commonData/commonData.json';
import * as genericUtils from '../../../../../utilities/commonUtils/genericUtils';
import { loginToApplication } from '../../../../../utilities/appSpecificUtils/loginUtils/loginUtils';
import {
  navigateToDocumentsTab1,
} from '../../../../../utilities/carrierUtils/carrierUtils';
import * as portFolioUtils from '../../../../../utilities/crmUtils/portFolioUtils';
const { shortWait } = commonData;
const { userName: usernameText, password: passwordText } =
  Cypress.env('users')[Cypress.env('appLoginUser')];
const {
  interactionLogOutComeDeadEnd,
  interactionLogType,
  interactionLogVia,
  logAdvancementOutcome,
  interactionLogReason,
  durationVal,
  locationVal,
  durationNegitiveValue,

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
describe('Interactions Table - Duration column > Carrier > CRM > Interactions | Insprint [ME-151809, ME-151810]', () => {
  before(() => {
    genericUtils.getMinionValues('customerCrmInteractionsObjective', 1).then((interactionsObjective) => {
      interactionsObjectiveVal = interactionsObjective[0];
    });
    detailsVal = Math.random().toString(36);
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

  it('ME-154429 Customer- verify Duration field in Interaction table for negative validations > Log Interaction  > CRM > Interactions |',
    {
      tags: ['@carrier', '@crm', '@carrierInteractins', '@p1', '@phase1'],
    },
    () => {
      cy.log('***verifying Customer Create Log Interaction create***');
      customerUtils.searchCustomer({ customerName: customerNameVal.customerName });
      genericUtils.clickFirstElementIn({ locator: crmInteractionsPage.tabCrmCustomer });
      genericUtils.verifyToExist({ element: crmInteractionsPage.tabInteractions });
      genericUtils.clickAction({ locator: crmInteractionsPage.tabInteractions });
      genericUtils.verifyVisible({ element: crmInteractionsPage.interactionTable });

      //verifying the duration is present or not in table header of default view
      genericUtils.verifyDoesNotExist({ element: crmInteractionsPage.interactionTableHeaderDuration });

      cy.log('***verifying Customer Createing InteractionScheduleRecd***');
      portFolioUtils.createInteractionScheduleRecdForNegativeValidation();
      cy.log('***verifying Customer Createing editNewScheduleInteraction***');
      portFolioUtils.editNewScheduleInteractionForNegetiveValidation(interactionLogOutComeDeadEnd, durationNegitiveValue, locationVal);
      portFolioUtils.reScheduledInteractionForNegativeValida(interactionLogReason, detailsVal);
      cy.log('***verifying Customer Createing createNewLogInteraction***');
      portFolioUtils.createNewLogInteractionForNegativeValid(interactionsObjectiveVal, interactionLogVia, logAdvancementOutcome, interactionLogType, durationVal, durationVal, detailsVal);
      cy.log('***verifying Customer Createing editLogInteraction***');
      portFolioUtils.editNewLogInteractionForNegativeValid();
    },
  );

  it('ME-154439 Carrier- verify Duration field in Interaction table for negative validations > Log Interaction  > CRM > Interactions |',
    {
      tags: ['@carrier', '@crm', '@carrierInteractins', '@p1', '@phase1'],
    },
    () => {
      detailsVal = Math.random().toString(36);
      cy.log('***verifying Carrier Create Log Interaction ReSchedule***');
      detailsVal = Math.random().toString(36);
      navigateToDocumentsTab1({ carrierName: carrierNameVal.carrierName });
      genericUtils.waitSometime(shortWait);
      genericUtils.clickFirstElementIn({ locator: crmIndustryPage.tabCrmFiled });
      genericUtils.verifyToExist({ element: crmInteractionsPage.tabInteractions });
      genericUtils.clickAction({ locator: crmInteractionsPage.tabInteractions });
      genericUtils.verifyVisible({ element: crmInteractionsPage.interactionTable });

      genericUtils.verifyVisible({ element: crmInteractionsPage.interactionTable });

      //verifying the duration is present or not in table header of default view
      genericUtils.verifyDoesNotExist({ element: crmInteractionsPage.interactionTableHeaderDuration });

      cy.log('***verifying Customer Createing InteractionScheduleRecd***');
      portFolioUtils.createInteractionScheduleRecdForNegativeValidation();
      cy.log('***verifying Customer Createing editNewScheduleInteraction***');
      portFolioUtils.editNewScheduleInteractionForNegetiveValidation(interactionLogOutComeDeadEnd, durationNegitiveValue, locationVal);
      portFolioUtils.reScheduledInteractionForNegativeValida(interactionLogReason, detailsVal);
      cy.log('***verifying Customer Createing createNewLogInteraction***');
      portFolioUtils.createNewLogInteractionForNegativeValid(interactionsObjectiveVal, interactionLogVia, logAdvancementOutcome, interactionLogType, durationVal, durationVal, detailsVal);
      cy.log('***verifying Customer Createing editLogInteraction***');
      portFolioUtils.editNewLogInteractionForNegativeValid();
    },
  );
});