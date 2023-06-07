/*---------------------------------------------------------------------------------------------------------------
 Verifying Customer Chip Filter > Portfolio > Interactions
 Test Cases List               : [ME-156894], [ME-156895], [ME-156896],[ME-156897]
 Authored By                   : Beemireddy Chandra obula reddy
 Date                          : 22-05-2023
 Functions/Calling References  :
 User Story Included            : [ME-145060]-Portfolio - Interactions - Implement Objective Chip Filter
---------------------------------------------------------------------------------------------------------------*/
import * as portFolioUtils from '../../../utilities/crmUtils/portFolioUtils';
import * as genericUtils from '../../../utilities/commonUtils/genericUtils';
import { loginToApplication } from '../../../utilities/appSpecificUtils/loginUtils/loginUtils';
import crmPortFolioPage from '../../../pageObjects/crm/crmPage/crmPortFolioPage.json';
import crmInteractionsData from '../../../testData/crm/crmData/crmInteractionsData.json';

const {
  mainFrameInteractions,
  filtersMenu,
  objectiveFilter,
  customerTestFirstValue,
  customerTestSecondValue,
  customerTestThirdValue,
  multipleDrpDwnObjective,
  drpDwnObjectiveWithSelectedValue,
  one,
  xSymbolObjective,
  xSymbol,
  bottomCardRows,

} = crmPortFolioPage;

const {
  txtValCustomer,
  attrColor,
  blueClrInteractions,
  txtValStatusFilter,
  whiteStatusTxtBox,
  indexChipFilterSecond,
  indexChipFilterFour,
  indexChipFilterSix,
  txtValStatus,
  txtValObjective,
  DRPObjectiveValues,
  toolTipObjective,

} = crmInteractionsData.staticData;

const { userName: usernameText, password: passwordText } =
  Cypress.env('users')[Cypress.env('appLoginUser')];

describe('Portfolio - Portfolio - Interactions - Implement Objective Chip Filter,[ME-145060]', () => {
  beforeEach(() => {
    loginToApplication({ username: usernameText, password: passwordText });
    genericUtils.viewFullPage();
  });

  it('[ME-156894]-Verify Objective Filter location',
    {
      tags: [
        '@crm',
        '@portFolio',
        '@interactions',
        '@ObjectiveChipFilter',
        '@p1',
      ],
    },
    () => {
      cy.log('***Navigate to Interaction tab in port folio***');
      portFolioUtils.navigateToPorFolioTab();
      cy.log('***Verify User should see that Objective is the sixth filter***');
      genericUtils.clickAction({ locator: xSymbol });
      genericUtils.verifyTextWithElemIndex({ locator: filtersMenu, indexNum: indexChipFilterSix, verifyText: txtValObjective });
    });

  it('[ME-156895]-Verify Objective Chip MultiSelect Filter Component  ',
    {
      tags: [
        '@crm',
        '@portFolio',
        '@interactions',
        '@ObjectiveChipFilter',
        '@p1',
      ],
    },
    () => {
      cy.log('***Navigate to Interaction tab in port folio***');
      portFolioUtils.navigateToPorFolioTab();
      cy.log('***Verify Objective chip filter***');
      genericUtils.verifyVisible({ element: crmPortFolioPage.objectiveFilter });
    });

  it('ME-156896 - Verify Default Objective Filter ',
    {
      tags: [
        '@crm',
        '@portFolio',
        '@interactions',
        '@ObjectiveChipFilter',
        '@p1',
      ],
    },
    () => {
      cy.log('***Navigate to Interaction tab in port folio***');
      portFolioUtils.navigateToPorFolioTab();
      cy.log('***Verify Objective chip filter***');
      genericUtils.verifyVisible({ element: crmPortFolioPage.objectiveFilter });
      cy.log('*** Verify default objective filter***');
      genericUtils.verifyTxtExist({ locator: objectiveFilter, containsTxt: txtValObjective });
    });
  it('ME-156897 - Verify Objective filter options ',
    {
      tags: [
        '@crm',
        '@portFolio',
        '@interactions',
        '@ObjectiveChipFilter',
        '@p1',
      ],
    },
    () => {
      cy.log('***Navigate to Interaction tab in port folio***');
      portFolioUtils.navigateToPorFolioTab();
      cy.log('***Verify user should able to see chip filter in white and with "objective" text displayed when no Objective filter selected***');
      genericUtils.verifyTxtExist({ locator: objectiveFilter, containsTxt: txtValObjective });
      genericUtils.verifyTextOrBackGroundColor({ locator: objectiveFilter, color: attrColor, colorCode: whiteStatusTxtBox });
      cy.log('*** Verify user should be able to see options from Interaction Objective DDT honoring order in Minion (Appointment Setting, Cold Outreach, Contract , Demo , Discovery , Follow-up, Introduction , Issue Resolution , Other , Position , Presentation , Pricing, Proposal , QBR , Recommend)***');
      genericUtils.clickAction({ locator: objectiveFilter });
      genericUtils.verifyDrpDwnAllValuesTextObjectiveChipFilter({ drpDwnLocator: one, drpDwnTextArray: DRPObjectiveValues });
      //genericUtils.verifyDrpDwnValuesText({ parentElement: one, findElement1: second, findElement2: third, textval: DRPValues })
      cy.log('***Verify user should Be able to see chip filter in blue and with "Objective: <Objective selected>" text displayed when only one filter is selected (Example: "Objective: Demo")***');
      cy.log('***Verify user should be able to see options from Objective record by typing in a Objective Name as search key***');
      genericUtils.clickAction({ locator: customerTestFirstValue });
      genericUtils.verifyTextOrBackGroundColor({ locator: drpDwnObjectiveWithSelectedValue, color: attrColor, colorCode: blueClrInteractions });
      cy.log('***Verify user should be able to see filter value when I hover over the chip filter***');
      genericUtils.verifyToolTips({ locator: drpDwnObjectiveWithSelectedValue, verifyText: toolTipObjective });
      cy.log('***Verify user should Be able see chip filter in blue and with "Objective: <First Objective selected> + <count of additional filters>" text displayed when more than one filter is selected (Example: "Objective: Discovery +2")***');
      cy.log('*** Verify user should be able to select one or multiple objective filter/s***');
      genericUtils.clickAction({ locator: customerTestSecondValue });
      genericUtils.clickAction({ locator: customerTestThirdValue });
      genericUtils.verifyTextOrBackGroundColor({ locator: drpDwnObjectiveWithSelectedValue, color: attrColor, colorCode: blueClrInteractions });
      genericUtils.verifyElementTextContains({ locator: multipleDrpDwnObjective, verifyText: txtValStatusFilter });
      cy.log('***Verify User should be able to see all of the chip filters with selected value/s displayed first followed by the filters without selected value, consistent with how chip filter order is implemented in other areas of MM***');
      genericUtils.clickAction({ locator: mainFrameInteractions });
      genericUtils.verifyTextWithElemIndex({ locator: filtersMenu, indexNum: indexChipFilterSecond, verifyText: txtValStatus });
      genericUtils.verifyTextWithElemIndex({ locator: filtersMenu, indexNum: indexChipFilterFour, verifyText: txtValObjective });
      genericUtils.verifyTextWithElemIndex({ locator: filtersMenu, indexNum: indexChipFilterSix, verifyText: txtValCustomer });
      cy.log('Verify user should Be able to see rows displayed in Portfolio - Interactions table based on selected Objective along with other applied filters: Date Range, Customer, Carrier, Status, Type, Via, Outcome');
      genericUtils.verifyRowsExistOrNot({ locator: bottomCardRows });
      cy.log('***Verify user should be able to see X when filter has selected value AND should be able to remove that filter from screen***');
      genericUtils.verifyVisible({ element: xSymbolObjective });
      genericUtils.clickAction({ locator: xSymbolObjective });
    });
});