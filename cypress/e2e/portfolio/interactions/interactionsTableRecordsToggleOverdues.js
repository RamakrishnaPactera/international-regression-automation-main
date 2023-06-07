/*---------------------------------------------------------------------------------------------------------------
Verify to filter Overdue Intraction record, from Portfolio Interaction screen
Test Cases List
Authored By                   : Madhu Manyam
Date                          : 01-03-2023
Functions/Calling References  : crmPortFolioPage,crmIndustryData,crmInteractionsPage,crmInteractionData,commonData,utilities
Test case Included            : ME-111569 Can I Verify to show or hide the overdue interaction record by slecting the Overdue toggle button In Interactions Tab
 > PortFolia > Interactions> Overdue Toggle
-------------------------------------------------------------------------------------------------------------------*/

import crmInteractionsData from '../../../testData/crm/crmData/crmInteractionsData.json';
import * as genericUtils from '../../../utilities/commonUtils/genericUtils';
import { loginToApplication } from '../../../utilities/appSpecificUtils/loginUtils/loginUtils';
import * as portFolioUtils from '../../../utilities/crmUtils/portFolioUtils';
const { userName: usernameText, password: passwordText } = Cypress.env('users')[Cypress.env('appLoginUser')];
const {
  days,
} = crmInteractionsData.userDefinedData;

describe('Verify to Show or Hide  overdue interactions records > Porfolio > Interaction Tab> Overdue Toggle > [ME-111569]', () => {
  beforeEach(() => {
    loginToApplication({ username: usernameText, password: passwordText });
    genericUtils.viewFullPage();
  });

  it('ME-111569 User verifies to show or hide the overdue interaction record by slecting the Overdue toggle button In Interactions Tab > PortFolia > Interactions> Overdue Toggle| PortFolia Regression | Sprint Regression', {
    tags: [
      '@crm',
      '@portfolio',
      '@interactions',
      '@p3',
      '@phase2',
    ],
  },
  () => {
    cy.log('***verifying the toggle On Show All Overdue  Interactions and verify the default sorting order after toggle ON**');
    portFolioUtils.navigateToPortfolioInteractionsTab();
    portFolioUtils.setInteractionsDateBarToFilterRecords({ noOfDays: days });
    portFolioUtils.turnOnOverDueToggleButton();
    portFolioUtils.defaultSortedOrder();
  });
});