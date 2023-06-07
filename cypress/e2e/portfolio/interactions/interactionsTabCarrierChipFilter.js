/*---------------------------------------------------------------------------------------------------------------
 Verifying Customer Chip Filter > Portfolio > Interactions
 Test Cases List               : [ME-155774], [ME-155775], [ME-155788],[ME-155773]
 Authored By                   : Beemireddy Chandra obula reddy
 Date                          : 19-05-2023
 Functions/Calling References  :
 User Story Included            : [ME-136008]-Portfolio - Portfolio - Interactions - Implement Carrier Chip Filter
---------------------------------------------------------------------------------------------------------------*/
import * as portFolioUtils from '../../../utilities/crmUtils/portFolioUtils';
import * as genericUtils from '../../../utilities/commonUtils/genericUtils';
import { loginToApplication } from '../../../utilities/appSpecificUtils/loginUtils/loginUtils';
import { maxWait } from '../../../testData/staticData/commonData/commonData.json';
import crmPortFolioPage from '../../../pageObjects/crm/crmPage/crmPortFolioPage.json';
import crmInteractionsData from '../../../testData/crm/crmData/crmInteractionsData.json';

const {
  carrierFilter,
  carrierSearchField,
  mainFrameInteractions,
  filtersMenu,
  typeTxtSearchField,
  customerTestFirstValue,
  customerTestSecondValue,
  customerTestThirdValue,
  customerTestFourValue,
  multipleDrpDwnCarriers,
  typeTextFieldExpandBtn,
  drpDwnCarrierWithSelectedValue,
  xSymbolCarrier,
  xSymbol,
  bottomCardRows,

} = crmPortFolioPage;

const {
  txtValCustomer,
  txtValCarrier,
  attrColor,
  searchCustomerVal,
  blueClrInteractions,
  txtValStatusFilter,
  whiteStatusTxtBox,
  indexChipFilterSecond,
  indexChipFilterFour,
  indexChipFilterSix,
  txtValStatus,
  toolTipCarrier,

} = crmInteractionsData.staticData;

const { userName: usernameText, password: passwordText } =
  Cypress.env('users')[Cypress.env('appLoginUser')];

describe('Portfolio - Portfolio - Interactions - Implement carrier Chip Filter,[ME-136008]', () => {
  beforeEach(() => {
    loginToApplication({ username: usernameText, password: passwordText });
    genericUtils.viewFullPage();
  });

  it('[ME-155773]-Verify Carrier Filter location',
    {
      tags: [
        '@crm',
        '@portFolio',
        '@interactions',
        '@carrierChipFilter',
        '@p1',
      ],
    },
    () => {
      cy.log('***Navigate to Interaction tab in port folio***');
      portFolioUtils.navigateToPorFolioTab();
      cy.log('***Verify User should see that Carrier is the fourth filter AND is displayed regardless of the selected Type filter from Portfolio Accounts Table***');
      genericUtils.clickAction({ locator: xSymbol });
      genericUtils.verifyTextWithElemIndex({ locator: filtersMenu, indexNum: indexChipFilterFour, verifyText: txtValCarrier });
      genericUtils.clickAction({ locator: typeTextFieldExpandBtn });
      genericUtils.typeAndPressEnter({ locator: typeTxtSearchField, typeText: txtValCarrier });
      genericUtils.verifyVisible({ element: crmPortFolioPage.carrierFilter });
    });

  it('[ME-155774]-Verify Chip Carrier Picker Filter Component ',
    {
      tags: [
        '@crm',
        '@portFolio',
        '@interactions',
        '@carrierChipFilter',
        '@p1',
      ],
    },
    () => {
      cy.log('***Navigate to Interaction tab in port folio***');
      portFolioUtils.navigateToPorFolioTab();
      cy.log('***Verify Carrier chip filter***');
      genericUtils.verifyVisible({ element: crmPortFolioPage.carrierFilter });
    });

  it('ME-155775 - Verify Default Carrier Filter ',
    {
      tags: [
        '@crm',
        '@portFolio',
        '@interactions',
        '@carrierChipFilter',
        '@p1',
      ],
    },
    () => {
      cy.log('***Navigate to Interaction tab in port folio***');
      portFolioUtils.navigateToPorFolioTab();
      cy.log('***Verify Carrier chip filter***');
      genericUtils.verifyVisible({ element: crmPortFolioPage.carrierFilter });
      cy.log('*** Verify default carrier filter***');
      genericUtils.verifyTxtExist({ locator: carrierFilter, containsTxt: txtValCarrier });
    });
  it('ME-155788 - Verify Carrier filter options ',
    {
      tags: [
        '@crm',
        '@portFolio',
        '@interactions',
        '@carrierChipFilter',
        '@p1',
      ],
    },
    () => {
      cy.log('***Navigate to Interaction tab in port folio***');
      portFolioUtils.navigateToPorFolioTab();
      cy.log('***Verify user should able to see chip filter in white and with "Carrier" text displayed when no Customer filter selected***');
      genericUtils.verifyTxtExist({ locator: carrierFilter, containsTxt: txtValCarrier });
      genericUtils.verifyTextOrBackGroundColor({ locator: carrierFilter, color: attrColor, colorCode: whiteStatusTxtBox });
      cy.log('*** Verify user should be  able to see options from carrier record by typing in a carrier Name as search key***');
      genericUtils.clickAction({ locator: carrierFilter });
      cy.log('***Verify user should be able to see chip filter in blue and with "Carrier: <Carrier Name selected>" text displayed when only one filter is selected (Example: "Carrier: ICCO Cheese")***');
      cy.log('***Verify user should be able to see options from Carrier record by typing in a Carrier Name as search key***');
      genericUtils.typeAndPressEnter({ locator: carrierSearchField, typeText: searchCustomerVal });
      genericUtils.waitSometime(maxWait);
      genericUtils.verifyVisible({ element: customerTestFirstValue });
      genericUtils.verifyVisible({ element: customerTestSecondValue });
      genericUtils.clickAction({ locator: customerTestFirstValue });
      genericUtils.verifyTextOrBackGroundColor({ locator: drpDwnCarrierWithSelectedValue, color: attrColor, colorCode: blueClrInteractions });
      cy.log('***Verify user should be able to see filter value when I hover over the chip filter***');
      genericUtils.verifyToolTips({ locator: drpDwnCarrierWithSelectedValue, verifyText: toolTipCarrier });
      cy.log('***Verify user should be able see chip filter in blue and with "Carrier: <First Carrier selected> + <count of additional filters>" text displayed when more than one filter is selected (Example: "Carrier: ICCO Cheese +2")")***');
      cy.log('*** Verify user should be able to select one or multiple Carriers***');
      genericUtils.clearText({ locator: carrierSearchField });
      genericUtils.clickAction({ locator: customerTestThirdValue });
      genericUtils.clickAction({ locator: customerTestFourValue });
      genericUtils.verifyTextOrBackGroundColor({ locator: drpDwnCarrierWithSelectedValue, color: attrColor, colorCode: blueClrInteractions });
      genericUtils.verifyTxtExist({ locator: multipleDrpDwnCarriers, containsTxt: txtValStatusFilter });
      cy.log('***Verify User should be able to see all of the chip filters with selected value/s displayed first followed by the filters without selected value, consistent with how chip filter order is implemented in other areas of MM***');
      genericUtils.clickAction({ locator: mainFrameInteractions });
      genericUtils.verifyTextWithElemIndex({ locator: filtersMenu, indexNum: indexChipFilterSecond, verifyText: txtValStatus });
      genericUtils.verifyTextWithElemIndex({ locator: filtersMenu, indexNum: indexChipFilterFour, verifyText: txtValCarrier });
      genericUtils.verifyTextWithElemIndex({ locator: filtersMenu, indexNum: indexChipFilterSix, verifyText: txtValCustomer });
      cy.log('Verify user should Be able to see rows displayed in Portfolio - Interactions table based on selected CARRIER along with other applied filters: Date Range, Customer, Status, Type, Objective, Via, Outcome');
      genericUtils.verifyRowsExistOrNot({ locator: bottomCardRows });
      cy.log('***Verify user should be able to see X when filter has selected value AND should be able to remove that filter from screen***');
      genericUtils.verifyVisible({ element: xSymbolCarrier });
      genericUtils.clickAction({ locator: xSymbolCarrier });
    });
});