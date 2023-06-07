/*---------------------------------------------------------------------------------------------------------------
Verify Log Interaction validations
Test Cases List : ME-146431,ME-146432,ME-146435,ME-146438,ME-146439,ME-146450,ME-146443,ME-146503,ME-146497,ME-146453
Authored By                   : Sainath
Date                          : 27/04/2023
Functions/Calling References  : crmNotesPage, crmNotesData, utilities
Test case Included            : ME-146431 : Verify after clicked on Log Button Log Interaction modal should be opened > CRM > Interactions > Log | Customer Regression | Regression
                                ME-146432 : Verify Entity,Date ,Time,Duration,Objective,Type,Via,Outcome are the mandatory fields in Log Interaction modal > CRM > Interactions > Log | Customer Regression | Regression
                                ME-146435 : Verify Log Interaction successfully saved after filling in all mandatory and optional fields. > CRM > Interactions > Log | Customer Regression | Regression
                                ME-146438 : Verify Log Interaction after saving; a record should be displayed in the Interaction table > CRM > Interactions > Log | Customer Regression | Regression
                                ME-146439 : Verify that the log interaction record should be shown in normal font size in the interaction table. > CRM > Interactions > Log | Customer Regression | Regression
                                ME-146450 : When the user selects "No Answer" in the outcome field while creating a log interactions ,it should be saved as a schedule interaction in the table. > CRM > Interactions > Log | Customer Regression | Regression
                                ME-146443 : When the user clicks on the Kabob menu of an interaction record within the 30 minute buffer time, only the Edit option should be enabled. > CRM > Interactions > Log | Customer Regression | Regression
                                ME-146503 : Verify edit Log Interaction; the save button should be disabled before editing. > CRM > Interactions > Schedule | Customer Regression | Regression
                                ME-146497 : Verify after edit , Log Interactions record should be saved successfully in Interaction table > CRM > Interactions > Log | Customer Regression | Regression
                                ME-146453 : Verify user is able to edit the Log Interaction record within the 30 minute buffer time. > CRM > Interactions > Log | Customer Regression | Regression
------------------------------------------------------------------------------------------------------------------*/
import crmNotesData from '../../../testData/crm/crmData/crmNotesData.json';
import crmIndustryData from '../../../testData/crm/crmData/crmIndustryData.json';
import crmInteractionData from '../../../testData/crm/crmData/crmInteractionsData.json';
import * as crmInteractionsPage from '../../../pageObjects/crm/crmPage/crmInteractionsPage.json';
import * as crmPortFolioPage from '../../../pageObjects/crm/crmPage/crmPortFolioPage.json';
import * as customerUtils from '../../../utilities/customerUtils/customerUtils';
import * as carrierUtils from '../../../utilities/carrierUtils/carrierUtils';
import * as genericUtils from '../../../utilities/commonUtils/genericUtils';
import { loginToApplication } from '../../../utilities/appSpecificUtils/loginUtils/loginUtils';
import * as portFolioUtils from '../../../utilities/crmUtils/portFolioUtils';
const { userName: usernameText, password: passwordText } = Cypress.env('users')[Cypress.env('appLoginUser')];
const {
  interactionLogOutCome,
  interactionLogType,
  interactionLogVia,
  durationVal,
  logAdvancementOutcome,
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
let carrierNameVal, interactionsObjectiveVal, customerNameVal;
const detailsVal = Math.random().toString(36);
describe('Can user validate Log Interactions For Carrier and Customer > CRM > Interactions | Carrier Regression | Regression [ME-146431,ME-146432,ME-146435,ME-146438,ME-146439,ME-146450,ME-146443,ME-146503,ME-146497,ME-146453]', () => {
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
  it('ME-146431 : Verify after clicked on Log Button Log Interaction modal should be opened > CRM > Interactions > Log | Customer Regression | Regression',
    {
      tags: ['@carrier&customer', '@crm', '@customer&carrierInteractins', '@p1', '@bvt'],
    },
    () => {
      //Validate Customer interactions log popup
      customerUtils.searchCustomer({ customerName: customerNameVal.customerName });
      genericUtils.clickFirstElementIn({ locator: crmInteractionsPage.tabCrmCustomer });
      portFolioUtils.navigateToInteractionsTab();
      portFolioUtils.navigateInteractionsAddLog();
      //Verify log interaction child window
      genericUtils.verifyExists({ element: crmPortFolioPage.logInteractionChildWindow });
      cy.go(crmInteractionData.staticData.back);
      //Validate Carrier interactions log popup
      carrierUtils.searchCarrier({ carrierName: carrierNameVal.carrierName });
      genericUtils.clickFirstElementIn({ locator: crmInteractionsPage.tabCrmCarrier });
      portFolioUtils.navigateToInteractionsTab();
      portFolioUtils.navigateInteractionsAddLog();
      //Verify log interaction child window
      genericUtils.verifyExists({ element: crmPortFolioPage.logInteractionChildWindow });
      cy.go(crmInteractionData.staticData.back);
    });
  it('ME-146432 : Verify Entity,Date ,Time,Duration,Objective,Type,Via,Outcome are the mandatory fields in Log Interaction modal > CRM > Interactions > Log | Customer Regression | Regression',
    {
      tags: ['@carrier&customer', '@crm', '@customer&carrierInteractins', '@p1', '@bvt'],
    },
    () => {
      //Validate Customer interactions log popup mandatory fields
      customerUtils.searchCustomer({ customerName: customerNameVal.customerName });
      genericUtils.clickFirstElementIn({ locator: crmInteractionsPage.tabCrmCustomer });
      portFolioUtils.navigateToInteractionsTab();
      portFolioUtils.navigateInteractionsAddLog();
      //Verify customer log interaction mandatory fields
      portFolioUtils.validateInteractionLogMandatoryFields();
      cy.go(crmInteractionData.staticData.back);
      //Validate Carrier interactions log popup mandatory fields
      carrierUtils.searchCarrier({ carrierName: carrierNameVal.carrierName });
      genericUtils.clickFirstElementIn({ locator: crmInteractionsPage.tabCrmCarrier });
      portFolioUtils.navigateToInteractionsTab();
      portFolioUtils.navigateInteractionsAddLog();
      //Verify carrier log interaction mandatory fields
      portFolioUtils.validateInteractionLogMandatoryFields();
      cy.go(crmInteractionData.staticData.back);
    });
  it('ME-146435 : Verify Log Interaction successfully saved after filling in all mandatory and optional fields. > CRM > Interactions > Log | Customer Regression | Regression',
    {
      tags: ['@carrier&customer', '@crm', '@customer&carrierInteractins', '@p1', '@bvt'],
    },
    () => {
      //Validate Customer interactions add log successfully
      customerUtils.searchCustomer({ customerName: customerNameVal.customerName });
      genericUtils.clickFirstElementIn({ locator: crmInteractionsPage.tabCrmCustomer });
      portFolioUtils.createInteractionsLogMandatoryFields(interactionsObjectiveVal, interactionLogVia, logAdvancementOutcome, interactionLogType, durationVal);
      cy.go(crmInteractionData.staticData.back);
      //Validate carrier interactions add log successfully
      carrierUtils.searchCarrier({ carrierName: carrierNameVal.carrierName });
      genericUtils.clickFirstElementIn({ locator: crmInteractionsPage.tabCrmCarrier });
      portFolioUtils.createInteractionsLogMandatoryFields(interactionsObjectiveVal, interactionLogVia, logAdvancementOutcome, interactionLogType, durationVal);
      cy.go(crmInteractionData.staticData.back);
    });
  it('ME-146438 : Verify Log Interaction after saving; a record should be displayed in the Interaction table > CRM > Interactions > Log | Customer Regression | Regression',
    {
      tags: ['@carrier&customer', '@crm', '@customer&carrierInteractins', '@p1', '@bvt'],
    },
    () => {
      //Validate Customer interactions log added record successfully
      customerUtils.searchCustomer({ customerName: customerNameVal.customerName });
      genericUtils.clickFirstElementIn({ locator: crmInteractionsPage.tabCrmCustomer });
      portFolioUtils.createInteractionsLogMandatoryFields(interactionsObjectiveVal, interactionLogVia, logAdvancementOutcome, interactionLogType, durationVal);
      genericUtils.verifyText({ locator: crmInteractionsPage.outcomeColVal, verifyText: logAdvancementOutcome });
      cy.go(crmInteractionData.staticData.back);
      //Validate carrier interactions log added record successfully
      carrierUtils.searchCarrier({ carrierName: carrierNameVal.carrierName });
      genericUtils.clickFirstElementIn({ locator: crmInteractionsPage.tabCrmCarrier });
      portFolioUtils.createInteractionsLogMandatoryFields(interactionsObjectiveVal, interactionLogVia, logAdvancementOutcome, interactionLogType, durationVal);
      genericUtils.verifyText({ locator: crmInteractionsPage.outcomeColVal, verifyText: logAdvancementOutcome });
      cy.go(crmInteractionData.staticData.back);
    });

  it('ME-146439 : Verify that the log interaction record should be shown in normal font size in the interaction table. > CRM > Interactions > Log | Customer Regression | Regression',
    {
      tags: ['@carrier&customer', '@crm', '@customer&carrierInteractins', '@p1', '@bvt'],
    },
    () => {
      //Validate added Customer interactions log shown in normal font
      customerUtils.searchCustomer({ customerName: customerNameVal.customerName });
      genericUtils.clickFirstElementIn({ locator: crmInteractionsPage.tabCrmCustomer });
      portFolioUtils.createInteractionsLogMandatoryFields(interactionsObjectiveVal, interactionLogVia, logAdvancementOutcome, interactionLogType, durationVal);
      //Normal font size
      genericUtils.verifyTextOrBackGroundColor({ locator: crmInteractionsPage.objectiveSpanColVal, color: 'font-weight', colorCode: '400' });
      cy.go(crmInteractionData.staticData.back);
      //Validate added Carrier interactions log shown in normal font
      carrierUtils.searchCarrier({ carrierName: carrierNameVal.carrierName });
      genericUtils.clickFirstElementIn({ locator: crmInteractionsPage.tabCrmCarrier });
      portFolioUtils.createInteractionsLogMandatoryFields(interactionsObjectiveVal, interactionLogVia, logAdvancementOutcome, interactionLogType, durationVal);
      //Normal font size
      genericUtils.verifyTextOrBackGroundColor({ locator: crmInteractionsPage.objectiveSpanColVal, color: 'font-weight', colorCode: '400' });
      cy.go(crmInteractionData.staticData.back);
    });

  it('ME-146450 : When the user selects "No Answer" in the outcome field while creating a log interactions ,it should be saved as a schedule interaction in the table. > CRM > Interactions > Log | Customer Regression | Regression',
    {
      tags: ['@carrier&customer', '@crm', '@customer&carrierInteractins', '@p1', '@bvt'],
    },
    () => {
      //Create interaction log with outcome as No Answer it should be saved as a schedule interaction
      customerUtils.searchCustomer({ customerName: customerNameVal.customerName });
      genericUtils.clickFirstElementIn({ locator: crmInteractionsPage.tabCrmCustomer });
      portFolioUtils.createNewLogInteraction(interactionsObjectiveVal, interactionLogVia, interactionLogOutCome, interactionLogType, durationVal, durationVal, detailsVal);
      genericUtils.verifyText({ locator: crmInteractionsPage.outcomeColVal, verifyText: '' });
      cy.go(crmInteractionData.staticData.back);
      //Create interaction log with outcome as No Answer it should be saved as a schedule interaction
      carrierUtils.searchCarrier({ carrierName: carrierNameVal.carrierName });
      genericUtils.clickFirstElementIn({ locator: crmInteractionsPage.tabCrmCarrier });
      portFolioUtils.createNewLogInteraction(interactionsObjectiveVal, interactionLogVia, interactionLogOutCome, interactionLogType, durationVal, durationVal, detailsVal);
      genericUtils.verifyText({ locator: crmInteractionsPage.outcomeColVal, verifyText: '' });
      cy.go(crmInteractionData.staticData.back);
    });
  it('ME-146443 : When the user clicks on the Kabob menu of an interaction record within the 30 minute buffer time, only the Edit option should be enabled. > CRM > Interactions > Log | Customer Regression | Regression',
    {
      tags: ['@carrier&customer', '@crm', '@customer&carrierInteractins', '@p1', '@bvt'],
    },
    () => {
      //Validate newly added Customer log record edit button is enable for 30 Min
      customerUtils.searchCustomer({ customerName: customerNameVal.customerName });
      genericUtils.clickFirstElementIn({ locator: crmInteractionsPage.tabCrmCustomer });
      portFolioUtils.createNewLogInteraction(interactionsObjectiveVal, interactionLogVia, interactionLogOutCome, interactionLogType, durationVal, durationVal, detailsVal);
      genericUtils.clickAction({ locator: crmInteractionsPage.kababMenu });
      genericUtils.verifyIfEnabled({ locator: crmInteractionsPage.editIcon });
      cy.go(crmInteractionData.staticData.back);
      //Validate newly added Carrier log record edit button is enable for 30 Min
      carrierUtils.searchCarrier({ carrierName: carrierNameVal.carrierName });
      genericUtils.clickFirstElementIn({ locator: crmInteractionsPage.tabCrmCarrier });
      portFolioUtils.createNewLogInteraction(interactionsObjectiveVal, interactionLogVia, interactionLogOutCome, interactionLogType, durationVal, durationVal, detailsVal);
      genericUtils.clickAction({ locator: crmInteractionsPage.kababMenu });
      genericUtils.verifyIfEnabled({ locator: crmInteractionsPage.editIcon });
      cy.go(crmInteractionData.staticData.back);
    });

  it('ME-146503 : Verify edit Log Interaction; the save button should be disabled before editing. > CRM > Interactions > Schedule | Customer Regression | Regression',
    {
      tags: ['@carrier&customer', '@crm', '@customer&carrierInteractins', '@p1', '@bvt'],
    },
    () => {
      //Validate in edit interaction save button is disabled
      customerUtils.searchCustomer({ customerName: customerNameVal.customerName });
      genericUtils.clickFirstElementIn({ locator: crmInteractionsPage.tabCrmCustomer });
      portFolioUtils.createNewLogInteraction(interactionsObjectiveVal, interactionLogVia, interactionLogOutCome, interactionLogType, durationVal, durationVal, detailsVal);
      genericUtils.clickAction({ locator: crmInteractionsPage.kababMenu });
      genericUtils.navigateToChildWindow();
      genericUtils.clickVisibleElement({ locator: crmInteractionsPage.editIcon });
      genericUtils.verifyToDisabled({ element: crmInteractionsPage.btnLogSave });
      genericUtils.navigateBackToPreviousPage();
      //Validate in edit interaction save button is disabled
      carrierUtils.searchCarrier({ carrierName: carrierNameVal.carrierName });
      genericUtils.clickFirstElementIn({ locator: crmInteractionsPage.tabCrmCarrier });
      portFolioUtils.createNewLogInteraction(interactionsObjectiveVal, interactionLogVia, interactionLogOutCome, interactionLogType, durationVal, durationVal, detailsVal);
      genericUtils.clickAction({ locator: crmInteractionsPage.kababMenu });
      genericUtils.navigateToChildWindow();
      genericUtils.clickVisibleElement({ locator: crmInteractionsPage.editIcon });
      genericUtils.verifyToDisabled({ element: crmInteractionsPage.btnLogSave });
      genericUtils.navigateBackToPreviousPage();
    });
  it('ME-146497 : Verify after edit,Log Interactions record should be saved successfully in Interaction table > CRM > Interactions > Log | Customer Regression | Regression',
    {
      tags: ['@carrier&customer', '@crm', '@customer&carrierInteractins', '@p1', '@bvt'],
    },
    () => {
      //Validate edit log Interactions should be saved successfully
      customerUtils.searchCustomer({ customerName: customerNameVal.customerName });
      genericUtils.clickFirstElementIn({ locator: crmInteractionsPage.tabCrmCustomer });
      portFolioUtils.createNewLogInteraction(interactionsObjectiveVal, interactionLogVia, interactionLogOutCome, interactionLogType, durationVal, durationVal, detailsVal);
      portFolioUtils.editNewLogInteraction(crmInteractionData.staticData.interactionLogOutComeDeadEnd, durationVal, crmInteractionData.staticData.locationVal);
      genericUtils.navigateBackToPreviousPage();
      genericUtils.verifyText({ locator: crmInteractionsPage.outcomeColVal, verifyText: crmInteractionData.staticData.interactionLogOutComeDeadEnd });
      //Validate edit log Interactions should be saved successfully
      carrierUtils.searchCarrier({ carrierName: carrierNameVal.carrierName });
      genericUtils.clickFirstElementIn({ locator: crmInteractionsPage.tabCrmCarrier });
      portFolioUtils.createNewLogInteraction(interactionsObjectiveVal, interactionLogVia, interactionLogOutCome, interactionLogType, durationVal, durationVal, detailsVal);
      portFolioUtils.editNewLogInteraction(crmInteractionData.staticData.interactionLogOutComeDeadEnd, durationVal, crmInteractionData.staticData.locationVal);
      genericUtils.navigateBackToPreviousPage();
      genericUtils.verifyText({ locator: crmInteractionsPage.outcomeColVal, verifyText: crmInteractionData.staticData.interactionLogOutComeDeadEnd });
    });
  it('ME-146453 : Verify user is able to edit the Log Interaction record within the 30 minute buffer time. > CRM > Interactions > Log | Customer Regression | Regression',
    {
      tags: ['@carrier&customer', '@crm', '@customer&carrierInteractins', '@p1', '@bvt'],
    },
    () => {
      //Validate user edit the Log Interaction record within the 30 minute buffer time.
      customerUtils.searchCustomer({ customerName: customerNameVal.customerName });
      genericUtils.clickFirstElementIn({ locator: crmInteractionsPage.tabCrmCustomer });
      portFolioUtils.createNewLogInteraction(interactionsObjectiveVal, interactionLogVia, interactionLogOutCome, interactionLogType, durationVal, durationVal, detailsVal);
      portFolioUtils.editNewLogInteraction(crmInteractionData.staticData.interactionLogOutComeDeadEnd, durationVal, crmInteractionData.staticData.locationVal);
      genericUtils.navigateBackToPreviousPage();
      genericUtils.clickAction({ locator: crmInteractionsPage.kababMenu });
      genericUtils.verifyIfEnabled({ locator: crmInteractionsPage.editIcon });
      //Validate user edit the Log Interaction record within the 30 minute buffer time.
      carrierUtils.searchCarrier({ carrierName: carrierNameVal.carrierName });
      genericUtils.clickFirstElementIn({ locator: crmInteractionsPage.tabCrmCarrier });
      portFolioUtils.createNewLogInteraction(interactionsObjectiveVal, interactionLogVia, interactionLogOutCome, interactionLogType, durationVal, durationVal, detailsVal);
      portFolioUtils.editNewLogInteraction(crmInteractionData.staticData.interactionLogOutComeDeadEnd, durationVal, crmInteractionData.staticData.locationVal);
      genericUtils.navigateBackToPreviousPage();
      genericUtils.clickAction({ locator: crmInteractionsPage.kababMenu });
      genericUtils.verifyIfEnabled({ locator: crmInteractionsPage.editIcon });
    });
});