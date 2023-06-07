import crmIndustryData from '../../../../../testData/crm/crmData/crmIndustryData.json';
import contactPage from '../../../../../pageObjects/crm/contactPage/contactPage.json';
import commonData from '../../../../../testData/staticData/commonData/commonData.json';
import {
  clearAndTypeWithWait,
  clearText,
  clearTypeAndEnter,
  clickAction,
  formatPhoneNumber,
  generateRandomNumber,
  getMinionValues,
  getTDMData,
  scrollIntoViewVerifyElement,
  toastMsg,
  typeText,
  verifyAllElementContainsText,
  verifyAttrText,
  verifyClosePopup,
  verifyIfDisabled,
  verifyTableColumnsHeaders,
  verifyTextContains,
  verifyTextOrBackGroundColor,
  verifyToExist,
  verifyToolTips,
  viewFullPage,
  waitSometime,
} from '../../../../../utilities/commonUtils/genericUtils';
import { sortAndValidate } from '../../../../../utilities/commonUtils/sortUtils';
import { loginToApplication } from '../../../../../utilities/appSpecificUtils/loginUtils/loginUtils';
import crmContactsData from '../../../../../testData/crm/crmData/crmContactsData.json';
import {
  addDupContactSaveAndContinue,
  addNewContact,
  navigateToTheCrmV2Tab,
} from '../../../../../utilities/carrierUtils/carrierUtils';
import { verifyIndustriesTblValues } from '../../../../../utilities/customerUtils/customerUtils';
import { verifyMailId, verifyPhone } from '../../../../../utilities/crmUtils/crmUtils';
const { shortWait } = commonData;
const {
  email,
  phoneNo,
  prefixTxt,
} = crmContactsData.userDefinedData;
const {
  asteriskSymbol,
  attrValue,
  colorAttr,
  colorCodeVal,
  contactsTableColumnHeaders,
  nameFieldtooltip,
  newContactNameTypeScrollVal,
  newContactNameTypeVal,
  newContactTabCompany,
  newContactTabDepartment,
  newContactTabEmail,
  newContactTabEntityType,
  newContactTabEntityTypeVal,
  newContactTabLinkedInURL,
  newContactTabLinkedInURLVal,
  newContactTabName,
  newContactTabPhone,
  newContactTabTitle,
  newContactTabTitleVal,
  notMatchingName,
  searchCount,
} = crmContactsData.staticData;
const { userName: usernameText, password: passwordText } = Cypress.env('users')[Cypress.env('appLoginUser')];
const {
  tdmAddCarrierReq,
  tdmCarrierData,
  tdmCarrierNewScenario,
} = crmIndustryData.staticData;
const {
  autoSuggestEmail,
  autoSuggestName,
  autoSuggestNameLink,
  autoSuggestPhoneNo,
  btnContactEdit,
  btnContactKabob,
  btnContactsPlus,
  btnSaveContact,
  emailHyperLink,
  mainEntityName,
  nameAsterisk,
  nameHyperLink,
  nameToolTip,
  phoneHyperLink,
  rowsNewContactTable,
  searchContactList,
  tblColumnNameHeaderBtn,
  tblContactsTabColHeader,
  tblRowHeader,
  typeContact,
} = contactPage;
let carrierNameVal, contactDepName, interactionsNewContactTab, randomContactName, randomPhNo, newContactTabEmailVal, newContactTabPhoneVal;
describe(' Verify the Validations in Contact tab > Carrier > CRMV2 > Contacts Tab [ME-136708],[ME-151469],[ME-151462],[M]E-151382],[ME-151384],[ME-151386],[ME-151385],[ME-151397],[ME-151399],[ME-151403]', () => {
  beforeEach(() => {
    getMinionValues('contactDepartment', 1).then((contactDepartment) => {
      contactDepName = contactDepartment[0];
    });
    getTDMData({ dataType: tdmCarrierData, dataCondition: tdmAddCarrierReq, dataScenario: tdmCarrierNewScenario });
    cy.then(() => {
      carrierNameVal = Cypress.env('inputVal');
      loginToApplication({ username: usernameText, password: passwordText });
      viewFullPage();
      randomContactName = prefixTxt + generateRandomNumber();
      randomPhNo = phoneNo + generateRandomNumber();
      newContactTabPhoneVal = verifyPhone({ textType: randomPhNo });
      newContactTabEmailVal = verifyMailId({ textType: email });
      interactionsNewContactTab = new Map([
        [newContactTabName, randomContactName],
        [newContactTabCompany, carrierNameVal.carrierName],
        [newContactTabEntityType, newContactTabEntityTypeVal],
        [newContactTabDepartment, contactDepName],
        [newContactTabTitle, newContactTabTitleVal],
        [newContactTabPhone, newContactTabPhoneVal],
        [newContactTabEmail, newContactTabEmailVal],
        [newContactTabLinkedInURL, newContactTabLinkedInURLVal],
      ]);
    });
  });
  it('ME-136708,ME-151469,ME-151462,ME-151382,ME-151384,ME-151386,ME-151385,ME-151397,ME-151399,ME-151403 Verify the Validations in Contact tab > Carrier > CRMV2 > Contacts Tab in Contact tab| Carrier Regression ', {
    tags: [
      '@carrier',
      '@crm',
      '@carrierContacts',
      '@p1',
    ],
  },
  () => {
    navigateToTheCrmV2Tab({ carrierName: carrierNameVal.carrierName });
    cy.log('***creating New contact Column***');
    //Verify save & close button is enabled in add new contact
    addNewContact({ contactName: contactDepName, randomName: randomContactName, phoneNo: randomPhNo, emailId: newContactTabEmailVal });
    waitSometime(shortWait);
    //Verify user is able to see highlighted message with Updated
    toastMsg();
    verifyTableColumnsHeaders({ locator: tblContactsTabColHeader, columnNames: contactsTableColumnHeaders });
    //verify the Hyperlink for Name,Phone, Email
    verifyToExist({ element: nameHyperLink });
    verifyToExist({ element: phoneHyperLink });
    verifyToExist({ element: emailHyperLink });
    //Verify user is able to see kabob menu in contacts table
    verifyToExist({ element: btnContactKabob });
    //verify Edit button visible
    clickAction({ locator: btnContactKabob });
    waitSometime(shortWait);
    verifyToExist({ element: btnContactEdit });
    //Verify Mandatory Name field (*) backgroundcolor in add new contact modal
    clickAction({ locator: btnContactsPlus });
    waitSometime(shortWait);
    verifyTextContains({ locator: nameAsterisk, containsText: asteriskSymbol });
    verifyTextOrBackGroundColor({ locator: nameAsterisk, color: colorAttr, colorCode: colorCodeVal });
    //Verify name field contains tool tip if no value in add new contact modal and Mandatory field
    verifyToolTips({ locator: nameToolTip, verifyText: nameFieldtooltip });
    //Verify name field displays row information in add new contact modal(Ex:Name(Hyperlink) | Phone Number((999) 999-9999) | Email Address (based on current value) | Main Entity Name)
    typeText({ locator: typeContact, dataText: randomContactName });
    verifyTextContains({ locator: autoSuggestName, containsText: randomContactName });
    verifyToExist({ element: autoSuggestNameLink });
    //passing the phone number as US(+1)
    const phoneNumber = formatPhoneNumber({ phoneNumberStr: '+1' + randomPhNo });
    verifyTextContains({ locator: autoSuggestPhoneNo, containsText: phoneNumber });
    verifyTextContains({ locator: autoSuggestEmail, containsText: email });
    verifyTextContains({ locator: mainEntityName, containsText: carrierNameVal.carrierName });
    clearText({ locator: typeContact });
    waitSometime(shortWait);
    //Verify name field contains matching record in add new contact modal
    typeText({ locator: typeContact, dataText: newContactNameTypeVal });
    waitSometime(shortWait);
    verifyAllElementContainsText({ locator: searchContactList, verifyText: newContactNameTypeVal });
    //Verify save & close button disabled in add new contact
    verifyIfDisabled({ locator: btnSaveContact });
    //Verify name field contains duplicate names in add new contact modal
    clearText({ locator: typeContact });
    addDupContactSaveAndContinue({ contactName: contactDepName, randomName: randomContactName, phoneNo: randomPhNo, emailId: newContactTabEmailVal });
    //Verify New contact Column Values
    verifyIndustriesTblValues({ mapName: interactionsNewContactTab, locator: rowsNewContactTable });
    verifyClosePopup();
    clearText({ locator: typeContact });
    //Verify user is able to ignore suggested list
    clearTypeAndEnter({ element: typeContact, typeText: newContactNameTypeVal });
    verifyAttrText({ locator: typeContact, attribute: attrValue, verifyText: newContactNameTypeVal });
    //Verify name field do not contain matching record in add new contact modal
    clearAndTypeWithWait({ element: typeContact, typeText: notMatchingName });
    cy.get(searchContactList).should('have.length', searchCount);
    verifyClosePopup();
    waitSometime(shortWait);
    //Verify user is able to see correct order for new items in contacts table
    sortAndValidate({ colHeader: tblColumnNameHeaderBtn, rowData: tblRowHeader });
    waitSometime(shortWait);
    //Verify name field contains vertical scroll bar in add new contact modal
    clickAction({ locator: btnContactsPlus });
    typeText({ locator: typeContact, dataText: newContactNameTypeScrollVal });
    waitSometime(shortWait);
    scrollIntoViewVerifyElement({ locator: searchContactList });
  });
});