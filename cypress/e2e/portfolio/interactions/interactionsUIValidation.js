/*---------------------------------------------------------------------------------------------------------------
Validate Intraction filter options  from Portfolio screen interactions//
Test Cases List
Authored By                   : Madhu Manyam
Date                          : 01-03-2023
Functions/Calling References  : crmPortFolioPage,crmIndustryData,crmInteractionsPage,crmInteractionData,commonData,utilities
Test case Included            : ME-122086 - Can I Verify Customize Table Validations In Interactions Tab > portFolia > interactions | PortFolia Regression
-------------------------------------------------------------------------------------------------------------------*/
import {
  clickAction,
  clickVisibleElement,
  verifyClosePopup,
  verifyExists,
  verifyTableColumnsHeaders,
  verifyToExist,
  viewFullPage,
} from '../../../utilities/commonUtils/genericUtils';
import { loginToApplication } from '../../../utilities/appSpecificUtils/loginUtils/loginUtils';
import {
  carrotButtonClickExpand,
  navigateToPortfolioInteractionsTab,
  verifyCustomizeInteractionAndDrgAndDwp,
  verifyInteractionsTabFilters,
} from '../../../utilities/crmUtils/portFolioUtils';
import crmInteractionsPage from '../../../pageObjects/crm/crmPage/crmInteractionsPage.json';
import crmInteractionData from '../../../testData/crm/crmData/crmInteractionsData.json';
const {
  interactionTableColumnHeaders,
} = crmInteractionData.staticData;
const {
  btnCarrotExpandCustomize,
  btnCustomize,
  btnExpandCustomize,
  customizeTable,
  drpdwnCarrotBtnInteractions,
  tabInteractions,
  tblInteractionsHeader,
  tblInteractionsHeaderExp,
} = crmInteractionsPage;
const { userName: usernameText, password: passwordText } =
  Cypress.env('users')[Cypress.env('appLoginUser')];

describe('Can I Verify Customize Table Validations In Interactions Tab > portFolia > interactions > Interactions Tab [ME-122077, ME-122086]', () => {
  beforeEach(() => {
    loginToApplication({ username: usernameText, password: passwordText });
    viewFullPage();
  });

  it('ME-122086 - Can I Verify Customize Table Validations In Interactions Tab > portFolia > interactions | PortFolia Regression | Sprint Regression',
    {
      tags: [
        '@crm',
        '@portFolio',
        '@interactions',
        '@p2',
        '@phase2',
      ],
    },
    () => {
      navigateToPortfolioInteractionsTab();
      cy.log('***validations in Default view***');
      clickAction({ locator: drpdwnCarrotBtnInteractions });
      clickVisibleElement({ locator: btnCustomize });
      verifyToExist({ element: customizeTable });
      verifyCustomizeInteractionAndDrgAndDwp();
      cy.log('***validations in Expand view***');
      carrotButtonClickExpand();
      clickVisibleElement({ locator: btnCarrotExpandCustomize });
      clickVisibleElement({ locator: btnExpandCustomize });
      verifyToExist({ element: customizeTable });
      verifyCustomizeInteractionAndDrgAndDwp();
    });

  it('ME-122077 - Can I Verify UI Validations In Interactions Tab > portFolia > interactions | PortFolia Regression | Sprint Regression',
    {
      tags: [
        '@crm',
        '@portFolio',
        '@interactions',
        '@p2',
        '@phase1',
      ],
    },
    () => {
      cy.log('***validations in Default view***');
      navigateToPortfolioInteractionsTab();
      verifyInteractionsTabFilters();
      verifyTableColumnsHeaders({ locator: tblInteractionsHeader, columnNames: interactionTableColumnHeaders });
      cy.log('***validations in Expand view***');
      carrotButtonClickExpand();
      verifyInteractionsTabFilters();
      verifyTableColumnsHeaders({ locator: tblInteractionsHeaderExp, columnNames: interactionTableColumnHeaders });
      verifyClosePopup();
      verifyExists({ element: tabInteractions });
    });
});