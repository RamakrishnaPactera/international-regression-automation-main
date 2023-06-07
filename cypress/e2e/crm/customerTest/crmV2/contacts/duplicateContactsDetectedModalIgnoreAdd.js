import {
  clickVisibleElement,
  generateRandomNumber,
  getMinionValues,
  getTDMData,
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
  addDupContactSaveAndClose,
  addDupContactSaveAndContinue,
  addNewContact,
  navigateToTheCrmV2Tab,
} from '../../../../../utilities/customerUtils/customerUtils';
import { verifyMailId, verifyPhone } from '../../../../../utilities/crmUtils/crmUtils';
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
} = crmIndustryData.staticData;
const { userName: usernameText, password: passwordText } = Cypress.env('users')[Cypress.env('appLoginUser')];

let customerNameVal, contactDepName, randomPhNo, newContactTabEmailVal, newContactTabPhoneVal;
describe('Can I create Duplicate Contact(s) Detected, Ignore and Add New Contact in the contacts Tab > Customer > CRMV2 > Contacts Tab > Duplicate Contacts [ME-122035]', () => {
  beforeEach(() => {
    getMinionValues('contactDepartment', 1).then((contactDepartment) => {
      contactDepName = contactDepartment[0];
    });
    getTDMData({ dataType: tdmCustomerData, dataCondition: tdmAddCustomerReq, dataScenario: tdmCustomerScenario });
    cy.then(() => {
      customerNameVal = Cypress.env('inputVal');
    });
    loginToApplication({ username: usernameText, password: passwordText });
    viewFullPage();
    randomPhNo = phoneNo + generateRandomNumber();
    cy.log(randomPhNo);
    newContactTabPhoneVal = verifyPhone({ textType: randomPhNo });
    cy.log(newContactTabPhoneVal);
    newContactTabEmailVal = verifyMailId({ textType: email });
    cy.log(newContactTabEmailVal);
  });

  it('ME-122035 Can I create Duplicate Contact(s) Detected, Save and Close, Ignore and Add New Contact in the contacts Tab > CRMV2 > Contacts | Customer Regression | Sprint Regression', {
    tags: [
      '@customer',
      '@crm',
      '@customerContacts',
      '@p1',
      '@phase2',
    ],
  },
  () => {
    const randomContactName = prefixTxt + generateRandomNumber();
    navigateToTheCrmV2Tab({ customerName: customerNameVal.customerName });
    addNewContact({ contactName: contactDepName, randomName: randomContactName, phoneNo: randomPhNo, emailId: newContactTabEmailVal });
    waitSometime(longWait);
    addDupContactSaveAndClose({ contactName: contactDepName, randomName: randomContactName, phoneNo: randomPhNo, emailId: newContactTabEmailVal });
    addDupContactSaveAndContinue({ contactName: contactDepName, randomName: randomContactName, phoneNo: randomPhNo, emailId: newContactTabEmailVal });
    clickVisibleElement({ locator: btnContactsIgnoreAndAddNewContact });
    toastMsg();
    waitSometime(shortWait);
  });
});