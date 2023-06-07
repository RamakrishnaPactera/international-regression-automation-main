/*---------------------------------------------------------------------------------------------------------------
Verify to re-assign intraction record from portfolio interacgtions screen
Test Cases List
Authored By                   : Madhu manyam
Date                          : 13-03-2023
Functions/Calling References  : crmInteractionsPage,utilities
Test case Included            : ME-129543 Can I Verify reassign Interactions record from interactions table data In Interactions Tab > PortFolia > Interactions> Edit
---------------------------------------------------------------------------------------------------------------*/
import crmInteractionsData from '../../../testData/crm/crmData/crmInteractionsData.json';
import * as genericUtils from '../../../utilities/commonUtils/genericUtils';
import { loginToApplication } from '../../../utilities/appSpecificUtils/loginUtils/loginUtils';
import * as portFolioUtils from '../../../utilities/crmUtils/portFolioUtils';
import crmCommonData from '../../../testData/staticData/commonData/crmCommonData.json';

const { userName: usernameText, password: passwordText } = Cypress.env('users')[Cypress.env('appLoginUser')];

describe('Can I Validate reassign interactions scheduled record > Porfolio > Interaction Tab> Reassign > [ME-129543]', () => {
  beforeEach(() => {
    loginToApplication({ username: usernameText, password: passwordText });
    genericUtils.viewFullPage();
  });

  it('ME-129543 Can I Verify reassign the scheduled interaction record, view Interactions table data In Interactions Tab > PortFolia > Interactions> Reassign> Reassign| PortFolia Regression | Sprint Regression', {
    tags: [
      '@crm',
      '@portfolio',
      '@interactions',
      '@p2',
      '@phase2',
    ],
  },
  () => {
    cy.log('***verifying the reassign Interactions Schedule  record and & View interaction record is updated**');
    portFolioUtils.navigateToPortfolioInteractionsTab();
    portFolioUtils.setInteractionsDateBarToFilterRecords({ noOfDays: crmInteractionsData.userDefinedData.days });
    portFolioUtils.selectInteractionsFilter(crmCommonData.filterByColumnType.filterByStatus, crmCommonData.filterColumnValue.status);
    portFolioUtils.openRescheduleInteractionDetails(crmCommonData.kabobMenuOptions.reAssign);
    portFolioUtils.selectReassignUserToInteractionrRecord({ reAssignUser: crmInteractionsData.userDefinedData.userName });
  });
});