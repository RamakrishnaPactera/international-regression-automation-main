import crmIndustryData from '../../../../../testData/crm/crmData/crmIndustryData.json';
import contactPage from '../../../../../pageObjects/crm/contactPage/contactPage.json';
import commonData from '../../../../../testData/staticData/commonData/commonData.json';
import {
  generateRandomNumber,
  getMinionValues,
  getTDMData,
  verifyTableColumnsHeaders,
  viewFullPage,
  waitSometime,
} from '../../../../../utilities/commonUtils/genericUtils';
import { loginToApplication } from '../../../../../utilities/appSpecificUtils/loginUtils/loginUtils';
import crmContactsData from '../../../../../testData/crm/crmData/crmContactsData.json';
import {
  addDupContactSaveAndContinue,
  addNewContact,
  navigateToTheCrmV2Tab,
  verifyIndustriesTblValues,
} from '../../../../../utilities/customerUtils/customerUtils';
import { verifyMailId, verifyPhone } from '../../../../../utilities/crmUtils/crmUtils';
const { longWait } = commonData;
const {
  prefixTxt,
  phoneNo,
  email,
} = crmContactsData.userDefinedData;
const {
  contactsTableColumnHeaders,
  newContactCusTabEntityTypeVal,
  newContactTabCompany,
  newContactTabDepartment,
  newContactTabEmail,
  newContactTabEntityType,
  newContactTabLinkedInURL,
  newContactTabLinkedInURLVal,
  newContactTabName,
  newContactTabPhone,
  newContactTabTitle,
  newContactTabTitleVal,
} = crmContactsData.staticData;
const { userName: usernameText, password: passwordText } = Cypress.env('users')[Cypress.env('appLoginUser')];
const {
  tdmAddCustomerReq,
  tdmCustomerData,
  tdmCustomerScenario,
} = crmIndustryData.staticData;
const {
  rowsNewContactTable,
  tblContactsTabColHeader,
} = contactPage;

let customerNameVal, contactDepName, interactionsNewContactTab, randomContactName, randomPhNo, newContactTabEmailVal, newContactTabPhoneVal;
describe('Can I Validate new contact table column values on Duplicate Contact(s) in Contact tab > customer > CRMV2 > Contacts Tab > Duplicate Contacts [ME-122045]', () => {
  beforeEach(() => {
    getMinionValues('contactDepartment', 1).then((contactDepartment) => {
      contactDepName = contactDepartment[0];
    });
    getTDMData({ dataType: tdmCustomerData, dataCondition: tdmAddCustomerReq, dataScenario: tdmCustomerScenario });
    cy.then(() => {
      customerNameVal = Cypress.env('inputVal');
      loginToApplication({ username: usernameText, password: passwordText });
      viewFullPage();
      randomContactName = prefixTxt + generateRandomNumber();
      randomPhNo = phoneNo + generateRandomNumber();
      cy.log(randomPhNo);
      newContactTabPhoneVal = verifyPhone({ textType: randomPhNo });
      cy.log(newContactTabPhoneVal);
      newContactTabEmailVal = verifyMailId({ textType: email });
      cy.log(newContactTabEmailVal);
      interactionsNewContactTab = new Map([
        [newContactTabName, randomContactName],
        [newContactTabCompany, customerNameVal.customerName],
        [newContactTabEntityType, newContactCusTabEntityTypeVal],
        [newContactTabDepartment, contactDepName],
        [newContactTabTitle, newContactTabTitleVal],
        [newContactTabPhone, newContactTabPhoneVal],
        [newContactTabEmail, newContactTabEmailVal],
        [newContactTabLinkedInURL, newContactTabLinkedInURLVal],
      ]);
    });
  });

  it('ME-122045 Can I Validate new contact table column values on Duplicate Contact(s) in Contact tab > CRMV2 > Contacts | customer Regression | Sprint Regression', {
    tags: [
      '@customer',
      '@crm',
      '@customerContacts',
      '@p1',
      '@phase2',
    ],
  },
  () => {
    navigateToTheCrmV2Tab({ customerName: customerNameVal.customerName });
    cy.log('***creating New contact Column***');
    addNewContact({ contactName: contactDepName, randomName: randomContactName, phoneNo: randomPhNo, emailId: newContactTabEmailVal });
    waitSometime(longWait);
    verifyTableColumnsHeaders({ locator: tblContactsTabColHeader, columnNames: contactsTableColumnHeaders });
    cy.log('***creating duplicate contact Column***');
    addDupContactSaveAndContinue({ contactName: contactDepName, randomName: randomContactName, phoneNo: randomPhNo, emailId: newContactTabEmailVal });
    cy.log('***Verifying New contact Column Values***');
    verifyIndustriesTblValues({ mapName: interactionsNewContactTab, locator: rowsNewContactTable });
  });
});