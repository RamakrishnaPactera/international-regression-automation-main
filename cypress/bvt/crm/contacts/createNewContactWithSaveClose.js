/*---------------------------------------------------------------------------------------------------------------
Verify the "Add New Contact" record in the contacts table which is saved with the required fields via Save and Close > CRMV2 > Contacts > Customer | Carrier
Test Cases List
Authored By                   : PruthviRaj
Date                          : 20-04-2023
Functions/Calling References  : contactPage, commonData, crmIndustryData, crmContactsData, utilities
Test cases Included           : ME-146468 Verify the "Add New Contact" record in the contacts table which is saved with the required fields via Save and Close > CRMV2 > Contacts > Customer | Carrier
---------------------------------------------------------------------------------------------------------------*/

import {
  generateRandomNumber,
  getMinionValues,
  getTDMData,
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
  navigateToTheCrmV2Tab,
} from '../../../utilities/carrierUtils/carrierUtils';
import {
  addNewContact,
  navigateToTheCrmV2TabCustomer,
  verifyIndustriesTblValues,
} from '../../../utilities/customerUtils/customerUtils';
import { verifyMailId, verifyPhone } from '../../../utilities/crmUtils/crmUtils';
const { shortWait } = commonData;
const {
  email,
  phoneNo,
  prefixTxt,
  title,
} = crmContactsData.userDefinedData;
const {
  newContactTabName,
  newContactTabTitle,
  newContactTabPhone,
  newContactTabEmail,
} = crmContactsData.staticData;
const {
  rowContactsTableData,
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
let carrierNameVal, customerNameVal, contactDepName, contactDepName2, randomContactName, randomContactName2, randomPhNo, randomPhNo2, newContactTabEmailVal, newContactTabEmailVal2, newContactTabPhoneVal, newContactTabPhoneVal2, interactionsNewContactTab, interactionsNewContactTab2;

describe('Can user create new contact and Verify the "Add New Contact" record in the contacts table which is saved with the required fields via Save and Close > CRMV2 > Contacts > Customer | Carrier [ME-146468]', () => {
  beforeEach(() => {
    getMinionValues('contactDepartment', 2).then((contactDepartment) => {
      contactDepName = contactDepartment[0];
      contactDepName2 = contactDepartment[1];
    });
    cy.log('***creating new carrier***');
    getTDMData({
      dataType: tdmCarrierData,
      dataCondition: tdmAddCarrierReq,
      dataScenario: tdmCarrierNewScenario,
    });
    cy.then(() => {
      carrierNameVal = Cypress.env('inputVal');
    });
    cy.log('***creating new Customer***');
    getTDMData({
      dataType: tdmCustomerData,
      dataCondition: tdmAddCustomerReq,
      dataScenario: tdmCustomerScenario,
    });
    cy.then(() => {
      customerNameVal = Cypress.env('inputVal');
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
    interactionsNewContactTab = new Map([
      [newContactTabName, randomContactName],
      [newContactTabTitle, title],
      [newContactTabPhone, newContactTabPhoneVal],
      [newContactTabEmail, newContactTabEmailVal],
    ]);
    interactionsNewContactTab2 = new Map([
      [newContactTabName, randomContactName2],
      [newContactTabTitle, title],
      [newContactTabPhone, newContactTabPhoneVal2],
      [newContactTabEmail, newContactTabEmailVal2],
    ]);
  });

  it('ME-146468 Verify the "Add New Contact" record in the contacts table which is saved with the required fields via Save and Close > CRMV2 > Contacts > Customer | Carrier', {
    tags: [
      '@customer',
      '@carrier',
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
    //Verify New contact Column Values
    verifyIndustriesTblValues({ mapName: interactionsNewContactTab, locator: rowContactsTableData });
    waitSometime(shortWait);
    navigateToTheCrmV2TabCustomer({ customerName: customerNameVal.customerName });
    cy.log('***Create Add New Contact in Carrier***');
    addNewContact({ contactName: contactDepName2, randomName: randomContactName2, phoneNo: randomPhNo2, emailId: newContactTabEmailVal2 });
    cy.log('***Verify Add New Contact Update Msg***');
    toastMsg();
    //Verify New contact Column Values
    verifyIndustriesTblValues({ mapName: interactionsNewContactTab2, locator: rowContactsTableData });
  });
});