/*---------------------------------------------------------------------------------------------------------------
 Verifying Customer Chip Filter > Portfolio > Interactions
 Test Cases List               : [ME-156929], [ME-156930], [ME-156931],[ME-156932]
 Authored By                   : Beemireddy Chandra obula reddy
 Date                          : 22-05-2023
 Functions/Calling References  :
 User Story Included            : [ME-145062]-Portfolio - Interactions - Implement Outcome Chip Filter
---------------------------------------------------------------------------------------------------------------*/
import * as portFolioUtils from '../../../utilities/crmUtils/portFolioUtils';
import * as genericUtils from '../../../utilities/commonUtils/genericUtils';
import { loginToApplication } from '../../../utilities/appSpecificUtils/loginUtils/loginUtils';
import crmPortFolioPage from '../../../pageObjects/crm/crmPage/crmPortFolioPage.json';
import crmInteractionsData from '../../../testData/crm/crmData/crmInteractionsData.json';

const {
  mainFrameInteractions,
  filtersMenu,
  customerTestFirstValue,
  customerTestSecondValue,
  customerTestThirdValue,
  multipleDrpDwnOutcome,
  drpDwnOutcomeWithSelectedValue,
  one,
  xSymbolOutcome,
  outcomeFilter,
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
  indexChipFilterEight,
  txtValStatus,
  txtValOutcome,
  DRPOutcomeValues,
  toolTipOutcome,
} = crmInteractionsData.staticData;

const { userName: usernameText, password: passwordText } =
  Cypress.env('users')[Cypress.env('appLoginUser')];

describe('Portfolio - Portfolio - Interactions - Implement Objective Chip Filter,[ME-145060]', () => {
  beforeEach(() => {
    loginToApplication({ username: usernameText, password: passwordText });
    genericUtils.viewFullPage();
  });

  it('[ME-156929]-Verify Outcome Filter location',
    {
      tags: [
        '@crm',
        '@portFolio',
        '@interactions',
        '@outcomeChipFilter',
        '@p1',
      ],
    },
    () => {
      cy.log('***Navigate to Interaction tab in port folio***');
      portFolioUtils.navigateToPorFolioTab();
      cy.log('***Verify User should see that Objective is the Seventh filter***');
      genericUtils.clickAction({ locator: xSymbol });
      genericUtils.verifyTextWithElemIndex({ locator: filtersMenu, indexNum: indexChipFilterEight, verifyText: txtValOutcome });
    });

  it('[ME-156930]-Verify Outcome Chip MultiSelect Filter Component  ',
    {
      tags: [
        '@crm',
        '@portFolio',
        '@interactions',
        '@outcomeChipFilter',
        '@p1',
      ],
    },
    () => {
      cy.log('***Navigate to Interaction tab in port folio***');
      portFolioUtils.navigateToPorFolioTab();
      cy.log('***Verify Outcome chip filter***');
      genericUtils.verifyVisible({ element: crmPortFolioPage.outcomeFilter });
    });

  it('ME-156931 - Verify Default Outcome Filter ',
    {
      tags: [
        '@crm',
        '@portFolio',
        '@interactions',
        '@outcomeChipFilter',
        '@p1',
      ],
    },
    () => {
      cy.log('***Navigate to Interaction tab in port folio***');
      portFolioUtils.navigateToPorFolioTab();
      cy.log('***Verify Outcome chip filter***');
      genericUtils.verifyVisible({ element: crmPortFolioPage.outcomeFilter });
      cy.log('*** Verify default outcome filter***');
      genericUtils.verifyTxtExist({ locator: outcomeFilter, containsTxt: txtValOutcome });
    });
  it('ME-156932 - Verify Outcome filter options ',
    {
      tags: [
        '@crm',
        '@portFolio',
        '@interactions',
        '@outcomeChipFilter',
        '@p1',
      ],
    },
    () => {
      cy.log('***Navigate to Interaction tab in port folio***');
      portFolioUtils.navigateToPorFolioTab();
      cy.log('***Verify user should able to see chip filter in white and with "outcome" text displayed when no outcome filter selected***');
      genericUtils.verifyTxtExist({ locator: outcomeFilter, containsTxt: txtValOutcome });
      genericUtils.verifyTextOrBackGroundColor({ locator: outcomeFilter, color: attrColor, colorCode: whiteStatusTxtBox });
      cy.log('*** Verify user should Be able to see options from Interaction Outcome and Completed Interaction Outcome DDT honoring order in Minion (Advancement , Continuation , Dead End , Future Opportunity , Indecision , Interaction Cancelled per Contact , Interaction Cancelled per Rep , Lead Disqualified , Lead Qualified , New Opportunity , No Opportunity , Objection , Opportunity Lost , Opportunity Won , Resolution , No Answer )***');
      genericUtils.clickAction({ locator: outcomeFilter });
      genericUtils.verifyDrpDwnAllValuesTextObjectiveChipFilter({ drpDwnLocator: one, drpDwnTextArray: DRPOutcomeValues });
      cy.log('***Verify user should Be able to see chip filter in blue and with "Outcome: <Outcome selected>" text displayed when only one filter is selected (Example: "Outcome: Objection")***');
      genericUtils.clickAction({ locator: customerTestFirstValue });
      genericUtils.verifyTextOrBackGroundColor({ locator: drpDwnOutcomeWithSelectedValue, color: attrColor, colorCode: blueClrInteractions });
      cy.log('***Verify user should be able to see filter value when I hover over the chip filter***');
      genericUtils.verifyToolTips({ locator: drpDwnOutcomeWithSelectedValue, verifyText: toolTipOutcome });
      cy.log('***Verify user should Be able see chip filter in blue and with "Outcome: <First Outcome selected> + <count of additional filters>" text displayed when more than one filter is selected (Example: "Outcome: Resolution +2")***');
      cy.log('*** Verify user should be able to select one or multiple outcome filter/s***');
      genericUtils.clickAction({ locator: customerTestSecondValue });
      genericUtils.clickAction({ locator: customerTestThirdValue });
      genericUtils.verifyTextOrBackGroundColor({ locator: drpDwnOutcomeWithSelectedValue, color: attrColor, colorCode: blueClrInteractions });
      genericUtils.verifyElementTextContains({ locator: multipleDrpDwnOutcome, verifyText: txtValStatusFilter });
      cy.log('***Verify User should be able to see all of the chip filters with selected value/s displayed first followed by the filters without selected value, consistent with how chip filter order is implemented in other areas of MM***');
      genericUtils.clickAction({ locator: mainFrameInteractions });
      genericUtils.verifyTextWithElemIndex({ locator: filtersMenu, indexNum: indexChipFilterSecond, verifyText: txtValStatus });
      genericUtils.verifyTextWithElemIndex({ locator: filtersMenu, indexNum: indexChipFilterFour, verifyText: txtValOutcome });
      genericUtils.verifyTextWithElemIndex({ locator: filtersMenu, indexNum: indexChipFilterSix, verifyText: txtValCustomer });
      cy.log('Verify user should Be able to see rows displayed in Portfolio -  Interactions table based on selected Outcome along with other applied filters:  Date Range, Customer, Carrier, Status, Type, Objective, Via');
      genericUtils.verifyRowsExistOrNot({ locator: bottomCardRows });
      cy.log('***Verify user should be able to see X when filter has selected value AND should be able to remove that filter from screen***');
      genericUtils.verifyVisible({ element: xSymbolOutcome });
      genericUtils.clickAction({ locator: xSymbolOutcome });
    });
});