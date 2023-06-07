/*---------------------------------------------------------------------------------------------------------------
List to all Data to create Associate Contact With Save And Continue with below Minion terms//
Test Cases List               : [ME-150301, ME-150122, ME-146531, ME-150297, ME-150126, ME-146504, ME-146478, ME-150124]
Authored By                   : Lingaswamy Kottha
Date                          : 25-04-2023
Functions/Calling References  : contactPage,commonData,crmIndustryData,crmContactsData,utilities
Test cases Included           : Can User Edit new contact, Save and Continue, Save and Close with an Associate contact in the contacts Tab > CRMV2 > Contacts
---------------------------------------------------------------------------------------------------------------*/

import {
  generateRandomNumber,
  getMinionValues,
  getTDMData,
  previousTab,
  toastMsg,
  viewFullPage,
  waitSometime,
} from '../../../../../utilities/commonUtils/genericUtils';
import commonData from '../../../../../testData/staticData/commonData/commonData.json';
import crmIndustryData from '../../../../../testData/crm/crmData/crmIndustryData.json';
import { loginToApplication } from '../../../../../utilities/appSpecificUtils/loginUtils/loginUtils';
import crmContactsData from '../../../../../testData/crm/crmData/crmContactsData.json';
import {
  navigateToTheCrmV2Tab,
} from '../../../../../utilities/carrierUtils/carrierUtils';
import {
  navigateToTheCrmV2TabCustomer,
} from '../../../../../utilities/customerUtils/customerUtils';
import {
  addNewContact,
  editNewContact,
  editNewContactWithName,
  associateContactExtSaveAndContinue,
  addDupContactSaveAndClose,
  addDupContactSaveAndContinue,
} from '../../../../../utilities/contactsUtils/contactsUtils';
import { verifyMailId, verifyPhone } from '../../../../../utilities/crmUtils/crmUtils';
const { longWait } = commonData;
const {
  email,
  phoneNo,
  prefixTxt,
} = crmContactsData.userDefinedData;
const {
  tdmAddCustomerReq,
  tdmCustomerData,
  tdmCustomerScenario,
} = crmIndustryData.staticData;
const {
  tdmAddCarrierReq,
  tdmCarrierData,
  tdmCarrierNewScenario,
} = crmIndustryData.staticData;
const { userName: usernameText, password: passwordText } = Cypress.env('users')[Cypress.env('appLoginUser')];

let customerNameVal, contactDepName, randomContactName, randomPhNo, newContactTabEmailVal, newContactTabPhoneVal;
let carrierNameVal;
describe('Can user edit Contact(s)  Associate Contact in the contacts Tab > Customer > CRMV2 > Contacts Tab > Edit [ME-150301, ME-150122, ME-146531, ME-150297, ME-150126, ME-146504, ME-146478, ME-150124]', () => {
  beforeEach(() => {
    getMinionValues('contactDepartment', 1).then((contactDepartment) => {
      contactDepName = contactDepartment[0];
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
    randomPhNo = phoneNo + generateRandomNumber();
    cy.log(randomPhNo);
    newContactTabPhoneVal = verifyPhone({ textType: randomPhNo });
    cy.log(newContactTabPhoneVal);
    newContactTabEmailVal = verifyMailId({ textType: email });
    cy.log(newContactTabEmailVal);
  });

  it('ME-150301 Can User edit new contact, Save and Continue with an Associate contact in the contacts Tab > CRMV2 > Contacts | Carrier Regression | Sprint Regression', {
    tags: [
      '@carrier',
      '@crm',
      '@carrierContacts',
      '@p1',
      '@phase2',
    ],
  },
  () => {
    //Customer
    navigateToTheCrmV2TabCustomer({ customerName: customerNameVal.customerName });
    addNewContact({ contactName: contactDepName, randomName: randomContactName, phoneNo: randomPhNo, emailId: newContactTabEmailVal });
    waitSometime(longWait);
    editNewContact(randomContactName);
    editNewContactWithName(randomPhNo);
    previousTab();
  });
  it('ME-150122 Can User edit new contact, Save and close with an Associate contact(Carrier) in the contacts Tab > CRMV2 > Contacts | Carrier Regression | Sprint Regression', {
    tags: [
      '@carrier',
      '@crm',
      '@carrierContacts',
      '@p1',
    ],
  },
  () => {
    //Carrier
    navigateToTheCrmV2Tab({ carrierName: carrierNameVal.carrierName });
    addNewContact({ contactName: contactDepName, randomName: randomContactName, phoneNo: randomPhNo, emailId: newContactTabEmailVal });
    waitSometime(longWait);
    editNewContact(randomContactName);
    editNewContactWithName(randomPhNo);
  });
  it('ME-146531 Can User Create(Customer) Contacts with Save and Continue in the contacts Tab > CRMV2 > Contacts | Carrier Regression | Sprint Regression', {
    tags: [
      '@carrier',
      '@crm',
      '@carrierContacts',
      '@p1',
    ],
  },
  () => {
    //Customer
    navigateToTheCrmV2TabCustomer({ customerName: customerNameVal.customerName });
    associateContactExtSaveAndContinue({ contactName: contactDepName, randomName: randomContactName, phoneNo: randomPhNo, emailId: newContactTabEmailVal });
    editNewContactWithName(randomPhNo);
  });
  it('ME-150297 Can User Create(Carrier) Contacts with Save and Continue in the contacts Tab > CRMV2 > Contacts | Carrier Regression | Sprint Regression', {
    tags: [
      '@carrier',
      '@crm',
      '@carrierContacts',
      '@p1',
    ],
  },
  () => {
    //Carrier
    navigateToTheCrmV2Tab({ carrierName: carrierNameVal.carrierName });
    associateContactExtSaveAndContinue({ contactName: contactDepName, randomName: randomContactName, phoneNo: randomPhNo, emailId: newContactTabEmailVal });
    editNewContactWithName(randomPhNo);
  });
  it('ME-146504 Can User Edit Duplicate Contact" saved with the required fields via Save and Close > Ignore contact > CRMV2 > Contacts | Carrier Regression | Sprint Regression', {
    tags: [
      '@carrier',
      '@crm',
      '@carrierContacts',
      '@p1',
    ],
  },
  () => {
    //Customer
    navigateToTheCrmV2TabCustomer({ customerName: customerNameVal.customerName });
    addNewContact({ contactName: contactDepName, randomName: randomContactName, phoneNo: randomPhNo, emailId: newContactTabEmailVal });
    toastMsg();
    waitSometime(longWait);
    addDupContactSaveAndClose({ contactName: contactDepName, randomName: randomContactName, phoneNo: randomPhNo, emailId: newContactTabEmailVal });
    editNewContact(randomContactName);
    editNewContactWithName(randomPhNo);
  });
  it('ME-150126 Can User Edit Duplicate Contact" saved with the required fields via Save and Close > Ignore contact > CRMV2 > Contacts | Carrier Regression | Sprint Regression', {
    tags: [
      '@carrier',
      '@crm',
      '@carrierContacts',
      '@p1',
    ],
  },
  () => {
    //Carrier
    navigateToTheCrmV2Tab({ carrierName: carrierNameVal.carrierName });
    addNewContact({ contactName: contactDepName, randomName: randomContactName, phoneNo: randomPhNo, emailId: newContactTabEmailVal });
    toastMsg();
    waitSometime(longWait);
    addDupContactSaveAndClose({ contactName: contactDepName, randomName: randomContactName, phoneNo: randomPhNo, emailId: newContactTabEmailVal });
    editNewContact(randomContactName);
    editNewContactWithName(randomPhNo);
  });
  it('ME-146478 Can User edit duplicate contact, Save and Continue with an Associate contact in the contacts Tab > CRMV2 > Contacts | Carrier Regression | Sprint Regression', {
    tags: [
      '@carrier',
      '@crm',
      '@carrierContacts',
      '@p1',
    ],
  },
  () => {
    //Customer
    navigateToTheCrmV2TabCustomer({ customerName: customerNameVal.customerName });
    associateContactExtSaveAndContinue({ contactName: contactDepName, randomName: randomContactName, phoneNo: randomPhNo, emailId: newContactTabEmailVal });
    previousTab();
    addDupContactSaveAndContinue({ contactName: contactDepName, randomName: randomContactName, phoneNo: randomPhNo, emailId: newContactTabEmailVal });
    editNewContact(randomContactName);
    editNewContactWithName(randomPhNo);
  });
  it('ME-150124 Can User edit duplicate contact, Save and Continue with an Associate contact in the contacts Tab > CRMV2 > Contacts | Carrier Regression | Sprint Regression', {
    tags: [
      '@carrier',
      '@crm',
      '@carrierContacts',
      '@p1',
    ],
  },
  () => {
    //Carrier
    navigateToTheCrmV2Tab({ carrierName: carrierNameVal.carrierName });
    associateContactExtSaveAndContinue({ contactName: contactDepName, randomName: randomContactName, phoneNo: randomPhNo, emailId: newContactTabEmailVal });
    previousTab();
    addDupContactSaveAndContinue({ contactName: contactDepName, randomName: randomContactName, phoneNo: randomPhNo, emailId: newContactTabEmailVal });
    editNewContact(randomContactName);
    editNewContactWithName(randomPhNo);
  });
});