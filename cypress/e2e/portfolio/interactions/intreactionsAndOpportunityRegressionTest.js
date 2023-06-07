/*---------------------------------------------------------------------------------------------------------------
Portfolio > Interactions and Opportunities > Interactions and Opportunities functionalities are working as expected
Test Cases List
Authored By                   : Madhu Manyam
Date                          : 06-04-2023
Functions/Calling References  : crmPortFolioPage,crmIndustryData,crmInteractionsPage,crmInteractionData,commonData,utilities
Test case Included            : ME-137526 - User can verify Intractions tab and Opportunities tab  options in Portfolio page
---------------------------------------------------------------------------------------------------------------*/

import * as crmPortFolioPage from '../../../pageObjects/crm/crmPage/crmPortFolioPage.json';
import crmFiltersData from '../../../testData/crm/crmData/crmFiltersData.json';
import crmIndustryData from '../../../testData/crm/crmData/crmIndustryData.json';
import crmOpportunitesData from '../../../testData/crm/crmData/crmOpportunitesData.json';
import crmPortfolioData from '../../../testData/crm/crmData/crmPortfolioData.json';
import commonData from '../../../testData/staticData/commonData/commonData.json';
import { loginToApplication } from '../../../utilities/appSpecificUtils/loginUtils/loginUtils';
import * as genericUtils from '../../../utilities/commonUtils/genericUtils';
import * as portFolioUtils from '../../../utilities/crmUtils/portFolioUtils';
import * as crmInteractionsPage from '../../../pageObjects/crm/crmPage/crmInteractionsPage.json';
import * as customerUtils from '../../../utilities/customerUtils/customerUtils';
import * as carrierUtils from '../../../utilities/carrierUtils/carrierUtils';
const {
  Status,
  entityType,
  entityName,
  selectFilterColumn,
  Name,
} = crmFiltersData.filtersData;

const {
  tdmAddCarrierReq,
  tdmAddCustomerReq,
  tdmCarrierData,
  tdmCarrierNewScenario,
  tdmCustomerData,
  tdmCustomerScenario,
} = crmIndustryData.staticData;
const { shortWait, moreWait } = commonData;
const {
  modeCarr,
  modeCust,
} = crmPortfolioData.userDefinedData;
const {
  title,
  statusType,
} = crmOpportunitesData.userDefined;

const { userName: usernameText, password: passwordText } =
  Cypress.env('users')[Cypress.env('appLoginUser')];
let customerNameVal, carrierNameVal, interactionsObjectiveVal;
describe('User can verify Portfilio Interactions and Opportunities tab  Kabob menu options> portFoliao> interactions & Opportunities  [ME-137526 ]', () => {
  beforeEach(() => {
    cy.log('***creating new carrier***');
    genericUtils.getTDMData({ dataType: tdmCarrierData, dataCondition: tdmAddCarrierReq, dataScenario: tdmCarrierNewScenario });
    cy.then(() => {
      carrierNameVal = Cypress.env('inputVal');
    });
    genericUtils.getMinionValues('customerCrmInteractionsObjective', 1).then((interactionsObjective) => {
      interactionsObjectiveVal = interactionsObjective[0];
    });
    cy.log('***creating new customer***');
    genericUtils.getTDMData({ dataType: tdmCustomerData, dataCondition: tdmAddCustomerReq, dataScenario: tdmCustomerScenario });
    cy.then(() => {
      customerNameVal = Cypress.env('inputVal');
    });
    loginToApplication({ username: usernameText, password: passwordText });
    genericUtils.viewFullPage();
  });

  it('ME-137526 - User can verify Portfilio Interactions and Opportunities tab  Kabob menu options > portFolio | PortFolia Regression | Sprint Regression',
    {
      tags: [
        '@crm',
        '@portFolio',
        '@interactions',
        '@p2',
        '@phase2',
      ],
    },
    () => {
      cy.log('***creating interaction record on both carrier and customer***');
      //Creating interaction record in Carrier
      carrierUtils.searchCarrier({ carrierName: carrierNameVal.carrierName });
      genericUtils.clickFirstElementIn({ locator: crmInteractionsPage.tabCrmCarrier });
      genericUtils.waitSometime(shortWait);
      portFolioUtils.createInteractionLogRecd({ objective: interactionsObjectiveVal });
      portFolioUtils.createInteractionScheduleRecd();
      //Creating interaction log & schedule records in Customer
      customerUtils.searchCustomer({ customerName: customerNameVal.customerName });
      genericUtils.clickFirstElementIn({ locator: crmInteractionsPage.tabCrmCustomer });
      portFolioUtils.createInteractionLogRecd({ objective: interactionsObjectiveVal });
      portFolioUtils.createInteractionScheduleRecd();
      genericUtils.waitSometime(moreWait);
      //Creating opportunity records in carrier & customer
      carrierUtils.searchCarrier({ carrierName: carrierNameVal.carrierName });
      portFolioUtils.createOpportunity({ element: modeCarr });
      customerUtils.searchCustomer({ customerName: customerNameVal.customerName });
      portFolioUtils.createOpportunity({ element: modeCust });
      cy.log('***Default Interaction tab will be selected***');
      portFolioUtils.verifyDefaultTabSelecion();
      cy.log('***validate Intearctions view***');
      portFolioUtils.navigateToPortfolioInteractionsTab();
      portFolioUtils.verifyInteractionsKabobMenuOptions();
      portFolioUtils.verifyInteractionsTabFilters();
      portFolioUtils.selectInteractionsFilter(selectFilterColumn[0], Status);
      genericUtils.removeSelectedFilter(selectFilterColumn[0]);
      portFolioUtils.selectInteractionsFilter(selectFilterColumn[2], entityType);
      genericUtils.removeSelectedFilter(selectFilterColumn[2]);
      portFolioUtils.selectInteractionsFilter(selectFilterColumn[3], entityName);
      cy.log('*****Navigates to Portfilio Opportunities tab after creating Opportunities ****');
      portFolioUtils.navigateToPorFolioOpportunitiesTab();
      genericUtils.verifyText({ locator: crmPortFolioPage.lblOpportunities, verifyText: title });
      portFolioUtils.verifyOpportunitiesKabobMenuOptions();
      portFolioUtils.selectOpportunitiesFilter(selectFilterColumn[1], Name);
      genericUtils.removeSelectedFilter(selectFilterColumn[1]);
      portFolioUtils.selectOpportunitiesFilter(selectFilterColumn[2], entityType);
      genericUtils.removeSelectedFilter(selectFilterColumn[2]);
      portFolioUtils.selectOpportunitiesFilter(selectFilterColumn[3], entityName);
      genericUtils.removeSelectedFilter(selectFilterColumn[3]);
      portFolioUtils.selectOpportunitiesStatusType(statusType);
    });
});