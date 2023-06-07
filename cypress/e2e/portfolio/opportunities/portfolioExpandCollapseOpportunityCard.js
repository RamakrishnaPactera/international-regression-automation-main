/*---------------------------------------------------------------------------------------------------------------
To Verify Expand and Collapse Icon in Portfolio Opportunities Tab
Test Cases List
Authored By                   : Mamatha Polapalli
Date                          : 30-03-2023
Functions/Calling References  : crmInteractionsPage,utilities
Test case Included            : ME-137498 - Can I Verify Expand and Collapse Icon in Portfolio Opportunities Tab > portFolia > opportunities
---------------------------------------------------------------------------------------------------------------------------*/

import {
  clickAction,
  viewFullPage,
  verifyExists,
} from '../../../utilities/commonUtils/genericUtils';
import { loginToApplication } from '../../../utilities/appSpecificUtils/loginUtils/loginUtils';
import {
  carrotButtonClickExpand,
  navigateToPorFolioOpportunitiesTab,
  verifyNumberOfRows,
  verifyAngleIcon,
  verifySortColumn,
} from '../../../utilities/crmUtils/portFolioUtils';
import crmPortfolioPage from '../../../pageObjects/crm/crmPage/crmPortFolioPage.json';
const {
  closeIcon,
  expandIcon,
} = crmPortfolioPage;
const { userName: usernameText, password: passwordText } =
  Cypress.env('users')[Cypress.env('appLoginUser')];

describe('Can I Verify Expand and Collapse Icon in Portfolio Opportunities Tab > portFolio > opportunities > Opportunities Tab [ME-137498]', () => {
  beforeEach(() => {
    loginToApplication({ username: usernameText, password: passwordText });
    viewFullPage();
  });

  it('ME-137498 - Can I Verify Expand and Collapse Icon in Portfolio Opportunities Tab > portFolia > Opportunities | PortFolia Regression | Sprint Regression',
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
      navigateToPorFolioOpportunitiesTab();
      cy.log('***Expand Icon With Number of Rows***');
      verifyExists({ element: expandIcon });
      clickAction({ locator: expandIcon });
      verifyNumberOfRows();
      cy.log('***Collapse Icon With Number of Rows***');
      clickAction({ locator: expandIcon });
      verifyNumberOfRows();
      verifySortColumn();
      carrotButtonClickExpand();
      cy.log('***To Verify That There Is No Change In Number of Rows When Clicked Expand and Collapse Icon in Expand View, Also to assert Angle Up/Down Icon***');
      clickAction({ locator: expandIcon });
      verifyNumberOfRows();
      verifyAngleIcon();
      clickAction({ locator: closeIcon });
      verifyAngleIcon();
      carrotButtonClickExpand();
      clickAction({ locator: expandIcon });
      verifyAngleIcon();
      verifyNumberOfRows();
      clickAction({ locator: closeIcon });
      verifyAngleIcon();
    });
});