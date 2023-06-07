import masteryHomePage from '../../pageObjects/homePage/homePage.json';
import commonPage from '../../pageObjects/commonPage/commonPage.json';
import compliancePage from '../../pageObjects/carrierPage/detailsPage/compliancePage.json';
import profilePage from '../../pageObjects/carrierPage/detailsPage/profilePage.json';
import crmIndustryPage from '../../pageObjects/crm/crmPage/crmIndustryPage.json';
import loadPage from '../../pageObjects/loadPage/searchLoadPage.json';
import * as login from '../../pageObjects/loginPage/loginPage.json';
import {
  getAccessToken,
  getDataDictionaryFromMinion,
} from '../../tdm/lib/networkCalls/commonCalls';
import keycloakAdminData from '../../testData/keyCloakUserData/configAdminData.json';
import commonData from '../../testData/staticData/commonData/commonData.json';
import {
  returnfutureDateMMDDYY, returntodayDateMMDDYY, verifyfutureDateMMDDYY,
} from '../../utilities/commonUtils/dateTimeUtils';
import { getTestData } from '../tdmUtils/tdmUtils';
const { masteryLogo, dashBoardButton } = masteryHomePage;
const appUrl = Cypress.env('appUrl')[Cypress.env('environment')];
const { saveCertificationBtn, addCarrierBtn } = compliancePage;
//commonpage
const { dropdwnExpand, li, ul, ol, input, button, drpDwnSearchBox, expandBtn, closeIconExpandPage, updateMessage } = commonPage;
const { attributeTitle, emptyData, longWait, shortWait, maxWait, tdmErrorDescription, minWait, moreWait, attrPlaceHolder } = commonData;
const { dialogPopup } = crmIndustryPage;
const { keycloakTitle } = keycloakAdminData;
const { angleUpBtn, angleDownBtn } = loadPage.loadWindowObj;
const { inputCheckBox, checkedTrue, labelTitle } = profilePage;
const newWindowHandles = ({ href: hrefLink, button: elementToBeClicked }) => {
  cy.window().then((win) => {
    cy.stub(win, 'open', (url) => {
      win.location.href = hrefLink;
    }).as('popup');
    cy.get(elementToBeClicked).click({ force: true });
    cy.wait(maxWait);
    cy.get('@popup').should('be.called');
  });
};
const dynamicWindowHandles = ({ button: dynamicValue }) => {
  cy.get(`[title= ${dynamicValue}  ]>a `).then((input) => {
    const href = input.attr('href');
    cy.log(href);
    const hrefnew = href.replace('/loads', 'loads');
    cy.log(hrefnew);
    const hreftobeclicked = appUrl + hrefnew;
    cy.log(hreftobeclicked);
    cy.window().then((win) => {
      cy.stub(win, 'open', (url) => {
        win.location.href = hreftobeclicked;
      }).as('popup');
      cy.get(`[title= ${dynamicValue}  ]>a `).wait(shortWait).click({ force: true });
      cy.wait(maxWait);
      //cy.get("@popup").should("be.called");
    });
  });
};
//required
const navigateHomePage = () => {
  cy.visit(appUrl);
  cy.wait(shortWait);
  verifyExists({ element: masteryLogo }, { timeout: Cypress.env('defaultCommandTimeout') });
  verifyExists({ element: dashBoardButton }, { timeout: Cypress.env('defaultCommandTimeout') });
};
const clickToOpenNewTabInSameWindow = (locator) => {
  cy.get(locator).invoke('attr', 'target');
  if (Cypress.env('IS_CYPRESS_HANDLING_NEW_TABS')) {
    cy.get(locator).click({ force: true });
  } else {
    cy.get(locator).invoke('removeAttr', 'target').click({ force: true });
  }
};

const clickToOpenNewTabInSameWindowWithDynamicText = ({ button: dynamicValue }) => {
  cy.get(`[title='${dynamicValue}']>a`).invoke('attr', 'target');
  if (Cypress.env('IS_CYPRESS_HANDLING_NEW_TABS')) {
    cy.get(`[title='${dynamicValue}']>a`).click({ force: true });
  } else {
    cy.get(`[title='${dynamicValue}']>a`).invoke('removeAttr', 'target').click({ force: true });
  }
};
//required
const clickAction = ({ locator: elementLocator }) => { cy.get(elementLocator).click({ multiple: true, force: true }); };
//required
const clickActionWait = ({ locator: locatorBtn }) => { cy.get(locatorBtn).click({ force: true }).wait(longWait); };
//required
const clickVisibleElement = ({ locator: locatorField }) => {
  //click edit buon in crm page - Karthik
  cy.get(locatorField).filter(':visible').click({ force: true });
};
const clickElementWithDynamicTitle = ({ button: dynamicValue }) => {
  cy.get(`[title='${dynamicValue}']>a`, { timeout: Cypress.env('defaultCommandTimeout') }).click();
};
const clickWithWaits = ({ locator: locatorField, waitTime: waitCount }) => {
  cy.get(locatorField).click({ force: true }).wait(waitCount);
};
const clickElementContainingText = ({ locator: locatorTag, containsText: text }) => {
  cy.contains(locatorTag, text).click({ force: true });
};
const clickLocatorWithText = ({ locator: locatorField, Text: textData }) => {
  cy.get(locatorField).contains(textData).click({ force: true });
};
const clickTypeFirstElement = ({ locator: locatorField, element: text }) => {
  cy.get(locatorField)
    .first()
    .click({ force: true })
    .wait(shortWait)
    .type(text)
    .wait(shortWait)
    .type('{enter}');
};
const getLocatorFromPageClick = ({ locator: locatorField }) => {
  return cy.get(locatorField, { timeout: shortWait }).click();
};
const clickTypeLastElement = ({ locator: locatorField, element: text }) => {
  cy.get(locatorField)
    .last()
    .click({ force: true })
    .wait(shortWait)
    .type(text)
    .wait(shortWait)
    .type('{enter}');
};
const typeText = ({ locator: locatorBtn, dataText: txtData }) => { cy.get(locatorBtn).type(txtData, { force: true }); };
const typeAndWait = ({ locator: locatorBtn, dataText: txtData }) => { cy.get(locatorBtn).type(txtData, { force: true }).wait(longWait); };
const typeAndPressEnter = ({ locator: locatorBtn, typeText: textData }) => {
  cy.get(locatorBtn).type(textData).type('{enter}', { force: true });
};
const typeAndPressEnterWithWait = ({ element: locator, typeText: text }) => {
  cy.get(locator).type(text).wait(longWait).type('{enter}').wait(minWait);
};
const clearAndTypeWithWait = ({ element: locator, typeText: text }) => {
  cy.get(locator)
    .wait(shortWait)
    .clear()
    .wait(shortWait)
    .type(text);
};
const clearTypeAndEnter = ({ element: locator, typeText: textData }) => {
  cy.get(locator)
    .wait(longWait)
    .clear()
    .wait(longWait)
    .type(textData)
    .wait(shortWait)
    .type('{enter}');
  cy.wait(longWait);
};
const clearAndPressEnter = ({ locator }) => { cy.get(locator).clear().type('{enter}'); };
const typeKeyboardKey = ({ element: locator, keyToType: key }) => { cy.get(locator).type(key); };
const checkBoxUncheck = ({ checkBoxLocator: locator }) => { cy.get(locator).uncheck({ force: true }); };
const checkBoxCheck = ({ checkBoxLocator: locator }) => { cy.get(locator).check({ force: true }); };
const selectItemFromButtonTypeDropDown = ({ locator: locatorBtn, dropdownVal: value }) => {
  cy.get(locatorBtn)
    .find('button')
    .click({ force: true })
    .wait(longWait)
    .parent()
    .find('li')
    .contains(value)
    .click({ force: true })
    .wait(shortWait);
};
const selectItemFromDropDownByTyping = ({ locator: locatorField, drpDwnVal: value }) => {
  cy.get(locatorField)
    .parent()
    .type(value)
    .wait(longWait)
    .get('li')
    .contains(value)
    .click({ force: true });
};
const selectItemFromDropDownBySearchingList = ({ element: locator, ddValue: value }) => {
  cy.get(locator).parent()
    .type(value)
    .wait(shortWait)
    .get('li')
    .each((el) => {
      const ddval = el.text();
      if (ddval === value) {
        cy.log(ddval);
        cy.wrap(el).click({ force: true }).wait(shortWait);
      }
    });
};
const selectItemFromDropDown = ({ element: locator, ddValue: value }) => {
  cy.get(locator)
    .find('button')
    .click({ force: true })
    .wait(shortWait)
    .get('li')
    .contains(value)
    .click({ force: true });
};

export const selectValueDropDownInputType = ({ element: locator, ddValue: value }) => {
  cy.get(locator)
    .click({ force: true })
    .wait(shortWait)
    .type(value, { force: true })
    .wait(shortWait)
    .parent()
    .get('li')
    .contains(value)
    .click({ force: true });
};

const selectAllItemsFromDropDown = ({ element: locator }) => {
  cy.get(locator)
    .find('button')
    .click({ force: true })
    .get('li')
    .each((el) => {
      cy.wrap(el).click({ force: true });
    });
};
//required
const verifyVisible = ({ element: locator }) => { cy.get(locator).should('be.visible'); };
const verifyNotVisible = ({ element: locator }) => { cy.get(locator).should('not.be.visible'); };
//required
const verifyDoesNotExist = ({ element: locator }) => { cy.get(locator).should('not.exist'); };
const verifyExists = ({ element: locator }) => { cy.get(locator).should('exist'); };
const verifyElementTextContains = ({ locator: locatorField, verifyText: text }) => {
  cy.get(locatorField).should('include.text', text);
};
const verifyElementText = ({ locator: locatorBtn, verifyText: txtVerification }) => {
  cy.get(locatorBtn).should('have.text', txtVerification);
};
const verifyTableRowElementText = ({ locator: locatorBtn, index: number, verifyText: txtVerification }) => {
  cy.get(locatorBtn).eq(number).should('have.text', txtVerification);
};
const verifyElementValue = ({ locator: locatorField, verifyText: text }) => {
  cy.get(locatorField).should('have.value', text);
};
const verifyExistElementWithDynamicTitle = ({ text: dynamicValue }) => {
  cy.get(`[title='${dynamicValue}']`).should('exist');
};
const verifyAllElementContainsText = ({ locator: locatorField, verifyText: text }) => {
  cy.get(locatorField).each((el) => { cy.wrap(el).should('contain.text', text); });
};
const verifyAttrValueContains = ({ locator: locatorField, attribute: getAttr, verifyText: text }) => {
  cy.get(locatorField).invoke('attr', getAttr).should('contain', text);
};
const verifyElementDoesNotHaveValue = ({ locator: locatorField }) => { cy.get(locatorField).should('not.have.value'); };
const verifyIfEnabled = ({ locator: locatorField }) => { cy.get(locatorField).should('not.be.disabled'); };
const verifyIfDisabled = ({ locator: locatorField }) => { cy.get(locatorField).should('be.disabled'); };
const verifyToastOnSuccess = () => {
  cy.get("div[class^='Toastify__toast Toastify__toast--success']")
    .should('be.visible')
    .contains('Updated')
    .parent()
    .find('button')
    .click({ force: true });
};
const verifyAlertOnSuccess = () => {
  cy.get("[role='alert']")
    .contains('Updated')
    .parent()
    .find('button')
    .click({ force: true })
    .wait(shortWait);
};
const verifyAlertWithMessage = ({ msgToVerify: message }) => {
  cy.get("[role='alert']")
    .contains(message)
    .parent()
    .find('button')
    .click({ force: true });
};

const verifyWindowAlertWithMessage = ({ msgToVerify: message }) => {
  cy.on('window:alert', (t) => {
    expect(t).to.contains(message);
  });
};

const clickOkOnWindowAlert = () => {
  cy.on('window:alert', () => true);
};

const clickCancelOnWindowAlert = () => {
  cy.on('window:alert', () => false);
};

const verifyIfCheckBoxChecked = ({ element: locator }) => { cy.get(locator).should('be.checked'); };
const verifyIfCheckBoxUnChecked = ({ element: locator }) => { cy.get(locator).should('not.be.checked'); };
const verifyIfAllCheckBoxUnchecked = ({ locator: chkBoxLocator }) => {
  cy.get(chkBoxLocator).each((el) => { cy.wrap(el).should('have.value', 'false'); });
};
const verifyIfAllCheckBoxChecked = ({ locator: chkBoxLocator }) => {
  cy.get(chkBoxLocator).each((el) => { cy.wrap(el).should('have.value', 'true'); });
};
const verifyElementTextDoesNotContain = ({ locator: locatorField, verifyTxt: text }) => {
  cy.get(locatorField).should('not.contain', text);
};
const verifyBackGroundColour = ({ locator: locatorField, colourValue: colour }) => {
  cy.get(locatorField).should('have.css', 'background-color', colour);
};
const verifyBackGroundColourIsNot = ({ locator: locatorField, colourValue: colour }) => {
  cy.get(locatorField).should('not.have.css', 'background-color', colour);
};
const verifyToolTips = ({ locator: eleLocator, verifyText: verifyTextVal }) => {
  cy.get(eleLocator).first().trigger('mouseover', { force: true }).invoke('show');
  cy.contains(verifyTextVal);
};
const verifyToolTipsWithText = ({ locator: eleLocator, verifyText: verifyTextVal }) => {
  cy.get(eleLocator).trigger('mouseenter', { force: true }).trigger('mouseover', { force: true }).invoke('show');
  cy.get('[role="tooltip"]').should('have.text', verifyTextVal);
};
const clearText = ({ locator: locatorField }) => { cy.get(locatorField).clear(); };
const refreshPage = () => { cy.reload().wait(shortWait); };
const uploadFile = ({ locator: locatorField, filePath: pathOfFile }) => {
  cy.get(locatorField).selectFile(pathOfFile, { force: true });
};
const reloadPage = () => { cy.reload().wait(maxWait); };
const waitSometime = (sec) => { cy.wait(sec); };
const scrolltoTop = () => { cy.scrollTo('top'); };
const scrollToRight = () => { cy.scrollTo('right'); };
const scrollToCenter = () => { cy.scrollTo('center'); };
const scrollToTopLeft = () => { cy.scrollTo('topLeft'); };
const scrollToBottomLeft = () => { cy.scrollTo('bottomLeft'); };
const scrollToTopRight = () => { cy.scrollTo('topRight'); };
const scrollToBottomRight = () => { cy.scrollTo('bottomRight'); };
const scrollIntoView = ({ locator: locatorField }) => { cy.get(locatorField).scrollIntoView(); };
//navigates to a specific history position (-1 goes back one page, 1 goes forward one page, etc).
const navigateBrowserHistoryByCount = (count) => { cy.go(count); };
const tabHighlight = () => { cy.get('body').invoke('attr', 'class').should('eq', 'user-is-tabbing'); };
//tab function with verification
const tabAndVerify = ({ locator: locatorField }) => {
  cy.get(locatorField).tab();
  tabHighlight();
};
const tabAndVerifyField = ({ locator: locatorField }) => {
  cy.get(locatorField).tab();
  cy.get(locatorField).should('exist');
};
//concat locator(drpdwn) to get proper locator to achieve proper tab function
const tabSetLocator = ({ locator: locatorField, value: text }) => {
  const loc = `${locatorField} ${text}`;
  cy.get(loc).tab();
  tabHighlight();
};
const getAttrValue = ({ locator: locatorField, attr: attrName }) => {
  let inputValue;
  cy.get(locatorField).first().then((input) => {
    inputValue = input.attr(attrName);
    cy.log(inputValue);
    Cypress.env('inputValue', inputValue);
  });
  console.log(Cypress.env('inputValue'));
  return Cypress.env('inputValue');
};
const getGridRowCount = ({ locator }) => {
  let rowCount = 0;
  cy.get(locator).then(elements => {
    rowCount = elements.length;
    cy.log('Grid Row Count is = ' + rowCount);
    Cypress.env('rowCount', rowCount);
  });
  return Cypress.env('rowCount');
};

const verifyRowsExistOrNot = ({ locator: locatorfield }) => {
  cy.get(locatorfield).then((rows) => {
    if (rows.length > 0) {
      cy.log('Rows exist.');
    } else {
      cy.log('Rows do not exist.');
    };
  });
};

const getPageUrl = () => {
  let visitUrl;
  cy.url().then((url) => {
    visitUrl = url;
    Cypress.env('visitUrl', visitUrl);
  });
  cy.log(Cypress.env('visitUrl'));
  return Cypress.env('visitUrl');
};
const viewFullPage = () => { cy.viewport(1300, 700); };
const getStartDateFromDatePicker = ({
  dateLocator: dateField,
  dayCount: dayCountNumber,
  monthCount: monthCountNumber,
}) => {
  //to pick up the future start date
  const currentdata = new Date();
  currentdata.setDate(currentdata.getDate() + parseInt(dayCountNumber));
  const dd = String(currentdata.getDate());
  const mm = String(currentdata.getMonth() + parseInt(monthCountNumber));
  const yyyy = String(currentdata.getFullYear());
  cy.log(mm + '/' + dd + '/' + yyyy);
  const startDate = String(mm + '/' + dd + '/' + yyyy);
  cy.get(dateField).first().type(startDate).type('{enter}');
  return startDate;
};
const getEndDateFromDatePicker = ({
  dateLocator: dateField,
  dayCount: dayCountNumber,
  monthCount: monthCountNumber,
}) => {
  //to pick up the future date
  const currentdata = new Date();
  currentdata.setDate(currentdata.getDate() + parseInt(dayCountNumber));
  const dd = String(currentdata.getDate());
  const mm = String(currentdata.getMonth() + parseInt(monthCountNumber));
  const yyyy = String(currentdata.getFullYear());
  cy.log(mm + '/' + dd + '/' + yyyy);
  const endDate = String(mm + '/' + dd + '/' + yyyy);
  cy.get(dateField).last().type(endDate).type('{enter}');
  return endDate;
};
const searchDrpDwnNewWindowHandles = ({ href: hrefLink, button: valueLoad, searchDrpDwnbox: DrpDwnVal }) => {
  cy.window().then((win) => {
    cy.stub(win, 'open', (url) => {
      win.location.href = hrefLink;
    }).as('popup');
    cy.get(DrpDwnVal)
      .parent()
      .type(valueLoad)
      .wait(maxWait);
    cy.get('li').contains(valueLoad).wait(shortWait).click({ force: true });
    cy.wait(maxWait);
    cy.get('@popup').should('be.called');
  });
};
const buttonThatOpensNewTab = (button) => {
  //This function will open the button it's passed in the same window
  //let target = buttonThatOpensNewTab.getAttribute('target')
  cy.get(button).invoke('attr', 'target');
  if (Cypress.env('IS_CYPRESS_HANDLING_NEW_TABS')) {
    cy.get(button).click({ force: true });
  } else {
    cy.get(button).invoke('removeAttr', 'target').click({ force: true });
  }
};
const indexValWindowHandles = ({ href: hrefLink, locatorField: locator, position: indexNumber }) => {
  cy.window().then((win) => {
    cy.stub(win, 'open', (url) => {
      win.location.href = hrefLink;
    });
    cy.get(locator).eq(indexNumber).click();
    cy.wait(moreWait);
  });
};
const typeTextWait = ({ locator: locatorBtn, dataText: txtData }) => {
  cy.get(locatorBtn).type(txtData).wait(longWait);
};
const verifyText = ({ locator: locatorBtn, verifyText: txtVerification }) => {
  cy.get(locatorBtn).should('have.text', txtVerification);
};
export const verifyTextWithElemIndex = ({ locator: locatorBtn, indexNum: indexVal, verifyText: txtVerification }) => {
  cy.get(locatorBtn).eq(indexVal).should('include.text', txtVerification);
};
const clickMenu = ({ locator: locatorBtn }) => {
  cy.get(locatorBtn).invoke('removeAttr', 'target').click({ force: true });
};
const typeDate = ({ locator: locatorBtn, validDate: dateValidation }) => {
  cy.get(locatorBtn).type(dateValidation);
};
const textPressEnter = ({ locator: locatorBtn, typeText: textData }) => {
  cy.get(locatorBtn).type(textData).type('{enter}');
};
const typeTextAndEnter = ({ locator: locatorBtn, typeText: textData }) => {
  cy.get(locatorBtn).type(textData, { force: true }).wait(longWait).type('{enter}');
};
const selectDropDownTypeButtonList = ({
  locator: locatorBtn,
  dropdownVal: value,
}) => {
  cy.get(locatorBtn)
    .find('button')
    .click({ force: true })
    .wait(longWait)
    .parent()
    .find('li')
    .contains(value)
    .click({ force: true })
    .wait(shortWait);
};
const clearTypeEnter = ({ element: locator, typeText: textData }) => {
  cy.get(locator)
    .wait(longWait)
    .clear()
    .wait(longWait)
    .type(textData)
    .wait(shortWait)
    .type('{enter}');
  cy.wait(longWait);
};
const hyperLinkClick = ({ linkText: text, locator: locatorField }) => {
  cy.get(locatorField).contains(text).click({ force: true });
};
const verifyLabel = ({ locator: locatorField, verifyText: text }) => {
  cy.get(locatorField).should('include.text', text);
};
const quoteLinkClick = ({ locator: locatorField }) => {
  cy.get('a[href*="/quote"]').contains(locatorField).click();
};
const verifyLabelText = ({ locator: locatorField, verifyText: text }) => {
  cy.get(locatorField).should('have.value', text);
};
const textClear = ({ locator: locatorField }) => {
  cy.get(locatorField).click({ force: true }).clear({ force: true });
};
const clickThatContains = ({ element: button, name: nameOfButton }) => {
  cy.wait(longWait)
    .contains(`${button}`, `${nameOfButton}`)
    .click({ force: true })
    .wait(minWait);
};
const previousTab = () => {
  cy.go('back').wait(shortWait);
};
const updatedAlert = () => {
  cy.get("[role='alert']")
    .contains('Updated')
    .parent()
    .find('button')
    .click({ force: true });
};//old will be removed
const toastWithMsg = ({ message: msg }) => {
  cy.get(updateMessage)
    .contains(msg)
    .parent()
    .find(button)
    .click({ force: true });
};
const checkboxDrpDwnWithSearch = ({
  locator: locatorField,
  drpDwnVal: value,
}) => {
  cy.get(locatorField)
    .find(button)
    .click({ force: true })
    .parent()
    .find(drpDwnSearchBox)
    .find(input)
    .type(value, { force: true })
    .wait(shortWait)
    .get(li)
    .contains(value)
    .click({ force: true });
};
const drpDwnWithSearch = ({
  locator: locatorField,
  drpDwnVal: value,
}) => {
  cy.get(locatorField)
    .find(button)
    .click({ force: true })
    .parent()
    .find(drpDwnSearchBox)
    .find(input)
    .type(value, { force: true })
    .wait(shortWait)
    .parent()
    .parent()
    .find(li)
    .contains(value)
    .click({ force: true });
};
const getDynamicAttr = ({ button: dynamicValue }) => {
  cy.get(`[title='${dynamicValue}']>a`, { timeout: Cypress.env('defaultCommandTimeout') }).click();
};
const getMultipleDynamicAttr = ({ button: dynamicValue, position: indexNumber }) => {
  cy.get(`[title='${dynamicValue}']>a`, { timeout: Cypress.env('defaultCommandTimeout') }).eq(indexNumber).click();
};
const getTitleAttr = ({ text: dynamicValue }) => {
  cy.get(`[title='${dynamicValue}']`).should('exist');
};
const clickElementThatContains = ({
  locator: locatorTag,
  containsText: text,
}) => {
  cy.contains(locatorTag, text).click({ force: true });
};
const getfutureDate = ({
  dateLocator: dateField,
  dayCount: dayCountNumber,
  monthCount: monthCountNumber,
}) => {
  //to pick up the future date
  const currentdata = new Date();
  currentdata.setDate(currentdata.getDate() + parseInt(dayCountNumber));
  const dd = String(currentdata.getDate());
  const mm = String(currentdata.getMonth() + parseInt(monthCountNumber));
  const yyyy = String(currentdata.getFullYear());
  cy.log(mm + '/' + dd + '/' + yyyy);
  const targetdate = String(mm + '/' + dd + '/' + yyyy);
  cy.get(dateField).click().clear().type(targetdate).type('{enter}');
  return targetdate;
};
const getPastDate = ({
  locator: Datelocator,
  Day: DayCount,
  Month: Monthcount,
}) => {
  //to pick up the past date
  const currentdata = new Date();
  const dd = String(currentdata.getDate() - parseInt(DayCount));
  const mm = String(currentdata.getMonth() - parseInt(Monthcount));
  const yyyy = String(currentdata.getFullYear());
  cy.log(mm + '/' + dd + '/' + yyyy);
  const targetdate = String(mm + '/' + dd + '/' + yyyy);
  cy.get(Datelocator).click().clear().type(targetdate).type('{enter}');
  return targetdate;
};
const typeDropDwnClick = ({ locator: locatorField, drpDwnVal: value }) => {
  cy.get(locatorField)
    .parent()
    .type(value)
    .wait(longWait)
    .get(li)
    .wait(shortWait)
    .contains(value)
    .click({ force: true });
};

//this method should work if your drop down list in tag <ul>
const typeDropDwn = ({ locator: locatorField, drpDwnVal: value }) => {
  cy.get(locatorField)
    //.clear()
    .type(value)
    .wait(longWait)
    .parent()
    .parent()
    .find(ul)
    .find(li)
    .contains(value)
    .click({ force: true });
};
const textSubString = ({
  text: textData,
  startIndex: firstIndex,
  endIndex: lastIndex,
}) => {
  return textData.substring(firstIndex, lastIndex);
};
const clickTabBtn = ({ locator: locatorField }) => {
  cy.get(locatorField).tab().click({ force: true });
};
const navigateTabKey = ({ element: locatorArr }) => {
  cy.get(locatorArr).each((element) => {
    clickTabBtn({ locator: element });
  });
};
const typeWaitEnter = ({ element: locator, typeText: text }) => {
  cy.get(locator).type(text).wait(longWait).type('{enter}').wait(minWait);
};
const checkBoxStatus = ({ element: locator }) => {
  cy.get(locator).each((el) => {
    cy.wrap(el).should('have.value', 'on');
  });
};
//to get the checkbox status after uncheck
const checkBoxUnchkStatus = ({ locator: chkBoxLocator }) => {
  cy.get(chkBoxLocator).each((el) => { cy.wrap(el).should('have.value', 'false'); });
};
const clickFirstElementIn = ({ locator: locatorField }) => {
  //click first element in the section - Karthik
  cy.get(locatorField).first().click({ force: true }).wait(shortWait);
};
export const clickElementIndex = ({ locator: locatorField, index: indexNumber }) => {
  //click first element in cem note section - Karthik
  cy.get(locatorField).eq(indexNumber).click({ force: true }).wait(shortWait);
};

const clickKebabButtonWithName = ({
  locator: locatorField,
  text: textData,
  element: elValue,
}) => {
  //karthik
  cy.get(locatorField).contains(textData).parent().find(elValue).click({ force: true });
};
const verifyMutipleElementsWithSameText = ({
  locator: locatorField,
  verifyText: text,
}) => {
  cy.get(locatorField).each((el) => {
    cy.wrap(el).should('contain.text', text);
  });
};
const verifyTextContains = ({
  locator: locatorField,
  containsText: text,
}) => {
  cy.get(locatorField).should((x) => {
    expect(x).to.contain(text);
  });
};
//Click Expand button
const clickExpand = () => {
  cy.get(expandBtn).filter(':visible').click({ force: true });
};
//Close 'X' icon to close expanded page from Carrier
const clickCloseXIcon = () => {
  cy.get(closeIconExpandPage).click({ force: true });
};
const clickCloseXIconWithDialogTitle = ({ titleText: dialogTitle }) => {
  cy.get('div').contains(dialogTitle).parents().find("[data-testid='dialog']").then((el) => {
    cy.wrap(el).find(closeIconExpandPage).click();
  });
};
const verifyAttrText = ({
  locator: locatorField,
  attribute: getAttr,
  verifyText: text,
}) => {
  cy.get(locatorField).invoke('attr', getAttr).should('contain', text);
};
const verifyToExist = ({ element: locator }) => {
  cy.get(locator).should('exist');
};
const verifyToNotExist = ({ element: locator }) => {
  cy.get(locator).should('not.exist');
};
const clearTypeText = ({ element: locator, typeText: text }) => {
  cy.get(locator)
    .wait(shortWait)
    .clear()
    .wait(shortWait)
    .type(text);
};
const clearTextType = ({ element: locator, typeText: text }) => {
  cy.get(locator)
    .clear()
    .type(text);
};
const clearTextTypeWithLessTime = ({ element: locator, typeText: text }) => {
  cy.get(locator)
    .clear()
    .type(text, { delay: 1 });
};
const clickLastElementIn = ({ locator: locatorField }) => {
  //click last element in crm note section
  cy.get(locatorField).last().click({ force: true });
};
const verifyFirstElementTxt = ({
  locator: locatorField,
  verifyText: text,
}) => {
  cy.get(locatorField).first().should('include.text', text);
};
const verifyFirstElementContinsTxt = ({
  locator: locatorField,
  verifyText: text,
}) => {
  cy.get(locatorField).first().contains(text);
};
const concatTwoStrings = ({
  stringOne: firstString,
  stringTwo: secondString,
}) => {
  const targetString = `${firstString}${secondString}`;
  return targetString;
};
const checkDefaultOrderAfterDragRearrangeReset = ({ locator: locatorField, columnNames: array }) => {
  for (let k = 0; k < (array.length - 1); k++) {
    if (k === 0) {
      cy.get(locatorField).first().next().contains(array[0]);
    }
    cy.get(locatorField).contains(array[k]).parent().next().contains(array[k + 1]).should('exist');
  }
};
const checkDefaultOrderAfterDragRearrangeResetWithSameColName = ({ locator: locatorField, columnNames: array }) => {
  for (let k = 0; k < (array.length - 1); k++) {
    if (k === 0) {
      cy.get(locatorField).first().next().invoke('attr', 'data-thid', array[0]).should('exist');
    }
    cy.get(`${locatorField}[data-thid='${array[k]}']`).next().invoke('attr', 'data-thid', array[k + 1]).should('exist');
  }
};
const checkOneColDrag = ({ locator: locatorField, stationaryElement: fixedElement, draggedElement: desiredElement }) => {
  cy.get(`${locatorField}[data-thid='${fixedElement}']`).next().invoke('attr', 'data-thid', desiredElement).should('exist');
};
const verifyOrderListDefaultOrderAfterDragRearrangeReset = ({ locator: locatorField, columnNames: array }) => {
  for (let k = 0; k < (array.length - 1); k++) {
    if (k === 0) {
      cy.get(locatorField).first().contains(array[0]).should('exist');
    }
    cy.get(locatorField).contains(array[k]).parent().next().contains(array[k + 1]).should('exist');
  }
};
const verifyOrderListDefaultOrderAfterDragRearrangeResetWithId = ({ locator: locatorField, columnNames: array }) => {
  for (let k = 0; k < (array.length - 1); k++) {
    if (k === 0) {
      cy.get(locatorField).first().invoke('attr', 'id', array[0]).should('exist');
    }
    cy.get(`${locatorField}[id='${array[k]}']`).next().invoke('attr', 'id', array[k + 1]).should('exist');
  }
};
const checkDragRearrangeOneCol = ({ locator: locatorField, stationaryElement: fixedElement, draggedElement: desiredElement }) => {
  cy.get(locatorField).contains(fixedElement).parent().next().contains(desiredElement).should('exist');
};
const checkDragRearrangeOneColExactMatch = ({ locator: locatorField, stationaryElement: fixedElement, draggedElement: desiredElement }) => {
  cy.get(locatorField).contains(new RegExp('^' + fixedElement + '$', 'g')).parent().next().contains(desiredElement).should('exist');
};
const dragAndDrop = ({ draggedElement: desiredElement, stationaryElement: fixedElement, refElement: referenceEl }) => {
  cy.dragAndDrop(desiredElement, fixedElement, referenceEl);
  cy.wait(shortWait);
  cy.get(fixedElement).next(desiredElement).should('exist');
};
const resizeElement = ({ element: resizeElement }) => {
  cy.get(resizeElement)
    .trigger('mousedown')
    .trigger('mousemove', 50, 10, { force: true })
    .trigger('mouseup');
};
const verifyTextContainsInSecondElement = ({
  locator: locatorField,
  containsText: text,
}) => {
  cy.get(locatorField).eq(1).should((x) => {
    expect(x).to.contain(text);
  });
};
const checkOrderAfterDragRearrangeReset = ({ locator: locatorField, text: verifyText }) => {
  cy.wait(maxWait);
  cy.get(locatorField).should('have.text', verifyText);
};
const navWindowWithText = ({ locator: locatorField, text: verifyText }) => {
  cy.get(locatorField).contains(verifyText).invoke('removeAttr', 'target').click({ force: true });
};
const locatorWithMultipleObjects = ({ locator: locatorField, position: indexNumber, element: text }) => {
  cy.get(locatorField).eq(indexNumber).type(text).wait(shortWait);
  cy.contains(text).click({ force: true });
};
const locatorWithMultipleObjectsEnter = ({ locator: locationField, position: indexNumber, element: text }) => {
  cy.get(locationField).eq(indexNumber).type(text).wait(shortWait).type('{enter}');
};
const locatorWithMultipleObjectsClick = ({ locator: locationField, position: indexNumber, element: text }) => {
  cy.get(locationField).eq(indexNumber).type(text).wait(shortWait).click({ force: true });
};
const multipleObjectsClick = ({ locator: locationField, position: indexNumber }) => {
  cy.get(locationField).eq(indexNumber).wait(shortWait).click({ force: true });
};
const locatorWithMultipleObjectsDropDownSelect = ({ locator: locationField, position: indexNumber, drpDwnVal: value }) => {
  cy.get(locationField)
    .eq(indexNumber)
    .parent()
    .type(value)
    .wait(shortWait)
    .get(li)
    .contains(value)
    .click({ force: true });
};
const dragAndDropScrollIntoView = ({ draggedElement: desiredElement, stationaryElement: fixedElement, refElement: referenceEl }) => {
  cy.dragAndDropWithScroll(desiredElement, fixedElement, referenceEl);
  cy.wait(shortWait);
  cy.get(fixedElement).next(desiredElement).should('exist');
};
const typeDropDwnClickWithIndex = ({ locator: typeLocator, position: numericValue, drpDwnVal: dropdownvalue }) => {
  cy.get(typeLocator)
    .eq(numericValue)
    .parent()
    .type(dropdownvalue)
    .wait(shortWait)
    .get(li)
    .contains(dropdownvalue)
    .click({ force: true });
};
//================================
const multipleObjectsEnterWait = ({ locator: locatorField, position: numericValue, element: text }) => {
  cy.get(locatorField).eq(numericValue).type(text).type('{enter}').wait(shortWait);
};
const clickContactsCustomizeBtn = ({ locator: locatorField, position: number }) => {
  cy.get(locatorField).eq(number).click({ force: true });
};
const validateNullValue = ({ locator: locatorField }) => {
  cy.get(locatorField).should('not.have.value');
};
const clickable = ({ locator: locatorField }) => {
  cy.get(locatorField).should('not.be.disabled');
};
const notClickable = ({ locator: locatorField }) => {
  cy.get(locatorField).should('be.disabled');
};
//exact dropdown value selection - Rekha P
const dropDownExactClick = ({ element: locator, ddValue: value }) => {
  cy.get(locator).parent()
    .type(value)
    .wait(shortWait)
    .get('li')
    .each((el) => {
      const ddval = el.text();
      if (ddval === value) {
        cy.log(ddval);
        cy.wrap(el).click({ force: true }).wait(shortWait);
      }
    });
};
const containsElement = ({ locator: locatorField, value: text }) => {
  cy.get(locatorField).type(text).contains(text).click({ force: true });
};
const clickIconObject = ({ locator: locatorField, position: indexNumber }) => {
  cy.get(locatorField).eq(indexNumber).click({ force: true });
};
//type righarrow
const typeRightArrow = ({ element: locator }) => {
  cy.get(locator).type('{rightArrow}');
};
const spiltString = ({
  text: textData,
  separator: textSeparator,
}) => {
  const stringArray = textData.split(textSeparator);
  const firstString = stringArray[0];
  cy.log(`"FirstString :"${firstString}`);
  return firstString;
};
const dropDownExactCheckBoxSelection = ({ element: locatorField, ddValue: value }) => {
  cy.get(locatorField)
    .find(button)
    .click({ force: true })
    .parent()
    .find(drpDwnSearchBox)
    .find(input)
    .type(value, { force: true })
    .wait(shortWait)
    .get(li)
    .each((el) => {
      const ddval = el.text();
      if (ddval.includes(value)) {
        cy.log(ddval);
        cy.wrap(el).click({ force: true });
      }
    });
};
//Clearing the field
const backspaceClear = ({ element: locator }) => {
  cy.get(locator)
    .type('{backspace}');
};
const verifyTxtExist = ({ locator: locatorForm, containsTxt: textval }) => {
  cy.get(locatorForm).contains(textval).should((elem) => {
    expect(elem.text()).to.equal(textval);
  });
};
const verifyTxtInTextBox = ({ locator: locatorForm, verifyText: textval }) => {
  cy.get(locatorForm).invoke('val').then((ele) => {
    expect(ele).to.equal(textval);
  });
};
const textClearEnter = ({ locator }) => {
  cy.get(locator).clear().type('{enter}');
};
const concatThreeStrings = ({
  stringOne: firstString,
  stringTwo: secondString,
  stringThree: thirdString,
}) => {
  const targetString = `${firstString}${secondString}${thirdString}`;
  return targetString;
};
const toastMsg = () => {
  cy.get("div[class^='Toastify__toast Toastify__toast--success']")
    .should('be.visible')
    .contains('Updated')
    .parent()
    .find('button')
    .click({ force: true });
};
const toastAlert = () => {
  cy.get("[role='alert']")
    .contains('Updated')
    .parent()
    .find('button')
    .click({ force: true })
    .wait(shortWait);
};
const toastAlertMsgVaidation = ({ toastMsg: toasterMessage }) => {
  cy.get("[role='alert']")
    .contains(toasterMessage)
    .parent()
    .find('button')
    .click({ force: true })
    .wait(shortWait);
};
const delAlertTruckEntry = () => {
  cy.get("[role='alert']")
    .contains('Successfully deleted truck entry.')
    .parent()
    .find('button')
    .click({ force: true });
};
//to get the checkbox status after check
const checkBoxCheckStatus = ({ locator: chkBoxLocator }) => {
  cy.get(chkBoxLocator).each((el) => { cy.wrap(el).should('have.value', 'true'); });
};
//$123.00 ratequote setup
const rateUnitSet = ({ value: text }) => {
  const num = text;
  let n = num; let count = 0;
  const sy = '$'; const zero = '.00';
  let result;
  if (n >= 1) { ++count; }
  while (n / 10 >= 1) {
    n /= 10;
    ++count;
  }
  if (count > 3) {
    const str = num.toString().split('.');
    str[0] = str[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    const s = str.join('.');
    result = `${sy}${s}${zero}`;
  } else if (count <= 3) {
    result = `${sy}${num}${zero}`;
  }
  cy.log(result);
  return result;
};
//$123,00 ratequote setup
const rateUnitSetWithComma = ({ value: text }) => {
  const num = parseInt(text);
  let n = num; let count = 0;
  const sy = '$'; const zero = ',00';
  let result;
  if (n >= 1) { ++count; }
  while (n / 10 >= 1) {
    n /= 10;
    ++count;
  }
  if (count > 3) {
    const str = num.toString().split('.');
    str[0] = str[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    const s = str.join('.');
    result = `${sy}${s}${zero}`;
  } else if (count <= 3) {
    result = `${sy}${num}${zero}`;
  }
  return result;
};
//$1,000,000 cost setup
const costSet = ({ value: text }) => {
  const num = text;
  let n = num; let count = 0;
  const sy = '$';
  let result;
  if (n >= 1) { ++count; }
  while (n / 10 >= 1) {
    n /= 10;
    ++count;
  }
  if (count > 3) {
    const str = num.toString().split('.');
    str[0] = str[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    const s = str.join('.');
    result = `${sy}${s}`;
  } else if (count <= 3) {
    result = `${sy}${num}`;
  }
  return result;
};
//string to int conversion
const stringToInt = ({ value: text }) => {
  return parseInt(text);
};
const validateText = ({ locator: locatorField, verifyText: text }) => {
  cy.get(locatorField).should('have.value', text);
};
//Identify Grid Row Count
const gridRowCount = ({ locator: locatorField }) => {
  let rowCount = 0;
  cy.get(locatorField).then(elements => {
    rowCount = elements.length;
    cy.log('Grid Row Count is = ' + rowCount);
    Cypress.env('rowCount', rowCount);
  });
  return Cypress.env('rowCount');
};
const clearTypeWait = ({ element: locator, typeText: text }) => {
  cy.get(locator)
    .wait(shortWait)
    .clear()
    .wait(shortWait)
    .type(text)
    .wait(shortWait);
};
const verifyToNotDisabled = ({ element: locator }) => {
  cy.get(locator).should('not.be.disabled');
};
const ifBtnEnabledClick = ({ locator: buttonField }) => {
  cy.get(buttonField).then((button) => {
    if (cy.get(button).should('not.be.disabled')) {
      clickAction({ locator: buttonField });
    } else {
      cy.log('Button is not enabled');
    }
  });
};
const getExpDateAndValidate = ({ locator: element, dayCount: dayCnt, monthCount: montCnt }) => {
  const todayDate = returntodayDateMMDDYY();
  const expireFutureDt = returnfutureDateMMDDYY({ dayCount: dayCnt, monthCount: montCnt });
  cy.get(element).invoke('attr', 'value')
    .then((getDate) => {
      const fieldDate = getDate;
      switch (true) {
        case fieldDate < todayDate:
          cy.log(fieldDate + ' <todayDate');
          clearTypeEnter({ element, typeText: expireFutureDt });
          verifyfutureDateMMDDYY({ dateLocator: element, dayCount: dayCnt, monthCount: montCnt, attribute: 'value' });
          clickAction({ locator: saveCertificationBtn });
          toastAlert();
          ifBtnEnabledClick({ locator: addCarrierBtn });
          toastAlert();
          break;
        case fieldDate === todayDate:
          cy.log(fieldDate + ' ===todayDate');
          clearTypeEnter({ element, typeText: expireFutureDt });
          verifyfutureDateMMDDYY({ dateLocator: element, dayCount: dayCnt, monthCount: montCnt, attribute: 'value' });
          clickAction({ locator: saveCertificationBtn });
          toastAlert();
          ifBtnEnabledClick({ locator: addCarrierBtn });
          toastAlert();
          break;
        case fieldDate > todayDate:
          cy.log(fieldDate + ' >todayDate');
          clickAction({ locator: "[data-testid='dialog-close']" });
          break;
        default:
          clickAction({ locator: "[data-testid='dialog-close']" });
          break;
      }
    },
    );
};
const dropDownContainsTextClick = ({ element: locator, typeText: value, exactText: ddValue }) => {
  cy.get(locator).parent()
    .type(value)
    .wait(longWait)
    .get('li')
    .each((el) => {
      const ddval = el.text();
      if (ddval.includes(ddValue)) {
        cy.log(ddval);
        cy.wrap(el).click({ force: true });
      }
    });
};

const dropDownIncludesTextClick = ({ element: locator, typeText: value, containText: ddValue }) => {
  cy.get(locator).parent()
    .type(value)
    .wait(shortWait)
    .get('li')
    .each((el) => {
      const ddval = el.text();
      if (ddval.includes(ddValue)) {
        cy.log(ddval);
        cy.wrap(el).click({ force: true });
      }
    });
};

export const typeAndSelectValue = ({ element: locator, typeText: value, exactText: ddValue }) => {
  clickActionWait({ locator });
  cy.get(`${locator} input`).type(value);
  clickAction({ locator: `${locator} ul>[title='${ddValue}']` });
};

const getText = ({ locator: locatorField }) => {
  let inputValue;
  cy.get(locatorField).first().then((input) => {
    inputValue = input.text();
    cy.log(inputValue);
    Cypress.env('inputValue', inputValue);
  });
  cy.log(Cypress.env('inputValue'));
  return Cypress.env('inputValue');
};

export const getTextFromAttrValue = ({ locator: locatorField, attr: valueAttr }) => {
  let textValue;
  cy.get(locatorField).invoke('attr', valueAttr).then(text => {
    textValue = text;
    Cypress.env('textValue', textValue);
    return Cypress.env('textValue');
  });
};

const getAllText = ({ locator: locatorField }) => {
  const value = [];
  cy.get(locatorField)
    .then((element) => {
      cy.wrap(element).each((subElement) => {
        value.push(subElement.text());
      });
    });
  cy.log(Cypress.env('value'));
  return Cypress.env('value');
};

const getLastText = ({ locator: locatorField }) => {
  let inputValue;
  cy.get(locatorField).last().then((input) => {
    inputValue = input.text();
    cy.log(inputValue);
    Cypress.env('inputValue', inputValue);
  });
  cy.log(Cypress.env('inputValue'));
  return Cypress.env('inputValue');
};
//Tab Tittle validation
const validateTabTitleTxt = ({ verifyText: text }) => {
  cy.title().should('include', keycloakTitle);
};
const rowDataVerify = ({ colHeader: columnHeader, rowData: rowDataValue }) => {
  //colheader is a button- rowDataValue is an div or anchor element as child element.Two of the elements will have common parent element
  //if data is not obtained correctly please increase wait in the test script
  const expDef = [];
  const actDef = [];
  cy.get(rowDataValue)
    .then((element) => {
      cy.wrap(element).each((subElement) => {
        if (subElement.text() === '') {
          //expDef.push(' ');
        } else {
          expDef.push(subElement.text());
        }
      });
    })
    .then(() => {
      //default  sort heck code block
      cy.get(columnHeader).wait(shortWait);
      cy.get(rowDataValue)
        .then((element) => {
          cy.wrap(element).each((subElement) => {
            if (subElement.text() === '') {
              //actDef.push(' ');
            } else {
              actDef.push(subElement.text());
            }
          });
        })
        .then(() => {
          for (let x = 0; x < expDef.length; x++) {
            expect(actDef[x]).to.equal(expDef[x]);
          }
        });
    });
};
const verifyFocusedValue = ({ locator: locatorField, verifyText: text }) => {
  cy.get(locatorField).focused().should('include.text', text);
};
const pageNavWithUrl = ({ url: visitUrl }) => {
  cy.visit(visitUrl);
  verifyToExist({ element: masteryLogo }, { timeout: Cypress.env('defaultCommandTimeout') });
  verifyToExist({ element: dashBoardButton }, { timeout: Cypress.env('defaultCommandTimeout') });
};
const verifyToDisabled = ({ element: locator }) => {
  cy.get(locator).should('be.disabled');
};
const validateNullVal = ({ locator: locatorField }) => {
  cy.get(locatorField).should('contain', '');
};
const getAttrWithValidation = ({ locator: locatorField, attr: attrName, element: elementField }) => {
  cy.get(locatorField).first().then((input) => {
    const inputValue = input.attr(attrName);
    cy.log(inputValue);
    cy.get(elementField).should('contain', inputValue);
  });
};
const getAttrTxtWithValidation = ({ locator: locatorField, element: elementField }) => {
  cy.get(locatorField).first().then((input) => {
    const inputValue = input.text();
    cy.log(inputValue);
    cy.get(elementField).first().should('contain', inputValue);
  });
};
const dragAndDropObjects = ({ draggedElement: desiredElement, stationaryElement: fixedElement, refElement: referenceEl }) => {
  cy.dragAndDrop(desiredElement, fixedElement, referenceEl);
  cy.wait(shortWait);
};
const checkBoxChkStatus = ({ locator: chkBoxLocator }) => {
  cy.get(chkBoxLocator).each((el) => { cy.wrap(el).should('have.value', 'true'); });
};
const verifyFoucsedElementTxt = ({ locator: locatorField, verifyTxt: text }) => {
  cy.get(locatorField).focused().should('have.value', text);
};
const timeout = ({ locator: locatorField, timeoutSec: waitTime }) => {
  cy.get(locatorField, { timeout: waitTime });
};
const clickPreviousElement = ({ locator: locatorField }) => {
  cy.get(locatorField).prev().click();
};
const verifyTableArray = ({ locator: locatorField, data: dataText }) => {
  cy.get(locatorField)
    .then((element) => {
      cy.wrap(element).each((subElement) => {
        if (subElement.innertext === dataText) {
          cy.log('route number is matching ');
        } else {
          cy.log('route number is not matching ');
        }
      });
    });
};
const verifyTextDisplay = ({ locator: locatorField, verifyTxt: text }) => {
  cy.get(locatorField).siblings().contains(text).should('exist');
};
const verifyElementsWithText = ({ locator: locatorField }) => {
  let count = 0;
  cy.get(locatorField).each((el) => {
    const value = el.text();
    if (value !== null && value !== '') {
      cy.log(count + '' + value);
      cy.get(locatorField).should('contain', value);
    } else {
      cy.log(count + 'Null value');
      cy.get(locatorField).should('not.have.value');
    }
    count = count + 1;
  });
};
const getLastTxtWithValidation = ({ locator: locatorField, element: elementField }) => {
  cy.get(locatorField).last().then((input) => {
    const inputValue = input.text();
    cy.log(inputValue);
    cy.get(elementField).last().should('contain', inputValue);
  });
};
const verifyTxtNotToExist = ({ locator: locatorField, verifyTxt: text }) => {
  cy.get(locatorField).should('not.contain', text);
};
const verifyValue = ({ locator: locatorField, value: inputValue }) => {
  cy.get(locatorField).should('contain', inputValue);
};
const clickTxtContains = ({ locator: locatorField, containsText: text }) => {
  cy.get(locatorField).contains(text).click().wait(longWait);
};
const verifyLastElementTxt = ({
  locator: locatorField,
  verifyText: text,
}) => {
  cy.get(locatorField).last().should('include.text', text);
};
const verifyLastElementNotTxt = ({
  locator: locatorField,
  verifyText: noText,
}) => {
  cy.get(locatorField).last().should('not.have.value', noText);
};
const checkBoxWithValidation = ({ locator: locatorField }) => {
  cy.get(locatorField).first().then((input) => {
    const inputValue = input.attr('value');
    cy.log(inputValue);
    if (inputValue === 'false') {
      cy.get(locatorField).click({ force: true });
    } else if (inputValue === 'true') {
      cy.get(locatorField).click({ force: true });
    }
  });
};
const verifySiblingsWithTxt = ({ locator: locatorField, siblingLocator: sibLoc }) => {
  cy.get(locatorField).siblings(sibLoc).invoke('text').then((text) => {
    const inputValue = text;
    if (inputValue !== null && inputValue !== '') {
      cy.log(locatorField + ' has value :' + inputValue);
      cy.get(locatorField).siblings(sibLoc).should('contain', inputValue);
    } else {
      cy.log(locatorField + ' has null/empty value');
      cy.get(locatorField).siblings(sibLoc).should('not.have.value');
    }
  });
};
const siblingsPrevClick = ({ locator: locatorField, siblingLocator: sibLoc }) => {
  cy.get(locatorField).siblings(sibLoc).prev().click();
};
const verifyFirstTextColour = ({ locator: locatorField, colourValue: colour }) => {
  cy.get(locatorField).first().should('have.css', '-webkit-text-fill-color', colour);
};
const verifyLastTextColour = ({ locator: locatorField, colourValue: colour }) => {
  cy.get(locatorField).last().should('have.css', '-webkit-text-fill-color', colour);
};
const verifyRowcontainsTxt = ({ locator: locatorField, containsText: value }) => {
  cy.get(locatorField)
    .invoke('text')
    .then((text) => {
      expect(text).to.contain(value);
    });
};
const verifyAndClick = ({ locator: locatorBtn }) => {
  cy.get(locatorBtn, { timeout: maxWait }).should('exist');
  cy.get(locatorBtn, { timeout: maxWait }).click();
};
const datePickerStart = ({
  dateLocator: dateField,
  dayCount: dayCountNumber,
  monthCount: monthCountNumber,
}) => {
  //to pick up the future start date
  const currentdata = new Date();
  currentdata.setDate(currentdata.getDate() + parseInt(dayCountNumber));
  const dd = String(currentdata.getDate());
  const mm = String(currentdata.getMonth() + parseInt(monthCountNumber));
  const yyyy = String(currentdata.getFullYear());
  cy.log(mm + '/' + dd + '/' + yyyy);
  const startDate = String(mm + '/' + dd + '/' + yyyy);
  cy.get(dateField).first().type(startDate).type('{enter}');
  return startDate;
};
const datePickerEnd = ({
  dateLocator: dateField,
  dayCount: dayCountNumber,
  monthCount: monthCountNumber,
}) => {
  //to pick up the future date
  const currentdata = new Date();
  currentdata.setDate(currentdata.getDate() + parseInt(dayCountNumber));
  const dd = String(currentdata.getDate());
  const mm = String(currentdata.getMonth() + parseInt(monthCountNumber));
  const yyyy = String(currentdata.getFullYear());
  cy.log(mm + '/' + dd + '/' + yyyy);
  const endDate = String(mm + '/' + dd + '/' + yyyy);
  cy.get(dateField).last().type(endDate).type('{enter}');
  return endDate;
};
const textClearFirstInput = ({ locator: locatorField }) => {
  cy.get(locatorField).first().clear();
};
const textClearLastInput = ({ locator: locatorField }) => {
  cy.get(locatorField).last().clear();
};
const verifyMutipleElementsIncludesText = ({
  locator: locatorField,
  verifyText: text,
}) => {
  cy.get(locatorField).each((el) => {
    cy.wrap(el).should('include.text', text);
  });
};
const clearTypeEnterText = ({ element: locator, dataText: textData }) => {
  cy.get(locator)
    .clear()
    .type(textData)
    .wait(longWait)
    .type('{enter}');
  cy.wait(shortWait);
};
const assertColumnHeaderWithinParent = ({ parentElemt: parent, childOne: locatorOne, childOnetxt: text, childTwo: locatorTwo }) => {
  cy.get(parent)
    .within(() => {
      cy.get(locatorOne).should('contain.text', text);
      cy.get(locatorTwo).should('exist');
    });
};
const verifyChildContainsTxt = ({ locator: parentElement, findElementType: childelement, containsTxt: txt, assertTxt: value }) => {
  cy.get(parentElement)
    .children().find(childelement)
    .contains(txt)
    .should('contain', value);
};
const previousTabMultipleTimes = (count) => {
  cy.go(count);
};
const previousPageMultipleTimes = (count) => {
  cy.go(count);
};
const clickDynamicValue = ({ button: dynamicValue }) => {
  cy.get(`span:contains('${dynamicValue}')`, { timeout: moreWait }).first().click();
};
const verifyMutipleElementsWithPosition = ({
  locator: locatorField,
  verifyText: text,
  position: indexNumber,
}) => {
  cy.get(locatorField).eq(indexNumber).each((el) => {
    cy.wrap(el).should('contain.text', text);
  });
};
const toastStopEventsAlert = () => {
  cy.get("[role='alert']")
    .contains('Updated Stop Event')
    .parent()
    .find('button')
    .click({ force: true })
    .wait(shortWait);
};
const verifyDynamicValueExists = ({ button: dynamicValue }) => {
  cy.get(`span:contains('${dynamicValue}')`, { timeout: moreWait }).first().should('exist');
};
const clickAndVerifyAlignment = ({ locator: parentLoc, element: columnHeader }) => {
  cy.get(parentLoc).within(() => {
    cy.get(columnHeader).click({ force: true }).wait(shortWait)
      .next()
      .find(angleUpBtn).should('exist');
  });
};
const truckMatchArray = ({ locator: locatorField, data: dataText }) => {
  cy.get(locatorField)
    .then((element) => {
      cy.wrap(element).each((subElement) => {
        if (subElement.innertext === dataText) {
          cy.log('Truck route number is matching ');
        } else {
          cy.log('Truck route number is not matching ');
        }
      });
    });
};
const verifyAttrValue = ({ locator: loc, verifyText: vText }) => {
  cy.get(loc)
    .invoke('attr', 'value')
    .should('eq', vText);
};
const clickKebabButtonWithMulName = ({
  locator: locatorField,
  text: textData,
  element: elValue,
}) => {
  cy.get(locatorField).contains(textData).parent().parent().find(elValue).click({ force: true });
};
const deleteDownloads = () => {
  cy.deleteDownloadsFolder();
};
const scrollIntoViewVerify = ({ locator: locatorField, containsText: text }) => {
  cy.get(locatorField).scrollIntoView().should('include.text', text);
};

const scrollIntoViewVerifyElement = ({ locator: locatorField }) => {
  cy.get(locatorField).each((el) => {
    scrollIntoView({ locator: el });
  });
  verifyVisible({ element: locatorField });
};

const verifyToNotBackGroundColour = ({ locator: locatorField, colourValue: colour }) => {
  cy.get(locatorField).should('not.have.css', 'background-color', colour);
};
const clickFirstEleWithoutForceClick = ({ locator: locatorField }) => {
  cy.get(locatorField).first().click().wait(shortWait);
};
const dropDownTxtExactClick = ({ element: locator, ddTxt: value }) => {
  cy.get(locator).parent()
    .type(value)
    .wait(shortWait)
    .get('li')
    .each((el) => {
      const ddval = el.text();
      if (ddval === value) {
        cy.log(ddval);
        cy.wrap(el).click({ force: true }).wait(shortWait);
      }
    });
};
const verifyCheckBoxesChecked = ({ locator: locatorField, formTitle: title }) => {
  for (let i = 0; i < title.length; i++) {
    cy.get(locatorField).each((element) => {
      if (element.find(labelTitle).text() === title[i]) {
        element.find(locatorField);
        const verifyCheckBox = expect(
          element.find(inputCheckBox).is(checkedTrue),
        ).to.be.true;
        cy.log(verifyCheckBox);
      }
    });
  }
};
const verifyCheckBoxesUnChecked = ({ locator: locatorField, formTitle: title }) => {
  for (let i = 0; i < title.length; i++) {
    cy.get(locatorField).each((element) => {
      if (element.find(labelTitle).text() === title[i]) {
        element.find(locatorField);
        const verifyCheckBox = expect(
          element.find(inputCheckBox).is(checkedTrue),
        ).to.be.false;
        cy.log(verifyCheckBox);
      }
    });
  }
};
const typeWaitEnterText = ({ element: locator, typeText: text }) => {
  cy.get(locator).parent().type(text).wait(longWait).type('{enter}').wait(minWait);
};
const typeTextInLastElement = ({ locator: locatorBtn, dataText: txtData }) => {
  cy.get(locatorBtn)
    .last()
    .clear()
    .wait(shortWait)
    .type(txtData)
    .wait(longWait);
};
const verifyRowContains = ({
  locator: locatorBtn,
  verifyText: verifyTextVal,
}) => {
  cy.get(locatorBtn).parent().should('include.text', verifyTextVal);
};
const clickAndVerifyGridAlignment = ({ locator: parentLoc, element: columnHeader }) => {
  cy.get(parentLoc).within(() => {
    //ascending Sort Carrot are within their laid out grid
    cy.get(columnHeader).click({ force: true }).wait(shortWait)
      .next()
      .find(angleUpBtn).should('exist');
    waitSometime(shortWait);
    //desending Sort Carrot are within their laid out grid
    cy.get(columnHeader).click({ force: true }).wait(shortWait)
      .next()
      .find(angleDownBtn).should('exist');
    waitSometime(shortWait);
    //default Sort Carrot are within their laid out grid
    cy.get(columnHeader).click({ force: true }).wait(shortWait);
  });
};
const clickAllDropDownCheckBox = ({ element: locator }) => {
  cy.get(locator)
    .find(button)
    .click({ force: true })
    .get('li')
    .each((el) => {
      cy.wrap(el).click({ force: true });
    });
};
const generateRandomNumber = () => {
  const randomNum = () => Cypress._.random(0, 1e6);
  const uniqueNum = randomNum();
  return uniqueNum;
};
const verifyDateListInDescendingOrder = ({ locator: elemToGetList }) => {
  let returnVal = 'false';
  return cy.get(elemToGetList).then((listItems) => {
    const listItemArray = listItems.map((index, item) => item.innerText).toArray();
    const dateComparison = (a, b) => {
      const date1 = new Date(a);
      const date2 = new Date(b);
      return date2 - date1;
    };
    if (JSON.stringify(listItemArray) === JSON.stringify(listItemArray.sort(dateComparison))) {
      returnVal = 'true';
      cy.log('Date values are in descending order');
    }
  }).then(() => {
    expect(returnVal).to.be.eq('true');
  });
};
const verifyDateListInAscendingOrder = ({ locator: elemToGetList }) => {
  let returnVal = 'false';
  return cy.get(elemToGetList).then((listItems) => {
    const listItemArray = listItems.map((index, item) => item.innerText).toArray();
    const dateComparison = (a, b) => {
      const date1 = new Date(a);
      const date2 = new Date(b);
      return date1 - date2;
    };
    if (JSON.stringify(listItemArray) === JSON.stringify(listItemArray.sort(dateComparison))) {
      returnVal = 'true';
      cy.log('Date values are in ascending order');
    }
  }).then(() => {
    expect(returnVal).to.be.eq('true');
  });
};

const verifyColumnDataInDescendingOrder = ({ locator: elemToGetList }) => {
  let returnVal = 'false';
  const beforeSort = [];

  return cy.get(elemToGetList).each(($ele) => {
    beforeSort.push($ele.text().trim());
  }).then(() => {
    const afterSort = beforeSort.sort((a, b) => b - a);
    if (beforeSort === afterSort) {
      returnVal = 'true';
      cy.log('column data values are in ascending order');
    }
    expect(returnVal).to.be.eq('true');
  });
};

const verifyAlignment = ({ locator: parentLoc, element: columnHeader }) => {
  cy.get(parentLoc).within(() => {
    cy.get(columnHeader).wait(shortWait)
      .next()
      .find(angleUpBtn).should('exist');
  });
};
const verifyNotContainValue = ({ element: locator, Value: notContainValue }) => {
  cy.get(locator).should('not.have.value', notContainValue);
};

const verifyPartialValue = ({ locator: element, value: parVal }) => {
  cy.get(element).should('contain.value', parVal);
};

export const verifyVisibleElemPartialText = ({ locator: element, value: parVal }) => {
  cy.get(element).filter(':visible').first().should('contain.text', parVal);
};

const verifyTextOrBackGroundColor = ({ locator: locatorField, color: cssAttr, colorCode: rgbVal }) => {
  cy.get(locatorField).should('have.css', cssAttr, rgbVal);
};

const containsText = ({ locator: locatorField, verifyText: text }) => {
  cy.get(locatorField).contains(text).should('include.text', text);
};

const isAttributePresent = ({ locator: locatorField, boolean: attrPresentStatus, attributeName }) => {
  if (attrPresentStatus === true) {
    cy.get(locatorField).should('have.attr', attributeName);
  } else if (attrPresentStatus === false) {
    cy.get(locatorField).should('not.have.attr', attributeName);
  }
};
const verifyTagName = ({ locator: locatorField, tagName: tName }) => {
  cy.get(locatorField).should('have.prop', 'tagName').should('eq', tName);
};

const clickLinkToOpenPageOnSameTab = ({ locator: linkElement }) => {
  cy.get(linkElement).eq(0).invoke('attr', 'href').then(hrefVal => {
    cy.window().then(win => {
      return win.open(Cypress.env('appUrl')[Cypress.env('environment')] + hrefVal.substring(1), '_self');
    });
  });
};

const verifyMaxLength = ({ locator: locatorField, maxLength: expectedLength }) => {
  const maxText = generateRandomAlphaNumByLength({ lengthOfString: (expectedLength + 1) });
  cy.get(locatorField).type(maxText).invoke('val').should('have.length', expectedLength);
};

const verifyMaxExactLength = ({ locator: locatorField, maxLength: expectedLength }) => {
  const maxText = generateRandomAlphaNumByLength({ lengthOfString: (expectedLength) });
  cy.get(locatorField).type(maxText, { force: true }).invoke('val').should('have.length', expectedLength);
};

export const verifyLengthOfText = ({ locator: locatorField, maxLength: expectedLength }) => {
  cy.get(locatorField)
    .invoke('text')
    .then(text => {
      expect(text.length).to.equal(expectedLength);
    });
};
export const verifyNotEqLengthOfText = ({ locator: locatorField, maxLength: expectedLength }) => {
  cy.get(locatorField)
    .invoke('text')
    .then(text => {
      expect(text.length).to.not.equal(expectedLength);
    });
};
const verifyTableColumnsHeaders = ({ locator: locatorField, columnNames: tblHeaderArray }) => {
  tblHeaderArray.forEach((columnHeader, index) => {
    cy.get(locatorField).eq(index).should('have.text', columnHeader);
  });
};

const verifyTableColumnsHeadersToolTip = ({ locator: locatorField, columnNames: tblHeaderArray }) => {
  tblHeaderArray.forEach((columnHeader, index) => {
    cy.get(locatorField).eq(index).invoke('attr', 'title').should('contain', `Sort by ${columnHeader}`);
  });
};

const verifyDrpDwnValuesText = ({ parentElement: eleLocator, findElement1: childelement1, findElement2: childelement2, textval: tblStatusArray }) => {
  tblStatusArray.forEach((oppStatus, index) => {
    cy.get(eleLocator).find(childelement1).click({ force: true });
    cy.get(eleLocator).find(childelement2).eq(index).should('have.text', oppStatus);
  });
};

const sortArrayAsc = ({ unSortedArray: array }) => {
  array.sort(function (a, b) {
    const x = a.toLowerCase();
    const y = b.toLowerCase();
    if (x < y) { return -1; }
    if (x > y) { return 1; }
    return 0;
  });
  return array;
};

const clickCancelOnWindowAlertConfirm = () => {
  cy.on('window:confirm', () => false);
};

const clickOkOnWindowAlertConfirm = () => {
  cy.on('window:confirm', () => true);
};

const typeDropDwnContainsClick = ({ locator: locatorField, drpDwnVal: value }) => {
  cy.get(locatorField)
    .click()
    .find('input')
    .eq(0)
    .type(value)
    .wait(shortWait)
    .parents()
    .find(ol)
    .find(li)
    .contains(value)
    .click({ force: true });
};
const verifyConfirmAlertMessage = ({ msgToVerify: message }) => {
  cy.on('window:confirm', (str) => {
    expect(str).to.contains(message);
  });
};

const verifyLastRowContainsColumnTxt = ({ locator: tableRows, locatorColumn: colHeader, containsText: value }) => {
  if (colHeader === 'Primary') {
    cy.get(tableRows + " [data-cellheader='" + colHeader + "'] span").last().should('contain.text', value);
  } else {
    cy.get(tableRows + " [data-cellheader='" + colHeader + "']").last().should('contain.text', value);
  }
};
//this method should work if your drop down list in tag <ol>
const typeDrpDwn = ({ locator: locatorField, drpDwnVal: value }) => {
  cy.get(locatorField)
    .click()
    .find('input')
    .type(value)
    .wait(shortWait)
    .parents()
    .find(ol)
    .find(li)
    .contains(value)
    .click({ force: true });
};

const getMinionValue = async (data, value) => {
  const accToken = await getAccessToken();
  const getDataDictionaryRes = await getDataDictionaryFromMinion({ bearerToken: accToken });
  const dataDictionaryArr = getDataDictionaryRes?.data?.tenantConfiguration?.types;
  const matchingObject = dataDictionaryArr.find(item => item.name === data);
  //If a matching object was found, extract the names of the options where active is true
  const result = matchingObject
    ? matchingObject.options
      .filter(option => option.active)
      .map(option => option.name)
    : [];
  //Check if the result array includes the value and return the value if it does
  if (result.includes(value)) {
    return value;
  }
  //Otherwise, pick a random index from the result array using Math.random and Math.floor
  const randomIndex = Math.floor(Math.random() * result.length);
  //Return the element at the random index
  return result[randomIndex];
};

const getMinionValues = async (minionDDTName, reqValCount) => {
  const accToken = await getAccessToken();
  const getDataDictionaryRes = await getDataDictionaryFromMinion({ bearerToken: accToken });
  const dataDictionaryArr = getDataDictionaryRes?.data?.tenantConfiguration?.types;
  const matchingObject = dataDictionaryArr.find(item => item.name === minionDDTName);
  //If a matching object was found, extract the names of the options where active is true
  const result = matchingObject
    ? matchingObject.options
      .filter(option => option.active)
      .map(option => option.name)
    : [];
  //picking random values based on required count from available options
  const expectedArray = [];
  if (reqValCount > result.length) {
    throw new RangeError('Warning: You are trying to fetch more elements than available - expected values :' + reqValCount + ' actual available values :' + result.length);
  } else {
    for (let i = 0; i < reqValCount; i++) {
      const randomIndex = Math.floor(Math.random() * result.length);
      expectedArray.push(result[randomIndex]);
      result.splice(randomIndex, 1);
    }
  }
  return expectedArray;
};
const getMinionValuesList = async (minionDDTName) => {
  const accToken = await getAccessToken();
  const getDataDictionaryRes = await getDataDictionaryFromMinion({ bearerToken: accToken });
  const dataDictionaryArr = getDataDictionaryRes?.data?.tenantConfiguration?.types;
  const matchingObject = dataDictionaryArr.find(item => item.name === minionDDTName);
  //If a matching object was found, extract the names of the options where active is true
  const result = matchingObject
    ? matchingObject.options
      .filter(option => option.active)
      .map(option => option.name)
    : [];
  return result;
};

const verifyClosePopup = () => {
  verifyVisible({ element: dialogPopup });
  clickVisibleElement({ locator: dialogPopup });
};

const getTDMData = ({ dataType: data, dataCondition: dataReq, dataScenario: scenario }) => {
  getTestData({ dataType: data, dataCondition: dataReq, dataScenario: scenario }).then((runtimeData) => {
    if (runtimeData.error) {
      const errorMsg = JSON.stringify(runtimeData.error);
      throw new Error(tdmErrorDescription + `${JSON.stringify(errorMsg)}`);
    }
    cy.log('***' + JSON.stringify(runtimeData) + '***');
    Cypress.env('inputVal', runtimeData);
  });
};

const generateRandomAlphaNumByLength = ({ lengthOfString: length }) => {
  return Array.from(Array(length), () => Math.floor(Math.random() * 36).toString(36)).join('').toUpperCase();
};

const getDateWithTargetDay = ({ targetDate: dayCount }) => { //Here dayCount=0 means today
  const today = new Date();
  today.setDate(today.getDate());
  const dateObj = {
    d: String(today.getDate() + dayCount),
    dd: String(today.getDate() + dayCount).padStart(2, '0'),
    m: String(today.getMonth() + 1),
    mm: String(today.getMonth() + 1).padStart(2, '0'),
    yyyy: today.getFullYear(),
    yy: String(today.getFullYear()).slice(2, 4),
    hr: String(today.getHours()),
    mins: String(today.getMinutes()),
    sec: String(today.getSeconds()),
  };
  return dateObj;
};
//weekNumber should be between 0-6
export const getNextWeekFirstDay = () => {
  const date = new Date();
  const day = date.getDay();
  const weekDate = new Date(date.getTime() + (7 - day) * 24 * 60 * 60 * 1000);
  const dateObj = {
    d: String(weekDate.getDate()),
    dd: String(weekDate.getDate()).padStart(2, '0'),
    m: String(weekDate.getMonth() + 1),
    mm: String(weekDate.getMonth() + 1).padStart(2, '0'),
    yyyy: weekDate.getFullYear(),
    yy: String(weekDate.getFullYear()).slice(2, 4),
  };
  return dateObj;
};

const generateRandomNumberByLength = ({ lengthOfNum: length }) => {
  return Array.from(Array(length), () => Math.random() * 10 | 1 || 1).join('');
};

//if matching elements more than single value
const typeDrpDwnWithMachtingText = ({ locator: locatorField, drpDwnVal: value }) => {
  cy.get(locatorField)
    .click()
    .find('input')
    .type(value)
    .wait(shortWait)
    .parents()
    .find(ul)
    .find(li)
    .each(($el) => {
      const ddval = $el.text();
      if (ddval === value) {
        //eslint-disable-next-line cypress/no-unnecessary-waiting
        cy.wrap($el).click({ force: true }).wait(2000);
      }
    });
};

const attachFile = ({ locator: locatorField, filePath: pathOfFile }) => {
  cy.get(locatorField).attachFile(pathOfFile, { force: true });
};

const readFileAndreplaceFileValue = ({ readFilePath: filePath, searchValue: valueToreplace, newValue: valueWithReplace }) => {
  let replacedValue;
  cy.readFile(filePath).then(data => {
    replacedValue = data.replaceAll(valueToreplace, valueWithReplace);
    Cypress.env('updatedValue', replacedValue);
  });
};
const writeTextIntoFile = ({ writeFilePath: filePath, textToWrite: textValue }) => {
  cy.writeFile(filePath, textValue);
};

const navigateToChildWindow = () => {
  cy.window().then(win => {
    cy.stub(win, 'open', url => {
      win.location.href = url;
    }).as('popup');
  },
  );
};

const toastMsgError = () => {
  cy.get("div[class^='Toastify__toast Toastify__toast--error']")
    .should('be.visible')
    .contains('already exists')
    .parent()
    .find('button')
    .click({ force: true });
};

const toastMsgErrorWithDate = () => {
  cy.get("div[class^='Toastify__toast Toastify__toast--error']")
    .should('be.visible')
    .contains('Given week is exists')
    .parent()
    .find('button')
    .click({ force: true });
};

const getTomorrowsDate = () => {
  let date = new Date();
  date.setDate(date.getDate() + 1);
  date = date.toISOString().split('T');
  const tomorrowDate = date[0].split('-');
  return tomorrowDate[2];
};

const returnNextDate = () => {
  let date = new Date();
  date.setDate(date.getDate() + 1);
  date = date.toISOString().split('T');
  const tmrDate = date[0].split('-');
  return tmrDate;
};

const typeTextFirstElementIn = ({ locator: locatorBtn, dataText: txtData }) => { cy.get(locatorBtn).first().type(txtData, { force: true }); };

const typeTextLastElementIn = ({ locator: locatorBtn, dataText: txtData }) => {
  cy.get(locatorBtn).last().type(txtData, { force: true });
};

const dropDownContainsValueCheckBoxSelection = ({
  element: locatorField,
  ddValue: value,
}) => {
  cy.get(locatorField)
    .find(button)
    .click({ force: true })
    .parent()
    .find(drpDwnSearchBox)
    .find(input)
    .type(value, { force: true })
    .wait(shortWait)
    .get(li)
    .each((el) => {
      const ddval = el.text();
      if (ddval.includes(value)) {
        cy.log(ddval);
        cy.wrap(el).click({ force: true });
      }
    });
};
const selectOneRecordInWebTable = ({ locator: locatorTable, dataText: expRecord }) => {
  cy.get(locatorTable).each((ele, index) => {
    const record = ele.text();
    if (record.includes(expRecord)) {
      cy.get(locatorTable).eq(index).click();
    }
  });
};

const dropDownExactValueCheckBoxSelection = ({
  element: locatorField,
  ddValue: value,
}) => {
  cy.get(locatorField)
    .find(button)
    .click({ force: true })
    .parent()
    .find(drpDwnSearchBox)
    .find(input)
    .type(value, { force: true })
    .wait(shortWait)
    .get(li)
    .each((el) => {
      const ddval = el.text();
      if (ddval === (value)) {
        cy.log(ddval);
        cy.wrap(el).click({ force: true });
      }
    });
};

const verifyLengthOfVal = ({ locator: locatorField, expectedVal: lengthOfVal }) => {
  cy.get(locatorField).invoke('val').should('have.length', lengthOfVal);
};

const verifyReadOnly = ({ locator: locatorField, condition: boolValue }) => {
  cy.get(locatorField).invoke('attr', 'data-readonly').should('contain', boolValue);
};

const verifyContains = ({ locator: locatorField, containsText: text }) => {
  cy.get(locatorField).contains(text);
};

/**
* This fucntions is used to select any particular filter value from any table view
* User needs to pass the which filter type has to select and what value user needs to pass
* @param {*} filterType
* @param {*} filterValue
*/
const formatPhoneNumber = ({ phoneNumberStr: phoneNumberString }) => {
  cy.log('method inside phone ', phoneNumberString);
  const cleaned = ('' + phoneNumberString).replace(/\D/g, '');
  cy.log('cleaned', cleaned);
  const match = cleaned.match(/^(1|)?(\d{3})(\d{3})(\d{4})$/);
  cy.log('match is', match);
  if (match) {
    const intlCode = (match[1] ? '+1 ' : '');
    return [intlCode, '(', match[2], ') ', match[3], '-', match[4]].join('');
  }
  return null;
};

export const validateDropDownFunction = ({ drpDwnEle: drpDwnElement, drpDwnBtnEle: drpDwnBtnElement, drpDwnOptionEle: drpDwnOptionElement, drpDwnOptions: drpDwnOptionArray }) => {
  verifyTextContains({ locator: drpDwnElement, containsText: emptyData });
  clickAction({ locator: drpDwnElement });
  verifyTableColumnsHeaders({ locator: drpDwnOptionElement, columnNames: drpDwnOptionArray });
  clickAction({ locator: drpDwnElement });
  selectItemFromDropDown({ element: drpDwnBtnElement, ddValue: drpDwnOptionArray[1] });
  verifyTextContains({ locator: drpDwnElement, containsText: drpDwnOptionArray[1] });
};
//pass eg:userEmail = "you@gmail.com";
export const verifyEmailID = ({ emailID: userEmail }) => {
  const regex = /^[a-z0-9]+@[a-z]+\.[a-z]{2,3}$/;
  const result = regex.test(userEmail);
  expect(result).to.equal(true);
};

const verifyBorderColour = ({ locator: locatorField, colourValue: colour }) => {
  cy.get(locatorField).should('have.css', 'border-color', colour);
};

//validating drop down options
const validateDrpDwnAllOptions = ({ locator1: drpDwnField, locator2: drpDwnExpandBtn, optionsArray: expectedArray }) => {
  clickAction({ locator: drpDwnExpandBtn });
  waitSometime(shortWait);
  cy.get(drpDwnField).find('li').then(options => {
    const actual = [...options].map(o => o.title);
    expect(actual.sort()).to.deep.eq(expectedArray.sort());
  });
};

export const verifyDrpDwnAllValuesText = ({ drpDwnLocator: locator, drpDwnTextArray: textArray }) => {
  cy.get(locator).find('button').click({ force: true }).parent().find('li')
    .then($els => Cypress.$.map($els, (el) => el.innerText.trim())) //uses jQuery .map()
    .should(values => {
      values = sortArrayAsc({ unSortedArray: values });
      expect(values.sort()).to.deep.eq(textArray.sort());
    });
};
export const verifyDrpDwnAllValuesTextObjectiveChipFilter = ({ drpDwnLocator: locator, drpDwnTextArray: textArray }) => {
  cy.get(locator).parent().find('li')
    .then($els => Cypress.$.map($els, (el) => el.innerText.trim())) //uses jQuery .map()
    .should(values => {
      values = sortArrayAsc({ unSortedArray: values });
      console.log(values);
      expect(values).to.deep.eq(textArray);
    });
};

export const selectItemFrmSrchPicker = ({ locator: locatorField, typeText: value }) => {
  cy.get(locatorField)
    .click({ force: true })
    .type(value)
    .wait(longWait)
    .get('li')
    .contains(value).first()
    .click({ force: true })
    .wait(shortWait);
};

const verifyElementHaveValue = ({ locator: locatorField }) => {
  cy.get(locatorField).invoke('val').then(val => {
    expect(val.length).to.be.greaterThan(0);
  });
};

const verifyLblTextLength = ({ locator: locatorField, expectedVal: lengthOfVal }) => {
  cy.get(locatorField).invoke('text').should('have.length', lengthOfVal);
};

/*User needs to pass the which filter type has to select and what value user needs to pass
* @param {*} filterType
* @param {*} filterValue
*/
export const selectAnyFilterFromTable = (filterType, filterValue) => {
  scrollToCenter();
  cy.get(commonPage.tblColumnFilters).then(($filters) => {
    const totalFilters = $filters.length;
    for (let i = 0; i < totalFilters - 1; i++) {
      cy.get($filters[i]).invoke('attr', 'data-column-filter').then(($filter) => {
        cy.log('***Passing Filter Type***', $filter.toLowerCase(), filterType.replace(' ', '').toLowerCase());
        if ($filter.toLowerCase().startsWith(filterType.replace(' ', '').toLowerCase())) {
          cy.get('body').then(($body) => {
            if ($body.find($filters[i]).find('svg').length > 0) {
              cy.log('Openes filter drop down on selected Filter type');
              cy.get($filters[i]).find('svg').click({ force: true });
              //This code will type the filter value if the filter valu shows only after typing
              cy.get('body').then(($body) => {
                if ($body.find($filters[i]).find(commonPage.drpFilterDwnSearchBox).find('svg').length > 0) {
                  cy.get($filters[i]).find(commonPage.drpFilterDwnSearchBox).find('input').type(filterValue);
                }
              });
              //removed any selected filter from opened filter drop down
              cy.log('Removed any previously selected filter from opned filter drop down');
              cy.get(commonPage.tblColumnFilterCheckBoxes).each(($chkbox) => {
                cy.get($chkbox).invoke('css', 'background')
                  .then(($color) => {
                    if ($color.includes('rgb(15, 112, 231)')) {
                      cy.get($chkbox).click({ force: true });
                    }
                  });
              });
              //Selecting new filter option which user is passing as parameter
              cy.get(commonPage.tblColumnFilterValues)
                .contains(filterValue)
                .click({ force: true });
              clickLastElementIn({ locator: commonPage.tblHeaderPanel });
            } else {
              cy.get($filters[i]).find('input').clear().type(filterValue);
            }
          });
        }
      });
    }
  });
};
/**
 * This function is to remove any selected filter
 * User needs to pass the filter column data-test-tag starts with name (Eg:Entity Type)
 * @param {*} filterType
 */
export const removeSelectedFilter = (filterType) => {
  cy.get(commonPage.tblColumnFilters).then(($filters) => {
    const totalFilters = $filters.length - 1;
    for (let i = 0; i < totalFilters; i++) {
      cy.get($filters[i]).invoke('attr', 'data-column-filter').then(($filter) => {
        cy.log('***Passing Filter***', $filter.toLowerCase(), filterType.replace(' ', '').toLowerCase());
        if ($filter.toLowerCase().startsWith(filterType.replace(' ', '').toLowerCase())) {
          cy.get('body').then(($body) => {
            if ($body.find($filters[i]).find('svg').length > 0) {
              cy.log('This opens filter drop down selection');
              cy.get($filters[i]).find('svg').click({ force: true });
              cy.get($filters[i]).find(commonPage.tblColumnFilterCheckBoxes).filter(':visible').each(($chkbox) => {
                cy.get($chkbox).invoke('css', 'background')
                  .then(($color) => {
                    if ($color.includes('rgb(15, 112, 231)')) {
                      cy.get($chkbox).click({ force: true });
                      clickLastElementIn({ locator: commonPage.tblHeaderPanel });
                      waitSometime(shortWait);
                    }
                  });
              });
            } else {
              cy.get($filters[i]).find('input').clear();
            }
          });
        }
      });
    }
  });
};
/**
 * This function is to select Kabob context menu option from selected table
 * @param {*} kabobMenuOption
 */
export const selectKabobMenuOptionTable = ({ locator: tableLocator, menuName: kabobMenuOption }) => {
  waitSometime(shortWait);
  clickAction({ locator: tableLocator });
  cy.get(tableLocator).find(commonPage.tblRows).find(commonPage.btnKabobMenu).first().click({ force: true });
  cy.get(commonPage.lstContextMenuOptions).filter(':visible').then(($contextMenu) => {
    navigateToChildWindow();
    cy.get($contextMenu).contains(kabobMenuOption).click({ force: true });
    waitSometime(shortWait);
  });
};

//Enable or disable feature flag to update URL
export const updateUrlWithFF = ({ flag: featureFlagWithStatus }) => {
  cy.url().then(urlValue => {
    cy.visit(urlValue + featureFlagWithStatus);
  });
};
export const updateUrlForChildPopUpWithFF = ({ flag: featureFlagWithStatus }) => {
  cy.url().then(urlValue => {
    cy.visit(urlValue + featureFlagWithStatus, { failOnStatusCode: false });
  });
};

export const verifyPlaceHolderText = ({ locator: locatorField, containsText: placeHolderText }) => {
  verifyAttrValueContains({ locator: locatorField, attribute: attrPlaceHolder, verifyText: placeHolderText });
};

const navigateBackToPreviousPage = () => {
  cy.go(commonData.back);
};

export const verifySingleSelectDropDownFunction = ({ drpDwnEle: drpDwnElement, drpDwnOptions: drpDwnOptionArray }) => {
  verifyTextContains({ locator: `${drpDwnElement} ${button}`, containsText: emptyData });
  verifyDrpDwnAllValuesText({ drpDwnLocator: drpDwnElement, drpDwnTextArray: drpDwnOptionArray });
  clickAction({ locator: drpDwnElement });
  selectItemFromDropDown({ element: drpDwnElement, ddValue: drpDwnOptionArray[1] });
  verifyTextContains({ locator: drpDwnElement, containsText: drpDwnOptionArray[1] });
};

export const customizeUnhideColHeaders = ({
  locator: btnCustDefaultViewExpand,
  element: btnCustomizeOption,
  restEle: btnResetToDefault,
  customTableSave: btnCustTableSave,
  columnsToHideOrunHide: columnsArrayElem,
}) => {
  clickAction({ locator: btnCustDefaultViewExpand });
  clickVisibleElement({ locator: btnCustomizeOption });
  clickAction({ locator: btnResetToDefault });
  columnsArrayElem.forEach(value => {
    clickAction({ locator: `[data-testid='${value}-show-hide-icon']` });
  });
  clickAction({ locator: btnCustTableSave });
};

const verifyCSSAttributeValue = ({ locator: locatorField, attrValue: cssAttr, containsValue: value }) => {
  cy.get(locatorField).each(($el) => {
    cy.wrap($el).should('have.css', cssAttr, value);
  });
};
export const verifyLabelUsingMapArray = ({ map: arrayData }) => {
  arrayData.forEach((value, key) => {
    verifyLabel({ locator: key, verifyText: value });
  });
};

export const verifyLblHaveValue = ({ locator: locatorField }) => {
  cy.get(locatorField).invoke('text').then(val => {
    expect(val.length).to.be.greaterThan(0);
  });
};

//pass parent dropdown element eg: [data-testid="phoneLabelId"]
export const singleSelectDropDwnValidation = ({ dropdwnEle: dropdwnElement, array: dropdwnValueArray, selectDropdwnValue }) => {
  verifyTextContains({ locator: `${dropdwnElement} ${dropdwnExpand}`, containsText: emptyData });
  clickAction({ locator: `${dropdwnElement} ${dropdwnExpand}` });
  dropdwnValueArray = sortArrayAsc({ unSortedArray: dropdwnValueArray });
  verifyTableColumnsHeaders({ locator: `${dropdwnElement} ${li}`, columnNames: dropdwnValueArray });
  clickAction({ locator: `${dropdwnElement} ${dropdwnExpand}` });
  selectItemFromDropDown({ element: dropdwnElement, ddValue: selectDropdwnValue });
  verifyAttrValueContains({ locator: `${dropdwnElement} ${dropdwnExpand}`, attribute: attributeTitle, verifyText: selectDropdwnValue });
};

//pass parent dropdown element eg: [data-testid="phoneLabelId"]
export const multipleSelectCheckboxDropDwnValidation = ({ dropdwnEle: dropdwnElement, array: dropdwnValueArray, selectDropdwnValue1, selectDropdwnValue2 }) => {
  verifyTextContains({ locator: `${dropdwnElement} ${dropdwnExpand}`, containsText: emptyData });
  clickAction({ locator: `${dropdwnElement} ${dropdwnExpand}` });
  dropdwnValueArray = sortArrayAsc({ unSortedArray: dropdwnValueArray });
  verifyTableColumnsHeaders({ locator: `${dropdwnElement} ${li}`, columnNames: dropdwnValueArray });
  clickAction({ locator: `${dropdwnElement} ${dropdwnExpand}` });
  dropDownContainsTextClick({ element: `${dropdwnElement} ${dropdwnExpand}`, typeText: selectDropdwnValue1, exactText: selectDropdwnValue1 });
  dropDownContainsTextClick({ element: `${dropdwnElement} ${dropdwnExpand}`, typeText: selectDropdwnValue2, exactText: selectDropdwnValue2 });
  verifyTextContains({ locator: `${dropdwnElement} ${dropdwnExpand}`, containsText: `${selectDropdwnValue1}, ${selectDropdwnValue2}` });
};

export const validateDefaultDrpDwn = ({ element: labelEle, drpdwnlocator: dropdownEle, verifyText: textValue }) => {
  verifyElementTextContains({ locator: labelEle, verifyText: textValue });
  verifyTextContains({ locator: dropdownEle, containsText: emptyData });
};

export const verifyTextContainsUsingMap = ({ dataMapValues: textMapVal }) => {
  textMapVal.forEach((value, key) => {
    verifyTextContains({ locator: key, containsText: value });
  });
};

export const verifyDrpdwnExcludesValue = ({ element: locator, exactText: ddValue }) => {
  cy.get(locator).parent()
    .type(ddValue)
    .get('li')
    .each((el) => {
      const text = el.text();
      expect(text).not.equal(ddValue);
    });
};

export const triggerMouseHover = ({ element: locator }) => {
  cy.get(locator)
    .invoke('show')
    .trigger('mouseover')
    .wait(shortWait)
    .trigger('mouseleave');
};

export const typeDropDown = ({ locator: locatorField, drpDwnVal: value }) => {
  cy.get(locatorField)
    .type(value)
    .wait(longWait)
    .parent()
    .parent()
    .find(ul)
    .find(li)
    .contains(value)
    .click({ force: true });
};

export const loginWithEmailAndPassword = ({ emailText: email, passwordText: password }) => {
  cy.visit(appUrl);
  waitSometime(longWait);
  cy.get(login.showEmail).click();
  cy.get(login.usernameField).type(email);
  cy.get(login.passwordField).type(password);
  cy.get(login.loginButton).click();
  waitSometime(moreWait);
};

export const verifyRowContainsText = ({ locator: locatorBtn, index: number, verifyText: txtVerification }) => {
  cy.get(locatorBtn).eq(number).contains(txtVerification);
};

export const verifyMandatoryFields = (fields) => {
  for (const element of fields) {
    verifyElementText({ locator: element, verifyText: '*' });
  }
};

export const typeDropDwnContainsClickWithInputIndex = ({ locator: locatorField, drpDwnVal: value, inputIndex: index }) => {
  cy.get(locatorField)
    .click()
    .find('input')
    .eq(index)
    .type(value)
    .wait(shortWait)
    .parents()
    .find(ol)
    .find(li)
    .contains(value)
    .click({ force: true });
};

export const validateSpecNumField = ({ locator: element, drpDwn: drpLocator, drpBtn: drpBtnLoc, optArray: data }) => {
  typeText({ locator: element, dataText: '~Trailer' });
  verifyElementValue({ locator: element, verifyText: '' });
  typeText({ locator: element, dataText: 5 });
  verifyElementValue({ locator: element, verifyText: 5 });
  validateDrpDwnAllOptions({ locator1: drpLocator, locator2: drpBtnLoc, optionsArray: data });
};

export {
  assertColumnHeaderWithinParent,
  attachFile,
  backspaceClear,
  buttonThatOpensNewTab,
  checkBoxCheck,
  checkBoxCheckStatus,
  checkBoxChkStatus,
  checkboxDrpDwnWithSearch,
  checkBoxStatus,
  checkBoxUncheck,
  checkBoxUnchkStatus,
  checkBoxWithValidation,
  checkDefaultOrderAfterDragRearrangeReset,
  checkDefaultOrderAfterDragRearrangeResetWithSameColName,
  checkDragRearrangeOneCol,
  checkDragRearrangeOneColExactMatch,
  checkOneColDrag,
  checkOrderAfterDragRearrangeReset,
  clearAndPressEnter,
  clearAndTypeWithWait,
  clearText,
  clearTextType,
  clearTypeAndEnter,
  clearTypeEnter,
  clearTypeEnterText,
  clearTypeText,
  clearTypeWait,
  clickable,
  clickAction,
  clickActionWait,
  clickAllDropDownCheckBox,
  clickAndVerifyAlignment,
  clickAndVerifyGridAlignment,
  clickCancelOnWindowAlert,
  clickCancelOnWindowAlertConfirm,
  clickCloseXIcon,
  clickCloseXIconWithDialogTitle,
  clickContactsCustomizeBtn,
  clickDynamicValue,
  clickElementContainingText,
  clickElementThatContains,
  clickElementWithDynamicTitle,
  clickExpand,
  clickFirstElementIn,
  clickFirstEleWithoutForceClick,
  clickIconObject,
  clickKebabButtonWithMulName,
  clickKebabButtonWithName,
  clickLastElementIn,
  clickLinkToOpenPageOnSameTab,
  clickLocatorWithText,
  clickMenu,
  clickOkOnWindowAlert,
  clickOkOnWindowAlertConfirm,
  clickPreviousElement,
  clickTabBtn,
  clickThatContains,
  clickToOpenNewTabInSameWindow,
  clickToOpenNewTabInSameWindowWithDynamicText,
  clickTxtContains,
  clickTypeFirstElement,
  clickTypeLastElement,
  clickVisibleElement,
  clickWithWaits,
  concatThreeStrings,
  concatTwoStrings,
  containsElement,
  containsText,
  costSet,
  datePickerEnd,
  datePickerStart,
  delAlertTruckEntry,
  deleteDownloads,
  dragAndDrop,
  dragAndDropObjects,
  dragAndDropScrollIntoView,
  dropDownContainsTextClick,
  dropDownContainsValueCheckBoxSelection,
  dropDownExactCheckBoxSelection,
  dropDownExactClick,
  dropDownExactValueCheckBoxSelection,
  dropDownIncludesTextClick,
  dropDownTxtExactClick,
  drpDwnWithSearch,
  dynamicWindowHandles,
  formatPhoneNumber,
  generateRandomAlphaNumByLength,
  generateRandomNumber,
  generateRandomNumberByLength,
  getAllText,
  getAttrTxtWithValidation,
  getAttrValue,
  getAttrWithValidation,
  getDateWithTargetDay,
  getDynamicAttr,
  getEndDateFromDatePicker,
  getExpDateAndValidate,
  getfutureDate,
  getGridRowCount,
  getLastText,
  getLastTxtWithValidation,
  getLocatorFromPageClick,
  getMinionValue,
  getMinionValues,
  getMultipleDynamicAttr,
  getPageUrl,
  getPastDate,
  getStartDateFromDatePicker,
  getTDMData,
  getText,
  getTitleAttr,
  getTomorrowsDate,
  gridRowCount,
  hyperLinkClick,
  ifBtnEnabledClick,
  indexValWindowHandles,
  isAttributePresent,
  locatorWithMultipleObjects,
  locatorWithMultipleObjectsClick,
  locatorWithMultipleObjectsDropDownSelect,
  locatorWithMultipleObjectsEnter,
  multipleObjectsClick,
  multipleObjectsEnterWait,
  navigateBackToPreviousPage,
  navigateBrowserHistoryByCount,
  navigateHomePage,
  navigateTabKey,
  navigateToChildWindow,
  navWindowWithText,
  newWindowHandles,
  notClickable,
  pageNavWithUrl,
  previousPageMultipleTimes,
  previousTab,
  previousTabMultipleTimes,
  quoteLinkClick,
  rateUnitSet,
  rateUnitSetWithComma,
  readFileAndreplaceFileValue,
  refreshPage,
  reloadPage,
  resizeElement,
  returnNextDate,
  rowDataVerify,
  scrollIntoView,
  scrollIntoViewVerify,
  scrollIntoViewVerifyElement,
  scrollToBottomLeft,
  scrollToBottomRight,
  scrollToCenter,
  scrollToRight,
  scrolltoTop,
  scrollToTopLeft,
  scrollToTopRight,
  searchDrpDwnNewWindowHandles,
  selectAllItemsFromDropDown,
  selectDropDownTypeButtonList,
  selectItemFromButtonTypeDropDown,
  selectItemFromDropDown,
  selectItemFromDropDownBySearchingList,
  selectItemFromDropDownByTyping,
  selectOneRecordInWebTable,
  siblingsPrevClick,
  sortArrayAsc,
  spiltString,
  stringToInt,
  tabAndVerify,
  tabAndVerifyField,
  tabHighlight,
  tabSetLocator,
  textClear,
  textClearEnter,
  textClearFirstInput,
  textClearLastInput,
  textPressEnter,
  textSubString,
  timeout,
  toastAlert,
  toastAlertMsgVaidation,
  toastMsg,
  toastMsgError,
  toastMsgErrorWithDate,
  toastStopEventsAlert,
  toastWithMsg,
  truckMatchArray,
  typeAndPressEnter,
  typeAndPressEnterWithWait,
  typeAndWait,
  typeDate,
  typeDropDwn,
  typeDropDwnClick,
  typeDropDwnClickWithIndex,
  typeDropDwnContainsClick,
  typeDrpDwn,
  typeDrpDwnWithMachtingText,
  typeKeyboardKey,
  typeRightArrow,
  typeText,
  typeTextAndEnter,
  typeTextFirstElementIn,
  typeTextInLastElement,
  typeTextLastElementIn,
  typeTextWait,
  typeWaitEnter,
  typeWaitEnterText,
  updatedAlert,
  uploadFile,
  validateDrpDwnAllOptions,
  validateNullVal,
  validateNullValue,
  validateTabTitleTxt,
  validateText,
  verifyAlertOnSuccess,
  verifyAlertWithMessage,
  verifyAlignment,
  verifyAllElementContainsText,
  verifyAndClick,
  verifyAttrText,
  verifyAttrValue,
  verifyAttrValueContains,
  verifyBackGroundColour,
  verifyBackGroundColourIsNot,
  verifyBorderColour,
  verifyCheckBoxesChecked,
  verifyCheckBoxesUnChecked,
  verifyChildContainsTxt,
  verifyClosePopup,
  verifyColumnDataInDescendingOrder,
  verifyConfirmAlertMessage,
  verifyContains,
  verifyCSSAttributeValue,
  verifyDateListInAscendingOrder,
  verifyDateListInDescendingOrder,
  verifyDoesNotExist,
  verifyDrpDwnValuesText,
  verifyDynamicValueExists,
  verifyElementDoesNotHaveValue,
  verifyElementHaveValue,
  verifyElementsWithText,
  verifyElementText,
  verifyElementTextContains,
  verifyElementTextDoesNotContain,
  verifyElementValue,
  verifyExistElementWithDynamicTitle,
  verifyExists,
  verifyFirstElementContinsTxt,
  verifyFirstElementTxt,
  verifyFirstTextColour,
  verifyFocusedValue,
  verifyFoucsedElementTxt,
  verifyIfAllCheckBoxChecked,
  verifyIfAllCheckBoxUnchecked,
  verifyIfCheckBoxChecked,
  verifyIfCheckBoxUnChecked,
  verifyIfDisabled,
  verifyIfEnabled,
  verifyLabel,
  verifyLabelText,
  verifyLastElementNotTxt,
  verifyLastElementTxt,
  verifyLastRowContainsColumnTxt,
  verifyLastTextColour,
  verifyLblTextLength,
  verifyLengthOfVal,
  verifyMaxExactLength,
  verifyMaxLength,
  verifyMutipleElementsIncludesText,
  verifyMutipleElementsWithPosition,
  verifyMutipleElementsWithSameText,
  verifyNotContainValue,
  verifyNotVisible,
  verifyOrderListDefaultOrderAfterDragRearrangeReset,
  verifyOrderListDefaultOrderAfterDragRearrangeResetWithId,
  verifyPartialValue,
  verifyReadOnly,
  verifyRowContains,
  verifyRowcontainsTxt,
  verifySiblingsWithTxt,
  verifyTableArray,
  verifyTableColumnsHeaders,
  verifyTableColumnsHeadersToolTip,
  verifyTableRowElementText,
  verifyTagName,
  verifyText,
  verifyRowsExistOrNot,
  verifyTextContains,
  verifyTextContainsInSecondElement,
  verifyTextDisplay,
  verifyTextOrBackGroundColor,
  verifyToastOnSuccess,
  verifyToDisabled,
  verifyToExist,
  verifyToNotBackGroundColour,
  verifyToNotDisabled,
  verifyToNotExist,
  verifyToolTips,
  verifyTxtExist,
  verifyTxtInTextBox,
  verifyTxtNotToExist,
  verifyValue,
  verifyVisible,
  verifyWindowAlertWithMessage,
  viewFullPage,
  waitSometime,
  writeTextIntoFile,
  verifyToolTipsWithText,
  getMinionValuesList,
  clearTextTypeWithLessTime,
};