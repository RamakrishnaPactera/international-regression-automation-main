/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------
 Validating contact details such as IM username in driver pages
 Test Cases List              : [ME-133958,ME-133959,ME-133960]
 Authored By                  : Lingaswamy Kottha
 Date                         : 12-05-2023,
 Functions/Calling References : genericUtils, loginUtils, resourceUtils, utilities
 Test case Included           : ME-133958,ME-133959,ME-133960 Test Driver Contact Details - Functional Testcase
-----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/

import { loginToApplication } from '../../../../../utilities/appSpecificUtils/loginUtils/loginUtils';
import { enterDriverMandatoryFields, navigateToDriverAddNewPage, searchDriverWithCode, driverSaveAction } from '../../../../../utilities/assetUtils/resourceUtilis';
import { scrollIntoView, viewFullPage, clickAction, typeText, typeDrpDwnWithMachtingText, waitSometime, clearTextType, verifyMaxExactLength, toastWithMsg, getTDMData } from '../../../../../utilities/commonUtils/genericUtils';
import { generateRandomNumberByLength, generateRandomAlphaNumByLength } from '../../../../../tdm/lib/utilities/utilities';
import generalData from '../../../../../testData/assets/driver/driverDetails/general/generalData.json';
import driverAddNewPage from '../../../../../pageObjects/assets/driver/addDriver/addDriverPage.json';
import commonData from '../../../../../testData/staticData/commonData/commonData.json';
import addDriverData from '../../../../../testData/assets/driver/addDriver/addDriverData.json';
import preferencesData from '../../../../../testData/assets/driver/driverDetails/preferences/preferencesData.json';
import driverCommonPage from '../../../../../pageObjects/assets/driver/driverCommonPage.json';
const { shortWait } = commonData;
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
  txtFieldPhoneExtension,
  drpdwnFaxCountry,
  txtFieldFaxNumber,
  txtFieldEmail,
  drpDwnChatType,
  txtFieldChatUserName,
} = driverAddNewPage.contacts;
const {
  countryIndia,
} = generalData.staticData;
const {
  contactType,
  emailValue,
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
describe('Validating contact details such as IM user name in driver pages [ME-133958,ME-133959,ME-1339605]', () => {
  beforeEach(() => {
    viewFullPage();
    loginToApplication({ username: usernameText, password: passwordText });
    getTDMData({ dataType: tdmDriverData, dataCondition: tdmAddDriverReq, dataScenario: tdmDriverCommonScenario });
    cy.then(() => {
      driverDataTDM = Cypress.env('inputVal');
    });
  });
  it('ME-133958 Can User give data for IM username field with less than 60 characters_Test [FE] Driver - Contacts :  Add validation for IM Username',
    () => {
      navigateToDriverAddNewPage();
      //creating driver with mandatory fields
      enterDriverMandatoryFields();
      //creating driver conatct info
      scrollIntoView({ locator: btnContactsAddNew });
      clickAction({ locator: btnContactsAddNew });
      waitSometime(shortWait);
      verifyMaxExactLength({ locator: txtFieldName, maxLength: 10 });
      //clearTextType({ element: txtFieldName, typeText: generateRandomAlphaNumByLength({ lengthOfString: 5 }) });
      typeDrpDwnWithMachtingText({ locator: drpDwnType, drpDwnVal: contactType });
      typeDrpDwnWithMachtingText({ locator: drpDwnPhoneCountry, drpDwnVal: countryIndia });
      typeText({ locator: txtFieldPhoneNumber, dataText: generateRandomNumberByLength({ lengthOfNum: 10 }) });
      const phoneExtn = generateRandomNumberByLength({ lengthOfNum: 3 });
      typeText({ locator: txtFieldPhoneExtension, dataText: phoneExtn });
      typeDrpDwnWithMachtingText({ locator: drpdwnFaxCountry, drpDwnVal: countryIndia });
      typeText({ locator: txtFieldFaxNumber, dataText: generateRandomNumberByLength({ lengthOfNum: 10 }) });
      typeText({ locator: txtFieldEmail, dataText: emailValue });
      typeDrpDwnWithMachtingText({ locator: drpDwnChatType, drpDwnVal: imServiceType });
      verifyMaxExactLength({ locator: txtFieldChatUserName, maxLength: 55 });
      clickAction({ locator: btnAddNewContact });
      waitSometime(shortWait);
      //Save driver
      driverSaveAction();
      toastWithMsg({ message: msgUpdated });
      searchDriverWithCode({ driverCode: driverDataTDM.driverCode });
      //creating driver conatct info
      clickAction({ locator: tabDriverGeneral });
      scrollIntoView({ locator: btnContactsAddNew });
      clickAction({ locator: btnContactsAddNew });
      waitSometime(shortWait);
      verifyMaxExactLength({ locator: txtFieldName, maxLength: 10 });
      //clearTextType({ element: txtFieldName, typeText: generateRandomAlphaNumByLength({ lengthOfString: 5 }) });
      typeDrpDwnWithMachtingText({ locator: drpDwnType, drpDwnVal: contactType });
      typeDrpDwnWithMachtingText({ locator: drpDwnPhoneCountry, drpDwnVal: countryIndia });
      typeText({ locator: txtFieldPhoneNumber, dataText: generateRandomNumberByLength({ lengthOfNum: 10 }) });
      typeText({ locator: txtFieldPhoneExtension, dataText: phoneExtn });
      typeDrpDwnWithMachtingText({ locator: drpdwnFaxCountry, drpDwnVal: countryIndia });
      typeText({ locator: txtFieldFaxNumber, dataText: generateRandomNumberByLength({ lengthOfNum: 10 }) });
      typeText({ locator: txtFieldEmail, dataText: emailUpdated });
      typeDrpDwnWithMachtingText({ locator: drpDwnChatType, drpDwnVal: imServiceType });
      verifyMaxExactLength({ locator: txtFieldChatUserName, maxLength: 55 });
      clickAction({ locator: btnAddNewContact });
      waitSometime(shortWait);
      //Save driver
      driverSaveAction();
      toastWithMsg({ message: msgUpdated });
    });
  it('ME-133959 Can User give data for IM username field with  60 characters_Test [FE] Driver - Contacts :  Add validation for IM Username',
    () => {
      navigateToDriverAddNewPage();
      //creating driver with mandatory fields
      enterDriverMandatoryFields();
      //creating driver conatct info
      scrollIntoView({ locator: btnContactsAddNew });
      clickAction({ locator: btnContactsAddNew });
      waitSometime(shortWait);
      verifyMaxExactLength({ locator: txtFieldName, maxLength: 10 });
      //clearTextType({ element: txtFieldName, typeText: generateRandomAlphaNumByLength({ lengthOfString: 5 }) });
      typeDrpDwnWithMachtingText({ locator: drpDwnType, drpDwnVal: contactType });
      typeDrpDwnWithMachtingText({ locator: drpDwnPhoneCountry, drpDwnVal: countryIndia });
      typeText({ locator: txtFieldPhoneNumber, dataText: generateRandomNumberByLength({ lengthOfNum: 10 }) });
      const phoneExtn = generateRandomNumberByLength({ lengthOfNum: 3 });
      typeText({ locator: txtFieldPhoneExtension, dataText: phoneExtn });
      typeDrpDwnWithMachtingText({ locator: drpdwnFaxCountry, drpDwnVal: countryIndia });
      typeText({ locator: txtFieldFaxNumber, dataText: generateRandomNumberByLength({ lengthOfNum: 10 }) });
      typeText({ locator: txtFieldEmail, dataText: emailValue });
      typeDrpDwnWithMachtingText({ locator: drpDwnChatType, drpDwnVal: imServiceType });
      verifyMaxExactLength({ locator: txtFieldChatUserName, maxLength: 60 });
      clickAction({ locator: btnAddNewContact });
      waitSometime(shortWait);
      //Save driver
      driverSaveAction();
      toastWithMsg({ message: msgUpdated });
      searchDriverWithCode({ driverCode: driverDataTDM.driverCode });
      //creating driver conatct info
      clickAction({ locator: tabDriverGeneral });
      scrollIntoView({ locator: btnContactsAddNew });
      clickAction({ locator: btnContactsAddNew });
      waitSometime(shortWait);
      verifyMaxExactLength({ locator: txtFieldName, maxLength: 10 });
      //clearTextType({ element: txtFieldName, typeText: generateRandomAlphaNumByLength({ lengthOfString: 5 }) });
      typeDrpDwnWithMachtingText({ locator: drpDwnType, drpDwnVal: contactType });
      typeDrpDwnWithMachtingText({ locator: drpDwnPhoneCountry, drpDwnVal: countryIndia });
      typeText({ locator: txtFieldPhoneNumber, dataText: generateRandomNumberByLength({ lengthOfNum: 10 }) });
      typeText({ locator: txtFieldPhoneExtension, dataText: phoneExtn });
      typeDrpDwnWithMachtingText({ locator: drpdwnFaxCountry, drpDwnVal: countryIndia });
      typeText({ locator: txtFieldFaxNumber, dataText: generateRandomNumberByLength({ lengthOfNum: 10 }) });
      typeText({ locator: txtFieldEmail, dataText: emailUpdated });
      typeDrpDwnWithMachtingText({ locator: drpDwnChatType, drpDwnVal: imServiceType });
      verifyMaxExactLength({ locator: txtFieldChatUserName, maxLength: 60 });
      clickAction({ locator: btnAddNewContact });
      waitSometime(shortWait);
      //Save driver
      driverSaveAction();
      toastWithMsg({ message: msgUpdated });
    });
  it('ME-133960 Can User give data for IM username field with more than  60 characters_Test [FE] Driver - Contacts :  Add validation for IM Username',
    () => {
      navigateToDriverAddNewPage();
      enterDriverMandatoryFields();
      //creating driver conatct info
      scrollIntoView({ locator: btnContactsAddNew });
      clickAction({ locator: btnContactsAddNew });
      waitSometime(shortWait);
      verifyMaxExactLength({ locator: txtFieldName, maxLength: 10 });
      //clearTextType({ element: txtFieldName, typeText: generateRandomAlphaNumByLength({ lengthOfString: 5 }) });
      typeDrpDwnWithMachtingText({ locator: drpDwnType, drpDwnVal: contactType });
      typeDrpDwnWithMachtingText({ locator: drpDwnPhoneCountry, drpDwnVal: countryIndia });
      typeText({ locator: txtFieldPhoneNumber, dataText: generateRandomNumberByLength({ lengthOfNum: 10 }) });
      const phoneExtn = generateRandomNumberByLength({ lengthOfNum: 3 });
      typeText({ locator: txtFieldPhoneExtension, dataText: phoneExtn });
      typeDrpDwnWithMachtingText({ locator: drpdwnFaxCountry, drpDwnVal: countryIndia });
      typeText({ locator: txtFieldFaxNumber, dataText: generateRandomNumberByLength({ lengthOfNum: 10 }) });
      typeText({ locator: txtFieldEmail, dataText: emailValue });
      typeDrpDwnWithMachtingText({ locator: drpDwnChatType, drpDwnVal: imServiceType });
      clearTextType({ element: txtFieldChatUserName, typeText: generateRandomAlphaNumByLength({ lengthOfString: 5 }) });
      const countLength = generateRandomNumberByLength({ lengthOfNum: 67 }).length;
      if (countLength > 60) {
        cy.get(txtFieldChatUserName).clear().type(generateRandomNumberByLength({ lengthOfNum: 67 }), { force: true }).invoke('val').should('have.length', 60);
      }
      clickAction({ locator: btnAddNewContact });
      waitSometime(shortWait);
      //Save driver
      driverSaveAction();
      toastWithMsg({ message: msgUpdated });
      searchDriverWithCode({ driverCode: driverDataTDM.driverCode });
      //creating driver conatct info
      clickAction({ locator: tabDriverGeneral });
      scrollIntoView({ locator: btnContactsAddNew });
      clickAction({ locator: btnContactsAddNew });
      waitSometime(shortWait);
      verifyMaxExactLength({ locator: txtFieldName, maxLength: 10 });
      //clearTextType({ element: txtFieldName, typeText: generateRandomAlphaNumByLength({ lengthOfString: 5 }) });
      typeDrpDwnWithMachtingText({ locator: drpDwnType, drpDwnVal: contactType });
      typeDrpDwnWithMachtingText({ locator: drpDwnPhoneCountry, drpDwnVal: countryIndia });
      typeText({ locator: txtFieldPhoneNumber, dataText: generateRandomNumberByLength({ lengthOfNum: 10 }) });
      typeText({ locator: txtFieldPhoneExtension, dataText: phoneExtn });
      typeDrpDwnWithMachtingText({ locator: drpdwnFaxCountry, drpDwnVal: countryIndia });
      typeText({ locator: txtFieldFaxNumber, dataText: generateRandomNumberByLength({ lengthOfNum: 10 }) });
      typeText({ locator: txtFieldEmail, dataText: emailUpdated });
      typeDrpDwnWithMachtingText({ locator: drpDwnChatType, drpDwnVal: imServiceType });
      clearTextType({ element: txtFieldChatUserName, typeText: generateRandomAlphaNumByLength({ lengthOfString: 5 }) });
      if (countLength > 60) {
        cy.get(txtFieldChatUserName).clear().type(generateRandomNumberByLength({ lengthOfNum: 67 }), { force: true }).invoke('val').should('have.length', 60);
      }
      clickAction({ locator: btnAddNewContact });
      driverSaveAction();
      toastWithMsg({ message: msgUpdated });
    });
});