/*---------------------------------------------------------------------------------------------------------------
 Verifying Customer Chip Filter > Portfolio > Interactions
 Test Cases List               : [ME-153411], [ME-153414], [ME-153417], [ME-153405]
 Authored By                   : Beemireddy Chandra obula reddy
 Date                          : 17-05-2023
 Functions/Calling References  :
 User Story Included            : [ME-135956]-Portfolio - Portfolio - Interactions - Implement Customer Chip Filter
---------------------------------------------------------------------------------------------------------------*/
import * as portFolioUtils from '../../../utilities/crmUtils/portFolioUtils';
import * as genericUtils from '../../../utilities/commonUtils/genericUtils';
import { loginToApplication } from '../../../utilities/appSpecificUtils/loginUtils/loginUtils';
import crmPortFolioPage from '../../../pageObjects/crm/crmPage/crmPortFolioPage.json';
import crmInteractionsData from '../../../testData/crm/crmData/crmInteractionsData.json';

const {
  customerSearchBox,
  typeTxtSearchField,
  customerTestDrpDwnAllValues,
  customerTestFirstValue,
  customerTestSecondValue,
  customerTestThirdValue,
  multipleDrpDwnCustomers,
  txtHoverCustomer,
  txtCustomer,
  filtersMenu,
  drpDwnCustomerWithSelectedValue,
  xSymbolCustomer,
  typeTextFieldExpandBtn,
  xSymbol,
  bottomCardRows,

} = crmPortFolioPage;

const {
  txtValCustomer,

  attrColor,
  searchCustomerVal,
  blueClrInteractions,
  txtValStatusFilter,
  whiteStatusTxtBox,
  indexChipFilterThird,
  indexChipFilterSecond,
  indexChipFilterFour,
  indexChipFilterSix,
  txtValStatus,
  txtValCarrier,
  toolTipCustomer,
} = crmInteractionsData.staticData;

const { userName: usernameText, password: passwordText } =
  Cypress.env('users')[Cypress.env('appLoginUser')];

describe('Portfolio - Portfolio - Interactions - Implement customer Chip Filter,[ME-135956]', () => {
  beforeEach(() => {
    loginToApplication({ username: usernameText, password: passwordText });
    genericUtils.viewFullPage();
  });
  it('[ME-153405]-Verify Customer Filter location',
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
      cy.log('***Verify User should see that Customer is the third filter AND is displayed regardless of the selected Type filter from Portfolio Accounts Table***');
      genericUtils.clickAction({ locator: xSymbol });
      genericUtils.verifyTextWithElemIndex({ locator: filtersMenu, indexNum: indexChipFilterThird, verifyText: txtValCustomer });
      genericUtils.clickAction({ locator: typeTextFieldExpandBtn });
      genericUtils.typeAndPressEnter({ locator: typeTxtSearchField, typeText: txtValCarrier });
      genericUtils.verifyVisible({ element: crmPortFolioPage.txtCustomer });
    });

  it('[ME-153411]-Verify Chip Customer Picker Filter Component',
    {
      tags: [
        '@crm',
        '@portFolio',
        '@interactions',
        '@customerChipFilter',
        '@p1',
      ],
    },
    () => {
      cy.log('***Navigate to Interaction tab in port folio***');
      portFolioUtils.navigateToPorFolioTab();
      cy.log('***Verify Customer chip filter***');
      genericUtils.verifyVisible({ element: crmPortFolioPage.txtCustomer });
    });

  it('ME-153414 - Verify Default Customer Filter ',
    {
      tags: [
        '@crm',
        '@portFolio',
        '@interactions',
        '@customerChipFilter',
        '@p1',
      ],
    },
    () => {
      cy.log('***Navigate to Interaction tab in port folio***');
      portFolioUtils.navigateToPorFolioTab();
      cy.log('***Verify Customer chip filter***');
      genericUtils.verifyVisible({ element: crmPortFolioPage.txtCustomer });
      cy.log('*** Verify default customer filter***');
      genericUtils.verifyTxtExist({ locator: txtCustomer, containsTxt: txtValCustomer });
    });
  it('ME-153417 - Verify Customer filter options ',
    {
      tags: [
        '@crm',
        '@portFolio',
        '@interactions',
        '@customerChipFilter',
        '@p1',
      ],
    },
    () => {
      cy.log('***Navigate to Interaction tab in port folio***');
      portFolioUtils.navigateToPorFolioTab();
      cy.log('***Verify user should able to see chip filter in white and with "Customer" text displayed when no Customer filter selected***');
      genericUtils.verifyTxtExist({ locator: txtCustomer, containsTxt: txtValCustomer });
      genericUtils.verifyTextOrBackGroundColor({ locator: txtCustomer, color: attrColor, colorCode: whiteStatusTxtBox });
      cy.log('*** Verify user should be  able to see options from Customer record by typing in a Customer Name as search key***');
      genericUtils.clickAction({ locator: txtCustomer });
      cy.log('***Verify user should be able to see chip filter in blue and with "Cust: <Customer Name selected>" text displayed when only one filter is selected (Example: "Cust: ICCO Cheese")***');
      cy.log('***Verify user should be able to see options from Customer record by typing in a Customer Name as search key***');
      genericUtils.typeAndPressEnter({ locator: customerSearchBox, typeText: searchCustomerVal });
      genericUtils.verifyVisible({ element: customerTestDrpDwnAllValues });
      genericUtils.verifyVisible({ element: customerTestFirstValue });
      genericUtils.verifyVisible({ element: customerTestSecondValue });
      genericUtils.clickAction({ locator: customerTestFirstValue });
      genericUtils.verifyTextOrBackGroundColor({ locator: drpDwnCustomerWithSelectedValue, color: attrColor, colorCode: blueClrInteractions });
      cy.log('***Verify user should be able to see filter value when I hover over the chip filter***');
      genericUtils.verifyToolTips({ locator: txtHoverCustomer, verifyText: toolTipCustomer });
      cy.log('***Verify user should be able to see chip filter in blue and with "Cust: <First Customer selected> + <count of additional filters>" text displayed when more than one filter is selected (Example: "Cust: ICCO Cheese +2")***');
      cy.log('*** Verify user should be able to select one or multiple Customers***');
      genericUtils.clearText({ locator: customerSearchBox });
      genericUtils.clickAction({ locator: customerTestSecondValue });
      genericUtils.clickAction({ locator: customerTestThirdValue });
      genericUtils.verifyTextOrBackGroundColor({ locator: drpDwnCustomerWithSelectedValue, color: attrColor, colorCode: blueClrInteractions });
      genericUtils.verifyTxtExist({ locator: multipleDrpDwnCustomers, containsTxt: txtValStatusFilter });
      cy.log('***Verify user should be able to see all of the chip filters with selected value/s displayed first followed by the filters without selected value, consistent with how chip filter order is implemented in other areas of MM***');
      genericUtils.verifyTextWithElemIndex({ locator: filtersMenu, indexNum: indexChipFilterSecond, verifyText: txtValStatus });
      genericUtils.verifyTextWithElemIndex({ locator: filtersMenu, indexNum: indexChipFilterFour, verifyText: txtValCustomer });
      genericUtils.verifyTextWithElemIndex({ locator: filtersMenu, indexNum: indexChipFilterSix, verifyText: txtValCarrier });
      cy.log('Verify user should Be able to see rows displayed in Portfolio - Interactions table based on selected CUSTOMER along with other applied filters: Date Range, Status, Carrier, Type, Objective, Via, Outcome');
      genericUtils.verifyRowsExistOrNot({ locator: bottomCardRows });
      cy.log('***Verify user should be able to see X when filter has selected value AND should be able to remove that filter from screen***');
      genericUtils.verifyVisible({ element: xSymbolCustomer });
      genericUtils.clickAction({ locator: xSymbolCustomer });
    });
});