/*---------------------------------------------------------------------------------------------------------------
Verify to add attchment to Intraction records from portfolio interacgtions screen//
Test Cases List
Authored By                   : Madhu Manyam
Date                          : 01-03-2023
Functions/Calling References  : crmInteractionsPage,utilities
User Stroy Included           : ME-130041 Can I Verify add attachemnt to edit, view Interactions table data In Interactions Tab
 > PortFolia > Interactions> Edit>Attach File| PortFolia Regression
---------------------------------------------------------------------------------------------------------------*/
import crmIndustryData from '../../../testData/crm/crmData/crmIndustryData.json';
import crmInteractionsData from '../../../testData/crm/crmData/crmInteractionsData.json';
import * as carrierUtils from '../../../utilities/carrierUtils/carrierUtils';
import commonData from '../../../testData/staticData/commonData/commonData.json';
import * as crmInteractionPage from '../../../pageObjects/crm/crmPage/crmInteractionsPage.json';
import * as genericUtils from '../../../utilities/commonUtils/genericUtils';
import { loginToApplication } from '../../../utilities/appSpecificUtils/loginUtils/loginUtils';
import * as customerUtils from '../../../utilities/customerUtils/customerUtils';
import * as portFolioUtils from '../../../utilities/crmUtils/portFolioUtils';
const {
  tdmAddCarrierReq,
  tdmCarrierData,
  tdmCarrierNewScenario,
  tdmAddCustomerReq,
  tdmCustomerData,
  tdmCustomerScenario,
} = crmIndustryData.staticData;
const { userName: usernameText, password: passwordText } = Cypress.env('users')[Cypress.env('appLoginUser')];
const {
  fileName,
} = crmInteractionsData.staticData;
const { moreWait } = commonData;

let carrierNameVal, customerNameVal;
describe('User Validates attach document to interactions record > Porfolio > Interaction Tab> Edit/View > [ME-130041]', () => {
  before(() => {
    cy.log('***creating new carrier***');
    genericUtils.getTDMData({ dataType: tdmCarrierData, dataCondition: tdmAddCarrierReq, dataScenario: tdmCarrierNewScenario });
    cy.then(() => {
      carrierNameVal = Cypress.env('inputVal');
    });
    genericUtils.getTDMData({ dataType: tdmCustomerData, dataCondition: tdmAddCustomerReq, dataScenario: tdmCustomerScenario });
    cy.then(() => {
      customerNameVal = Cypress.env('inputVal');
    });
  });
  beforeEach(() => {
    loginToApplication({ username: usernameText, password: passwordText });
    genericUtils.viewFullPage();
  });

  it('ME-130041 User Verify the add attachemnt to edit, view Interactions table data In Interactions Tab > PortFolia > Interactions> Edit>Attach File| PortFolia Regression | Sprint Regression', {
    tags: [
      '@crm',
      '@portfolio',
      '@@interactions',
      '@p2',
      '@phase2',
    ],
  },
  () => {
    cy.log('***verifying the add attachment  creation in Interactions Schedule & View interaction**');
    carrierUtils.searchCarrier({ carrierName: carrierNameVal.carrierName });
    genericUtils.clickFirstElementIn({ locator: crmInteractionPage.tabCrmCarrier });
    portFolioUtils.createInteractionLogRecd();
    portFolioUtils.createInteractionScheduleRecd();
    customerUtils.searchCustomer({ customerName: customerNameVal.customerName });
    genericUtils.clickFirstElementIn({ locator: crmInteractionPage.tabCrmCustomer });
    portFolioUtils.createInteractionLogRecd();
    portFolioUtils.createInteractionScheduleRecd();
    genericUtils.waitSometime(moreWait);
    portFolioUtils.navigateToPortfolioInteractionsTab();
    portFolioUtils.addAttachmentToScheduleInteractionRecord({ filePath: fileName });
    portFolioUtils.addAttachmentToViewInteractionRecord({ filePath: fileName });
  });
});