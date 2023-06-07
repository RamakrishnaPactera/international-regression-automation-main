/*---------------------------------------------------------------------------------------------------------------
List to all Fields data to Sorting of column headers angle up/down with the below Minion terms//
Test Cases List
Authored By                   : Babu Velagada
Date                          : 01-03-2023
Functions/Calling References  : crmInteractionsPage,utilities
Test case Included            : ME-129537 - Can I Verify Sorting of column headers angle up/down In Interactions Tab > portFolia > interactions
---------------------------------------------------------------------------------------------------------------------------*/

import {
  clickAndVerifyGridAlignment,
  viewFullPage,
} from '../../../utilities/commonUtils/genericUtils';
import { loginToApplication } from '../../../utilities/appSpecificUtils/loginUtils/loginUtils';
import {
  carrotButtonClickExpand,
  carrotButtonCusResetCol,
  carrotButtonDisableCol,
  navigateToPortfolioInteractionsTab,
  verifyColumnsInInteractionsTab,
} from '../../../utilities/crmUtils/portFolioUtils';
import crmInteractionsPage from '../../../pageObjects/crm/crmPage/crmInteractionsPage.json';
const {
  assignedToCol,
  completedBy,
  completedDateCol,
  completedTime,
  contactsCol,
  createdByCol,
  createdDateCol,
  createdTimeCol,
  detailsCol,
  documentsCol,
  entityNameCol,
  entityTypeCol,
  objectiveCol,
  opportunityCol,
  originalDateCol,
  originalTimeCol,
  outComeCol,
  rescheduledCol,
  scheduledDateCol,
  scheduledTimeCol,
  statusCol,
  tabExpandInteraction,
  tabParentInteraction,
  typeCol,
  updatedBy,
  updatedDateCol,
  updatedTimeCol,
  viaCol,
} = crmInteractionsPage;
const { userName: usernameText, password: passwordText } =
Cypress.env('users')[Cypress.env('appLoginUser')];
const columnLocatorsView = [
  statusCol,
  entityTypeCol,
  entityNameCol,
  scheduledDateCol,
  scheduledTimeCol,
  objectiveCol,
  typeCol,
  viaCol,
  detailsCol,
  outComeCol,
  documentsCol,
  opportunityCol,
  contactsCol,
  assignedToCol,
  createdDateCol,
  createdTimeCol,
  createdByCol,
  originalDateCol,
  originalTimeCol,
  rescheduledCol,
  updatedDateCol,
  updatedTimeCol,
  updatedBy,
  completedDateCol,
  completedTime,
  completedBy,
];
const columnLocatorsHideView = [
  entityNameCol,
  scheduledDateCol,
  scheduledTimeCol,
  objectiveCol,
  viaCol,
  detailsCol,
  outComeCol,
  documentsCol,
  opportunityCol,
  contactsCol,
  assignedToCol,
  createdDateCol,
  createdTimeCol,
  createdByCol,
  originalDateCol,
  originalTimeCol,
  rescheduledCol,
  updatedDateCol,
  updatedTimeCol,
  updatedBy,
  completedDateCol,
  completedTime,
  completedBy,
];

describe('Can I Verify Sorting of column headers angle up/down In Interactions Tab > portFolia > interactions > Interactions Tab [ME-129537]', () => {
  beforeEach(() => {
    loginToApplication({ username: usernameText, password: passwordText });
    viewFullPage();
  });

  it('ME-129537 - Can I Verify Sorting of column headers angle up/down In Interactions Tab > portFolia > interactions | PortFolia Regression | Sprint Regression',
    {
      tags: [
        '@crm',
        '@portFolio',
        '@interactions',
        '@p3',
        '@phase2',
      ],
    },
    () => {
      navigateToPortfolioInteractionsTab();
      cy.log('***Interactions table Column Hover over validations in Default View***');
      verifyColumnsInInteractionsTab();
      cy.log('***Verifying sorting of Column header in default view***');
      columnLocatorsView.forEach((value) => {
        clickAndVerifyGridAlignment({ locator: tabParentInteraction, element: value });
      });
      cy.log('***Verifying sorting of Column header in default view after hide few columns***');
      carrotButtonDisableCol();
      columnLocatorsHideView.forEach((value) => {
        clickAndVerifyGridAlignment({ locator: tabParentInteraction, element: value });
      });
      carrotButtonCusResetCol();
      cy.log('***Verifying sorting of Column header in default view after reset***');
      columnLocatorsView.forEach((value) => {
        clickAndVerifyGridAlignment({ locator: tabParentInteraction, element: value });
      });
      cy.log('***Interactions table Column Hover over validations in Expand View***');
      carrotButtonClickExpand();
      verifyColumnsInInteractionsTab();
      cy.log('***Verifying sorting of Column header in expand view***');
      columnLocatorsView.forEach((value) => {
        clickAndVerifyGridAlignment({ locator: tabExpandInteraction, element: value });
      });
    });
});