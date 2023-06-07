//---------------------------------------------------------------------------------------------------------------
//List to all Fields data to search results in expand view with the below Minion terms//
//Test Cases List
//Authored By                   : Murali
//Date                          : 17-05-2023
//Functions/Calling References  : crmPortFolioPage,crmIndustryData,crmInteractionsPage,crmInteractionData,commonData,utilities
//Test case Included            : ME-149585- Verify Scheduled interactions should display by-default for current Date on Interactions Tab > portFolia > interactions
//ME-149598- Verify the Scheduled Date and Scheduled Time column should sort by Ascending order by-default in Portfolio Interactions Tab
//---------------------------------------------------------------------------------------------------------------
import {
  getMinionValues,
  getTDMData,
  verifyClosePopup,
  verifyExists,
  viewFullPage,
  waitSometime,
  clickAction,
  typeAndPressEnter,
} from '../../../utilities/commonUtils/genericUtils';
import crmPortFolioPage from '../../../pageObjects/crm/crmPage/crmPortFolioPage.json';
import crmIndustryData from '../../../testData/crm/crmData/crmIndustryData.json';
import { loginToApplication } from '../../../utilities/appSpecificUtils/loginUtils/loginUtils';
import {
  carrotButtonClickExpand,
  navigateToPortfolioInteractionsTab,
  verifyEntityType,
  verifyInteractionsKeyTabFilters,
} from '../../../utilities/crmUtils/portFolioUtils';
import crmInteractionsPage from '../../../pageObjects/crm/crmPage/crmInteractionsPage.json';
import crmInteractionData from '../../../testData/crm/crmData/crmInteractionsData.json';
import commonData from '../../../testData/staticData/commonData/commonData.json';
const {
  entityTypeCarrier,
  entityTypeCustomer,
} = crmInteractionData.staticData;
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
  entityTypeColFilter,
  entityTypeColValExp,
  btnScheduleDateTime,
  btnScheduleTime,
  btnStatusSheduled,
  drpDwnSchedule,
  btnStatusFilterClear,
} = crmPortFolioPage;
const {
  tabInteractions,
} = crmInteractionsPage;
const { userName: usernameText, password: passwordText } =
    Cypress.env('users')[Cypress.env('appLoginUser')];
describe(' Verify Scheduled Results on Interactions Tab > portFolia > interactions > Interactions Tab [ME-149585] [ME-149598]', () => {
  beforeEach(() => {
    getMinionValues('customerCrmInteractionsObjective', 1).then(() => {
    });
    getTDMData({ dataType: tdmCarrierData, dataCondition: tdmAddCarrierReq, dataScenario: tdmCarrierNewScenario });
    waitSometime(shortWait);
    getTDMData({ dataType: tdmCustomerData, dataCondition: tdmAddCustomerReq, dataScenario: tdmCustomerScenario });
    loginToApplication({ username: usernameText, password: passwordText });
    viewFullPage();
  });
  it('ME-149585- Verify Scheduled interactions should display by-default for current Date on Interactions Tab > portFolia > interactions',
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
      cy.log('***Navigating to Portfolio Tab an then to Interactions Tab***');
      navigateToPortfolioInteractionsTab();
      cy.log('*** validations in Expand view ***');
      carrotButtonClickExpand();
      cy.log('*** verify Interaction Tab filters ***');
      verifyInteractionsKeyTabFilters();
      waitSometime(shortWait);
      cy.log('***verify Verfiy Button with Schbule ***');
      verifyExists({ element: btnStatusSheduled });
      verifyExists({ element: drpDwnSchedule });
      waitSometime(shortWait);
      cy.log('***verify entityType with Carrier***');
      verifyEntityType({ locator: entityTypeColFilter, element: entityTypeColValExp, dataText: entityTypeCarrier, verifyText: entityTypeCarrier });
      cy.log('***verify entityType with Customer***');
      verifyEntityType({ locator: entityTypeColFilter, element: entityTypeColValExp, dataText: entityTypeCustomer, verifyText: entityTypeCustomer });
      verifyClosePopup();
      verifyExists({ element: tabInteractions });
    });
  it('ME-149598- Verify the Scheduled Date and Scheduled Time column should sort by Ascending order by-default in Portfolio Interactions Tab > portFolio > interactions',
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
      cy.log('***Navigating to Portfolio Tab an then to Interactions Tab***');
      navigateToPortfolioInteractionsTab();
      cy.log('*** validations in Expand view ***');
      carrotButtonClickExpand();
      cy.log('*** verify Interaction Tab filters ***');
      verifyInteractionsKeyTabFilters();
      waitSometime(shortWait);
      cy.log('*** verify Button status filter and dropdown with Scheduled ***');
      verifyExists({ element: btnStatusSheduled });
      verifyExists({ element: drpDwnSchedule });
      cy.log('*** clearing or Deselecting status filter and dropdown with Scheduled ***');
      clickAction({ locator: btnStatusFilterClear });
      waitSometime(shortWait);
      typeAndPressEnter({ locator: drpDwnSchedule, typeText: '{enter}' });
      //verifyClosePopup();
      cy.log('*** verify Schedule DateTime elements sorted in ascending order by default ***');
      verifyExists({ element: btnScheduleDateTime });
      verifyExists({ element: btnScheduleTime });
      waitSometime(shortWait);
      verifyExists({ element: tabInteractions });
    });
});