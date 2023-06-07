//---------------------------------------------------------------------------------------------------------------
//List to all Data to associate Contact To Add Associated Entity UI Validation with the below Minion terms//
//Test Cases List
//Authored By                   : Babu Velagada
//Date                          : 28-03-2023
//Functions/Calling References  : contactPage,commonData,crmIndustryData,crmContactsData,utilities
//Test cases Included           : ME-122051 Can I create Duplicate Contact(s) Detected, Associate Contact and Validate Add Associated Entity with Empty EmailId and PhNo details in the contacts Tab > CRMV2 > Contacts
//ME-130447 Can I create Duplicate Contact(s) Detected, Associate Contact and Validate Add Associated Entity with All fields details in the contacts Tab > CRMV2 > Contacts
//---------------------------------------------------------------------------------------------------------------

import {
  clickAction,
  clickVisibleElement,
  generateRandomNumber,
  getMinionValues,
  getTDMData,
  navigateToChildWindow,
  previousTab,
  toastMsg,
  viewFullPage,
  waitSometime,
} from '../../../../../utilities/commonUtils/genericUtils';
import contactPage from '../../../../../pageObjects/crm/contactPage/contactPage.json';
import commonData from '../../../../../testData/staticData/commonData/commonData.json';
import crmIndustryData from '../../../../../testData/crm/crmData/crmIndustryData.json';
import { loginToApplication } from '../../../../../utilities/appSpecificUtils/loginUtils/loginUtils';
import crmContactsData from '../../../../../testData/crm/crmData/crmContactsData.json';
import {
  addContact,
  navigateToTheCrmV2Tab,
} from '../../../../../utilities/carrierUtils/carrierUtils';
import {
  addContactEmail,
  addContactPhNo,
  associateContactWithAllFields,
  verifyAddAssEmailVal,
  verifyAddAssPhNo,
  verifyAssCntWindowAllFields,
  verifyAssCntWindowEmptyFields,
  verifyMailId,
  verifyPhone,
} from '../../../../../utilities/crmUtils/crmUtils';
const { longWait } = commonData;
const {
  email,
  phoneNo,
  prefixTxt,
} = crmContactsData.userDefinedData;
const {
  btnSaveContact,
  radioBtnAssociateContact,
  btnChildWindAssociatedContact,
  txtEntityNameCarrier,
} = contactPage;
const {
  tdmAddCarrierReq,
  tdmCarrierData,
  tdmCarrierNewScenario,
} = crmIndustryData.staticData;
const { userName: usernameText, password: passwordText } = Cypress.env('users')[Cypress.env('appLoginUser')];

let carrierNameVal, contactDepName, addEntityEmail, randomContactName, contactFunctionName, addEntityPhNo, extPhn, contactPhLabel, contactEmailLabelName, randomPhNo, newContactTabEmailVal, newContactTabPhoneVal;
describe('Can I create Duplicate Contact(s) Detected, Associate Contact in the contacts Tab and Validate Add Associated Entity > Customer > CRMV2 > Contacts Tab > Duplicate Contacts [ME-122051, ME-130447]', () => {
  beforeEach(() => {
    getMinionValues('contactDepartment', 1).then((contactDepartment) => {
      contactDepName = contactDepartment[0];
    });
    getMinionValues('contactFunction', 1).then((contactFunction) => {
      contactFunctionName = contactFunction[0];
    });
    getMinionValues('contactPhoneLabel', 1).then((contactPhoneLabel) => {
      contactPhLabel = contactPhoneLabel[0];
    });
    getMinionValues('contactEmailLabel', 1).then((contactEmailLabel) => {
      contactEmailLabelName = contactEmailLabel[0];
    });
    getTDMData({ dataType: tdmCarrierData, dataCondition: tdmAddCarrierReq, dataScenario: tdmCarrierNewScenario });
    cy.then(() => {
      carrierNameVal = Cypress.env('inputVal');
    });
    loginToApplication({ username: usernameText, password: passwordText });
    viewFullPage();
    extPhn = generateRandomNumber();
    randomContactName = prefixTxt + generateRandomNumber();
    randomPhNo = phoneNo + generateRandomNumber();
    cy.log(randomPhNo);
    newContactTabPhoneVal = verifyPhone({ textType: randomPhNo });
    cy.log(newContactTabPhoneVal);
    newContactTabEmailVal = verifyMailId({ textType: email });
    cy.log(newContactTabEmailVal);
  });

  it('ME-122051 Can I create Duplicate Contact(s) Detected, Associate Contact and Validate Add Associated Entity with Empty EmailId and PhNo details in the contacts Tab > CRMV2 > Contacts | Customer Regression | Sprint Regression', {
    tags: [
      '@carrier',
      '@crm',
      '@carrierContacts',
      '@p1',
      '@phase2',
    ],
  },
  () => {
    navigateToTheCrmV2Tab({ carrierName: carrierNameVal.carrierName });
    cy.log('***Create Add New Contact in Carrier***');
    addContact({ contactName: contactDepName, randomName: randomContactName });
    toastMsg();
    waitSometime(longWait);
    cy.log('***Verify Add duplicate Contact Update Msg***');
    associateContactWithAllFields({ contactName: contactDepName, randomName: randomContactName, phoneNo: randomPhNo, emailId: newContactTabEmailVal, cntFunction: contactFunctionName, contactPhLabelVal: contactPhLabel, contactEmailLabelVal: contactEmailLabelName, extVal: extPhn });
    clickAction({ locator: btnSaveContact });
    waitSometime(longWait);
    clickAction({ locator: radioBtnAssociateContact });
    navigateToChildWindow();
    clickVisibleElement({ locator: btnChildWindAssociatedContact });
    verifyAssCntWindowEmptyFields({ locator: txtEntityNameCarrier, randomName: randomContactName, entityName: carrierNameVal.carrierName });
  });
  it('ME-130447 Can I create Duplicate Contact(s) Detected, Associate Contact and Validate Add Associated Entity with All fields details in the contacts Tab > CRMV2 > Contacts | Customer Regression | Sprint Regression', {
    tags: [
      '@carrier',
      '@crm',
      '@carrierContacts',
      '@p1',
      '@phase2',
    ],
  },
  () => {
    navigateToTheCrmV2Tab({ carrierName: carrierNameVal.carrierName });
    addEntityPhNo = verifyAddAssPhNo({ contactPhLabelVal: contactPhLabel, contPhNoVal: newContactTabPhoneVal, extVal: extPhn });
    addEntityEmail = verifyAddAssEmailVal({ contactEmailLabelVal: contactEmailLabelName, extVal: extPhn, emailId: newContactTabEmailVal });
    cy.log('***Create Add New Contact in Carrier***');
    associateContactWithAllFields({ contactName: contactDepName, randomName: randomContactName, phoneNo: randomPhNo, emailId: newContactTabEmailVal, cntFunction: contactFunctionName, contactPhLabelVal: contactPhLabel, contactEmailLabelVal: contactEmailLabelName, extVal: extPhn });
    clickAction({ locator: btnSaveContact });
    toastMsg();
    waitSometime(longWait);
    cy.log('***Verify Add duplicate Contact Update Msg***');
    associateContactWithAllFields({ contactName: contactDepName, randomName: randomContactName, phoneNo: randomPhNo, emailId: newContactTabEmailVal, cntFunction: contactFunctionName, contactPhLabelVal: contactPhLabel, contactEmailLabelVal: contactEmailLabelName, extVal: extPhn });
    clickAction({ locator: btnSaveContact });
    waitSometime(longWait);
    clickAction({ locator: radioBtnAssociateContact });
    navigateToChildWindow();
    clickVisibleElement({ locator: btnChildWindAssociatedContact });
    waitSometime(longWait);
    cy.log('***Verify Add Associated Entity all fields details***');
    verifyAssCntWindowAllFields({ locator: txtEntityNameCarrier, entityName: carrierNameVal.carrierName, randomName: randomContactName, cntFunction: contactFunctionName, cntPhNo: addEntityPhNo, cntEmail: addEntityEmail });
    previousTab();
    waitSometime(longWait);
    addContactPhNo({ phoneNo: randomPhNo, extVal: extPhn, contactPhLabelVal: contactPhLabel });
    addContactEmail({ cntEmail: newContactTabEmailVal, contactEmailLabelVal: contactEmailLabelName });
    waitSometime(longWait);
    previousTab();
    associateContactWithAllFields({ contactName: contactDepName, randomName: randomContactName, phoneNo: randomPhNo, emailId: newContactTabEmailVal, cntFunction: contactFunctionName, contactPhLabelVal: contactPhLabel, contactEmailLabelVal: contactEmailLabelName, extVal: extPhn });
    clickAction({ locator: btnSaveContact });
    waitSometime(longWait);
    clickAction({ locator: radioBtnAssociateContact });
    navigateToChildWindow();
    clickVisibleElement({ locator: btnChildWindAssociatedContact });
    waitSometime(longWait);
    cy.log('***Verify Add Associated Entity PhNo and Email Empty details***');
    verifyAssCntWindowEmptyFields({ locator: txtEntityNameCarrier, randomName: randomContactName, entityName: carrierNameVal.carrierName });
  });
});