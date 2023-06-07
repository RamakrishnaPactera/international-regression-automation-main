/*---------------------------------------------------------------------------------------------------------------
Verify to validate Portfolio > Opportunities > filter Portfolio Opportunities table by column in both default and expand view
Authored By                   : Madhu Manyam
Date                          : 30-03-2023
Functions/Calling References  : crmPortFolioPage,crmIndustryData,crmInteractionsPage,crmInteractionData,commonData,utilities
Test case Included            : ME-137506 User can see opportunities record count, In Opportunities Tab > PortFolia > Opportunities
-------------------------------------------------------------------------------------------------------------------*/
import crmPortFolioPage from '../../../pageObjects/crm/crmPage/crmPortFolioPage.json';
import crmInteractionsPage from '../../../pageObjects/crm/crmPage/crmInteractionsPage.json';
import * as portFolioUtils from '../../../utilities/crmUtils/portFolioUtils';
import * as genericUtils from '../../../utilities/commonUtils/genericUtils';
import { loginToApplication } from '../../../utilities/appSpecificUtils/loginUtils/loginUtils';
import crmOpportunitesData from '../../../testData/crm/crmData/crmOpportunitesData.json';
import { searchCarrier } from '../../../utilities/carrierUtils/carrierUtils';
import { searchCustomer } from '../../../utilities/customerUtils/customerUtils';
import crmPortfolioData from '../../../testData/crm/crmData/crmPortfolioData.json';

import crmNotesData from '../../../testData/crm/crmData/crmNotesData.json';
const {
  btnOpportunitiesStatus,
  lblOpportunities,
  portfilioEntityName,
  portfilioEntityType,
} = crmPortFolioPage;
const {
  tabCrmCustomer,
} = crmInteractionsPage;
const {
  title,
  status,
} = crmOpportunitesData.userDefined;
const {
  tdmAddCarrierReq,
  tdmAddCustomerReq,
  tdmCarrierData,
  tdmCarrierScenario,
  tdmCustomerData,
  tdmCustomerScenario,
} = crmNotesData.staticData;
const {
  entityType,
  entityName,
  selectFilterColumn,
} = crmOpportunitesData.filterOpportunityData;
const {
  opportunitiesType,
  opportunityName,
  opportunityOpenStg,
} = crmPortfolioData.expectedData;
const {
  modeCarr,
  modeCust,
} = crmPortfolioData.userDefinedData;

const { userName: usernameText, password: passwordText } =
  Cypress.env('users')[Cypress.env('appLoginUser')];
let customerNameVal, carrierNameVal;
const nameOpportunity = opportunityName;
describe('User can validate Portfolio > Opportunities > filter Portfolio Opportunities table by column in both default and expand view [User Story:ME-113173]', () => {
  before(() => {
    cy.log('***Creating Customer***');
    genericUtils.getTDMData({ dataType: tdmCustomerData, dataCondition: tdmAddCustomerReq, dataScenario: tdmCustomerScenario });
    cy.then(() => {
      customerNameVal = Cypress.env('inputVal');
    });
    genericUtils.getTDMData({ dataType: tdmCarrierData, dataCondition: tdmAddCarrierReq, dataScenario: tdmCarrierScenario });
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

  it('ME-137506 - User verifies Portfolio > Opportunities > filter Portfolio Opportunities table by column| PortFolia Regression | Sprint Regression',
    {
      tags: [
        '@crm',
        '@portFolio',
        '@opportunities',
        '@p3',
        '@phase2',
      ],
    },
    () => {
      cy.log('***creating Opportunities records in Custimer anad Carrier***');
      searchCarrier({ carrierName: carrierNameVal.carrierName });
      genericUtils.viewFullPage();
      portFolioUtils.createOpportunity({ element: modeCarr });
      searchCustomer({ customerName: customerNameVal.customerName });
      portFolioUtils.createOpportunity({ element: modeCust });
      genericUtils.verifyDoesNotExist({ element: portfilioEntityType });
      genericUtils.verifyDoesNotExist({ element: portfilioEntityName });
      portFolioUtils.verifyOppEntityNameandType();
      searchCustomer({ customerName: customerNameVal.customerName });
      genericUtils.clickFirstElementIn({ locator: tabCrmCustomer });
      portFolioUtils.createOpporWithDateTotProjFields(nameOpportunity + genericUtils.generateRandomNumber(), opportunitiesType, opportunityOpenStg);
      cy.log('*****Navigates to Portfilio Opportunities tab after creating Opportunities ****');
      portFolioUtils.navigateToPorFolioOpportunitiesTab();
      genericUtils.verifyText({ locator: lblOpportunities, verifyText: title });
      genericUtils.verifyTextContains({ locator: btnOpportunitiesStatus, containsText: status });
      portFolioUtils.selectOpportunitiesFilter(selectFilterColumn[0], entityType);
      portFolioUtils.removeSelectedFilter();
      portFolioUtils.selectOpportunitiesFilter(selectFilterColumn[1], entityName);
      portFolioUtils.removeSelectedFilter();
      cy.log('*****Verify filter columns in Expand view*****');
      portFolioUtils.openOpportunitiescCarrotButtonClickExpand();
      portFolioUtils.selectOpportunitiesFilter(selectFilterColumn[0], entityType);
      portFolioUtils.removeSelectedFilter();
      portFolioUtils.selectOpportunitiesFilter(selectFilterColumn[1], entityName);
    });
});