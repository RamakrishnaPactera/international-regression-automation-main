//---------------------------------------------------------------------------------------------------------------
//Test Cases List
//Authored By                   : Shashi Kumar Jaiswal
//Date                          : 26-04-2023
//Functions/Calling References  : contactPage,crmIndustryData,crmContactsData,genericUtils,carrierUtils,customerUtils,crmUtils
//Test cases Included           :
//ME-146686 Verify the Add Chat with correct created date/time and created by in the chat table in the contact object screen for Add | Edit Contacts > CRMV2 > Customer
//ME-146687 Verify the Edit Chat with correct updated date/time and updated by showing in the Chat table in the contact object screen for Add | Edit Contacts > CRMV2 > Customer
//ME-146701 Verify the delete chat and record is not displayed in the chat table in the contact object screen for Add | Edit Contacts > CRMV2 > Customer
//ME-150314 Verify the Add Chat with correct created date/time and created by in the chat table in the contact object screen for Add | Edit Contacts > CRMV2 > Carrier
//ME-150315 Verify the Edit Chat with correct updated date/time and updated by showing in the Chat table in the contact object screen for Add | Edit Contacts > CRMV2 > Carrier
//ME-150317 Verify the delete chat and record is not displayed in the chat table in the contact object screen for Add | Edit Contacts > CRMV2 > Carrier
//---------------------------------------------------------------------------------------------------------------

import {
  clickAction,
  clickActionWait,
  typeText,
  clickVisibleElement,
  generateRandomNumber,
  getMinionValues,
  getTDMData,
  toastMsg,
  viewFullPage,
  waitSometime,
  typeDrpDwnWithMachtingText,
  verifyLblHaveValue,
  clickOkOnWindowAlert,
} from '../../../../../utilities/commonUtils/genericUtils';
import * as contactPage from '../../../../../pageObjects/crm/contactPage/contactPage.json';
import commonData from '../../../../../testData/staticData/commonData/commonData.json';
import crmIndustryData from '../../../../../testData/crm/crmData/crmIndustryData.json';
import { loginToApplication } from '../../../../../utilities/appSpecificUtils/loginUtils/loginUtils';
import crmContactsData from '../../../../../testData/crm/crmData/crmContactsData.json';
import {
  createNewContact,
  navigateToTheCrmV2Tab,
} from '../../../../../utilities/carrierUtils/carrierUtils';
import {
  navigateToTheCrmV2TabCustomer, navigateToContactsObjScreen, openChatAction,
} from '../../../../../utilities/customerUtils/customerUtils';
import { verifyMailId, verifyPhone } from '../../../../../utilities/crmUtils/crmUtils';
const { shortWait } = commonData;
const {
  email,
  phoneNo,
  prefixTxt,
} = crmContactsData.userDefinedData;
const { chatUsingSlack, tdmAddCustomer } = crmContactsData.staticData;
const {
  tdmAddCustomerReq, tdmCustomerData, tdmAddCarrierReq, tdmCarrierData, tdmCarrierNewScenario,
} = crmIndustryData.staticData;
const { userName: usernameText, password: passwordText } = Cypress.env('users')[Cypress.env('appLoginUser')];
let customerNameVal, carrierNameVal, contactDepName, randomContactName, randomPhNo, newContactTabEmailVal, newContactTabPhoneVal;

const verifyAuditFields = () => {
  verifyLblHaveValue({ locator: contactPage.divCreatedDateRow });
  verifyLblHaveValue({ locator: contactPage.divCreatedByRow });
  verifyLblHaveValue({ locator: contactPage.divUpdatedByRow });
  verifyLblHaveValue({ locator: contactPage.divUpdatedDateRow });
};

const displayAuditFields = () => {
  clickAction({ locator: contactPage.chatContxtMenu });
  clickVisibleElement({ locator: contactPage.customiseChat });
  waitSometime(shortWait);
  clickVisibleElement({ locator: contactPage.btnEyeUpdateBy });
  clickVisibleElement({ locator: contactPage.btnEyeCreatedBy });
  clickVisibleElement({ locator: contactPage.btnEyeCreatedDate });
  clickVisibleElement({ locator: contactPage.btnEyeUpdatedDate });
  clickVisibleElement({ locator: contactPage.btnApplyCustomise });
};

const addChatMessage = () => {
  clickAction({ locator: contactPage.btnAddNewChat });
  waitSometime(shortWait);
  typeText({ locator: contactPage.txtFieldUsername, dataText: generateRandomNumber() });
  typeDrpDwnWithMachtingText({ locator: contactPage.drpDwnLblTerm, drpDwnVal: chatUsingSlack });
  typeText({ locator: contactPage.txtFieldDetails, dataText: generateRandomNumber() });
  clickActionWait({ locator: contactPage.btnSaveChat });
  toastMsg();
};

const editChatMessage = () => {
  openChatAction({ action: 'Edit' });
  waitSometime(shortWait);
  typeText({ locator: contactPage.txtFieldUsername, dataText: generateRandomNumber() });
  typeText({ locator: contactPage.txtFieldDetails, dataText: generateRandomNumber() });
  clickActionWait({ locator: contactPage.btnSaveChat });
  toastMsg();
};

const deleteChatMessage = () => {
  openChatAction({ action: 'Delete' });
  clickOkOnWindowAlert();
  waitSometime(shortWait);
  toastMsg();
};

describe('Verify the Add | Edit | Delete chat functionality for Customer & Carrier [ME-146686, ME-146687, ME-146701, ME-150314, ME-150315, ME-150317]', () => {
  before(() => {
    getMinionValues('contactDepartment', 1).then((contactDepartment) => {
      contactDepName = contactDepartment[0];
    });
    getTDMData({ dataType: tdmCustomerData, dataCondition: tdmAddCustomerReq, dataScenario: tdmAddCustomer });
    cy.then(() => {
      customerNameVal = Cypress.env('inputVal');
    });
    getTDMData({ dataType: tdmCarrierData, dataCondition: tdmAddCarrierReq, dataScenario: tdmCarrierNewScenario });
    cy.then(() => {
      carrierNameVal = Cypress.env('inputVal');
    });
  });
  beforeEach(() => {
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

  it('[ME-146686, ME-146687, ME-146701] Customer | Verify the Add Chat with correct created date/time and created by in the chat table in the contact object screen for Add | Edit Contacts > CRMV2 > Customer', {
  },
  () => {
    navigateToTheCrmV2TabCustomer({ customerName: customerNameVal.customerName });
    waitSometime(shortWait);
    createNewContact({ contactName: contactDepName, randomName: randomContactName, phoneNo: randomPhNo, emailId: newContactTabEmailVal });
    waitSometime(shortWait);
    navigateToContactsObjScreen();
    clickActionWait({ locator: contactPage.chatTab });
    //Add chat message
    addChatMessage();
    //select fields from context menu
    displayAuditFields();
    waitSometime(shortWait);
    verifyAuditFields();
    //Edit Chat
    editChatMessage();
    verifyAuditFields();
    //Delete Chat
    deleteChatMessage();
  });

  it('[ME-150314, ME-150315, ME-150317] Carrier | Verify the Add Chat with correct created date/time and created by in the chat table in the contact object screen for Add | Edit Contacts > CRMV2 > Carrier', {
  },
  () => {
    navigateToTheCrmV2Tab({ carrierName: carrierNameVal.carrierName });
    waitSometime(shortWait);
    createNewContact({ contactName: contactDepName, randomName: randomContactName, phoneNo: randomPhNo, emailId: newContactTabEmailVal });
    waitSometime(shortWait);
    navigateToContactsObjScreen();
    clickActionWait({ locator: contactPage.chatTab });
    //Add chat message
    addChatMessage();
    //select fields from context menu
    displayAuditFields();
    waitSometime(shortWait);
    verifyAuditFields();
    //Edit Chat
    editChatMessage();
    verifyAuditFields();
    //Delete Chat
    deleteChatMessage();
  });
});