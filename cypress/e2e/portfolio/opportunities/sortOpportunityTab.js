/*---------------------------------------------------------------------------------------------------------------
List to all Fields data to Sorting of column headers Data in Portfolio Opportunities Tab
Test Cases List
Authored By                   : Mamatha Polapalli
Date                          : 10-04-2023
Functions/Calling References  : crmInteractionsPage,utilities
Test case Included            : ME-135633 - Can I Verify Sorting of column headers In Opportunities Tab > portFolia > opportunity
---------------------------------------------------------------------------------------------------------------------------*/

import * as genericUtils from '../../../utilities/commonUtils/genericUtils';
import { loginToApplication } from '../../../utilities/appSpecificUtils/loginUtils/loginUtils';
import * as portFolioUtils from '../../../utilities/crmUtils/portFolioUtils';
import * as crmOpportunitiesPage from '../../../pageObjects/crm/opportunitiesPage/crmOpportunitiesPage.json';
import crmOpportunitesData from '../../../testData/crm/crmData/crmOpportunitesData.json';

const columnLocators = [
  crmOpportunitiesPage.nameCol,
  crmOpportunitiesPage.entityTypeCol,
  crmOpportunitiesPage.stageCol,
  crmOpportunitiesPage.typecolumn,
  crmOpportunitiesPage.divisionCol,
  crmOpportunitiesPage.colBusinessUnit,
];
const customiseColumnLocators = [
  crmOpportunitiesPage.colCreateDateTime,
  crmOpportunitiesPage.colMode,
  crmOpportunitiesPage.colEquipment,
  crmOpportunitiesPage.colSolutionType,
  crmOpportunitiesPage.colSolution,
  crmOpportunitiesPage.colTotalVol,
  crmOpportunitiesPage.colTotalRev,
  crmOpportunitiesPage.colPricingStrat,
  crmOpportunitiesPage.colDetails,
  crmOpportunitiesPage.divisionCol,
  crmOpportunitiesPage.updatedDateTime,
];
const {
  statusType,
  statusOnHold,
} = crmOpportunitesData.userDefined;

const { userName: usernameText, password: passwordText } =
  Cypress.env('users')[Cypress.env('appLoginUser')];

describe('User Verifies Sorting of column headers angle up/down In Opportunity Tab > portFolia > Opportunity Tab [ME-135633]', () => {
  beforeEach(() => {
    loginToApplication({ username: usernameText, password: passwordText });
    genericUtils.viewFullPage();
  });

  it('ME-135633 - Verify Sorting of column headers angle up/down In Opportunity Tab > portFolia > opportunity | PortFolia Regression | Sprint Regression',
    {
      tags: [
        '@crm',
        '@portFolio',
        '@opportunity',
        '@p3',
        '@phase2',
      ],
    },
    () => {
      portFolioUtils.navigateToPorFolioOpportunitiesTab();
      genericUtils.scrollToBottomRight();
      cy.log('***Validations in Default View***');
      portFolioUtils.verifyColumnsInOpportunitytab();
      columnLocators.forEach((value) => {
        genericUtils.clickAndVerifyGridAlignment({ locator: crmOpportunitiesPage.tableOpportunity, element: value });
      });
      portFolioUtils.verifyCustomizeOpportunity();
      portFolioUtils.selectOpportunitiesStatusType(statusType);
      genericUtils.scrollIntoView({ locator: crmOpportunitiesPage.colEquipment });
      portFolioUtils.verifyColumnsInOpportunityTab1();
      customiseColumnLocators.forEach((value) => {
        genericUtils.clickAndVerifyGridAlignment({ locator: crmOpportunitiesPage.tableOpportunity, element: value });
      });
      portFolioUtils.selectOpportunitiesStatusType(statusOnHold);
      portFolioUtils.carrotButtonClickExpand();
      cy.log('***Validations in Expand View***');
      columnLocators.forEach((value) => {
        genericUtils.clickAndVerifyGridAlignment({ locator: crmOpportunitiesPage.tabExpandOpportunity, element: value });
      });
      customiseColumnLocators.forEach((value) => {
        genericUtils.clickAndVerifyGridAlignment({ locator: crmOpportunitiesPage.tabExpandOpportunity, element: value });
      });
    });
});