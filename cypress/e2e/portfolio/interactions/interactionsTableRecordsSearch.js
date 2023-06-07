/*---------------------------------------------------------------------------------------------------------------
Verify to search intraction record from portfolio interacgtions screen
Test Cases List
Authored By                   : Madhu manyam
Date                          : 13-03-2023
Functions/Calling References  : crmInteractionsPage,utilities
Test case Included            : ME-129526 Verify to search Interactions record from interactions table data
 In Interactions Tab > PortFolia > Interactions> Edit
---------------------------------------------------------------------------------------------------------------*/
import crmInteractionsData from '../../../testData/crm/crmData/crmInteractionsData.json';
import * as genericUtils from '../../../utilities/commonUtils/genericUtils';
import { loginToApplication } from '../../../utilities/appSpecificUtils/loginUtils/loginUtils';
import * as portFolioUtils from '../../../utilities/crmUtils/portFolioUtils';
const { userName: usernameText, password: passwordText } = Cypress.env('users')[Cypress.env('appLoginUser')];
const {
  days,
} = crmInteractionsData.userDefinedData;

describe('User verifies to search interactions records > Porfolio > Interaction Tab> Search > [ME-129526]', () => {
  beforeEach(() => {
    loginToApplication({ username: usernameText, password: passwordText });
    genericUtils.viewFullPage();
  });

  it('ME-129526 User verifies to search interaction record details, Reschedule the  Interactions record  In Interactions Tab > PortFolia > Interactions> View> Reschedule| PortFolia Regression | Sprint Regression', {
    tags: [
      '@crm',
      '@portfolio',
      '@interactions',
      '@p2',
      '@phase2',
    ],
  },
  () => {
    cy.log('***verifying the search Interactions records***');
    portFolioUtils.navigateToPortfolioInteractionsTab();
    portFolioUtils.setInteractionsDateBarToFilterRecords({ noOfDays: days });
    portFolioUtils.defaultInteractionRecordsShowsLoggedInUserName();
    portFolioUtils.interactionRecordsShowsForSelectedUserName();
  });
});