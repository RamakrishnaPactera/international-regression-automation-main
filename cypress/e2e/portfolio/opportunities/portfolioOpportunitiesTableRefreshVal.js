/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
Portfolio Opportunities Table Refresh icon Validations In Default View and Expand View
Test Cases List
Authored By     : K.Santhosh
Date            : 31-03-2023
Functions/Calling References  : crmNotesData, crmNotesPage, crmInteractionsPage, crmPortFolioPage, crmPortfolioData, customerUtils, carrierUtils, genericUtils, loginUtils, portFolioUtils
Test case Included   : ME-138096 Can User Validate Portfolio Opportunities Table Refresh icon > CRM > Opportunities |  Regression | Sprint Regression
-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
import crmNotesData from '../../../testData/crm/crmData/crmNotesData.json';
import crmPortfolioData from '../../../testData/crm/crmData/crmPortfolioData.json';
import { searchCarrier } from '../../../utilities/carrierUtils/carrierUtils';
import { searchCustomer } from '../../../utilities/customerUtils/customerUtils';
import {
  getTDMData,
  viewFullPage,
} from '../../../utilities/commonUtils/genericUtils';
import {
  createOpportunity,
  navigateToPorFolioOpportunitiesTab,
  refreshValInDefaultAndExpView,
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
  modeCarr,
  modeCust,
} = crmPortfolioData.userDefinedData;

let customerNameVal, carrierNameVal;
describe('Can User Validate Portfolio Opportunities Table Refresh icon > Customer > CRM > Opportunities > Portfolio Validations [ME-138096]', () => {
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

  it('ME-138096 Can User Validate Portfolio Opportunities Table Refresh icon > CRM > Opportunities |  Regression | Sprint Regression',
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
      searchCarrier({ carrierName: carrierNameVal.carrierName });
      viewFullPage();
      createOpportunity({ element: modeCarr });
      searchCustomer({ customerName: customerNameVal.customerName });
      createOpportunity({ element: modeCust });
      navigateToPorFolioOpportunitiesTab();
      refreshValInDefaultAndExpView();
    },
  );
});