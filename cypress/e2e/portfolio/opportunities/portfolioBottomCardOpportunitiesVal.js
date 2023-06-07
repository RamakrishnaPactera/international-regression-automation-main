/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
Portfolio Bottom Card Opportunities Table Validations Default View and Expand View
Test Cases List
Authored B : K.Santhosh
Date: 17-03-2023
Functions/Calling References : crmNotesData, crmNotesPage, crmInteractionsPage, crmPortFolioPage, crmPortfolioData, customerUtils, carrierUtils, genericUtils, loginUtils, portFolioUtils
Test case Included : ME-133778 Can I Validate Portfolio Bottom Card Opportunities Table > CRM > Opportunities |  Regression | Sprint Regression
-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
import crmNotesData from '../../../testData/crm/crmData/crmNotesData.json';
import crmInteractionsPage from '../../../pageObjects/crm/crmPage/crmInteractionsPage.json';
import crmPortFolioPage from '../../../pageObjects/crm/crmPage/crmPortFolioPage.json';
import crmPortfolioData from '../../../testData/crm/crmData/crmPortfolioData.json';
import { searchCarrier } from '../../../utilities/carrierUtils/carrierUtils';
import { searchCustomer } from '../../../utilities/customerUtils/customerUtils';
import {
  clickAction,
  clickFirstElementIn,
  generateRandomNumber,
  getTDMData,
  verifyDoesNotExist,
  viewFullPage,
} from '../../../utilities/commonUtils/genericUtils';
import {
  createOpportunity,
  createOpportunityExp,
  createOpporWithDateTotProjFields,
  createOpporWithDateTotProjFieldsExp,
  verifyColumnsInOpportunitiesTab,
  verifyColumnsInOpportunitiesTabExp,
  verifyOppEntityNameandType,
} from '../../../utilities/crmUtils/portFolioUtils';
import { loginToApplication } from '../../../utilities/appSpecificUtils/loginUtils/loginUtils';
const { userName: usernameText, password: passwordText } =
  Cypress.env('users')[Cypress.env('appLoginUser')];
const {
  tdmAddCarrierReq,
  tdmAddCustomerReq,
  tdmCarrierData,
  tdmCarrierScenario,
  tdmCustomerData,
  tdmCustomerScenario,
} = crmNotesData.staticData;
const {
  opportunitiesType,
  opportunityName,
  opportunityOpenStg,
} = crmPortfolioData.expectedData;
const {
  modeCarr,
  modeCust,
} = crmPortfolioData.userDefinedData;
const {
  btnOppExpandViewClose,
  portfilioEntityName,
  portfilioEntityType,
} = crmPortFolioPage;

const {
  tabCrmCustomer,
} = crmInteractionsPage;

let customerNameVal, carrierNameVal;
const nameOpportunity = opportunityName;
describe('Can I Validate Portfolio Bottom Card Opportunities Table > Customer > CRM > Opportunities > Portfolio Validations [ME-133778]', () => {
  before(() => {
    cy.log('***Creating Customer***');
    getTDMData({ dataType: tdmCustomerData, dataCondition: tdmAddCustomerReq, dataScenario: tdmCustomerScenario });
    cy.then(() => {
      customerNameVal = Cypress.env('inputVal');
    });
    getTDMData({ dataType: tdmCarrierData, dataCondition: tdmAddCarrierReq, dataScenario: tdmCarrierScenario });
    cy.then(() => {
      carrierNameVal = Cypress.env('inputVal');
    });
  });
  beforeEach(() => {
    loginToApplication({
      username: usernameText,
      password: passwordText,
    });
    viewFullPage();
  });

  it('ME-133778 Can I Validate Portfolio Bottom Card Opportunities Table > CRM > Opportunities |  Regression | Sprint Regression',
    {
      tags: [
        '@customer',
        '@crm',
        '@customerOpportunities',
        '@p1',
        '@phase1',
      ],
    },
    () => {
      cy.log('***verifying in default view***');
      searchCarrier({ carrierName: carrierNameVal.carrierName });
      viewFullPage();
      createOpportunity({ element: modeCarr });
      searchCustomer({ customerName: customerNameVal.customerName });
      createOpportunity({ element: modeCust });
      verifyDoesNotExist({ element: portfilioEntityType });
      verifyDoesNotExist({ element: portfilioEntityName });
      verifyOppEntityNameandType();
      searchCustomer({ customerName: customerNameVal.customerName });
      clickFirstElementIn({ locator: tabCrmCustomer });
      createOpporWithDateTotProjFields(nameOpportunity + generateRandomNumber(), opportunitiesType, opportunityOpenStg);
      verifyColumnsInOpportunitiesTab();
      cy.log('***verifying in expand view***');
      searchCarrier({ carrierName: carrierNameVal.carrierName });
      viewFullPage();
      createOpportunityExp({ element: modeCarr });
      clickAction({ locator: btnOppExpandViewClose });
      searchCustomer({ customerName: customerNameVal.customerName });
      createOpportunityExp({ element: modeCust });
      verifyDoesNotExist({ element: portfilioEntityType });
      verifyDoesNotExist({ element: portfilioEntityName });
      clickAction({ locator: btnOppExpandViewClose });
      verifyOppEntityNameandType();
      searchCustomer({ customerName: customerNameVal.customerName });
      clickFirstElementIn({ locator: tabCrmCustomer });
      createOpporWithDateTotProjFieldsExp(nameOpportunity + generateRandomNumber(), opportunitiesType, opportunityOpenStg);
      verifyColumnsInOpportunitiesTabExp();
    },
  );
});