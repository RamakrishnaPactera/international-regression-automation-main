/*---------------------------------------------------------------------------------------------------------------
Verify Add and edit contacts object child window Screen > CRMV2 > Contacts > Customer | Carrier
Test Cases List
Authored By                   : Sanjeev, Jyothi Prasad
Date                          : 24-04-2023
Functions/Calling References  : contactPage, commonData, crmIndustryData, crmContactsData, utilities
Test cases Included           : ME-146498 Verify the contact object screen for the "Edit Contact" of the existing contact record saved with the required fields via Save and Close > CRMV2 > Contacts > Customer | Carrier  > CRMV2 > Contacts
                              : ME-146513 Verify the contact object screen is navigated when the user clicks on the Name hyperlink for any of the existing contacts > CRMV2 > Contacts > Customer | Carrier > CRMV2 > Contacts > Carrier
                              : ME-146521 Verify the save "Edit Name" modal with all the fields in the contact object screen for Add | Edit Contacts > CRMV2 > Customer | Carrier
                              : ME-146677 SaveAndClose:Verify the delete phone and record is not displayed in the phone table in the contact object screen for Add | Edit Contacts > CRMV2 > Customer | Carrier
                              : ME-149417 SaveAndContinue:Verify the delete phone and record is not displayed in the phone table in the contact object screen for Add | Edit Contacts > CRMV2 > Customer | Carrier
                              : ME-149916 SaveAndClose:Verify the delete email and record is not displayed in the email table in the contact object screen for Add Contact > CRMV2 > Customer | Carrier'
                              : ME-146683 SaveAndContinue:Verify the delete email and record is not displayed in the email table in the contact object screen for Add Contact > CRMV2 > Customer | Carrier
                              : ME-150381 Verify the phone associated to the active entity is showing correctly in the contacts table in CRMV2 > Contacts > Customer
                              : ME-154711 Verify the phone associated to the active entity is showing correctly in the contacts table in CRMV2 > Contacts > Carrier
                              : ME-146679 Verify the phone associated to the inactive entity is showing correctly in the contacts table in CRMV2 > Contacts > Customer
                              : ME-154712 Verify the phone associated to the inactive entity is showing correctly in the contacts table in CRMV2 > Contacts > Carrier
---------------------------------------------------------------------------------------------------------------*/
import {
  clearTypeText,
  clickAction,
  clickOkOnWindowAlertConfirm,
  clickVisibleElement,
  generateRandomNumber,
  generateRandomNumberByLength,
  getMinionValues,
  getTDMData,
  navigateToChildWindow,
  previousTab,
  toastWithMsg,
  typeDrpDwnWithMachtingText,
  typeText,
  verifyAttrValueContains,
  verifyClosePopup,
  verifyElementTextContains,
  verifyExists,
  verifyNotContainValue,
  viewFullPage,
  waitSometime,
  clickElementIndex,
  selectItemFromButtonTypeDropDown,
  clickWithWaits,
  checkBoxCheck,
} from '../../../utilities/commonUtils/genericUtils';
import contactPage from '../../../pageObjects/crm/contactPage/contactPage.json';
import commonData from '../../../testData/staticData/commonData/commonData.json';
import crmIndustryData from '../../../testData/crm/crmData/crmIndustryData.json';
import { loginToApplication } from '../../../utilities/appSpecificUtils/loginUtils/loginUtils';
import crmContactsData from '../../../testData/crm/crmData/crmContactsData.json';
import {
  addExistContact,
  navigateToTheCrmV2TabCustomer,
} from '../../../utilities/customerUtils/customerUtils';
import {
  addNewContact,
  navigateToTheCrmV2Tab,
} from '../../../utilities/carrierUtils/carrierUtils';
import { verifyMailId, verifyPhone } from '../../../utilities/crmUtils/crmUtils';
const { shortWait, longWait } = commonData;
const { prefixTxt, phoneNo, email, indexEditAssosEntities } = crmContactsData.userDefinedData;
const { attrValue, msgUpdated, countryIndia, txtTextArea, labelValue, emailLabelValue, assosEntInactive, assosEntReason } = crmContactsData.staticData;
const {
  addEmailBtn,
  addPhoneBtn,
  btnContactKabob,
  btnSave,
  businessInformationTab,
  contactValueCountry,
  contentObjectChildWindow,
  dialogSaveBtn,
  drpdwnLabel,
  editButton,
  emailPersonalCheckbox,
  emailTab,
  emailTable,
  kabobDeleteOption,
  nameTab,
  personalCheckbox,
  phoneTable,
  tblCellNameLink,
  txtCode,
  txtContactValue,
  txtExtn,
  txtNameId,
  txtTextAreaDetails,
  tabAssociatedEntities,
  associatEntityRow,
  associatEntityPhNum,
  btnKebabAssosEntities,
  btnContactEdit,
  drpDwnAssosEntStatus,
  btnSaveEditAssociatedEntity,
  drpDwnAssosEntReason,
  chkBoxInactive,
} = contactPage;
const {
  tdmAddCarrierReq,
  tdmAddCustomerReq,
  tdmCarrierData,
  tdmCarrierNewScenario,
  tdmCustomerData,
  tdmCustomerScenario,
} = crmIndustryData.staticData;
const { userName: usernameText, password: passwordText } = Cypress.env('users')[Cypress.env('appLoginUser')];
let customerNameVal, carrierNameVal, contactDepName, contactDepName2, randomContactName, randomContactName2, randomPhNo, randomPhNo2, newContactTabEmailVal, newContactTabEmailVal2, newContactTabPhoneVal, newContactTabPhoneVal2;
describe('Verify the contact object screen is navigated when the user clicks on the Name hyperlink for any of the existing contacts > Customer > CRMV2 > Contacts Tab > Duplicate Contacts [ME-146498][ME-146513][ME-146521][ME-146677][ME-149417][ME-149916][ME-146683] [ME-150381] [ME-146679], [ME-154711], [ME-154712]', () => {
  beforeEach(() => {
    getMinionValues('contactDepartment', 3).then((contactDepartment) => {
      contactDepName = contactDepartment[0];
      contactDepName2 = contactDepartment[1];
    });
    getTDMData({ dataType: tdmCustomerData, dataCondition: tdmAddCustomerReq, dataScenario: tdmCustomerScenario });
    cy.then(() => {
      customerNameVal = Cypress.env('inputVal');
    });
    getTDMData({ dataType: tdmCarrierData, dataCondition: tdmAddCarrierReq, dataScenario: tdmCarrierNewScenario });
    cy.then(() => {
      carrierNameVal = Cypress.env('inputVal');
    });
    loginToApplication({ username: usernameText, password: passwordText });
    viewFullPage();
    randomContactName = prefixTxt + generateRandomNumber();
    randomContactName2 = prefixTxt + generateRandomNumber();
    randomPhNo = phoneNo + generateRandomNumber();
    cy.log(randomPhNo);
    randomPhNo2 = phoneNo + generateRandomNumber();
    cy.log(randomPhNo2);
    newContactTabPhoneVal = verifyPhone({ textType: randomPhNo });
    cy.log(newContactTabPhoneVal);
    newContactTabPhoneVal2 = verifyPhone({ textType: randomPhNo2 });
    newContactTabEmailVal = verifyMailId({ textType: email });
    newContactTabEmailVal2 = verifyMailId({ textType: email });
    cy.log(newContactTabEmailVal);
  });
  it('ME-146498 Verify the contact object screen for the "Edit Contact" of the existing contact record saved with the required fields via Save and Close > CRMV2 > Contacts > Customer | Carrier  > CRMV2 > Contacts ', {
    tags: [
      '@carrier',
      '@crm',
      '@customerContacts',
      '@carrierContacts',
      '@p1',
    ],
  },
  () => {
    navigateToTheCrmV2TabCustomer({ customerName: customerNameVal.customerName });
    waitSometime(shortWait);
    addNewContact({ contactName: contactDepName, randomName: randomContactName, phoneNo: randomPhNo, emailId: newContactTabEmailVal });
    waitSometime(shortWait);
    navigateToChildWindow();
    clickVisibleElement({ locator: tblCellNameLink });
    waitSometime(longWait);
    //verify the user should see the saved contact record’s Contact Object child window for Customer
    verifyElementTextContains({ locator: contentObjectChildWindow, verifyText: randomContactName });
    verifyExists({ element: businessInformationTab });
    verifyExists({ element: editButton });
    waitSometime(longWait);
    previousTab();
    //carrier
    navigateToTheCrmV2Tab({ carrierName: carrierNameVal.carrierName });
    waitSometime(longWait);
    addNewContact({ contactName: contactDepName2, randomName: randomContactName2, phoneNo: randomPhNo2, emailId: newContactTabEmailVal2 });
    waitSometime(shortWait);
    navigateToChildWindow();
    clickVisibleElement({ locator: tblCellNameLink });
    waitSometime(longWait);
    //verify the user should see the saved contact record’s Contact Object child window for Customer
    verifyElementTextContains({ locator: contentObjectChildWindow, verifyText: randomContactName2 });
    verifyExists({ element: businessInformationTab });
    verifyExists({ element: editButton });
  });
  it('ME-146513 Verify the contact object screen is navigated when the user clicks on the Name hyperlink for any of the existing contacts > CRMV2 > Contacts > Customer | Carrier > CRMV2 > Contacts > Carrier', {
    tags: [
      '@carrier',
      '@crm',
      '@customerContacts',
      '@carrierContacts',
      '@p1',
    ],
  },
  () => {
    navigateToTheCrmV2TabCustomer({ customerName: customerNameVal.customerName });
    waitSometime(shortWait);
    addNewContact({ contactName: contactDepName, randomName: randomContactName, phoneNo: randomPhNo, emailId: newContactTabEmailVal });
    waitSometime(shortWait);
    navigateToChildWindow();
    clickVisibleElement({ locator: tblCellNameLink });
    waitSometime(longWait);
    //verify user should see the contact object screen for Edit Contact Records for Customers
    clickAction({ locator: nameTab });
    clickAction({ locator: editButton });
    verifyAttrValueContains({ locator: txtNameId, attribute: attrValue, verifyText: randomContactName });
    verifyClosePopup();
    waitSometime(longWait);
    previousTab();
    //carrier
    navigateToTheCrmV2Tab({ carrierName: carrierNameVal.carrierName });
    waitSometime(longWait);
    addNewContact({ contactName: contactDepName2, randomName: randomContactName2, phoneNo: randomPhNo2, emailId: newContactTabEmailVal2 });
    waitSometime(shortWait);
    navigateToChildWindow();
    clickVisibleElement({ locator: tblCellNameLink });
    waitSometime(longWait);
    //verify user should see the contact object screen for Edit Contact Records for Customers
    clickAction({ locator: nameTab });
    clickAction({ locator: editButton });
    verifyAttrValueContains({ locator: txtNameId, attribute: attrValue, verifyText: randomContactName2 });
  });
  it('ME-146521 Verify the save "Edit Name" modal with all the fields in the contact object screen for Add | Edit Contacts > CRMV2 > Customer | Carrier', {
    tags: [
      '@carrier',
      '@crm',
      '@customerContacts',
      '@carrierContacts',
      '@p1',
    ],
  },
  () => {
    navigateToTheCrmV2TabCustomer({ customerName: customerNameVal.customerName });
    waitSometime(shortWait);
    addNewContact({ contactName: contactDepName, randomName: randomContactName, phoneNo: randomPhNo, emailId: newContactTabEmailVal });
    waitSometime(shortWait);
    navigateToChildWindow();
    clickVisibleElement({ locator: tblCellNameLink });
    waitSometime(longWait);
    clickAction({ locator: nameTab });
    clickAction({ locator: editButton });
    const editName = prefixTxt + generateRandomNumber();
    clearTypeText({ element: txtNameId, typeText: editName });
    clearTypeText({ element: txtCode, typeText: generateRandomNumberByLength({ lengthOfNum: 6 }) });
    clickAction({ locator: btnSave });
    //user should see the updated toast message once the Edit Name modal is saved in the contact object screen for the customer
    toastWithMsg({ message: msgUpdated });
    waitSometime(longWait);
    previousTab();
    //carrier
    navigateToTheCrmV2Tab({ carrierName: carrierNameVal.carrierName });
    waitSometime(longWait);
    addNewContact({ contactName: contactDepName2, randomName: randomContactName2, phoneNo: randomPhNo2, emailId: newContactTabEmailVal2 });
    waitSometime(shortWait);
    navigateToChildWindow();
    clickVisibleElement({ locator: tblCellNameLink });
    waitSometime(longWait);
    clickAction({ locator: nameTab });
    clickAction({ locator: editButton });
    //Verify user should see the updated toast message once the Edit Name modal is saved in the contact object screen for the customer
    const editName2 = prefixTxt + generateRandomNumber();
    clearTypeText({ element: txtNameId, typeText: editName2 });
    clearTypeText({ element: txtCode, typeText: generateRandomNumberByLength({ lengthOfNum: 6 }) });
    clickAction({ locator: btnSave });
    toastWithMsg({ message: msgUpdated });
  });
  it('ME-146677 SaveAndClose:Verify the delete phone and record is not displayed in the phone table in the contact object screen for Add | Edit Contacts > CRMV2 > Customer | Carrier', {
    tags: [
      '@carrier',
      '@crm',
      '@customerContacts',
      '@carrierContacts',
      '@p1',
    ],
  },
  () => {
    navigateToTheCrmV2TabCustomer({ customerName: customerNameVal.customerName });
    waitSometime(shortWait);
    addNewContact({ contactName: contactDepName, randomName: randomContactName, phoneNo: randomPhNo, emailId: newContactTabEmailVal });
    waitSometime(shortWait);
    navigateToChildWindow();
    clickVisibleElement({ locator: tblCellNameLink });
    waitSometime(longWait);
    verifyElementTextContains({ locator: contentObjectChildWindow, verifyText: randomContactName });
    clickAction({ locator: addPhoneBtn });
    typeDrpDwnWithMachtingText({ locator: contactValueCountry, drpDwnVal: countryIndia });
    const randomPhoneNo = generateRandomNumberByLength({ lengthOfNum: 10 });
    typeText({ locator: txtContactValue, dataText: randomPhoneNo });
    typeText({ locator: txtExtn, dataText: generateRandomNumberByLength({ lengthOfNum: 3 }) });
    typeDrpDwnWithMachtingText({ locator: drpdwnLabel, drpDwnVal: labelValue });
    typeText({ locator: txtTextAreaDetails, dataText: txtTextArea });
    clickAction({ locator: personalCheckbox });
    clickAction({ locator: dialogSaveBtn });
    toastWithMsg({ message: msgUpdated });
    clickAction({ locator: btnContactKabob });
    clickAction({ locator: kabobDeleteOption });
    waitSometime(shortWait);
    clickOkOnWindowAlertConfirm();
    toastWithMsg({ message: msgUpdated });
    verifyNotContainValue({ element: phoneTable, Value: randomPhoneNo });
    waitSometime(longWait);
    previousTab();
    //carrier
    navigateToTheCrmV2Tab({ carrierName: carrierNameVal.carrierName });
    waitSometime(longWait);
    addNewContact({ contactName: contactDepName2, randomName: randomContactName2, phoneNo: randomPhNo2, emailId: newContactTabEmailVal2 });
    waitSometime(shortWait);
    navigateToChildWindow();
    clickVisibleElement({ locator: tblCellNameLink });
    waitSometime(longWait);
    clickAction({ locator: addPhoneBtn });
    typeDrpDwnWithMachtingText({ locator: contactValueCountry, drpDwnVal: countryIndia });
    const randomPhoneNo2 = generateRandomNumberByLength({ lengthOfNum: 10 });
    typeText({ locator: txtContactValue, dataText: randomPhoneNo2 });
    typeText({ locator: txtExtn, dataText: generateRandomNumberByLength({ lengthOfNum: 3 }) });
    typeDrpDwnWithMachtingText({ locator: drpdwnLabel, drpDwnVal: labelValue });
    typeText({ locator: txtTextAreaDetails, dataText: txtTextArea });
    clickAction({ locator: personalCheckbox });
    clickAction({ locator: dialogSaveBtn });
    toastWithMsg({ message: msgUpdated });
    clickAction({ locator: btnContactKabob });
    clickAction({ locator: kabobDeleteOption });
    waitSometime(shortWait);
    clickOkOnWindowAlertConfirm();
    toastWithMsg({ message: msgUpdated });
    verifyNotContainValue({ element: phoneTable, Value: randomPhoneNo2 });
  });
  it('ME-149417 SaveAndContinue:Verify the delete phone and record is not displayed in the phone table in the contact object screen for Add | Edit Contacts > CRMV2 > Customer | Carrier', {
    tags: [
      '@carrier',
      '@crm',
      '@customerContacts',
      '@carrierContacts',
      '@p1',
    ],
  },
  () => {
    navigateToTheCrmV2TabCustomer({ customerName: customerNameVal.customerName });
    waitSometime(shortWait);
    navigateToChildWindow();
    addExistContact({ contactName: contactDepName, randomName: randomContactName, phoneNo: randomPhNo, emailId: newContactTabEmailVal });
    waitSometime(shortWait);
    verifyElementTextContains({ locator: contentObjectChildWindow, verifyText: randomContactName });
    clickAction({ locator: addPhoneBtn });
    typeDrpDwnWithMachtingText({ locator: contactValueCountry, drpDwnVal: countryIndia });
    const randomPhoneNo = generateRandomNumberByLength({ lengthOfNum: 10 });
    typeText({ locator: txtContactValue, dataText: randomPhoneNo });
    typeText({ locator: txtExtn, dataText: generateRandomNumberByLength({ lengthOfNum: 3 }) });
    typeDrpDwnWithMachtingText({ locator: drpdwnLabel, drpDwnVal: labelValue });
    typeText({ locator: txtTextAreaDetails, dataText: txtTextArea });
    clickAction({ locator: personalCheckbox });
    clickAction({ locator: dialogSaveBtn });
    toastWithMsg({ message: msgUpdated });
    clickAction({ locator: btnContactKabob });
    clickAction({ locator: kabobDeleteOption });
    waitSometime(shortWait);
    clickOkOnWindowAlertConfirm();
    toastWithMsg({ message: msgUpdated });
    verifyNotContainValue({ element: phoneTable, Value: randomPhoneNo });
    waitSometime(longWait);
    previousTab();
    //carrier
    navigateToTheCrmV2Tab({ carrierName: carrierNameVal.carrierName });
    waitSometime(longWait);
    navigateToChildWindow();
    addExistContact({ contactName: contactDepName2, randomName: randomContactName2, phoneNo: randomPhNo2, emailId: newContactTabEmailVal2 });
    waitSometime(shortWait);
    verifyElementTextContains({ locator: contentObjectChildWindow, verifyText: randomContactName2 });
    clickAction({ locator: addPhoneBtn });
    typeDrpDwnWithMachtingText({ locator: contactValueCountry, drpDwnVal: countryIndia });
    const randomPhoneNo2 = generateRandomNumberByLength({ lengthOfNum: 10 });
    typeText({ locator: txtContactValue, dataText: randomPhoneNo2 });
    typeText({ locator: txtExtn, dataText: generateRandomNumberByLength({ lengthOfNum: 3 }) });
    typeDrpDwnWithMachtingText({ locator: drpdwnLabel, drpDwnVal: labelValue });
    typeText({ locator: txtTextAreaDetails, dataText: txtTextArea });
    clickAction({ locator: personalCheckbox });
    clickAction({ locator: dialogSaveBtn });
    toastWithMsg({ message: msgUpdated });
    clickAction({ locator: btnContactKabob });
    clickAction({ locator: kabobDeleteOption });
    waitSometime(shortWait);
    clickOkOnWindowAlertConfirm();
    toastWithMsg({ message: msgUpdated });
    verifyNotContainValue({ element: phoneTable, Value: randomPhoneNo2 });
  });
  it('ME-149916 SaveAndClose:Verify the delete email and record is not displayed in the email table in the contact object screen for Add Contact > CRMV2 > Customer | Carrier', {
    tags: [
      '@carrier',
      '@crm',
      '@customerContacts',
      '@carrierContacts',
      '@p1',
    ],
  },
  () => {
    navigateToTheCrmV2TabCustomer({ customerName: customerNameVal.customerName });
    waitSometime(shortWait);
    addNewContact({ contactName: contactDepName, randomName: randomContactName, phoneNo: randomPhNo, emailId: newContactTabEmailVal });
    waitSometime(shortWait);
    navigateToChildWindow();
    clickVisibleElement({ locator: tblCellNameLink });
    waitSometime(longWait);
    verifyElementTextContains({ locator: contentObjectChildWindow, verifyText: randomContactName });
    clickAction({ locator: emailTab });
    clickAction({ locator: addEmailBtn });
    const newContactTabEmailVal3 = verifyMailId({ textType: email });
    typeText({ locator: txtContactValue, dataText: newContactTabEmailVal3 });
    typeDrpDwnWithMachtingText({ locator: drpdwnLabel, drpDwnVal: emailLabelValue });
    typeText({ locator: txtTextAreaDetails, dataText: txtTextArea });
    clickAction({ locator: emailPersonalCheckbox });
    clickAction({ locator: dialogSaveBtn });
    toastWithMsg({ message: msgUpdated });
    clickAction({ locator: btnContactKabob });
    clickAction({ locator: kabobDeleteOption });
    waitSometime(shortWait);
    clickOkOnWindowAlertConfirm();
    toastWithMsg({ message: msgUpdated });
    verifyNotContainValue({ element: emailTable, Value: newContactTabEmailVal3 });
    waitSometime(longWait);
    previousTab();
    //carrier
    navigateToTheCrmV2Tab({ carrierName: carrierNameVal.carrierName });
    waitSometime(longWait);
    addNewContact({ contactName: contactDepName2, randomName: randomContactName2, phoneNo: randomPhNo2, emailId: newContactTabEmailVal2 });
    waitSometime(shortWait);
    navigateToChildWindow();
    clickVisibleElement({ locator: tblCellNameLink });
    waitSometime(longWait);
    verifyElementTextContains({ locator: contentObjectChildWindow, verifyText: randomContactName2 });
    clickAction({ locator: emailTab });
    clickAction({ locator: addEmailBtn });
    const newContactTabEmailVal4 = verifyMailId({ textType: email });
    typeText({ locator: txtContactValue, dataText: newContactTabEmailVal4 });
    typeDrpDwnWithMachtingText({ locator: drpdwnLabel, drpDwnVal: emailLabelValue });
    typeText({ locator: txtTextAreaDetails, dataText: txtTextArea });
    clickAction({ locator: emailPersonalCheckbox });
    clickAction({ locator: dialogSaveBtn });
    toastWithMsg({ message: msgUpdated });
    clickAction({ locator: btnContactKabob });
    clickAction({ locator: kabobDeleteOption });
    waitSometime(shortWait);
    clickOkOnWindowAlertConfirm();
    toastWithMsg({ message: msgUpdated });
    verifyNotContainValue({ element: emailTable, Value: newContactTabEmailVal4 });
  });
  it('ME-146683 SaveAndContinue:Verify the delete email and record is not displayed in the email table in the contact object screen for Add Contact > CRMV2 > Customer | Carrier', {
    tags: [
      '@carrier',
      '@crm',
      '@customerContacts',
      '@carrierContacts',
      '@p1',
    ],
  },
  () => {
    navigateToTheCrmV2TabCustomer({ customerName: customerNameVal.customerName });
    waitSometime(shortWait);
    navigateToChildWindow();
    waitSometime(shortWait);
    addExistContact({ contactName: contactDepName, randomName: randomContactName, phoneNo: randomPhNo, emailId: newContactTabEmailVal });
    waitSometime(shortWait);
    verifyElementTextContains({ locator: contentObjectChildWindow, verifyText: randomContactName });
    clickAction({ locator: emailTab });
    clickAction({ locator: addEmailBtn });
    const newContactTabEmailVal3 = verifyMailId({ textType: email });
    typeText({ locator: txtContactValue, dataText: newContactTabEmailVal3 });
    typeDrpDwnWithMachtingText({ locator: drpdwnLabel, drpDwnVal: emailLabelValue });
    typeText({ locator: txtTextAreaDetails, dataText: txtTextArea });
    clickAction({ locator: emailPersonalCheckbox });
    clickAction({ locator: dialogSaveBtn });
    toastWithMsg({ message: msgUpdated });
    clickAction({ locator: btnContactKabob });
    clickAction({ locator: kabobDeleteOption });
    waitSometime(shortWait);
    clickOkOnWindowAlertConfirm();
    toastWithMsg({ message: msgUpdated });
    verifyNotContainValue({ element: emailTable, Value: newContactTabEmailVal3 });
    waitSometime(longWait);
    previousTab();
    //carrier
    navigateToTheCrmV2Tab({ carrierName: carrierNameVal.carrierName });
    waitSometime(longWait);
    navigateToChildWindow();
    waitSometime(shortWait);
    addExistContact({ contactName: contactDepName2, randomName: randomContactName2, phoneNo: randomPhNo2, emailId: newContactTabEmailVal2 });
    waitSometime(shortWait);
    verifyElementTextContains({ locator: contentObjectChildWindow, verifyText: randomContactName2 });
    clickAction({ locator: emailTab });
    clickAction({ locator: addEmailBtn });
    const newContactTabEmailVal4 = verifyMailId({ textType: email });
    typeText({ locator: txtContactValue, dataText: newContactTabEmailVal4 });
    typeDrpDwnWithMachtingText({ locator: drpdwnLabel, drpDwnVal: emailLabelValue });
    typeText({ locator: txtTextAreaDetails, dataText: txtTextArea });
    clickAction({ locator: emailPersonalCheckbox });
    clickAction({ locator: dialogSaveBtn });
    toastWithMsg({ message: msgUpdated });
    clickAction({ locator: btnContactKabob });
    clickAction({ locator: kabobDeleteOption });
    waitSometime(shortWait);
    clickOkOnWindowAlertConfirm();
    toastWithMsg({ message: msgUpdated });
    verifyNotContainValue({ element: emailTable, Value: newContactTabEmailVal4 });
  });
  it('ME-150381 Verify the phone associated to the active entity is showing correctly in the contacts table in CRMV2 > Contacts > Customer', {
    tags: [
      '@customer',
      '@crm',
      '@customerContacts',
      '@carrierContacts',
      '@p1',
    ],
  },
  () => {
    navigateToTheCrmV2TabCustomer({ customerName: customerNameVal.customerName });
    waitSometime(longWait);
    addNewContact({ contactName: contactDepName, randomName: randomContactName, phoneNo: randomPhNo, emailId: newContactTabEmailVal });
    waitSometime(shortWait);
    navigateToChildWindow();
    clickVisibleElement({ locator: tblCellNameLink });
    waitSometime(longWait);
    //verify the user should see the saved contact record’s Contact Object child window for Customer
    verifyElementTextContains({ locator: contentObjectChildWindow, verifyText: randomContactName });
    verifyExists({ element: tabAssociatedEntities });
    clickVisibleElement({ locator: tabAssociatedEntities });
    waitSometime(shortWait);
    clickAction({ locator: associatEntityRow });
    verifyElementTextContains({ locator: associatEntityPhNum, verifyText: newContactTabPhoneVal });
  });
  it('ME-146679 Verify the phone associated to the inactive entity is showing correctly in the contacts table in CRMV2 > Contacts > Customer', {
    tags: [
      '@carrier',
      '@crm',
      '@customerContacts',
      '@carrierContacts',
      '@p1',
    ],
  },
  () => {
    navigateToTheCrmV2TabCustomer({ customerName: customerNameVal.customerName });
    waitSometime(longWait);
    addNewContact({ contactName: contactDepName, randomName: randomContactName, phoneNo: randomPhNo, emailId: newContactTabEmailVal });
    waitSometime(shortWait);
    navigateToChildWindow();
    clickVisibleElement({ locator: tblCellNameLink });
    waitSometime(longWait);
    //verify the user should see the saved contact record’s Contact Object child window for Customer
    verifyElementTextContains({ locator: contentObjectChildWindow, verifyText: randomContactName });
    verifyExists({ element: tabAssociatedEntities });
    clickVisibleElement({ locator: tabAssociatedEntities });
    waitSometime(shortWait);
    clickAction({ locator: btnKebabAssosEntities });
    clickElementIndex({ locator: btnContactEdit, index: indexEditAssosEntities });
    selectItemFromButtonTypeDropDown({ locator: drpDwnAssosEntStatus, dropdownVal: assosEntInactive });
    selectItemFromButtonTypeDropDown({ locator: drpDwnAssosEntReason, dropdownVal: assosEntReason });
    clickWithWaits({ locator: btnSaveEditAssociatedEntity, waitTime: longWait });
    checkBoxCheck({ checkBoxLocator: chkBoxInactive });
    clickAction({ locator: associatEntityRow });
    verifyElementTextContains({ locator: associatEntityPhNum, verifyText: newContactTabPhoneVal });
  });
  it('ME-154711 Verify the phone associated to the active entity is showing correctly in the contacts table in CRMV2 > Contacts > Carrier', {
    tags: [
      '@carrier',
      '@crm',
      '@customerContacts',
      '@carrierContacts',
      '@p1',
    ],
  },
  () => {
    navigateToTheCrmV2Tab({ carrierName: carrierNameVal.carrierName });
    waitSometime(longWait);
    addNewContact({ contactName: contactDepName2, randomName: randomContactName2, phoneNo: randomPhNo2, emailId: newContactTabEmailVal2 });
    waitSometime(shortWait);
    navigateToChildWindow();
    clickVisibleElement({ locator: tblCellNameLink });
    waitSometime(longWait);
    //verify the user should see the saved contact record’s Contact Object child window for Customer
    verifyElementTextContains({ locator: contentObjectChildWindow, verifyText: randomContactName2 });
    verifyExists({ element: tabAssociatedEntities });
    clickVisibleElement({ locator: tabAssociatedEntities });
    waitSometime(shortWait);
    clickAction({ locator: associatEntityRow });
    verifyElementTextContains({ locator: associatEntityPhNum, verifyText: newContactTabPhoneVal2 });
  });
  it('ME-154712 Verify the phone associated to the inactive entity is showing correctly in the contacts table in CRMV2 > Contacts > Carrier', {
    tags: [
      '@carrier',
      '@crm',
      '@customerContacts',
      '@carrierContacts',
      '@p1',
    ],
  },
  () => {
    navigateToTheCrmV2Tab({ carrierName: carrierNameVal.carrierName });
    waitSometime(longWait);
    addNewContact({ contactName: contactDepName2, randomName: randomContactName2, phoneNo: randomPhNo2, emailId: newContactTabEmailVal2 });
    waitSometime(shortWait);
    navigateToChildWindow();
    clickVisibleElement({ locator: tblCellNameLink });
    waitSometime(longWait);
    //verify the user should see the saved contact record’s Contact Object child window for Customer
    verifyElementTextContains({ locator: contentObjectChildWindow, verifyText: randomContactName2 });
    verifyExists({ element: tabAssociatedEntities });
    clickVisibleElement({ locator: tabAssociatedEntities });
    waitSometime(shortWait);
    clickAction({ locator: btnKebabAssosEntities });
    clickElementIndex({ locator: btnContactEdit, index: indexEditAssosEntities });
    selectItemFromButtonTypeDropDown({ locator: drpDwnAssosEntStatus, dropdownVal: assosEntInactive });
    selectItemFromButtonTypeDropDown({ locator: drpDwnAssosEntReason, dropdownVal: assosEntReason });
    clickWithWaits({ locator: btnSaveEditAssociatedEntity, waitTime: longWait });
    checkBoxCheck({ checkBoxLocator: chkBoxInactive });
    clickAction({ locator: associatEntityRow });
    verifyElementTextContains({ locator: associatEntityPhNum, verifyText: newContactTabPhoneVal2 });
  });
});