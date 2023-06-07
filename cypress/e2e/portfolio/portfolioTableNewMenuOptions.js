/*---------------------------------------------------------------------------------------------------------------
Portfolio > Portfolio table new Kabob menu options functionalities are working as expected when account type selects as 'Customer'
Test Cases List               : ME-141333,ME-141380,ME-141384,ME-141388,ME-141426,ME-141442,ME-141474,ME-141478,ME-141520
Authored By                   : Madhu Manyam
Date                          : 10-04-2023
Functions/Calling References  : commonPage, crmPortFolioPage,crmPortFilioPage,,commonData,utilities
User Strories Included           : ME-112321 - Customer: Portfolio Account Table - New Kabob Menu Options
---------------------------------------------------------------------------------------------------------------*/
import crmIndustryData from '../../testData/crm/crmData/crmIndustryData.json';
import { loginToApplication } from '../../utilities/appSpecificUtils/loginUtils/loginUtils';
import * as genericUtils from '../../utilities/commonUtils/genericUtils';
import * as portFolioUtils from '../../utilities/crmUtils/portFolioUtils';
import * as commonPage from '../../pageObjects/commonPage/commonPage.json';
import crmCommonData from '../../testData/staticData/commonData/crmCommonData.json';

const {
  tdmAddCarrierReq,
  tdmCarrierData,
  tdmCarrierNewScenario,
  tdmCustomerData,
  tdmCustomerScenario,
  tdmAddCustomerReq,
} = crmIndustryData.staticData;
const {
  logInteraction,
  scheduleInteraction,
  newOpportunity,
  spotQuote,
} = crmCommonData.kabobMenuOptions;
const { userName: usernameText, password: passwordText } =
  Cypress.env('users')[Cypress.env('appLoginUser')];
describe('User verifies Customer: Portfolio Account Table - New Kabob Menu Options by selecting account type [ME-112321 ]', () => {
  beforeEach(() => {
    cy.log('***creating new carrier***');
    genericUtils.getTDMData({ dataType: tdmCarrierData, dataCondition: tdmAddCarrierReq, dataScenario: tdmCarrierNewScenario });
    cy.log('***creating new customer***');
    genericUtils.getTDMData({ dataType: tdmCustomerData, dataCondition: tdmAddCustomerReq, dataScenario: tdmCustomerScenario });
    loginToApplication({ username: usernameText, password: passwordText });
    genericUtils.viewFullPage();
  });

  it('[ME-141333,ME-141380,ME-141384,ME-141388,ME-141426,ME-141442,ME-141474,ME-141478,ME-141520] - Verify the Portfolio table new context menu options in  Portfolio accounts table',
    {
      tags: [
        '@crm',
        '@portFolio',
        '@p2',
        '@phase2',
      ],
    },
    () => {
      cy.log('***creating interaction record on both carrier and customer***');
      portFolioUtils.navigateToPorFolioTab();
      portFolioUtils.selectPorfolioAccountType('Customer');
      portFolioUtils.verifyPorFolioKabobMenuOptions();
      portFolioUtils.openKabobMenuOptionFromPorFolioTable(logInteraction);
      cy.url().should('contain', logInteraction.replace(' ', ''));
      cy.go('back');
      portFolioUtils.openKabobMenuOptionFromPorFolioTable(scheduleInteraction);
      cy.url().should('contain', scheduleInteraction.replace(' ', ''));
      cy.go('back');
      portFolioUtils.openKabobMenuOptionFromPorFolioTable(spotQuote);
      cy.url().should('contain', '/spot-quote');
      cy.go('back');
      portFolioUtils.openKabobMenuOptionFromPorFolioTable(newOpportunity);
      cy.get(commonPage.dialogTable).should('contain', 'Add Opportunity');
      cy.get(commonPage.closeIconExpandPage).click({ force: true });
      //Open expand icon and verify Kabob menu options
      portFolioUtils.expandPorFolioTable();
      portFolioUtils.verifyPorFolioKabobMenuOptions();
    });
});