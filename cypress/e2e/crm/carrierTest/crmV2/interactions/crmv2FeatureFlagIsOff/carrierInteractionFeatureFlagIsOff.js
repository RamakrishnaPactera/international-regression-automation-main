/*---------------------------------------------------------------------------------------------------------------
Verify carrier and customer Interaction in Duration & location field - UI Changes
Test Cases List
Authored By                   : satyanarayana karadhi
Date                          : 01-06-2023
Functions/Calling References  : crmNotesPage, crmNotesData, utilities
Test case Included            : ME-151174 Can user validate Duration & location Fields when FF is off > Interaction > CRM > Interactions | InSprint
------------------------------------------------------------------------------------------------------------------*/
import crmNotesData from '../../../../../../testData/crm/crmData/crmNotesData.json';
import crmIndustryPage from '../../../../../../pageObjects/crm/crmPage/crmIndustryPage.json';
import crmInteractionData from '../../../../../../testData/crm/crmData/crmInteractionsData.json';
import * as crmInteractionsPage from '../../../../../../pageObjects/crm/crmPage/crmInteractionsPage.json';
import * as commonData from '../../../../../../testData/staticData/commonData/commonData.json';
import * as genericUtils from '../../../../../../utilities/commonUtils/genericUtils';
import { loginToApplication } from '../../../../../../utilities/appSpecificUtils/loginUtils/loginUtils';
import {
  navigateToDocumentsTab1,
} from '../../../../../../utilities/carrierUtils/carrierUtils';
import * as portFolioUtils from '../../../../../../utilities/crmUtils/portFolioUtils';
const { shortWait } = commonData;
const { userName: usernameText, password: passwordText } =
  Cypress.env('users')[Cypress.env('appLoginUser')];
const {
  interactionLogType,
  interactionLogVia,
  logAdvancementOutcome,
  durationVal,
  interactionLogReason,
  interactionLogOutComeDeadEnd,
  carrierCrmInteractionDisableFF,

} = crmInteractionData.staticData;
const {
  tdmAddCarrierReq,
  tdmCarrierData,
  tdmCarrierScenario,
} = crmNotesData.staticData;
let carrierNameVal, interactionsObjectiveVal, detailsVal;
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
  });
  beforeEach(() => {
    loginToApplication({
      username: usernameText,
      password: passwordText,
    });
    genericUtils.viewFullPage();
  });
  it('ME-151722 Carrier- verify Duration field in Interaction table when FF is Off > Log Interaction  > CRM > Interactions |',
    {
      tags: ['@carrier', '@crm', '@carrierInteractins', '@p1', '@phase1'],
    },
    () => {
      detailsVal = Math.random().toString(36);
      cy.log('***verifying Carrier Create Log Interaction ReSchedule***');
      genericUtils.updateUrlWithFF({ flag: carrierCrmInteractionDisableFF });
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

      portFolioUtils.createScheduleInteractionForCarrierWithAllFieldsWhenFFisOff(interactionsObjectiveVal);
      portFolioUtils.editScheduleInteractionForCarrierWhenFFisOff(interactionLogOutComeDeadEnd);
      portFolioUtils.reScheduleInteractionForCarrierWhenFFisOff(interactionLogReason, detailsVal);
      portFolioUtils.reScheduleAuditInteractionForCarrierWhenFFisOff();
      portFolioUtils.createNewLogInteractionForCarrierWhenFFisOff(interactionsObjectiveVal, interactionLogVia, logAdvancementOutcome, interactionLogType, durationVal, durationVal, detailsVal);
      portFolioUtils.editLogInteractionForCarrierWhenFFisOff();
    },
  );
});