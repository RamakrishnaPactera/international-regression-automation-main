/*---------------------------------------------------------------------------------------------------------------
Portfolio > Interactions and Opportunities > Interactions and Opportunities functionalities are working as expected
Test Cases List
Authored By                   : Madhu Manyam
Date                          : 25-04-2023
Functions/Calling References  : crmPortFolioPage,crmIndustryData,crmInteractionsPage,crmInteractionData,commonData,utilities
User story/Test case Included : ME-146466,150049 - Dynamic Highlight should display between Opportunities record with Contacts , Interactions , Notes and Documents record
---------------------------------------------------------------------------------------------------------------*/

import crmIndustryData from '../../testData/crm/crmData/crmIndustryData.json';
import crmPortfolioData from '../../testData/crm/crmData/crmPortfolioData.json';
import commonData from '../../testData/staticData/commonData/commonData.json';
import { loginToApplication } from '../../utilities/appSpecificUtils/loginUtils/loginUtils';
import * as genericUtils from '../../utilities/commonUtils/genericUtils';
import * as portFolioUtils from '../../utilities/crmUtils/portFolioUtils';
import * as crmInteractionsPage from '../../pageObjects/crm/crmPage/crmInteractionsPage.json';
import * as customerUtils from '../../utilities/customerUtils/customerUtils';
import * as carrierUtils from '../../utilities/carrierUtils/carrierUtils';
import * as crmDocumentsPage from '../../pageObjects/crm/crmPage/crmDocumentsPage.json';
import crmDocumentsData from '../../testData/crm/crmData/crmDocumentsData.json';
import crmContactsData from '../../testData/crm/crmData/crmContactsData.json';

const {
  tdmAddCarrierReq,
  tdmAddCustomerReq,
  tdmCarrierData,
  tdmCarrierNewScenario,
  tdmCustomerData,
  tdmCustomerScenario,
} = crmIndustryData.staticData;
const { shortWait } = commonData;
const {
  modeCarr,
  modeCust,
} = crmPortfolioData.userDefinedData;
const {
  documentFileUploadTargetFile,
} = crmDocumentsData.userDefinedData;

const { userName: usernameText, password: passwordText } =
  Cypress.env('users')[Cypress.env('appLoginUser')];
let customerNameVal, carrierNameVal, interactionsObjectiveVal,
  drpDwnTypeOption1,
  drpDwnDirectionOption1,
  carrierContactName,
  customerContactName;
describe(' [ME-146466] Dynamic Highlight should display between Opportunities record with Contacts , Interactions , Notes and Documents record', () => {
  before(() => {
    genericUtils.getMinionValues(crmDocumentsData.staticData.minionDrpDwnDocumentType, 1).then((resultOptions) => {
      drpDwnTypeOption1 = resultOptions[0];
    });
    genericUtils.getMinionValues(crmDocumentsData.staticData.minionDrpDwnDocumentDirection, 1).then((resultOptions) => {
      drpDwnDirectionOption1 = resultOptions[0];
    });
    cy.log('***creating new carrier***');
    genericUtils.getTDMData({ dataType: tdmCarrierData, dataCondition: tdmAddCarrierReq, dataScenario: tdmCarrierNewScenario });
    cy.then(() => {
      carrierNameVal = Cypress.env('inputVal');
      carrierContactName = carrierNameVal.contactName;
    });
    genericUtils.getMinionValues('customerCrmInteractionsObjective', 1).then((interactionsObjective) => {
      interactionsObjectiveVal = interactionsObjective[0];
    });
    cy.log('***creating new customer***');
    genericUtils.getTDMData({ dataType: tdmCustomerData, dataCondition: tdmAddCustomerReq, dataScenario: tdmCustomerScenario });
    cy.then(() => {
      customerNameVal = Cypress.env('inputVal');
      customerContactName = customerNameVal.contactName;
    });
  });
  beforeEach(() => {
    loginToApplication({
      username: usernameText,
      password: passwordText,
    });
    genericUtils.viewFullPage();
  });

  it('[ME-146466] - User can see row higlighting in Contacts , Interactions , Notes and  Documents when user selects Opportunity record >Carrier| Regression',
    {
      tags: [
        '@crm',
        '@opportunities',
        '@customerOpportunities',
        '@carrierOpportunities',
        '@p2',
        '@phase2',
      ],
    },
    () => {
      cy.log('***creating opportunity, notes, documents,  interaction records on  carrier***');
      const randomOpportunityName = crmContactsData.userDefinedData.prefixTxt + genericUtils.generateRandomNumber();
      carrierUtils.searchCarrier({ carrierName: carrierNameVal.carrierName });
      genericUtils.clickFirstElementIn({ locator: crmInteractionsPage.tabCrmCarrier });
      genericUtils.waitSometime(shortWait);
      portFolioUtils.createOpportunityWithContact({ element: modeCarr, opportunityName: randomOpportunityName, contactName: carrierContactName });
      portFolioUtils.createInteractionLogRecordWithAllFields({
        objective: interactionsObjectiveVal,
        contactName: carrierContactName,
        opportunityName: randomOpportunityName,
      });
      carrierUtils.navigateToDocumentsTab({ carrierName: carrierNameVal.carrierName });
      customerUtils.addDocumentsAllFields({
        locator: crmDocumentsPage.btnDocumentPlsDefault,
        documentFileUploadTargetFile,
        dropDownDocTypeValue: drpDwnTypeOption1,
        contactName: carrierContactName,
        randomName: randomOpportunityName,
        dropDownDocDirectionValue: drpDwnDirectionOption1,
      });
      genericUtils.waitSometime(shortWait);
      carrierUtils.navigateToNotesTab({ carrierName: carrierNameVal.carrierName });
      customerUtils.addNotesWithAllFields({
        contactName: carrierContactName,
        randomName: randomOpportunityName,
      });
      customerUtils.userClicksOnOpportunityRow(randomOpportunityName);
      customerUtils.verifyAutoHighlitingOfRecords(randomOpportunityName);
    });
  it('[ME-150049]- User can see row higlighting in Contacts , Interactions , Notes and  Documents when user selects Opportunity record >Customer| Regression',
    {
      tags: [
        '@crm',
        '@opportunities',
        '@customerOpportunities',
        '@carrierOpportunities',
        '@p2',
        '@phase2',
      ],
    },
    () => {
      cy.log('***Creating opportunity, notes, documents,  interaction records on customer***');
      const randomOpportunityName = crmContactsData.userDefinedData.prefixTxt + genericUtils.generateRandomNumber();
      customerUtils.searchCustomer({ customerName: customerNameVal.customerName });
      genericUtils.clickFirstElementIn({ locator: crmInteractionsPage.tabCrmCustomer });
      portFolioUtils.createOpportunityWithContact({ element: modeCust, opportunityName: randomOpportunityName, contactName: customerContactName });
      portFolioUtils.createInteractionLogRecordWithAllFields({
        objective: interactionsObjectiveVal,
        contactName: customerContactName,
        opportunityName: randomOpportunityName,
      });
      customerUtils.navigateToDocumentsTab({ customerName: customerNameVal.customerName });
      customerUtils.addDocumentsAllFields({
        locator: crmDocumentsPage.btnDocumentPlsDefault,
        documentFileUploadTargetFile,
        dropDownDocTypeValue: drpDwnTypeOption1,
        contactName: customerContactName,
        randomName: randomOpportunityName,
        dropDownDocDirectionValue: drpDwnDirectionOption1,
      });
      genericUtils.waitSometime(shortWait);
      customerUtils.navigateToNotesTab({ customerName: customerNameVal.customerName });
      customerUtils.addNotesWithAllFields({
        contactName: customerContactName,
        randomName: randomOpportunityName,
      });
      customerUtils.userClicksOnOpportunityRow(randomOpportunityName);
      customerUtils.verifyAutoHighlitingOfRecords(randomOpportunityName);
    });
});