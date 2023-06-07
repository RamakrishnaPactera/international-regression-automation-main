/*---------------------------------------------------------------------------------------------------------------
Portfolio table existing kabob menu options functionalities are working as expected when account type selects as 'Customer'
Test Cases List               : ME-141333,ME-141380,ME-141384,ME-141388,ME-141426,ME-141442,
                                ME-141474,ME-141478,ME-141520,ME-141558,ME-142134,ME-142135,ME-142136,ME-142165,ME-142177
Authored By                   : Madhu Manyam
Date                          : 13-04-2023
Functions/Calling References  : commonPage, crmPortFolioPage,crmPortFilioPage,,commonData,utilities
User Strories Included           : ME-111080, ME-111163 - Customer, Carrier: Portfolio Account Table - Existing Kabob Menu Options
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
  crm,
  orderList,
  routeList,
} = crmCommonData.kabobMenuOptions;
const { userName: usernameText, password: passwordText } =
  Cypress.env('users')[Cypress.env('appLoginUser')];
describe('User verifies Customer: Portfolio Account Table - Existing Kabob Menu Options by selecting account type [ME-111080,ME-111163]', () => {
  beforeEach(() => {
    cy.log('***creating new carrier***');
    genericUtils.getTDMData({ dataType: tdmCarrierData, dataCondition: tdmAddCarrierReq, dataScenario: tdmCarrierNewScenario });
    cy.log('***creating new customer***');
    genericUtils.getTDMData({ dataType: tdmCustomerData, dataCondition: tdmAddCustomerReq, dataScenario: tdmCustomerScenario });
    loginToApplication({ username: usernameText, password: passwordText });
    genericUtils.viewFullPage();
  });

  it('[ME-141370,ME-141383,ME-141394,ME-141397,ME-141407,ME-141411] - Verify the existing context menu options in  Portfolio accounts table for Customer',
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
      cy.get(commonPage.lstContextMenuOptions).filter(':visible').should('not.contain', 'Override');
      portFolioUtils.openKabobMenuOptionFromPorFolioTable(orderList);
      cy.url().should('contain', 'orderList');
      cy.go('back');
      portFolioUtils.openKabobMenuOptionFromPorFolioTable(crm);
      cy.url().should('contain', 'crm');
      cy.go('back');
      //Open expand icon and verify Kabob menu options
      portFolioUtils.expandPorFolioTable();
      portFolioUtils.verifyPorFolioKabobMenuOptions();
    });

  it('[ME-141558,ME-142134,ME-142135,ME-142136,ME-142165,ME-142177] - Verify the existing context menu options in  Portfolio accounts table for carrier',
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
      portFolioUtils.selectPorfolioAccountType('Carrier');
      portFolioUtils.verifyPorFolioKabobMenuOptions();
      cy.get(commonPage.lstContextMenuOptions).filter(':visible').should('not.contain', 'Override');
      portFolioUtils.openKabobMenuOptionFromPorFolioTable(routeList);
      cy.url().should('contain', 'carrier-route-list');
      cy.go('back');
      portFolioUtils.selectPorfolioAccountType('Carrier');
      portFolioUtils.openKabobMenuOptionFromPorFolioTable(crm);
      cy.url().should('contain', '/crm');
      cy.go('back');
      //Open expand icon and verify Kabob menu options
      portFolioUtils.selectPorfolioAccountType('Carrier');
      portFolioUtils.expandPorFolioTable();
      portFolioUtils.verifyPorFolioKabobMenuOptions();
    });
});