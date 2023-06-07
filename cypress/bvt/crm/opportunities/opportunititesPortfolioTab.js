import crmPortFolioPage from '../../../pageObjects/crm/crmPage/crmPortFolioPage.json';
import * as portFolioUtils from '../../../utilities/crmUtils/portFolioUtils';
import * as genericUtils from '../../../utilities/commonUtils/genericUtils';
import { loginToApplication } from '../../../utilities/appSpecificUtils/loginUtils/loginUtils';
import crmOpportunitesData from '../../../testData/crm/crmData/crmOpportunitesData.json';
import { searchCarrierCustomer } from '../../../utilities/carrierUtils/carrierUtils';
import { searchCustomer } from '../../../utilities/customerUtils/customerUtils';
import crmPortfolioData from '../../../testData/crm/crmData/crmPortfolioData.json';
import crmNotesData from '../../../testData/crm/crmData/crmNotesData.json';
import commonData from '../../../testData/staticData/commonData/commonData.json';
import * as commonPage from '../../../pageObjects/commonPage/commonPage.json';
const { shortWait } = commonData;
const {
  tdmAddCarrierReq,
  tdmAddCustomerReq,
  tdmCarrierData,
  tdmCarrierScenario,
  tdmCustomerData,
  tdmCustomerScenario,
} = crmNotesData.staticData;
const {
  opportunityOpenStg,
  opportunityClosedStg,
  opportunityHoldStg,
  statusClose,
  statusHold,
  statusOpen,
} = crmPortfolioData.expectedData;
const { modeCust, modeCarr } = crmPortfolioData.userDefinedData;
const { userName: usernameText, password: passwordText } =
  Cypress.env('users')[Cypress.env('appLoginUser')];
const oppPortfolioLabels = [crmPortFolioPage.lblOppName, crmPortFolioPage.lblOppStage, crmPortFolioPage.lblOppType, crmPortFolioPage.lblOppReps];
let customerNameVal, carrierNameVal;
describe('User can validate Opportunities > Portfolio | PortFolia Regression [ME-149611, ME-149614]', () => {
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

  it('ME-149611, ME-149614 Verify the "Open" opportunities Status records should display by-default in the Portfolio Opportunities tab | PortFolio Regression',
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
      portFolioUtils.navigateToPorFolioOpportunitiesTab();
      genericUtils.waitSometime(shortWait);
      genericUtils.verifyAllElementContainsText({ locator: crmPortFolioPage.txtOpportunitiesStatus, verifyText: crmOpportunitesData.staticData.lblOpen });
      genericUtils.verifyDateListInDescendingOrder({ locator: crmPortFolioPage.txtOpportunityDate });
    });

  it.only('ME-149826 Verify the recently Added Opportunity record should display at the top of the opportunities table based on Status(Open, On Hold and Closed) | PortFolio Regression',
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
      //Adding Opportunities with Open,Closed and On Hold status in Carrier
      searchCarrierCustomer({ typeTextVal: carrierNameVal.carrierName });
      portFolioUtils.addOppAndVerifyInPortfolioByStatus({ txtOppStage: opportunityOpenStg, drpDwnFilterStatus: statusOpen, ccType: modeCarr });
      searchCarrierCustomer({ typeTextVal: carrierNameVal.carrierName });
      portFolioUtils.addOppAndVerifyInPortfolioByStatus({ txtOppStage: opportunityClosedStg, drpDwnFilterStatus: statusClose, ccType: modeCarr });
      searchCarrierCustomer({ typeTextVal: carrierNameVal.carrierName });
      portFolioUtils.addOppAndVerifyInPortfolioByStatus({ txtOppStage: opportunityHoldStg, drpDwnFilterStatus: statusHold, ccType: modeCarr });
      //Adding Opportunities with Open,Closed and On Hold status in Customer
      searchCustomer({ typeTextVal: customerNameVal.customerName });
      portFolioUtils.addOppAndVerifyInPortfolioByStatus({ txtOppStage: opportunityOpenStg, drpDwnFilterStatus: statusOpen, ccType: modeCust });
      searchCustomer({ typeTextVal: customerNameVal.customerName });
      portFolioUtils.addOppAndVerifyInPortfolioByStatus({ txtOppStage: opportunityClosedStg, drpDwnFilterStatus: statusClose, ccType: modeCust });
      searchCustomer({ typeTextVal: customerNameVal.customerName });
      portFolioUtils.addOppAndVerifyInPortfolioByStatus({ txtOppStage: opportunityHoldStg, drpDwnFilterStatus: statusHold, ccType: modeCust });
    });

  it('ME-150285, ME-150276, ME-149837 Verify required fields and Save button in Opportunity modal in Portfolio Opportunities tab  | PortFolio Regression',
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
      portFolioUtils.navigateToPorFolioOpportunitiesTab();
      genericUtils.waitSometime(shortWait);
      genericUtils.selectKabobMenuOptionTable({ locator: commonPage.tblOpportunitiesTable, menuName: 'Edit' });
      oppPortfolioLabels.forEach((element) => {
        genericUtils.verifyContains({ locator: element, containsText: crmOpportunitesData.userDefined.asterisk });
      });
      genericUtils.verifyIfDisabled({ locator: crmPortFolioPage.btnSaveOpportunity });
      genericUtils.clearTextType({ element: crmPortFolioPage.txtAddInteractionDetails, typeText: crmPortfolioData.kabobMenuOptions.newOpportunity });
      genericUtils.verifyIfEnabled({ locator: crmPortFolioPage.btnSaveOpportunity });
    });
});