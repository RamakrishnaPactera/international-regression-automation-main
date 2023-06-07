/*---------------------------------------------------------------------------------------------------------------
Verify to edit Intraction records from portfolio interacgtions screen
Test Cases List
Authored By                   : Madhu manyam
Date                          : 14-03-2023
Functions/Calling References  : crmInteractionsPage,utilities
Test case Included            : ME-130041 Verify edit Interactions record from interactions table data In Interactions Tab > PortFolia > Interactions> Edit
---------------------------------------------------------------------------------------------------------------*/
import crmIndustryData from '../../../testData/crm/crmData/crmIndustryData.json';
import * as carrierUtils from '../../../utilities/carrierUtils/carrierUtils';
import commonData from '../../../testData/staticData/commonData/commonData.json';
import * as crmInteractionPage from '../../../pageObjects/crm/crmPage/crmInteractionsPage.json';
import genericUtils from '../../../utilities/commonUtils/genericUtils';
import { loginToApplication } from '../../../utilities/appSpecificUtils/loginUtils/loginUtils';
import * as customerUtils from '../../../utilities/customerUtils/customerUtils';
import * as portFolioUtils from '../../../utilities/crmUtils/portFolioUtils';
const { userName: usernameText, password: passwordText } = Cypress.env('users')[Cypress.env('appLoginUser')];
const {
  tdmAddCarrierReq,
  tdmAddCustomerReq,
  tdmCarrierData,
  tdmCarrierNewScenario,
  tdmCustomerData,
  tdmCustomerScenario,
} = crmIndustryData.staticData;

let carrierNameVal, customerNameVal, interactionsObjectiveVal;
describe('User Validates edit interactions record code > Porfolio > Interaction Tab> Edit > [ME-130041]', () => {
  before(() => {
    genericUtils.getMinionValues('customerCrmInteractionsObjective', 1).then((interactionsObjective) => {
      interactionsObjectiveVal = interactionsObjective[0];
    });
    genericUtils.getMinionValues('customerCrmInteractionsObjective', 1).then((interactionsObjective) => {
      interactionsObjectiveVal = interactionsObjective[0];
    });
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

  it('[ME-130041]Verify Edit Interactions table data In Interactions Tab > portFolio > interactions | PortFolio Regression | Sprint Regression', {
    tags: [
      '@crm',
      '@portfolio',
      '@@interactions',
      '@p2',
      '@phase2',
    ],
  },
  () => {
    cy.log('***verifying the new record creation in Carrier & customer interaction**');
    //Creating interaction Log & Scheduled record in Carrier
    carrierUtils.searchCarrier({ carrierName: carrierNameVal.carrierName });
    genericUtils.clickFirstElementIn({ locator: crmInteractionPage.tabCrmCarrier });
    portFolioUtils.createInteractionLogRecd({ objective: interactionsObjectiveVal });
    portFolioUtils.createInteractionScheduleRecd();
    //Creating interaction Log & Scheduled record in Customer
    customerUtils.searchCustomer({ customerName: customerNameVal.customerName });
    genericUtils.clickFirstElementIn({ locator: crmInteractionPage.tabCrmCustomer });
    portFolioUtils.createInteractionLogRecd({ objective: interactionsObjectiveVal });
    portFolioUtils.createInteractionScheduleRecd();
    genericUtils.waitSometime(commonData.moreWait);
    portFolioUtils.navigateToPortfolioInteractionsTab();
    portFolioUtils.editScheduleInteractionDetails();
    genericUtils.waitSometime(commonData.moreWait);
    portFolioUtils.getUpdatedInteractionDetails();
  });
});