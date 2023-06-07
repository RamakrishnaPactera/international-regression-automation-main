/*---------------------------------------------------------------------------------------------------------------
List to all Data to create Associate Contact With SaveAndClose, SaveAndContinue below Minion terms
Test Cases List
Authored By                   : Pruthvi raj G
Date                          : 27-04-2023
Functions/Calling References  : contactPage, commonData, crmContactsData, utilities
Test cases Included           : ME-146481 Can user verify the contact object screen for the duplicate contact saved via Save and Close > associate contact > CRMV2 > Contacts > Customer | Carrier
                              : ME-146484 Can user Verify the error validation for the Add Associated Entities saved with the mandatory fields if it is associated with the Customer | Carrier
                              : ME-150252 Can user Verify the error validation for the Add Associated Entities saved with the mandatory fields if it is associated with the Customer | Carrier
                              : ME-146491 Verify the updated toast msg validation for the Add Associated Entities saved with the mandatory fields if it is not associated with the Customer | Carrier
                              : ME-150353 Verify the updated toast msg validation for the Add Associated Entities saved with the mandatory fields if it is not associated with the Customer | Carrier
---------------------------------------------------------------------------------------------------------------*/
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
} from '../../../utilities/commonUtils/genericUtils';
import {
  addNewContact,
  associateContactExtSaveAndClose,
  navigateToTheCrmV2Tab,
} from '../../../utilities/carrierUtils/carrierUtils';
import contactPage from '../../../pageObjects/crm/contactPage/contactPage.json';
import commonData from '../../../testData/staticData/commonData/commonData.json';
import crmIndustryData from '../../../testData/crm/crmData/crmIndustryData.json';
import { loginToApplication } from '../../../utilities/appSpecificUtils/loginUtils/loginUtils';
import crmContactsData from '../../../testData/crm/crmData/crmContactsData.json';
import { verifyMailId, verifyPhone } from '../../../utilities/crmUtils/crmUtils';
import { associateContactExtSaveAndContinue, navigateToTheCrmV2TabCustomer } from '../../../utilities/customerUtils/customerUtils';
const { shortWait, longWait } = commonData;
const {
  email,
  phoneNo,
  prefixTxt,
} = crmContactsData.userDefinedData;
const {
  btnSaveEditAssociatedEntity,
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
let customerNameVal, contactDepName, contactDepName2, randomContactName, randomContactName2, randomPhNo, randomPhNo2, newContactTabEmailVal, newContactTabEmailVal2, newContactTabPhoneVal;
let carrierNameVal;

describe('Can user verify the contacts > associate contact > CRMV2 > Contacts > Customer | Carrier [ME-146481], [ME-146484] [ME-150252] [ME-146491] [ME-150353]', () => {
  beforeEach(() => {
    getMinionValues('contactDepartment', 2).then((contactDepartment) => {
      contactDepName = contactDepartment[0];
      contactDepName2 = contactDepartment[1];
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
    randomContactName2 = prefixTxt + generateRandomNumber();
    randomPhNo = phoneNo + generateRandomNumber();
    randomPhNo2 = phoneNo + generateRandomNumber();
    cy.log(randomPhNo, randomPhNo2);
    newContactTabPhoneVal = verifyPhone({ textType: randomPhNo });
    cy.log(newContactTabPhoneVal);
    newContactTabEmailVal = verifyMailId({ textType: email });
    newContactTabEmailVal2 = verifyMailId({ textType: email });
    cy.log(newContactTabEmailVal, newContactTabEmailVal2);
  });

  it('ME-146481 Can user verify the contact object screen for the duplicate contact saved via Save and Close > associate contact > CRMV2 > Contacts > Customer | Carrier | Regression', {
    tags: [
      '@carrier',
      '@customer',
      '@crm',
      '@carrierContacts',
      '@customerContacts',
      '@p1',
    ],
  },
  () => {
    navigateToTheCrmV2Tab({ carrierName: carrierNameVal.carrierName });
    cy.log('***Create Add New Contact in Carrier***');
    addNewContact({ contactName: contactDepName, randomName: randomContactName, phoneNo: randomPhNo, emailId: newContactTabEmailVal });
    cy.log('***Verify Add New Contact Update Msg***');
    toastMsg();
    waitSometime(longWait);
    cy.log('***Verify Associate Contact***');
    associateContactExtSaveAndClose({ contactName: contactDepName, randomName: randomContactName, phoneNo: randomPhNo, emailId: newContactTabEmailVal });
    waitSometime(shortWait);
    verifyToExist({ element: btnSaveEditAssociatedEntity });
    waitSometime(longWait);
    previousTab();
    waitSometime(longWait);
    cy.log('***Verify Associate Contact***');
    navigateToTheCrmV2TabCustomer({ customerName: customerNameVal.customerName });
    waitSometime(shortWait);
    associateContactExtSaveAndClose({ contactName: contactDepName, randomName: randomContactName, phoneNo: randomPhNo, emailId: newContactTabEmailVal });
    waitSometime(shortWait);
    verifyToExist({ element: btnSaveEditAssociatedEntity });
  });

  it('ME-146484 Can user Verify the error validation for the Add Associated Entities saved with the mandatory fields if it is associated with the Customer | Carrier entity > associate contact via duplicate contacts detected modal > CRMV2 > Contacts | Regression', {
    tags: [
      '@carrier',
      '@customer',
      '@crm',
      '@carrierContacts',
      '@customerContacts',
      '@p1',
    ],
  },
  () => {
    navigateToTheCrmV2Tab({ carrierName: carrierNameVal.carrierName });
    cy.log('***Create Add New Contact in Carrier***');
    addNewContact({ contactName: contactDepName, randomName: randomContactName, phoneNo: randomPhNo, emailId: newContactTabEmailVal });
    cy.log('***Verify Add New Contact Update Msg***');
    toastMsg();
    waitSometime(longWait);
    cy.log('***Create Associate Contact with an Entity in carrier***');
    associateContactExtSaveAndClose({ contactName: contactDepName, randomName: randomContactName, phoneNo: randomPhNo, emailId: newContactTabEmailVal });
    waitSometime(shortWait);
    verifyToExist({ element: btnSaveEditAssociatedEntity });
    clickVisibleElement({ locator: btnSaveEditAssociatedEntity });
    cy.log('***Verify Associate Entity Error Msg***');
    toastMsgError();
    previousTab();
    //customer
    waitSometime(longWait);
    navigateToTheCrmV2TabCustomer({ customerName: customerNameVal.customerName });
    waitSometime(shortWait);
    cy.log('***Create Add New Contact in customer***');
    addNewContact({ contactName: contactDepName2, randomName: randomContactName2, phoneNo: randomPhNo2, emailId: newContactTabEmailVal2 });
    cy.log('***Verify Add New Contact Update Msg***');
    toastMsg();
    waitSometime(longWait);
    associateContactExtSaveAndContinue({ contactName: contactDepName2, randomName: randomContactName2, phoneNo: randomPhNo2, emailId: newContactTabEmailVal2 });
    waitSometime(shortWait);
    verifyToExist({ element: btnSaveEditAssociatedEntity });
    clickVisibleElement({ locator: btnSaveEditAssociatedEntity });
    cy.log('***Verify Associate Entity Error Msg***');
    toastMsgError();
  });

  it('ME-150252 Can user Verify the error validation for the Add Associated Entities saved with the mandatory fields if it is associated with the Customer | Carrier entity > associate contact via duplicate contacts detected modal > CRMV2 > Contacts | Regression', {
    tags: [
      '@carrier',
      '@customer',
      '@crm',
      '@carrierContacts',
      '@customerContacts',
      '@p1',
    ],
  },
  () => {
    navigateToTheCrmV2Tab({ carrierName: carrierNameVal.carrierName });
    cy.log('***Create Add New Contact in Carrier***');
    addNewContact({ contactName: contactDepName, randomName: randomContactName, phoneNo: randomPhNo, emailId: newContactTabEmailVal });
    cy.log('***Verify Add New Contact Update Msg***');
    toastMsg();
    waitSometime(longWait);
    cy.log('***Create Associate Contact with an Entity in carrier***');
    associateContactExtSaveAndContinue({ contactName: contactDepName, randomName: randomContactName, phoneNo: randomPhNo, emailId: newContactTabEmailVal });
    waitSometime(shortWait);
    verifyToExist({ element: btnSaveEditAssociatedEntity });
    clickVisibleElement({ locator: btnSaveEditAssociatedEntity });
    cy.log('***Verify Associate Entity Error Msg***');
    toastMsgError();
    previousTab();
    //customer
    waitSometime(longWait);
    navigateToTheCrmV2TabCustomer({ customerName: customerNameVal.customerName });
    waitSometime(shortWait);
    cy.log('***Create Add New Contact in customer***');
    addNewContact({ contactName: contactDepName2, randomName: randomContactName2, phoneNo: randomPhNo2, emailId: newContactTabEmailVal2 });
    cy.log('***Verify Add New Contact Update Msg***');
    toastMsg();
    waitSometime(longWait);
    associateContactExtSaveAndContinue({ contactName: contactDepName2, randomName: randomContactName2, phoneNo: randomPhNo2, emailId: newContactTabEmailVal2 });
    waitSometime(shortWait);
    verifyToExist({ element: btnSaveEditAssociatedEntity });
    clickVisibleElement({ locator: btnSaveEditAssociatedEntity });
    cy.log('***Verify Associate Entity Error Msg***');
    toastMsgError();
  });

  it('ME-146491 Verify the updated toast msg validation for the Add Associated Entities saved with the mandatory fields if it is not associated with the Customer | Carrier > associate contact > CRMV2 > Contacts > Customer | Carrier | Regression', {
    tags: [
      '@carrier',
      '@customer',
      '@crm',
      '@carrierContacts',
      '@customerContacts',
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
    cy.log('***Create Add New Contact in Carrier***');
    addNewContact({ contactName: contactDepName2, randomName: randomContactName2, phoneNo: randomPhNo2, emailId: newContactTabEmailVal2 });
    cy.log('***Verify Add New Contact Update Msg***');
    toastMsg();
    waitSometime(longWait);
    navigateToTheCrmV2TabCustomer({ customerName: customerNameVal.customerName });
    cy.log('***Create Associate Contact with an Entity in Customer***');
    associateContactExtSaveAndClose({ contactName: contactDepName2, randomName: randomContactName2, phoneNo: randomPhNo2, emailId: newContactTabEmailVal2 });
    waitSometime(shortWait);
    verifyToExist({ element: btnSaveEditAssociatedEntity });
    clickVisibleElement({ locator: btnSaveEditAssociatedEntity });
    cy.log('***Verify Associate Entity Update Msg***');
    toastMsg();
  });

  it('ME-150353 Verify the updated toast msg validation for the Add Associated Entities saved with the mandatory fields if it is not associated with the Customer | Carrier > associate contact > CRMV2 > Contacts > Customer | Carrier | Regression', {
    tags: [
      '@carrier',
      '@customer',
      '@crm',
      '@carrierContacts',
      '@customerContacts',
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
    associateContactExtSaveAndContinue({ contactName: contactDepName, randomName: randomContactName, phoneNo: randomPhNo, emailId: newContactTabEmailVal });
    waitSometime(shortWait);
    verifyToExist({ element: btnSaveEditAssociatedEntity });
    clickVisibleElement({ locator: btnSaveEditAssociatedEntity });
    cy.log('***Verify Associate Entity Update Msg***');
    toastMsg();
    waitSometime(longWait);
    previousTab();
    cy.log('***Create Add New Contact in Carrier***');
    addNewContact({ contactName: contactDepName2, randomName: randomContactName2, phoneNo: randomPhNo2, emailId: newContactTabEmailVal2 });
    cy.log('***Verify Add New Contact Update Msg***');
    toastMsg();
    waitSometime(longWait);
    navigateToTheCrmV2TabCustomer({ customerName: customerNameVal.customerName });
    cy.log('***Create Associate Contact with an Entity in Customer***');
    associateContactExtSaveAndContinue({ contactName: contactDepName2, randomName: randomContactName2, phoneNo: randomPhNo2, emailId: newContactTabEmailVal2 });
    waitSometime(shortWait);
    verifyToExist({ element: btnSaveEditAssociatedEntity });
    clickVisibleElement({ locator: btnSaveEditAssociatedEntity });
    cy.log('***Verify Associate Entity Update Msg***');
    toastMsg();
  });
});