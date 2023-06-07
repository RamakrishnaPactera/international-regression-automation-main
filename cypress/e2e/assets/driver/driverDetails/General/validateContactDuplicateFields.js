/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------
 Validating contact details such as IM username in driver pages
 Test Cases List              : [ME-74719,ME-74720,ME-74721]
 Authored By                  : Lingaswamy Kottha
 Date                         : 15-05-2023,
 Functions/Calling References : genericUtils, loginUtils, resourceUtils, utilities
 Test case Included           : ME-74719,ME-74720,ME-74721 Test Driver Contact Details - Functional Testcase
-----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/

import { loginToApplication } from '../../../../../utilities/appSpecificUtils/loginUtils/loginUtils';
import { searchDriverWithCode, driverSaveAction } from '../../../../../utilities/assetUtils/resourceUtilis';
import { scrollIntoView, viewFullPage, clickAction, notClickable, verifyLabel, typeText, typeDrpDwnWithMachtingText, clearTextType, toastWithMsg, getTDMData } from '../../../../../utilities/commonUtils/genericUtils';
import { generateRandomNumberByLength } from '../../../../../tdm/lib/utilities/utilities';
import generalData from '../../../../../testData/assets/driver/driverDetails/general/generalData.json';
import driverAddNewPage from '../../../../../pageObjects/assets/driver/addDriver/addDriverPage.json';
import addDriverData from '../../../../../testData/assets/driver/addDriver/addDriverData.json';
import preferencesData from '../../../../../testData/assets/driver/driverDetails/preferences/preferencesData.json';
import driverCommonPage from '../../../../../pageObjects/assets/driver/driverCommonPage.json';
const { btnAddNewContact, btnContactsAddNew } = driverAddNewPage;
const {
  tdmDriverCommonScenario,
  tdmDriverData,
  tdmAddDriverReq,
} = preferencesData.expectedData;
const { tabDriverGeneral } = driverCommonPage;
const {
  txtFieldName,
  drpDwnType,
  drpDwnPhoneCountry,
  txtFieldPhoneNumber,
  drpdwnFaxCountry,
  txtFieldFaxNumber,
  txtFieldEmail,
  drpDwnChatType,
  txtFieldChatUserName,
  lblContactWarning,
} = driverAddNewPage.contacts;
const {
  countryIndia,
  phoneNum,
  contactDuplicatMsg,
} = generalData.staticData;
const {
  contactType,
  imServiceType,
  emailUpdated,
} = addDriverData.userDefinedData;
const {
  msgUpdated,
} = addDriverData.expectedData;
const {
  userName: usernameText,
  password: passwordText,
} = Cypress.env('users')[Cypress.env('appLoginUser')];
let driverDataTDM;
describe('Verify validation for duplicate entries in Driver Contacts Card with respect to Phone, Email and IM user [ME-74719,ME-74720,ME-74721]', () => {
  beforeEach(() => {
    viewFullPage();
    loginToApplication({ username: usernameText, password: passwordText });
    getTDMData({ dataType: tdmDriverData, dataCondition: tdmAddDriverReq, dataScenario: tdmDriverCommonScenario });
    cy.then(() => {
      driverDataTDM = Cypress.env('inputVal');
    });
  });
  it('ME-74719 Can User Verify validation for duplicate entries in Driver Contacts Card with respect to Phone',
    () => {
      searchDriverWithCode({ driverCode: driverDataTDM.driverCode });
      //creating driver conatct info
      clickAction({ locator: tabDriverGeneral });
      scrollIntoView({ locator: btnContactsAddNew });
      clickAction({ locator: btnContactsAddNew });
      clearTextType({ element: txtFieldName, typeText: contactType });
      typeDrpDwnWithMachtingText({ locator: drpDwnType, drpDwnVal: contactType });
      typeDrpDwnWithMachtingText({ locator: drpDwnPhoneCountry, drpDwnVal: countryIndia });
      typeText({ locator: txtFieldPhoneNumber, dataText: phoneNum });
      typeDrpDwnWithMachtingText({ locator: drpdwnFaxCountry, drpDwnVal: countryIndia });
      typeText({ locator: txtFieldFaxNumber, dataText: generateRandomNumberByLength({ lengthOfNum: 10 }) });
      typeText({ locator: txtFieldEmail, dataText: emailUpdated });
      typeDrpDwnWithMachtingText({ locator: drpDwnChatType, drpDwnVal: imServiceType });
      typeText({ locator: txtFieldChatUserName, dataText: contactType });
      clickAction({ locator: btnAddNewContact });
      //Save driver
      driverSaveAction();
      toastWithMsg({ message: msgUpdated });
      //Duplicate phone number
      scrollIntoView({ locator: btnContactsAddNew });
      clickAction({ locator: btnContactsAddNew });
      typeDrpDwnWithMachtingText({ locator: drpDwnPhoneCountry, drpDwnVal: countryIndia });
      typeText({ locator: txtFieldPhoneNumber, dataText: phoneNum });
      verifyLabel({ locator: lblContactWarning, verifyText: contactDuplicatMsg });
      notClickable({ locator: btnAddNewContact });
    });
  it('ME-74720 Can User Verify validation for duplicate entries in Driver Contacts Card with respect to Email',
    () => {
      searchDriverWithCode({ driverCode: driverDataTDM.driverCode });
      //creating driver conatct info
      clickAction({ locator: tabDriverGeneral });
      scrollIntoView({ locator: btnContactsAddNew });
      clickAction({ locator: btnContactsAddNew });
      clearTextType({ element: txtFieldName, typeText: contactType });
      typeDrpDwnWithMachtingText({ locator: drpDwnType, drpDwnVal: contactType });
      typeDrpDwnWithMachtingText({ locator: drpDwnPhoneCountry, drpDwnVal: countryIndia });
      typeText({ locator: txtFieldPhoneNumber, dataText: phoneNum });
      typeDrpDwnWithMachtingText({ locator: drpdwnFaxCountry, drpDwnVal: countryIndia });
      typeText({ locator: txtFieldFaxNumber, dataText: generateRandomNumberByLength({ lengthOfNum: 10 }) });
      typeText({ locator: txtFieldEmail, dataText: emailUpdated });
      typeDrpDwnWithMachtingText({ locator: drpDwnChatType, drpDwnVal: imServiceType });
      typeText({ locator: txtFieldChatUserName, dataText: contactType });
      clickAction({ locator: btnAddNewContact });
      //Save driver
      driverSaveAction();
      toastWithMsg({ message: msgUpdated });
      //Duplicate Email
      scrollIntoView({ locator: btnContactsAddNew });
      clickAction({ locator: btnContactsAddNew });
      typeDrpDwnWithMachtingText({ locator: drpDwnPhoneCountry, drpDwnVal: countryIndia });
      typeText({ locator: txtFieldEmail, dataText: emailUpdated });
      verifyLabel({ locator: lblContactWarning, verifyText: contactDuplicatMsg });
      notClickable({ locator: btnAddNewContact });
    });
  it('ME-74721 Can User Verify validation for duplicate entries in Driver Contacts Card with respect to IM User',
    () => {
      searchDriverWithCode({ driverCode: driverDataTDM.driverCode });
      //creating driver conatct info
      clickAction({ locator: tabDriverGeneral });
      scrollIntoView({ locator: btnContactsAddNew });
      clickAction({ locator: btnContactsAddNew });
      clearTextType({ element: txtFieldName, typeText: contactType });
      typeDrpDwnWithMachtingText({ locator: drpDwnType, drpDwnVal: contactType });
      typeDrpDwnWithMachtingText({ locator: drpDwnPhoneCountry, drpDwnVal: countryIndia });
      typeText({ locator: txtFieldPhoneNumber, dataText: phoneNum });
      typeDrpDwnWithMachtingText({ locator: drpdwnFaxCountry, drpDwnVal: countryIndia });
      typeText({ locator: txtFieldFaxNumber, dataText: generateRandomNumberByLength({ lengthOfNum: 10 }) });
      typeText({ locator: txtFieldEmail, dataText: emailUpdated });
      typeDrpDwnWithMachtingText({ locator: drpDwnChatType, drpDwnVal: imServiceType });
      typeText({ locator: txtFieldChatUserName, dataText: contactType });
      clickAction({ locator: btnAddNewContact });
      //Save driver
      driverSaveAction();
      toastWithMsg({ message: msgUpdated });
      //Duplicate IM user
      scrollIntoView({ locator: btnContactsAddNew });
      clickAction({ locator: btnContactsAddNew });
      typeDrpDwnWithMachtingText({ locator: drpDwnChatType, drpDwnVal: imServiceType });
      typeText({ locator: txtFieldChatUserName, dataText: contactType });
      verifyLabel({ locator: lblContactWarning, verifyText: contactDuplicatMsg });
      notClickable({ locator: btnAddNewContact });
    });
});