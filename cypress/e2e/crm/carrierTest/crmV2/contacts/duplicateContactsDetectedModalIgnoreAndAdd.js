import crmIndustryData from '../../../../../testData/crm/crmData/crmIndustryData.json';
import commonData from '../../../../../testData/staticData/commonData/commonData.json';
import {
  clickVisibleElement,
  generateRandomNumber,
  getMinionValues,
  getTDMData,
  toastMsg,
  viewFullPage,
  waitSometime,
} from '../../../../../utilities/commonUtils/genericUtils';
import { loginToApplication } from '../../../../../utilities/appSpecificUtils/loginUtils/loginUtils';
import contactPage from '../../../../../pageObjects/crm/contactPage/contactPage.json';
import crmContactsData from '../../../../../testData/crm/crmData/crmContactsData.json';
import {
  addDupContactSaveAndClose,
  addDupContactSaveAndContinue,
  addNewContact,
  navigateToTheCrmV2Tab,
} from '../../../../../utilities/carrierUtils/carrierUtils';
import { verifyMailId } from '../../../../../utilities/crmUtils/crmUtils';
const { shortWait, longWait } = commonData;
const {
  btnContactsIgnoreAndAddNewContact,
} = contactPage;
const {
  email,
  phoneNo,
  prefixTxt,
} = crmContactsData.userDefinedData;
const { userName: usernameText, password: passwordText } = Cypress.env('users')[Cypress.env('appLoginUser')];
const {
  tdmAddCarrierReq,
  tdmCarrierData,
  tdmCarrierScenario,
} = crmIndustryData.staticData;

let carrierNameVal, contactDepName, randomPhNo, newContactTabEmailVal;
describe('Can I create Duplicate Contact(s) Detected, Ignore and Add New Contact in the contacts Tab > Carrier > CRMV2 > Contacts Tab > Duplicate Contacts [ME-122047]', () => {
  beforeEach(() => {
    getMinionValues('contactDepartment', 1).then((contactDepartment) => {
      contactDepName = contactDepartment[0];
    });
    getTDMData({ dataType: tdmCarrierData, dataCondition: tdmAddCarrierReq, dataScenario: tdmCarrierScenario });
    cy.then(() => {
      carrierNameVal = Cypress.env('inputVal');
    });
    loginToApplication({ username: usernameText, password: passwordText });
    viewFullPage();
    randomPhNo = phoneNo + generateRandomNumber();
    newContactTabEmailVal = verifyMailId({ textType: email });
  });

  it('ME-122047  Can I create Duplicate Contact(s) Detected, Save and Close, Ignore and Add New Contact in the contacts Tab > CRMV2 > Contacts | Carrier Regression | Sprint Regression', {
    tags: [
      '@carrier',
      '@crm',
      '@carrierContacts',
      '@p1',
      '@phase2',
    ],
  },
  () => {
    const randomContactName = prefixTxt + generateRandomNumber();
    navigateToTheCrmV2Tab({ carrierName: carrierNameVal.carrierName });
    addNewContact({ contactName: contactDepName, randomName: randomContactName, phoneNo: randomPhNo, emailId: newContactTabEmailVal });
    waitSometime(longWait);
    addDupContactSaveAndClose({ contactName: contactDepName, randomName: randomContactName, phoneNo: randomPhNo, emailId: newContactTabEmailVal });
    addDupContactSaveAndContinue({ contactName: contactDepName, randomName: randomContactName, phoneNo: randomPhNo, emailId: newContactTabEmailVal });
    clickVisibleElement({ locator: btnContactsIgnoreAndAddNewContact });
    toastMsg();
    waitSometime(shortWait);
  });
});