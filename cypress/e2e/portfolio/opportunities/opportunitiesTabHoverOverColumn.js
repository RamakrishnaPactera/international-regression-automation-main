//---------------------------------------------------------------------------------------------------------------
//Verify Opportunitiestable Hover Over Column//
//Test Cases List
//Authored By                   : Mamatha Polapalli
//Date                          : 16-03-2023
//Functions/Calling References  : crmOpportunitiesPage,crmOpportunitiesData,portfolioUtils,utilities
//Test case Included            : ME-113228 - Can I Validate Add Opportunity UI validations in the Customer > CRM > Opportunities > Add Opportunities
//---------------------------------------------------------------------------------------------------------------

import {
  scrollToBottomRight,
  viewFullPage,
} from '../../../utilities/commonUtils/genericUtils';
import { loginToApplication } from '../../../utilities/appSpecificUtils/loginUtils/loginUtils';
import {
  carrotButtonClickExpand,
  navigateToPorFolioOpportunitiesTab,
  verifyColumnsInOpportunitytab,
  verifyColumnResize,
  verifyCustomizeOpportunityDragAndDrop,
} from '../../../utilities/crmUtils/portFolioUtils';
const { userName: usernameText, password: passwordText } =
  Cypress.env('users')[Cypress.env('appLoginUser')];

describe('Can I Verify Customize Table Validations In Opportunities Tab > portFolia > opportunities Tab > Tab [ME-113228]', () => {
  beforeEach(() => {
    loginToApplication({ username: usernameText, password: passwordText });
    viewFullPage();
  });
  it('ME-113228 - Can I Verify Hover over column Validations In Opportunities Tab > portFolia > opportunities | PortFolia Regression | Sprint Regression', {
    tags: [
      '@crm',
      '@portFolio',
      '@opportunities',
      '@p3',
      '@phase1',
    ],
  },
  () => {
    navigateToPorFolioOpportunitiesTab();
    scrollToBottomRight();
    cy.log('***Opportunity table Column Hover over validations in Default View***');
    verifyColumnsInOpportunitytab();
    cy.log('***Opportunity table Column Hover over validations in Expand View***');
    carrotButtonClickExpand();
    verifyColumnsInOpportunitytab();
    cy.log('***Opportunity table after drag and drop and reordering in customize option***');
    verifyCustomizeOpportunityDragAndDrop();
    verifyColumnsInOpportunitytab();
    //Resize Columns
    verifyColumnResize();
  });
});