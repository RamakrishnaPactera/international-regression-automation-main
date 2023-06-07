//---------------------------------------------------------------------------------------------------------------
//List to all Data to create Associate Contact With SaveAndClose below Minion terms//
//Test Cases List
//Authored By                   : Gayathri Alley
//Date                          : 28-03-2023
//Functions/Calling References  : contactPage,commonData,crmIndustryData,crmContactsData,utilities
//Test cases Included           : ME-122049 Can I create Add new contact, Save and Close with an Associate contact in the contacts Tab > CRMV2 > Contacts
//---------------------------------------------------------------------------------------------------------------

import {
  clickVisibleElement,
  generateRandomNumber,
  getMinionValues,
  getTDMData,
  previousTab,
  toastMsg,
  toastMsgError,
  verifyToExist,
  viewFullPage,
  waitSometime,
} from '../../../../../utilities/commonUtils/genericUtils';
import contactPage from '../../../../../pageObjects/crm/contactPage/contactPage.json';
import commonData from '../../../../../testData/staticData/commonData/commonData.json';
import crmIndustryData from '../../../../../testData/crm/crmData/crmIndustryData.json';
import { loginToApplication } from '../../../../../utilities/appSpecificUtils/loginUtils/loginUtils';
import crmContactsData from '../../../../../testData/crm/crmData/crmContactsData.json';
import {
  navigateToTheCrmV2Tab,
} from '../../../../../utilities/carrierUtils/carrierUtils';
import {
  addNewContact,
  associateContactExtSaveAndClose,
  navigateToTheCrmV2TabCustomer,
} from '../../../../../utilities/customerUtils/customerUtils';
import { verifyMailId, verifyPhone } from '../../../../../utilities/crmUtils/crmUtils';
const { shortWait, longWait } = commonData;
const {
  email,
  phoneNo,
  prefixTxt,
} = crmContactsData.userDefinedData;
const {
  btnCloseEditAssociatedEntity,
  btnSaveEditAssociatedEntity,
  tabAssociatedEntities,
} = contactPage;
const {
  tdmAddCustomerReq,
  tdmCustomerData,
  tdmCustomerNewScenario,
} = crmIndustryData.staticData;
const {
  tdmAddCarrierReq,
  tdmCarrierData,
  tdmCarrierNewScenario,
} = crmIndustryData.staticData;
const { userName: usernameText, password: passwordText } = Cypress.env('users')[Cypress.env('appLoginUser')];

let customerNameVal, contactDepName, randomContactName, randomPhNo, newContactTabEmailVal, newContactTabPhoneVal;
let carrierNameVal;
describe('Can I create Duplicate Contact(s) Detected, Associate Contact in the contacts Tab > Customer > CRMV2 > Contacts Tab > Duplicate Contacts [ME-122049]', () => {
  beforeEach(() => {
    getMinionValues('contactDepartment', 1).then((contactDepartment) => {
      contactDepName = contactDepartment[0];
    });
    getTDMData({ dataType: tdmCustomerData, dataCondition: tdmAddCustomerReq, dataScenario: tdmCustomerNewScenario });
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

  it('ME-122049 Can I create Add new contact, Save and Close with an Associate contact in the contacts Tab > CRMV2 > Contacts | Carrier Regression | Sprint Regression', {
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
    cy.log('***Create Add New Contact in Carrier***');
    addNewContact({ contactName: contactDepName, randomName: randomContactName, phoneNo: randomPhNo, emailId: newContactTabEmailVal });
    cy.log('***Verify Add New Contact Update Msg***');
    toastMsg();
    waitSometime(longWait);
    navigateToTheCrmV2Tab({ carrierName: carrierNameVal.carrierName });
    cy.log('***Create Associate Contact with an Entity in Customer***');
    associateContactExtSaveAndClose({ contactName: contactDepName, randomName: randomContactName, phoneNo: randomPhNo, emailId: newContactTabEmailVal });
    waitSometime(shortWait);
    verifyToExist({ element: btnSaveEditAssociatedEntity });
    clickVisibleElement({ locator: btnSaveEditAssociatedEntity });
    cy.log('***Verify Associate Entity Update Msg***');
    toastMsg();
    waitSometime(longWait);
    previousTab();
    associateContactExtSaveAndClose({ contactName: contactDepName, randomName: randomContactName, phoneNo: randomPhNo, emailId: newContactTabEmailVal });
    waitSometime(shortWait);
    verifyToExist({ element: btnSaveEditAssociatedEntity });
    clickVisibleElement({ locator: btnSaveEditAssociatedEntity });
    cy.log('***Verify Associate Entity Error Msg***');
    toastMsgError();
    previousTab();
    associateContactExtSaveAndClose({ contactName: contactDepName, randomName: randomContactName, phoneNo: randomPhNo, emailId: newContactTabEmailVal });
    waitSometime(shortWait);
    clickVisibleElement({ locator: btnCloseEditAssociatedEntity });
    cy.log('***Verify Associate Entity Tab***');
    verifyToExist({ element: tabAssociatedEntities });
  });
});