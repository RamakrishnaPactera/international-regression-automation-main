/*---------------------------------------------------------------------------------------------------------------
 Verifying Status Chip Filter > Portfolio > Interactions
 Test Cases List               : [ME-153725], [ME-153726], [ME-153727],[ME-153728]
 Authored By                   : Beemireddy Chandra obula reddy
 Date                          : 18-05-2023
 Functions/Calling References  :
 User Story Included            : [ME-135218]-Portfolio - Portfolio - Interactions - Implement Status Chip Filter
---------------------------------------------------------------------------------------------------------------*/
import * as portFolioUtils from '../../../utilities/crmUtils/portFolioUtils';
import * as genericUtils from '../../../utilities/commonUtils/genericUtils';
import { loginToApplication } from '../../../utilities/appSpecificUtils/loginUtils/loginUtils';
import crmPortFolioPage from '../../../pageObjects/crm/crmPage/crmPortFolioPage.json';
import crmInteractionsData from '../../../testData/crm/crmData/crmInteractionsData.json';

const {
  valueMultipleStatusChips,
  btnStatusSheduled,
  txtBoxStatus,
  xSymbol,
  txtFieldSatus,
  txtStatus,
  filtersMenu,
  bottomCardRows,

} = crmPortFolioPage;

const {
  toolTip,
  attrColor,
  checkBoxScheduled,
  whiteStatusTxtBox,
  checkBoxCompleted,
  blueClrInteractions,
  txtValStatus,
  checkBoxCancelled,
  txtValStatusFilter,
  indexChipFilterFour,
  indexChipFilterSecond,
  txtValCustomer,
  txtValCarrier,
  indexChipFilterFive,

} = crmInteractionsData.staticData;

const { userName: usernameText, password: passwordText } =
  Cypress.env('users')[Cypress.env('appLoginUser')];

describe('Portfolio - Portfolio - Interactions - Implement Status Chip Filter,[ME-135218]', () => {
  beforeEach(() => {
    loginToApplication({ username: usernameText, password: passwordText });
    genericUtils.viewFullPage();
  });
  it('[ME-153725]-Verify Status Filter location',
    {
      tags: [
        '@crm',
        '@portFolio',
        '@interactions',
        '@statusChipFilter',
        '@p1',
      ],
    },
    () => {
      cy.log('***Navigate to Interaction tab in port folio***');
      portFolioUtils.navigateToPorFolioTab();
      cy.log('***Verify user should see that Status is the second filter***');
      genericUtils.verifyTextWithElemIndex({ locator: filtersMenu, indexNum: indexChipFilterSecond, verifyText: txtValStatus });
    });

  it('[ME-153727]-Verify Default Status Filter',
    {
      tags: [
        '@crm',
        '@portFolio',
        '@interactions',
        '@statusChipFilter',
        '@p1',
      ],
    },
    () => {
      cy.log('***Navigate to Interaction tab in port folio***');
      portFolioUtils.navigateToPorFolioTab();
      cy.log('***Verify Status chip filter and click on it***');
      portFolioUtils.verifyInteractionsTabStatusSheduled();
    });

  it('ME-153726 - Verify Chip MultiSelect Filter Component ',
    {
      tags: [
        '@crm',
        '@portFolio',
        '@interactions',
        '@statusChipFilter',
        '@p1',
      ],
    },
    () => {
      cy.log('***Navigate to Interaction tab in port folio***');
      portFolioUtils.navigateToPorFolioTab();
      cy.log('***Verify Status chip filter is there or not***');
      genericUtils.verifyVisible({ element: crmPortFolioPage.txtStatus });
    });
  it('ME-153728 - Verify Status filter options',
    {
      tags: [
        '@crm',
        '@portFolio',
        '@interactions',
        '@statusChipFilter',
        '@p1',
      ],
    },
    () => {
      cy.log('***Navigate to Interaction tab in port folio***');
      portFolioUtils.navigateToPorFolioTab();
      cy.log('***Verify user should be able to see all of the chip filters with selected value/s displayed first followed by the filters without selected value, consistent with how chip filter order is implemented in other areas of MM***');
      genericUtils.verifyTextWithElemIndex({ locator: filtersMenu, indexNum: indexChipFilterSecond, verifyText: txtValStatus });
      genericUtils.verifyTextWithElemIndex({ locator: filtersMenu, indexNum: indexChipFilterFour, verifyText: txtValCustomer });
      genericUtils.verifyTextWithElemIndex({ locator: filtersMenu, indexNum: indexChipFilterFive, verifyText: txtValCarrier });
      cy.log('***Verify user should be able to see filter value when I hover over the chip filter***');
      genericUtils.verifyToolTips({ locator: txtStatus, verifyText: toolTip });
      cy.log('*** Verify user should be able to see chip filter in blue and with “Status:  <Status selected>” text displayed when only one filter is selected (Example:  “Status:  Completed”)***');
      genericUtils.verifyTextOrBackGroundColor({ locator: btnStatusSheduled, color: attrColor, colorCode: blueClrInteractions });
      cy.log('Verify user should be able to see X when filter has selected value AND should be able to remove that filter from screen');
      genericUtils.verifyVisible({ element: xSymbol });
      genericUtils.clickAction({ locator: xSymbol });
      cy.log('Verify user should be able to see chip filter in white and with “Status” text displayed when no Status filter selected ');
      genericUtils.verifyTextOrBackGroundColor({ locator: txtBoxStatus, color: attrColor, colorCode: whiteStatusTxtBox });
      genericUtils.verifyTxtExist({ locator: txtBoxStatus, containsTxt: txtValStatus });
      cy.log('***Verify user Should be able to select one or multiple Status filter/s***');
      cy.log('verify User Should be able to see options from Interaction Status DDT honoring order in Minion');
      genericUtils.clickAction({ locator: txtBoxStatus });
      genericUtils.typeAndPressEnter({ locator: txtFieldSatus, typeText: checkBoxScheduled });
      genericUtils.clickAction({ locator: txtFieldSatus });
      genericUtils.clearTypeAndEnter({ element: txtFieldSatus, typeText: checkBoxCancelled });
      genericUtils.clickAction({ locator: txtFieldSatus });
      genericUtils.clearTypeAndEnter({ element: txtFieldSatus, typeText: checkBoxCompleted });
      cy.log('Verify user should be able to see rows displayed in Portfolio - Interactions table based on selected STATUS along with other applied filters: Date Range, Customer, Carrier, Type, Objective, Via, Outcome');
      genericUtils.verifyRowsExistOrNot({ locator: bottomCardRows });
      cy.log('Verify user should be able  to see chip filter in blue and with “Status: <First Status selected> + <count of additional filters>” text displayed when more than one filter is selected (Example:  “Status:  Scheduled +2”)');
      genericUtils.verifyTextOrBackGroundColor({ locator: btnStatusSheduled, color: attrColor, colorCode: blueClrInteractions });
      genericUtils.verifyTxtExist({ locator: valueMultipleStatusChips, containsTxt: txtValStatusFilter });
    });
});