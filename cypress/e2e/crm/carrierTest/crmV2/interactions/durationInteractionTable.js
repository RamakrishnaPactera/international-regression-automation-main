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
  interactionLogOutCome,
  interactionLogType,
  interactionLogVia,
  logAdvancementOutcome,
  durationVal,
  durationValue,
  validateDurationColumnName,
  validateAssignColumnName,
  validateOpportunityColumnName,
  validateCantactsColumnName,

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

  it('ME-151809 Customer- verify Duration field in Interaction table > Log Interaction  > CRM > Interactions |',
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

      portFolioUtils.createNewLogInteraction(interactionsObjectiveVal, interactionLogVia, logAdvancementOutcome, interactionLogType, durationVal, durationVal, detailsVal);
      portFolioUtils.enterTabEditLogInteraction1(durationValue);

      //Verifying the customize option by clicking the carrot button
      genericUtils.clickAction({ locator: crmInteractionsPage.customizeBtn });
      genericUtils.waitSometime(shortWait);

      //selecting customize option
      genericUtils.clickVisibleElement({ locator: crmInteractionsPage.interactionTabbleCustomsizeOption });
      genericUtils.waitSometime(shortWait);
      genericUtils.verifyToExist({ element: crmInteractionsPage.interationCustomizeTable });
      genericUtils.scrollIntoView({ locator: crmInteractionsPage.interactionCustomizeDurationFieldEnable });

      cy.log('***Switch the show option \'On\' of any column***');
      genericUtils.clickAction({ locator: crmInteractionsPage.interactionDurationEyeIcon });
      genericUtils.verifyToExist({ element: crmInteractionsPage.interactionDurationEyeIcon });
      genericUtils.clickAction({ locator: crmInteractionsPage.interactionCustomizeApplyBtn });

      //navigateInteractionsLog();
      portFolioUtils.createNewLogInteraction(interactionsObjectiveVal, interactionLogVia, interactionLogOutCome, interactionLogType, durationVal, durationVal, detailsVal);

      genericUtils.waitSometime(shortWait);
      genericUtils.scrollToRight();
      genericUtils.waitSometime(shortWait);
      genericUtils.verifyAttrText({ locator: crmInteractionsPage.interactionAssignedToToolTip, attribute: 'title', verifyText: validateAssignColumnName });
      genericUtils.verifyAttrText({ locator: crmInteractionsPage.interactionContactsToolTip, attribute: 'title', verifyText: validateCantactsColumnName });
      genericUtils.verifyAttrText({ locator: crmInteractionsPage.interactionOppurnityToolTip, attribute: 'title', verifyText: validateOpportunityColumnName });
      cy.get(crmInteractionsPage.interactionTableHeaderDuration).focus();
      genericUtils.clickVisibleElement({ locator: crmInteractionsPage.interactionDurationFiledValidation });
      genericUtils.getText({ locator: crmInteractionsPage.interactionDurationFiledValidation });
      cy.get(crmInteractionsPage.interationDurationFiled).focus();
      genericUtils.typeText({ locator: crmInteractionsPage.interationDurationFiled, dataText: durationValue });
      cy.get(crmInteractionsPage.interactionDurationToolTip).focus();
      genericUtils.verifyAttrText({ locator: crmInteractionsPage.interactionDurationToolTip, attribute: 'title', verifyText: validateDurationColumnName });
    },
  );

  it('ME-151810 Carrier- verify Duration field in Interaction table > Log Interaction  > CRM > Interactions |',
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

      portFolioUtils.createNewLogInteraction(interactionsObjectiveVal, interactionLogVia, logAdvancementOutcome, interactionLogType, durationVal, durationVal, detailsVal);
      portFolioUtils.enterTabEditLogInteraction1(durationValue);

      //Verifying the customize option by clicking the carrot button
      genericUtils.clickAction({ locator: crmInteractionsPage.customizeBtn });
      genericUtils.waitSometime(shortWait);

      //selecting customize option
      genericUtils.clickVisibleElement({ locator: crmInteractionsPage.interactionTabbleCustomsizeOption });
      genericUtils.waitSometime(shortWait);
      genericUtils.verifyToExist({ element: crmInteractionsPage.interationCustomizeTable });
      genericUtils.scrollIntoView({ locator: crmInteractionsPage.interactionCustomizeDurationFieldEnable });

      cy.log('***Switch the show option \'On\' of any column***');
      genericUtils.clickAction({ locator: crmInteractionsPage.interactionDurationEyeIcon });
      genericUtils.verifyToExist({ element: crmInteractionsPage.interactionDurationEyeIcon });
      genericUtils.clickAction({ locator: crmInteractionsPage.interactionCustomizeApplyBtn });

      //navigateInteractionsLog();
      portFolioUtils.createNewLogInteraction(interactionsObjectiveVal, interactionLogVia, interactionLogOutCome, interactionLogType, durationVal, durationVal, detailsVal);

      genericUtils.waitSometime(shortWait);
      genericUtils.scrollToRight();
      genericUtils.waitSometime(shortWait);
      genericUtils.verifyAttrText({ locator: crmInteractionsPage.interactionAssignedToToolTip, attribute: 'title', verifyText: validateAssignColumnName });
      genericUtils.verifyAttrText({ locator: crmInteractionsPage.interactionContactsToolTip, attribute: 'title', verifyText: validateCantactsColumnName });
      genericUtils.verifyAttrText({ locator: crmInteractionsPage.interactionOppurnityToolTip, attribute: 'title', verifyText: validateOpportunityColumnName });
      cy.get(crmInteractionsPage.interactionTableHeaderDuration).focus();
      genericUtils.clickVisibleElement({ locator: crmInteractionsPage.interactionDurationFiledValidation });
      genericUtils.getText({ locator: crmInteractionsPage.interactionDurationFiledValidation });
      cy.get(crmInteractionsPage.interationDurationFiled).focus();
      genericUtils.typeText({ locator: crmInteractionsPage.interationDurationFiled, dataText: durationValue });
      cy.get(crmInteractionsPage.interactionDurationToolTip).focus();
      genericUtils.verifyAttrText({ locator: crmInteractionsPage.interactionDurationToolTip, attribute: 'title', verifyText: validateDurationColumnName });
    },
  );
});