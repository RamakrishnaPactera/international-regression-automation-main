/*---------------------------------------------------------------------------------------------------------------
Verify the contact object screen for "Add New Contact" is saved with the required fields via Save and Continue To Record > CRMV2 > Contacts > Customer | Carrier
Test Cases List
Authored By                   : Sanjeev
Date                          : 19-04-2023
Functions/Calling References  : contactPage,commonData,crmIndustryData,crmContactsData,utilities
Test cases Included           : ME-146476 Verify the contact object screen for "Add New Contact" is saved with the required fields via Save and Continue To Record > CRMV2 > Contacts > Customer | Carrier
---------------------------------------------------------------------------------------------------------------*/
import {
  clickAction,
  generateRandomNumber,
  getMinionValues,
  getTDMData,
  navigateToChildWindow,
  previousTab,
  toastMsg,
  viewFullPage,
  waitSometime,
} from '../../../utilities/commonUtils/genericUtils';
import contactPage from '../../../pageObjects/crm/contactPage/contactPage.json';
import commonData from '../../../testData/staticData/commonData/commonData.json';
import crmIndustryData from '../../../testData/crm/crmData/crmIndustryData.json';
import { loginToApplication } from '../../../utilities/appSpecificUtils/loginUtils/loginUtils';
import crmContactsData from '../../../testData/crm/crmData/crmContactsData.json';
import {
  navigateToTheCrmV2TabCustomer,
} from '../../../utilities/customerUtils/customerUtils';
import {
  addDupContactSaveAndClose,
  addDupContactSaveAndContinue,
  addNewContact,
  navigateToTheCrmV2TabCarrier,
} from '../../../utilities/carrierUtils/carrierUtils';
import { verifyMailId, verifyPhone } from '../../../utilities/crmUtils/crmUtils';
const { shortWait, longWait } = commonData;
const {
  prefixTxt,
  phoneNo,
  email,
} = crmContactsData.userDefinedData;
const {
  btnContactsIgnoreAndAddNewContact,
} = contactPage;
const {
  tdmAddCustomerReq,
  tdmCustomerData,
  tdmCustomerScenario,
  tdmAddCarrierReq,
  tdmCarrierData,
  tdmCarrierNewScenario,
} = crmIndustryData.staticData;
const { userName: usernameText, password: passwordText } = Cypress.env('users')[Cypress.env('appLoginUser')];
let customerNameVal, carrierNameVal, contactDepName, contactDepName2, randomContactName, randomContactName2, randomPhNo, randomPhNo2, newContactTabEmailVal, newContactTabEmailVal2, newContactTabPhoneVal, newContactTabPhoneVal2;
describe('Can I create Duplicate Contact(s) Detected, Ignore and Add New Contact in the contacts Tab > Customer > CRMV2 > Contacts Tab > Duplicate Contacts [ME-146476]', () => {
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
    newContactTabPhoneVal2 = verifyPhone({ textType: randomPhNo2 });
    cy.log(newContactTabPhoneVal, newContactTabPhoneVal2);
    newContactTabEmailVal = verifyMailId({ textType: email });
    newContactTabEmailVal2 = verifyMailId({ textType: email });
    cy.log(newContactTabEmailVal, newContactTabEmailVal2);
  });
  it('ME-146476 Verify the duplicate contact record in the contacts table which is saved via Save and Close > ignore contact > CRMV2 > Contacts > Carrier', {
    tags: [
      '@carrier',
      '@crm',
      '@carrierContacts',
      '@p1',
      '@phase2',
    ],
  },
  () => {
    navigateToTheCrmV2TabCustomer({ customerName: customerNameVal.customerName });
    waitSometime(shortWait);
    addNewContact({ contactName: contactDepName, randomName: randomContactName, phoneNo: randomPhNo, emailId: newContactTabEmailVal });
    waitSometime(shortWait);
    addDupContactSaveAndClose({ contactName: contactDepName, randomName: randomContactName, phoneNo: randomPhNo, emailId: newContactTabEmailVal });
    waitSometime(shortWait);
    addDupContactSaveAndContinue({ contactName: contactDepName, randomName: randomContactName, phoneNo: randomPhNo, emailId: newContactTabEmailVal });
    navigateToChildWindow();
    clickAction({ locator: btnContactsIgnoreAndAddNewContact });
    toastMsg();
    waitSometime(longWait);
    previousTab();
    //carrier
    waitSometime(longWait);
    navigateToTheCrmV2TabCarrier({ carrierName: carrierNameVal.carrierName });
    waitSometime(shortWait);
    addNewContact({ contactName: contactDepName2, randomName: randomContactName2, phoneNo: randomPhNo2, emailId: newContactTabEmailVal2 });
    waitSometime(shortWait);
    addDupContactSaveAndClose({ contactName: contactDepName2, randomName: randomContactName2, phoneNo: randomPhNo2, emailId: newContactTabEmailVal2 });
    waitSometime(shortWait);
    addDupContactSaveAndContinue({ contactName: contactDepName2, randomName: randomContactName2, phoneNo: randomPhNo2, emailId: newContactTabEmailVal2 });
    navigateToChildWindow();
    clickAction({ locator: btnContactsIgnoreAndAddNewContact });
    toastMsg();
  });
});