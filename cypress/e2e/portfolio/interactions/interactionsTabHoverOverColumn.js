import {
  viewFullPage,
} from '../../../utilities/commonUtils/genericUtils';
import { loginToApplication } from '../../../utilities/appSpecificUtils/loginUtils/loginUtils';
import {
  carrotButtonClickExpand,
  navigateToPortfolioInteractionsTab,
  verifyColumnsInInteractionsTab,
} from '../../../utilities/crmUtils/portFolioUtils';

const { userName: usernameText, password: passwordText } =
  Cypress.env('users')[Cypress.env('appLoginUser')];

describe('Can I Verify Customize Table Validations In Interactions Tab > portFolia > interactions > Interactions Tab [ME-122083]', () => {
  beforeEach(() => {
    loginToApplication({ username: usernameText, password: passwordText });
    viewFullPage();
  });
  it('ME-122083 - Can I Verify Hover over column Validations In Interactions Tab > portFolia > interactions | PortFolia Regression | Sprint Regression',
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
      cy.log('***Interactions table Column Hover over validations in Expand View***');
      carrotButtonClickExpand();
      verifyColumnsInInteractionsTab();
    });
});