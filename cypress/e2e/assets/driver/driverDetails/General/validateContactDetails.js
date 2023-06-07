/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------
 Validating contact details such as name, type, phone, fax, email etc in driver pages
 Test Cases List
 Authored By : Shashi Jaiswal,Sanjeev Bandari
 Date : 18-04-2023
 Functions/Calling References : genericUtils, loginUtils, resourceUtils, utilities
 Test case Included : ME-30255 Test Driver Contact Details - Functional Testcase
                    : ME-71898 In Existing Driver Record : Verify validation for duplicate entries in Driver Contacts Card with respect to Phone/Email/IM
                    : ME-71899 Verify Add and Update functionality of driver contact records
                    : ME-71900 In Existing Driver Record ,Verify Add and Update functionality of driver contact records
-----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
import { loginToApplication } from '../../../../../utilities/appSpecificUtils/loginUtils/loginUtils';
import { enterDriverMandatoryFields, navigateToDriverAddNewPage, driverSaveAction, searchDriverWithCode } from '../../../../../utilities/assetUtils/resourceUtilis';
import { scrollIntoView, verifyVisible, viewFullPage, clickAction, typeText, typeDrpDwnWithMachtingText, waitSometime, clearTextType, verifyMaxExactLength, toastWithMsg, verifyAttrText, verifyClosePopup, clickOkOnWindowAlert, clickLastElementIn, checkBoxCheck, checkBoxUncheck, verifyDoesNotExist, verifyTextContains } from '../../../../../utilities/commonUtils/genericUtils';
import { generateRandomNumberByLength, generateRandomAlphaNumByLength } from '../../../../../tdm/lib/utilities/utilities';
import generalData from '../../../../../testData/assets/driver/driverDetails/general/generalData.json';
import driverAddNewPage from '../../../../../pageObjects/assets/driver/addDriver/addDriverPage.json';
import commonData from '../../../../../testData/staticData/commonData/commonData.json';
import addDriverData from '../../../../../testData/assets/driver/addDriver/addDriverData.json';
import driverCommonPage from '../../../../../pageObjects/assets/driver/driverCommonPage.json';
const { tabDriverGeneral } = driverCommonPage;
const { shortWait } = commonData;
const { btnAddNewContact, btnContactsAddNew, editButton, deleteButton, btnKabobMenu } = driverAddNewPage;
const {
  txtFieldName,
  drpDwnType,
  drpDwnPhoneCountry,
  txtFieldPhoneNumber,
  txtFieldPhoneExtension,
  drpdwnFaxCountry,
  txtFieldFaxNumber,
  txtFieldEmail,
  drpDwnChatType,
  txtFieldChatUserName,
  checkBoxMainContact,
  bannerMainContact,
  checkBoxPayContact,
  lblContactWarning,
} = driverAddNewPage.contacts;
const {
  valueAttr,
} = addDriverData.staticData;
const {
  countryIndia,
  tblErroMessageContacts,
} = generalData.staticData;
const {
  contactType,
  emailUpdated,
  emailValue,
  firstName,
  imServiceType,
} = addDriverData.userDefinedData;
const {
  msgUpdated,
} = addDriverData.expectedData;
const {
  userName: usernameText,
  password: passwordText,
} = Cypress.env('users')[Cypress.env('appLoginUser')];

describe('Validating contact details such as name, type, phone, fax, email in driver pages [ME-30255] [ME-71899][ME-71900][ME-71898]', () => {
  beforeEach(() => {
    viewFullPage();
    loginToApplication({ username: usernameText, password: passwordText });
  });
  it('[ME-30255] Test Driver Contact Details - Functional Testcase',
    () => {
      navigateToDriverAddNewPage();
      //creating driver with mandatory fields
      enterDriverMandatoryFields();
      //creating driver conatct info
      scrollIntoView({ locator: btnContactsAddNew });
      clickAction({ locator: btnContactsAddNew });
      waitSometime(shortWait);
      verifyMaxExactLength({ locator: txtFieldName, maxLength: 400 });
      clearTextType({ element: txtFieldName, typeText: generateRandomAlphaNumByLength({ lengthOfString: 5 }) });
      typeDrpDwnWithMachtingText({ locator: drpDwnType, drpDwnVal: contactType });
      typeDrpDwnWithMachtingText({ locator: drpDwnPhoneCountry, drpDwnVal: countryIndia });
      typeText({ locator: txtFieldPhoneNumber, dataText: generateRandomNumberByLength({ lengthOfNum: 10 }) });
      const phoneExtn = generateRandomNumberByLength({ lengthOfNum: 3 });
      typeText({ locator: txtFieldPhoneExtension, dataText: phoneExtn });
      typeDrpDwnWithMachtingText({ locator: drpdwnFaxCountry, drpDwnVal: countryIndia });
      typeText({ locator: txtFieldFaxNumber, dataText: generateRandomNumberByLength({ lengthOfNum: 10 }) });
      typeText({ locator: txtFieldEmail, dataText: emailValue });
      typeDrpDwnWithMachtingText({ locator: drpDwnChatType, drpDwnVal: imServiceType });
      typeText({ locator: txtFieldChatUserName, dataText: firstName });
      clickAction({ locator: btnAddNewContact });
      waitSometime(shortWait);
      //Save driver
      driverSaveAction();
      toastWithMsg({ message: msgUpdated });
      waitSometime(shortWait);
      //Edit contact details
      clickAction({ locator: btnKabobMenu });
      clickAction({ locator: editButton });
      const newContactName = generateRandomAlphaNumByLength({ lengthOfString: 5 });
      clearTextType({ element: txtFieldName, typeText: newContactName });
      const phoneExtnUpdated = generateRandomNumberByLength({ lengthOfNum: 3 });
      clearTextType({ element: txtFieldPhoneExtension, typeText: phoneExtnUpdated });
      clearTextType({ element: txtFieldEmail, typeText: emailUpdated });
      checkBoxCheck({ checkBoxLocator: checkBoxMainContact });
      clickAction({ locator: btnAddNewContact });
      waitSometime(shortWait);
      //Save Driver
      driverSaveAction();
      toastWithMsg({ message: msgUpdated });
      waitSometime(shortWait);
      //Verify updated values
      clickAction({ locator: btnKabobMenu });
      clickAction({ locator: editButton });
      verifyAttrText({ locator: txtFieldName, attribute: valueAttr, verifyText: newContactName });
      verifyAttrText({ locator: txtFieldPhoneExtension, attribute: valueAttr, verifyText: phoneExtnUpdated });
      verifyAttrText({ locator: txtFieldEmail, attribute: valueAttr, verifyText: emailUpdated });
      verifyClosePopup();
      //Add new contact
      scrollIntoView({ locator: btnContactsAddNew });
      clickAction({ locator: btnContactsAddNew });
      waitSometime(shortWait);
      clearTextType({ element: txtFieldName, typeText: generateRandomAlphaNumByLength({ lengthOfString: 5 }) });
      typeDrpDwnWithMachtingText({ locator: drpDwnType, drpDwnVal: contactType });
      typeDrpDwnWithMachtingText({ locator: drpDwnPhoneCountry, drpDwnVal: countryIndia });
      typeText({ locator: txtFieldPhoneNumber, dataText: generateRandomNumberByLength({ lengthOfNum: 10 }) });
      checkBoxCheck({ checkBoxLocator: checkBoxMainContact });
      verifyVisible({ element: bannerMainContact });
      checkBoxUncheck({ checkBoxLocator: checkBoxMainContact });
      verifyDoesNotExist({ element: bannerMainContact });
      clickAction({ locator: checkBoxPayContact });
      clickAction({ locator: btnAddNewContact });
      waitSometime(shortWait);
      //Save Driver
      driverSaveAction();
      toastWithMsg({ message: msgUpdated });
      waitSometime(shortWait);
      //Delete the contact Details record
      scrollIntoView({ locator: btnContactsAddNew });
      clickLastElementIn({ locator: btnKabobMenu });
      clickAction({ locator: deleteButton });
      clickOkOnWindowAlert();
      //Save Driver
      driverSaveAction();
      toastWithMsg({ message: msgUpdated });
    });
  it('ME-71898 In Existing Driver Record : Verify validation for duplicate entries in Driver Contacts Card with respect to Phone/Email/IM',
    () => {
      navigateToDriverAddNewPage();
      const { driverCode } = enterDriverMandatoryFields();
      //enterDriverMandatoryFields();
      scrollIntoView({ locator: btnContactsAddNew });
      clickAction({ locator: btnContactsAddNew });
      waitSometime(shortWait);
      clearTextType({ element: txtFieldName, typeText: generateRandomAlphaNumByLength({ lengthOfString: 5 }) });
      typeDrpDwnWithMachtingText({ locator: drpDwnType, drpDwnVal: contactType });
      typeDrpDwnWithMachtingText({ locator: drpDwnPhoneCountry, drpDwnVal: countryIndia });
      const phoneNo = generateRandomNumberByLength({ lengthOfNum: 10 });
      typeText({ locator: txtFieldPhoneNumber, dataText: phoneNo });
      const phoneExtn = generateRandomNumberByLength({ lengthOfNum: 3 });
      typeText({ locator: txtFieldPhoneExtension, dataText: phoneExtn });
      typeDrpDwnWithMachtingText({ locator: drpdwnFaxCountry, drpDwnVal: countryIndia });
      typeText({ locator: txtFieldFaxNumber, dataText: generateRandomNumberByLength({ lengthOfNum: 10 }) });
      typeText({ locator: txtFieldEmail, dataText: emailValue });
      typeDrpDwnWithMachtingText({ locator: drpDwnChatType, drpDwnVal: imServiceType });
      typeText({ locator: txtFieldChatUserName, dataText: firstName });
      clickAction({ locator: btnAddNewContact });
      waitSometime(shortWait);
      driverSaveAction();
      toastWithMsg({ message: msgUpdated });
      waitSometime(shortWait);
      searchDriverWithCode({ driverCode });
      clickAction({ locator: tabDriverGeneral });
      //Verify validation for duplicate entries in Driver Contacts Card with respect to Phone/Email/IM
      clickAction({ locator: btnContactsAddNew });
      waitSometime(shortWait);
      clearTextType({ element: txtFieldName, typeText: generateRandomAlphaNumByLength({ lengthOfString: 5 }) });
      typeDrpDwnWithMachtingText({ locator: drpDwnType, drpDwnVal: contactType });
      typeDrpDwnWithMachtingText({ locator: drpDwnPhoneCountry, drpDwnVal: countryIndia });
      typeText({ locator: txtFieldPhoneNumber, dataText: phoneNo });
      verifyTextContains({ locator: lblContactWarning, containsText: tblErroMessageContacts });
      waitSometime(shortWait);
      typeDrpDwnWithMachtingText({ locator: drpDwnPhoneCountry, drpDwnVal: countryIndia });
      clearTextType({ element: txtFieldPhoneNumber, typeText: generateRandomNumberByLength({ lengthOfNum: 10 }) });
      const phoneExtn1 = generateRandomNumberByLength({ lengthOfNum: 3 });
      typeText({ locator: txtFieldPhoneExtension, dataText: phoneExtn1 });
      typeDrpDwnWithMachtingText({ locator: drpdwnFaxCountry, drpDwnVal: countryIndia });
      typeText({ locator: txtFieldFaxNumber, dataText: generateRandomNumberByLength({ lengthOfNum: 10 }) });
      typeText({ locator: txtFieldEmail, dataText: emailValue });
      verifyTextContains({ locator: lblContactWarning, containsText: tblErroMessageContacts });
      typeDrpDwnWithMachtingText({ locator: drpDwnChatType, drpDwnVal: imServiceType });
      typeText({ locator: txtFieldChatUserName, dataText: firstName });
      verifyTextContains({ locator: lblContactWarning, containsText: tblErroMessageContacts });
    });

  it('[ME-71899][ME-71900] In Existing Driver Record ,Verify Add and Update functionality of driver contact records',
    () => {
      navigateToDriverAddNewPage();
      const { driverCode } = enterDriverMandatoryFields();
      driverSaveAction();
      toastWithMsg({ message: msgUpdated });
      searchDriverWithCode({ driverCode });
      clickAction({ locator: tabDriverGeneral });
      scrollIntoView({ locator: btnContactsAddNew });
      clickAction({ locator: btnContactsAddNew });
      waitSometime(shortWait);
      clearTextType({ element: txtFieldName, typeText: generateRandomAlphaNumByLength({ lengthOfString: 5 }) });
      typeDrpDwnWithMachtingText({ locator: drpDwnType, drpDwnVal: contactType });
      typeDrpDwnWithMachtingText({ locator: drpDwnPhoneCountry, drpDwnVal: countryIndia });
      typeText({ locator: txtFieldPhoneNumber, dataText: generateRandomNumberByLength({ lengthOfNum: 10 }) });
      const phoneExtn = generateRandomNumberByLength({ lengthOfNum: 3 });
      typeText({ locator: txtFieldPhoneExtension, dataText: phoneExtn });
      typeDrpDwnWithMachtingText({ locator: drpdwnFaxCountry, drpDwnVal: countryIndia });
      typeText({ locator: txtFieldFaxNumber, dataText: generateRandomNumberByLength({ lengthOfNum: 10 }) });
      typeText({ locator: txtFieldEmail, dataText: emailValue });
      typeDrpDwnWithMachtingText({ locator: drpDwnChatType, drpDwnVal: imServiceType });
      typeText({ locator: txtFieldChatUserName, dataText: firstName });
      clickAction({ locator: btnAddNewContact });
      waitSometime(shortWait);
      driverSaveAction();
      toastWithMsg({ message: msgUpdated });
      waitSometime(shortWait);
      //Edit contact details And should allow user to save driver record with out any  error
      clickAction({ locator: btnKabobMenu });
      clickAction({ locator: editButton });
      const newContactName = generateRandomAlphaNumByLength({ lengthOfString: 5 });
      clearTextType({ element: txtFieldName, typeText: newContactName });
      const phoneExtnUpdated = generateRandomNumberByLength({ lengthOfNum: 3 });
      clearTextType({ element: txtFieldPhoneExtension, typeText: phoneExtnUpdated });
      clearTextType({ element: txtFieldEmail, typeText: emailUpdated });
      checkBoxCheck({ checkBoxLocator: checkBoxMainContact });
      clickAction({ locator: btnAddNewContact });
      waitSometime(shortWait);
      driverSaveAction();
      toastWithMsg({ message: msgUpdated });
    });
});