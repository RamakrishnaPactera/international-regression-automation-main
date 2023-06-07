/*---------------------------------------------------------------------------------------------------------------
Verify Log Interaction validations
Test Cases List : ME-146461,ME-146464,ME-146467,ME-146469,ME-146470,ME-146471,ME-146474,ME-146477,ME-146479,ME-146485,ME-146489,ME-146490,ME-146505,ME-146487,ME-146492,ME-146501,ME-146553
Authored By                   : Sainath
Date                          : 27/04/2023
Functions/Calling References  : crmNotesPage, crmNotesData, utilities
Test case Included            : ME-146461 : Verify after clicked on Schedule button Schedule Interaction modal should be opened > CRM > Interactions > Schedule | Customer Regression | Carrier Regression| Regression
                                ME-146464 : Verify Entity, Date, Time,Duration,Objective,Type, Via, and Assigned To are the mandatory fields in the schedule Interaction modal. > CRM > Interactions > Schedule | Customer Regression | Carrier Regression| Regression
                                ME-146467 : Verify Schedule Interaction has been successfully saved after filling in all mandatory and optional fields. > CRM > Interactions > Schedule | Customer Regression | Carrier Regression| Regression
                                ME-146469 : Verify Schedule Interaction after saving; a record should be displayed in the Interaction table. > CRM > Interactions > Schedule | Customer Regression | Carrier Regression| Regression
                                ME-146470 : Verify that the schedule interaction record should be shown in bold font size in the interaction table. > CRM > Interactions > Schedule | Customer Regression | Carrier Regression| Regression
                                ME-146471 : When the user clicks on the Kabob menu of an existing Schedule Interaction record within the 30 minute buffer time, only the Edit and Reassign option should be enabled. > CRM > Interactions > Schedule | Customer Regression | Regression
                                ME-146474 : When user clicked on the Kabob menu of completed Schedule Interaction record within the 30 minute buffer time, only the Edit option should be enabled. > CRM > Interactions > Schedule | Customer Regression | Regression
                                ME-146477 : After clicked on Complete button in edit Schedule Interaction Complete Interaction child window should be opened and after clicking on save button record should be saved successfully > CRM > Interactions > Schedule | Customer Regression | Regression
                                ME-146479 : Validate user can be successfully Reschedule in edit Schedule interaction window > CRM > Interactions > Schedule | Customer Regression | Regression
                                ME-146485 : Verify Updated/schedule/created date and time should be displayed in the Interaction table. > CRM > Interactions > Schedule | Customer Regression | Regression
                                ME-146489 : Verify that after attaching a document in Schedule Interaction, the attached document count should be correctly shown in Document column of Interaction table. > CRM > Interactions > Schedule | Customer Regression | Regression
                                ME-146490 : Verify the dynamic tie in the Log/Schedule Interaction modal with associated records. > CRM > Interactions > Schedule | Customer Regression | Regression
                                ME-146505 : Verify edit Schedule Interaction; the save button should be disabled before editing. > CRM > Interactions > Schedule | Customer Regression | Regression
                                ME-146487 : Verify all column filter options in the Interactions table. > CRM > Interactions > Schedule | Customer Regression | Regression
                                ME-146492 : Verify the correct status displayed in the status column of the interaction table. > CRM > Interactions > Schedule | Customer Regression | Regression
                                ME-146501 : Verify after editing; the Schedule Interactions record should be successfully saved in the Interaction table. > CRM > Interactions > Schedule | Customer Regression | Regression
                                ME-146553 : Verify records should be added according to Schedule Date and Time in the Interactions table. > CRM > Interactions > Log | Customer Regression | Regression
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
import * as dateTimeUtils from '../../../utilities/commonUtils/dateTimeUtils';
const { userName: usernameText, password: passwordText } = Cypress.env('users')[Cypress.env('appLoginUser')];
const {
  interactionLogOutCome,
  interactionLogType,
  interactionLogVia,
  durationVal,
  logAdvancementOutcome,
  interactionLogReason,
  fileName,
} = crmInteractionData.staticData;
const {
  tdmAddCarrierReq,
  tdmCarrierData,
  tdmCarrierScenario,
  tdmCarrierScenarioNew,
} = crmNotesData.staticData;
const {
  tdmAddCustomerReq,
  tdmCustomerData,
  tdmCustomerScenario,
  tdmCustomerNewOppOpen,
} = crmIndustryData.staticData;
let carrierNameVal, interactionsObjectiveVal, customerNameVal, opprCarrierNameVal, opprCustomerNameVal;
const detailsVal = Math.random().toString(36);
describe('Can user validate Schedule Interactions For Carrier and Customer > CRM > Interactions | Carrier Regression | Customer Regression | Regression [ME-146461,ME-146464,ME-146467,ME-146469,ME-146470,ME-146471,ME-146474,ME-146477,ME-146479,ME-146485,ME-146489,ME-146490,ME-146505,ME-146487,ME-146492,ME-146501,ME-146553', () => {
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

    cy.log('***creating new carrier***');
    genericUtils.getTDMData({ dataType: tdmCarrierData, dataCondition: tdmAddCarrierReq, dataScenario: tdmCarrierScenarioNew });
    cy.then(() => {
      opprCarrierNameVal = Cypress.env('inputVal');
    });
    genericUtils.getTDMData({ dataType: tdmCustomerData, dataCondition: tdmAddCustomerReq, dataScenario: tdmCustomerNewOppOpen });
    cy.then(() => {
      opprCustomerNameVal = Cypress.env('inputVal');
    });
  });
  beforeEach(() => {
    loginToApplication({
      username: usernameText,
      password: passwordText,
    });
    genericUtils.viewFullPage();
  });
  it('ME-146461 : Verify after clicked on Schedule button Schedule Interaction modal should be opened > CRM > Interactions > Schedule | Customer Regression | Carrier Regression| Regression',
    {
      tags: ['@carrier&customer', '@crm', '@customer&carrierInteractins', '@p1', '@bvt'],
    },
    () => {
      //Validate Customer interactions schedule popup
      customerUtils.searchCustomer({ customerName: customerNameVal.customerName });
      genericUtils.clickFirstElementIn({ locator: crmInteractionsPage.tabCrmCustomer });
      portFolioUtils.navigateToInteractionsTab();
      portFolioUtils.navigateInteractionsAddSchedule();
      //Verify schedule interaction child window
      genericUtils.verifyExists({ element: crmPortFolioPage.logInteractionChildWindow });
      cy.go(crmInteractionData.staticData.back);
      //Validate Carrier interactions schedule popup
      carrierUtils.searchCarrier({ carrierName: carrierNameVal.carrierName });
      genericUtils.clickFirstElementIn({ locator: crmInteractionsPage.tabCrmCarrier });
      portFolioUtils.navigateToInteractionsTab();
      portFolioUtils.navigateInteractionsAddSchedule();
      //Verify schedule interaction child window
      genericUtils.verifyExists({ element: crmPortFolioPage.logInteractionChildWindow });
      cy.go(crmInteractionData.staticData.back);
    });
  it('ME-146464 : Verify Entity, Date, Time,Duration,Objective,Type, Via, and Assigned To are the mandatory fields in the schedule Interaction modal. > CRM > Interactions > Schedule | Customer Regression | Carrier Regression| Regression',
    {
      tags: ['@carrier&customer', '@crm', '@customer&carrierInteractins', '@p1', '@bvt'],
    },
    () => {
      //Validate Customer interactions log popup mandatory fields
      customerUtils.searchCustomer({ customerName: customerNameVal.customerName });
      genericUtils.clickFirstElementIn({ locator: crmInteractionsPage.tabCrmCustomer });
      portFolioUtils.navigateToInteractionsTab();
      portFolioUtils.navigateInteractionsAddSchedule();
      //Verify customer log interaction mandatory fields
      portFolioUtils.validateInteractionScheduleMandatoryFields();
      cy.go(crmInteractionData.staticData.back);
      //Validate Carrier interactions log popup mandatory fields
      carrierUtils.searchCarrier({ carrierName: carrierNameVal.carrierName });
      genericUtils.clickFirstElementIn({ locator: crmInteractionsPage.tabCrmCarrier });
      portFolioUtils.navigateToInteractionsTab();
      portFolioUtils.navigateInteractionsAddSchedule();
      //Verify carrier log interaction mandatory fields
      portFolioUtils.validateInteractionScheduleMandatoryFields();
      cy.go(crmInteractionData.staticData.back);
    });
  it('ME-146467 : Verify Schedule Interaction has been successfully saved after filling in all mandatory and optional fields. > CRM > Interactions > Schedule | Customer Regression | Carrier Regression| Regression',
    {
      tags: ['@carrier&customer', '@crm', '@customer&carrierInteractins', '@p1', '@bvt'],
    },
    () => {
      //Validate Customer interactions add schedule successfully
      customerUtils.searchCustomer({ customerName: customerNameVal.customerName });
      genericUtils.clickFirstElementIn({ locator: crmInteractionsPage.tabCrmCustomer });
      portFolioUtils.createNewScheduleInteraction(interactionsObjectiveVal, interactionLogVia, interactionLogOutCome, interactionLogType, durationVal, durationVal, detailsVal);
      //Validate carrier interactions add schedule successfully
      carrierUtils.searchCarrier({ carrierName: carrierNameVal.carrierName });
      genericUtils.clickFirstElementIn({ locator: crmInteractionsPage.tabCrmCarrier });
      portFolioUtils.createNewScheduleInteraction(interactionsObjectiveVal, interactionLogVia, interactionLogOutCome, interactionLogType, durationVal, durationVal, detailsVal);
    });
  it('ME-146469 : Verify Schedule Interaction after saving; a record should be displayed in the Interaction table. > CRM > Interactions > Schedule | Customer Regression | Carrier Regression| Regression',
    {
      tags: ['@carrier&customer', '@crm', '@customer&carrierInteractins', '@p1', '@bvt'],
    },
    () => {
      //Validate Customer interactions add schedule successfully
      customerUtils.searchCustomer({ customerName: customerNameVal.customerName });
      genericUtils.clickFirstElementIn({ locator: crmInteractionsPage.tabCrmCustomer });
      portFolioUtils.createNewScheduleInteraction(interactionsObjectiveVal, interactionLogVia, interactionLogOutCome, interactionLogType, durationVal, durationVal, detailsVal);
      genericUtils.verifyElementText({ locator: crmInteractionsPage.interactionsDetailsColVal, verifyText: detailsVal });
      //Validate carrier interactions add schedule successfully
      carrierUtils.searchCarrier({ carrierName: carrierNameVal.carrierName });
      genericUtils.clickFirstElementIn({ locator: crmInteractionsPage.tabCrmCarrier });
      portFolioUtils.createNewScheduleInteraction(interactionsObjectiveVal, interactionLogVia, interactionLogOutCome, interactionLogType, durationVal, durationVal, detailsVal);
      genericUtils.verifyElementText({ locator: crmInteractionsPage.interactionsDetailsColVal, verifyText: detailsVal });
    });

  it('ME-146470 : Verify that the schedule interaction record should be shown in bold font size in the interaction table. > CRM > Interactions > Schedule | Customer Regression | Carrier Regression| Regression',
    {
      tags: ['@carrier&customer', '@crm', '@customer&carrierInteractins', '@p1', '@bvt'],
    },
    () => {
      //Validate added Customer interactions schedule shown in normal font
      customerUtils.searchCustomer({ customerName: customerNameVal.customerName });
      genericUtils.clickFirstElementIn({ locator: crmInteractionsPage.tabCrmCustomer });
      portFolioUtils.createNewScheduleInteraction(interactionsObjectiveVal, interactionLogVia, interactionLogOutCome, interactionLogType, durationVal, durationVal, detailsVal);
      //Normal bold font size
      genericUtils.verifyTextOrBackGroundColor({ locator: crmInteractionsPage.interactionsDetailsColValFont, color: 'font-weight', colorCode: '700' });
      //Validate added Carrier interactions schedule shown in normal font
      carrierUtils.searchCarrier({ carrierName: carrierNameVal.carrierName });
      genericUtils.clickFirstElementIn({ locator: crmInteractionsPage.tabCrmCarrier });
      portFolioUtils.createNewScheduleInteraction(interactionsObjectiveVal, interactionLogVia, interactionLogOutCome, interactionLogType, durationVal, durationVal, detailsVal);
      //Normal bold font size
      genericUtils.verifyTextOrBackGroundColor({ locator: crmInteractionsPage.interactionsDetailsColValFont, color: 'font-weight', colorCode: '700' });
    });

  it('ME-146471 : When the user clicks on the Kabob menu of an existing Schedule Interaction record within the 30 minute buffer time, only the Edit and Reassign option should be enabled. > CRM > Interactions > Schedule | Customer Regression | Regression',
    {
      tags: ['@carrier&customer', '@crm', '@customer&carrierInteractins', '@p1', '@bvt'],
    },
    () => {
      //Validate newly added Customer Schedule record edit,Reassign button is enable for 30 Min
      customerUtils.searchCustomer({ customerName: customerNameVal.customerName });
      genericUtils.clickFirstElementIn({ locator: crmInteractionsPage.tabCrmCustomer });
      portFolioUtils.createNewScheduleInteraction(interactionsObjectiveVal, interactionLogVia, interactionLogOutCome, interactionLogType, durationVal, durationVal, detailsVal);
      genericUtils.clickAction({ locator: crmInteractionsPage.kababMenu });
      genericUtils.verifyIfEnabled({ locator: crmInteractionsPage.editIcon });
      genericUtils.verifyIfEnabled({ locator: crmInteractionsPage.ReassignIcon });
      //Validate newly added Carrier log record edit,Reassign button is enable for 30 Min
      carrierUtils.searchCarrier({ carrierName: carrierNameVal.carrierName });
      genericUtils.clickFirstElementIn({ locator: crmInteractionsPage.tabCrmCarrier });
      portFolioUtils.createNewScheduleInteraction(interactionsObjectiveVal, interactionLogVia, interactionLogOutCome, interactionLogType, durationVal, durationVal, detailsVal);
      genericUtils.clickAction({ locator: crmInteractionsPage.kababMenu });
      genericUtils.verifyIfEnabled({ locator: crmInteractionsPage.editIcon });
      genericUtils.verifyIfEnabled({ locator: crmInteractionsPage.ReassignIcon });
    });

  it('ME-146474 : When user clicked on the Kabob menu of completed Schedule Interaction record within the 30 minute buffer time, only the Edit option should be enabled. > CRM > Interactions > Schedule | Customer Regression | Regression',
    {
      tags: ['@carrier&customer', '@crm', '@customer&carrierInteractins', '@p1', '@bvt'],
    },
    () => {
      //Validate for customer after edit and click on comeplete button only edit button should be enabled
      customerUtils.searchCustomer({ customerName: customerNameVal.customerName });
      genericUtils.clickFirstElementIn({ locator: crmInteractionsPage.tabCrmCustomer });
      portFolioUtils.createNewScheduleInteraction(interactionsObjectiveVal, interactionLogVia, interactionLogOutCome, interactionLogType, durationVal, durationVal, detailsVal);
      genericUtils.clickAction({ locator: crmInteractionsPage.kababMenu });
      genericUtils.navigateToChildWindow();
      portFolioUtils.completeEditScheduleInteractionSave(logAdvancementOutcome);
      genericUtils.clickAction({ locator: crmInteractionsPage.kababMenu });
      genericUtils.verifyIfEnabled({ locator: crmInteractionsPage.editIcon });
      genericUtils.verifyAttrValueContains({ locator: crmInteractionsPage.completeInteractionRessignBtn, attribute: 'class', verifyText: 'unmask' });
      genericUtils.verifyAttrValueContains({ locator: crmInteractionsPage.completeInteractionViewBtn, attribute: 'class', verifyText: 'unmask' });
      //Validate for carrier after edit and click on comeplete button only edit button should be enabled
      carrierUtils.searchCarrier({ carrierName: carrierNameVal.carrierName });
      genericUtils.clickFirstElementIn({ locator: crmInteractionsPage.tabCrmCarrier });
      portFolioUtils.createNewScheduleInteraction(interactionsObjectiveVal, interactionLogVia, interactionLogOutCome, interactionLogType, durationVal, durationVal, detailsVal);
      genericUtils.clickAction({ locator: crmInteractionsPage.kababMenu });
      genericUtils.navigateToChildWindow();
      portFolioUtils.completeEditScheduleInteractionSave(logAdvancementOutcome);
      genericUtils.clickAction({ locator: crmInteractionsPage.kababMenu });
      genericUtils.verifyIfEnabled({ locator: crmInteractionsPage.editIcon });
      genericUtils.verifyAttrValueContains({ locator: crmInteractionsPage.completeInteractionRessignBtn, attribute: 'class', verifyText: 'unmask' });
    //genericUtils.verifyAttrValueContains({locator: crmInteractionsPage.completeInteractionViewBtn, attribute:"class", verifyText:"unmask"});
    });

  it('ME-146477 : After clicked on Complete button in edit Schedule Interaction Complete Interaction child window should be opened and after clicking on save button record should be saved successfully > CRM > Interactions > Schedule | Customer Regression | Regression',
    {
      tags: ['@carrier&customer', '@crm', '@customer&carrierInteractins', '@p1', '@bvt'],
    },
    () => {
      //Validate for customer after edit and click on comeplete button record should be saved successfully
      customerUtils.searchCustomer({ customerName: customerNameVal.customerName });
      genericUtils.clickFirstElementIn({ locator: crmInteractionsPage.tabCrmCustomer });
      portFolioUtils.createNewScheduleInteraction(interactionsObjectiveVal, interactionLogVia, interactionLogOutCome, interactionLogType, durationVal, durationVal, detailsVal);
      genericUtils.clickAction({ locator: crmInteractionsPage.kababMenu });
      genericUtils.navigateToChildWindow();
      genericUtils.verifyIfEnabled({ locator: crmInteractionsPage.editIcon });
      genericUtils.clickVisibleElement({ locator: crmInteractionsPage.editIcon });
      genericUtils.clickAction({ locator: crmPortFolioPage.btnEditComplete });
      genericUtils.dropDownContainsTextClick({ element: crmInteractionsPage.completeInteractionOutcomeDrpDwn, typeText: logAdvancementOutcome, exactText: logAdvancementOutcome });
      genericUtils.clickAction({ locator: crmInteractionsPage.completeInteractionSaveBtn });
      cy.go(crmInteractionData.staticData.back);
      genericUtils.verifyElementText({ locator: crmInteractionsPage.interactionsDetailsColVal, verifyText: detailsVal });
      //Validate for carrier after edit and click on comeplete button record should be saved successfully
      carrierUtils.searchCarrier({ carrierName: carrierNameVal.carrierName });
      genericUtils.clickFirstElementIn({ locator: crmInteractionsPage.tabCrmCarrier });
      portFolioUtils.createNewScheduleInteraction(interactionsObjectiveVal, interactionLogVia, interactionLogOutCome, interactionLogType, durationVal, durationVal, detailsVal);
      genericUtils.clickAction({ locator: crmInteractionsPage.kababMenu });
      genericUtils.navigateToChildWindow();
      genericUtils.verifyIfEnabled({ locator: crmInteractionsPage.editIcon });
      genericUtils.clickVisibleElement({ locator: crmInteractionsPage.editIcon });
      genericUtils.clickAction({ locator: crmPortFolioPage.btnEditComplete });
      genericUtils.dropDownContainsTextClick({ element: crmInteractionsPage.completeInteractionOutcomeDrpDwn, typeText: logAdvancementOutcome, exactText: logAdvancementOutcome });
      genericUtils.clickAction({ locator: crmInteractionsPage.completeInteractionSaveBtn });
      cy.go(crmInteractionData.staticData.back);
      genericUtils.verifyElementText({ locator: crmInteractionsPage.interactionsDetailsColVal, verifyText: detailsVal });
    });
  it('ME-146479 : Validate user can be successfully Reschedule in edit Schedule interaction window > CRM > Interactions > Schedule | Customer Regression | Regression',
    {
      tags: ['@carrier&customer', '@crm', '@customer&carrierInteractins', '@p2', '@bvt'],
    },
    () => {
      //Validate for customer able to reschedule
      customerUtils.searchCustomer({ customerName: customerNameVal.customerName });
      genericUtils.clickFirstElementIn({ locator: crmInteractionsPage.tabCrmCustomer });
      portFolioUtils.createNewScheduleInteraction(interactionsObjectiveVal, interactionLogVia, interactionLogOutCome, interactionLogType, durationVal, durationVal, detailsVal);
      portFolioUtils.reScheduleNewSceduleInteraction(interactionLogReason, detailsVal);
      genericUtils.navigateBackToPreviousPage();
      //Validate for carrier able to reschedule
      carrierUtils.searchCarrier({ carrierName: carrierNameVal.carrierName });
      genericUtils.clickFirstElementIn({ locator: crmInteractionsPage.tabCrmCarrier });
      portFolioUtils.createNewScheduleInteraction(interactionsObjectiveVal, interactionLogVia, interactionLogOutCome, interactionLogType, durationVal, durationVal, detailsVal);
      portFolioUtils.reScheduleNewSceduleInteraction(interactionLogReason, detailsVal);
      genericUtils.navigateBackToPreviousPage();
    });

  it('ME-146485 : Verify Updated/schedule/created date and time should be displayed in the Interaction table. > CRM > Interactions > Schedule | Customer Regression | Regression',
    {
      tags: ['@carrier&customer', '@crm', '@customer&carrierInteractins', '@p3', '@bvt'],
    },
    () => {
      //Verify for customer Updated/schedule/created date and time should be displayed
      customerUtils.searchCustomer({ customerName: customerNameVal.customerName });
      genericUtils.clickFirstElementIn({ locator: crmInteractionsPage.tabCrmCustomer });
      portFolioUtils.createNewScheduleInteraction(interactionsObjectiveVal, interactionLogVia, interactionLogOutCome, interactionLogType, durationVal, durationVal, detailsVal);
      portFolioUtils.verifyDateAndTimeColValsExist();
      //Verify for carrier Updated/schedule/created date and time should be displayed
      carrierUtils.searchCarrier({ carrierName: carrierNameVal.carrierName });
      genericUtils.clickFirstElementIn({ locator: crmInteractionsPage.tabCrmCarrier });
      portFolioUtils.createNewScheduleInteraction(interactionsObjectiveVal, interactionLogVia, interactionLogOutCome, interactionLogType, durationVal, durationVal, detailsVal);
      portFolioUtils.verifyDateAndTimeColValsExist();
    });

  it('ME-146489 : Verify that after attaching a document in Schedule Interaction, the attached document count should be correctly shown in Document column of Interaction table. > CRM > Interactions > Schedule | Customer Regression | Regression',
    {
      tags: ['@carrier&customer', '@crm', '@customer&carrierInteractins', '@p2', '@bvt'],
    },
    () => {
      //Validate for customer after attach document and verify Document col val should be 1
      customerUtils.searchCustomer({ customerName: customerNameVal.customerName });
      genericUtils.clickFirstElementIn({ locator: crmInteractionsPage.tabCrmCustomer });
      portFolioUtils.createInteractionScheduleRecdWithFileAttach(fileName);
      genericUtils.verifyElementText({ locator: crmInteractionsPage.documentsColVal, verifyText: '1' });
      //Validate for carrier after attach document and verify Document col val should be 1
      carrierUtils.searchCarrier({ carrierName: carrierNameVal.carrierName });
      genericUtils.clickFirstElementIn({ locator: crmInteractionsPage.tabCrmCarrier });
      portFolioUtils.createInteractionScheduleRecdWithFileAttach(fileName);
      genericUtils.verifyElementText({ locator: crmInteractionsPage.documentsColVal, verifyText: '1' });
    });

  it('ME-146490 : Verify the dynamic tie in the Log/Schedule Interaction modal with associated records. > CRM > Interactions > Schedule | Customer Regression | Regression',
    {
      tags: ['@carrier&customer', '@crm', '@customer&carrierInteractins', '@p3', '@bvt'],
    },
    () => {
      //Validate after enter contact and oppurtunity values record should get highlight
      customerUtils.searchCustomer({ customerName: opprCustomerNameVal.customerName });
      genericUtils.clickFirstElementIn({ locator: crmInteractionsPage.tabCrmCustomer });
      portFolioUtils.createScheduleInteractionWithAllFields(interactionsObjectiveVal, interactionLogVia, interactionLogType, durationVal, detailsVal, opprCustomerNameVal.contactName, opprCustomerNameVal.opportunityName);
      genericUtils.clickAction({ locator: crmInteractionsPage.interactionsDetailsColVal });
      genericUtils.verifyTextOrBackGroundColor({ locator: crmInteractionsPage.interactionsTableRow, color: crmInteractionData.staticData.backgroundAttr, colorCode: crmInteractionData.staticData.backgroundColorCode });
      genericUtils.verifyTextOrBackGroundColor({ locator: crmInteractionsPage.opportunitiesTableRow, color: crmInteractionData.staticData.backgroundAttr, colorCode: crmInteractionData.staticData.backgroundColorCode });
      genericUtils.verifyTextOrBackGroundColor({ locator: crmInteractionsPage.contactsTableRow, color: crmInteractionData.staticData.backgroundAttr, colorCode: crmInteractionData.staticData.backgroundColorCode });
      //Validate after enter contact and oppurtunity values record should get highlight
      carrierUtils.searchCarrier({ carrierName: opprCarrierNameVal.carrierName });
      genericUtils.clickFirstElementIn({ locator: crmInteractionsPage.tabCrmCarrier });
      portFolioUtils.createScheduleInteractionWithAllFields(interactionsObjectiveVal, interactionLogVia, interactionLogType, durationVal, detailsVal, opprCarrierNameVal.contactName, opprCarrierNameVal.opportunityName);
      genericUtils.clickAction({ locator: crmInteractionsPage.interactionsDetailsColVal });
      genericUtils.verifyTextOrBackGroundColor({ locator: crmInteractionsPage.interactionsTableRow, color: crmInteractionData.staticData.backgroundAttr, colorCode: crmInteractionData.staticData.backgroundColorCode });
      genericUtils.verifyTextOrBackGroundColor({ locator: crmInteractionsPage.opportunitiesTableRow, color: crmInteractionData.staticData.backgroundAttr, colorCode: crmInteractionData.staticData.backgroundColorCode });
      genericUtils.verifyTextOrBackGroundColor({ locator: crmInteractionsPage.contactsTableRow, color: crmInteractionData.staticData.backgroundAttr, colorCode: crmInteractionData.staticData.backgroundColorCode });
    });
  it('ME-146505 : Verify edit Schedule Interaction; the save button should be disabled before editing. > CRM > Interactions > Schedule | Customer Regression | Regression',
    {
      tags: ['@carrier&customer', '@crm', '@customer&carrierInteractins', '@p2', '@bvt'],
    },
    () => {
      //Validate in edit interaction save button is disabled
      customerUtils.searchCustomer({ customerName: customerNameVal.customerName });
      genericUtils.clickFirstElementIn({ locator: crmInteractionsPage.tabCrmCustomer });
      portFolioUtils.createNewScheduleInteraction(interactionsObjectiveVal, interactionLogVia, interactionLogOutCome, interactionLogType, durationVal, durationVal, detailsVal);
      genericUtils.clickAction({ locator: crmInteractionsPage.kababMenu });
      genericUtils.navigateToChildWindow();
      genericUtils.clickVisibleElement({ locator: crmInteractionsPage.editIcon });
      genericUtils.verifyToDisabled({ element: crmInteractionsPage.btnLogSave });
      genericUtils.navigateBackToPreviousPage();
      //Validate in edit interaction save button is disabled
      carrierUtils.searchCarrier({ carrierName: carrierNameVal.carrierName });
      genericUtils.clickFirstElementIn({ locator: crmInteractionsPage.tabCrmCarrier });
      portFolioUtils.createNewScheduleInteraction(interactionsObjectiveVal, interactionLogVia, interactionLogOutCome, interactionLogType, durationVal, durationVal, detailsVal);
      genericUtils.clickAction({ locator: crmInteractionsPage.kababMenu });
      genericUtils.navigateToChildWindow();
      genericUtils.clickVisibleElement({ locator: crmInteractionsPage.editIcon });
      genericUtils.verifyToDisabled({ element: crmInteractionsPage.btnLogSave });
      genericUtils.navigateBackToPreviousPage();
    });
  it('ME-146487 : Verify all column filter options in the Interactions table. > CRM > Interactions > Schedule | Customer Regression | Regression',
    {
      tags: ['@carrier&customer', '@crm', '@customer&carrierInteractins', '@p3', '@bvt'],
    },
    () => {
      //Validate in edit interaction save button is disabled
      customerUtils.searchCustomer({ customerName: customerNameVal.customerName });
      genericUtils.clickFirstElementIn({ locator: crmInteractionsPage.tabCrmCustomer });
      cy.get(crmInteractionsPage.interactionsColFilters).each(elem => {
        genericUtils.verifyExists({ element: elem });
      });
      //Validate in edit interaction save button is disabled
      carrierUtils.searchCarrier({ carrierName: carrierNameVal.carrierName });
      genericUtils.clickFirstElementIn({ locator: crmInteractionsPage.tabCrmCarrier });
      cy.get(crmInteractionsPage.interactionsColFilters).each(elem => {
        genericUtils.verifyExists({ element: elem });
      });
    });
  it('ME-146492 : Verify the correct status displayed in the status column of the interaction table. > CRM > Interactions > Schedule | Customer Regression | Regression',
    {
      tags: ['@carrier&customer', '@crm', '@customer&carrierInteractins', '@p2', '@bvt'],
    },
    () => {
    //Validate the status as scheduled for new record
      customerUtils.searchCustomer({ customerName: customerNameVal.customerName });
      genericUtils.clickFirstElementIn({ locator: crmInteractionsPage.tabCrmCustomer });
      portFolioUtils.createNewScheduleInteraction(interactionsObjectiveVal, interactionLogVia, interactionLogOutCome, interactionLogType, durationVal, durationVal, detailsVal);
      genericUtils.customizeUnhideColHeaders({ locator: crmInteractionsPage.customizeBtn, element: crmInteractionsPage.btnCustomize, restEle: crmInteractionsPage.btnResetCustomize, customTableSave: crmInteractionsPage.btnCustomizeApply, columnsToHideOrunHide: crmInteractionData.staticData.interactionsColToUnhide });
      genericUtils.verifyElementText({ locator: crmInteractionsPage.statusColVal, verifyText: crmInteractionData.staticData.scheduleVal });
      //Validate the status as scheduled for new record
      carrierUtils.searchCarrier({ carrierName: carrierNameVal.carrierName });
      genericUtils.clickFirstElementIn({ locator: crmInteractionsPage.tabCrmCarrier });
      portFolioUtils.createNewScheduleInteraction(interactionsObjectiveVal, interactionLogVia, interactionLogOutCome, interactionLogType, durationVal, durationVal, detailsVal);
      genericUtils.customizeUnhideColHeaders({ locator: crmInteractionsPage.customizeBtn, element: crmInteractionsPage.btnCustomize, restEle: crmInteractionsPage.btnResetCustomize, customTableSave: crmInteractionsPage.btnCustomizeApply, columnsToHideOrunHide: crmInteractionData.staticData.interactionsColToUnhide });
      genericUtils.verifyElementText({ locator: crmInteractionsPage.statusColVal, verifyText: crmInteractionData.staticData.scheduleVal });
    });
  it('ME-146501 : Verify after editing; the Schedule Interactions record should be successfully saved in the Interaction table. > CRM > Interactions > Schedule | Customer Regression | Regression',
    {
      tags: ['@carrier&customer', '@crm', '@customer&carrierInteractins', '@p2', '@bvt'],
    },
    () => {
    //Validate user able to edit schedule interactions
      customerUtils.searchCustomer({ customerName: customerNameVal.customerName });
      genericUtils.clickFirstElementIn({ locator: crmInteractionsPage.tabCrmCustomer });
      portFolioUtils.createNewScheduleInteraction(interactionsObjectiveVal, interactionLogVia, interactionLogOutCome, interactionLogType, durationVal, durationVal, detailsVal);
      portFolioUtils.editNewScheduleInteraction(crmInteractionData.staticData.interactionLogOutComeDeadEnd, durationVal, durationVal);
      genericUtils.navigateBackToPreviousPage();
      genericUtils.verifyText({ locator: crmInteractionsPage.outcomeColVal, verifyText: crmInteractionData.staticData.interactionLogOutComeDeadEnd });
      //Validate user able to edit schedule interactions
      carrierUtils.searchCarrier({ carrierName: carrierNameVal.carrierName });
      genericUtils.clickFirstElementIn({ locator: crmInteractionsPage.tabCrmCarrier });
      portFolioUtils.createNewScheduleInteraction(interactionsObjectiveVal, interactionLogVia, interactionLogOutCome, interactionLogType, durationVal, durationVal, detailsVal);
      portFolioUtils.editNewScheduleInteraction(crmInteractionData.staticData.interactionLogOutComeDeadEnd, durationVal, durationVal);
      genericUtils.navigateBackToPreviousPage();
      genericUtils.verifyText({ locator: crmInteractionsPage.outcomeColVal, verifyText: crmInteractionData.staticData.interactionLogOutComeDeadEnd });
    });
  it('ME-146553 : Verify records should be added according to Schedule Date and Time in the Interactions table. > CRM > Interactions > Log | Customer Regression | Regression',
    {
      tags: ['@carrier&customer', '@crm', '@customer&carrierInteractins', '@p3', '@bvt'],
    },
    () => {
      //Validate records should be added according to Schedule Date and Time
      customerUtils.searchCustomer({ customerName: customerNameVal.customerName });
      genericUtils.clickFirstElementIn({ locator: crmInteractionsPage.tabCrmCustomer });
      portFolioUtils.createNewScheduleInteraction(interactionsObjectiveVal, interactionLogVia, interactionLogOutCome, interactionLogType, durationVal, durationVal, detailsVal);
      dateTimeUtils.verifyTomorrowDate({ dateLocator: crmInteractionsPage.scheduleDateColVal, attribute: crmInteractionData.staticData.interactionsTitleAttr });
      genericUtils.verifyText({ locator: crmInteractionsPage.scheduleTimeColVal, verifyText: crmInteractionData.staticData.scheduledDefaultTime });
      //Validate records should be added according to Schedule Date and Time
      carrierUtils.searchCarrier({ carrierName: carrierNameVal.carrierName });
      genericUtils.clickFirstElementIn({ locator: crmInteractionsPage.tabCrmCarrier });
      portFolioUtils.createNewScheduleInteraction(interactionsObjectiveVal, interactionLogVia, interactionLogOutCome, interactionLogType, durationVal, durationVal, detailsVal);
      dateTimeUtils.verifyTomorrowDate({ dateLocator: crmInteractionsPage.scheduleDateColVal, attribute: crmInteractionData.staticData.interactionsTitleAttr });
      genericUtils.verifyText({ locator: crmInteractionsPage.scheduleTimeColVal, verifyText: crmInteractionData.staticData.scheduledDefaultTime });
    });
});