import {
  clickAction,
  generateRandomNumber,
  getMinionValues,
  getTDMData,
  verifyClosePopup,
  verifyTableColumnsHeaders,
  viewFullPage,
  waitSometime,
} from '../../../../../utilities/commonUtils/genericUtils';
import commonData from '../../../../../testData/staticData/commonData/commonData.json';
import contactPage from '../../../../../pageObjects/crm/contactPage/contactPage.json';
import crmIndustryData from '../../../../../testData/crm/crmData/crmIndustryData.json';
import { loginToApplication } from '../../../../../utilities/appSpecificUtils/loginUtils/loginUtils';
import crmContactsData from '../../../../../testData/crm/crmData/crmContactsData.json';
import {
  addDupContactSaveAndContinue,
  addNewContact,
  navigateToTheCrmV2Tab,
} from '../../../../../utilities/customerUtils/customerUtils';
import { verifyColHoverOvrInExistContTab, verifyMailId, verifyPhone } from '../../../../../utilities/crmUtils/crmUtils';
const {
  prefixTxt,
  phoneNo,
  email,
} = crmContactsData.userDefinedData;
const {
  newContactTableColumnHeaders,
  existingContactTableColumnHeaders,
  contactsTableColumnHeaders,
} = crmContactsData.staticData;
const {
  tblContactsTabColHeader,
  tblNewContTabColHeader,
  tblExistingContTabColHeader,
  btnSaveContact,
} = contactPage;
const { longWait } = commonData;
const {
  tdmAddCustomerReq,
  tdmCustomerData,
  tdmCustomerScenario,
} = crmIndustryData.staticData;
const { userName: usernameText, password: passwordText } = Cypress.env('users')[Cypress.env('appLoginUser')];

let customerNameVal, contactDepName, randomContactName, randomPhNo, newContactTabEmailVal, newContactTabPhoneVal;
describe('Can I Validate Duplicate Contact(s) UI validations in the contacts Tab > Customer > CRMV2 > Contacts Tab > Duplicate Contacts [ME-122046]', () => {
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
    randomContactName = prefixTxt + generateRandomNumber();
    randomPhNo = phoneNo + generateRandomNumber();
    cy.log(randomPhNo);
    newContactTabPhoneVal = verifyPhone({ textType: randomPhNo });
    cy.log(newContactTabPhoneVal);
    newContactTabEmailVal = verifyMailId({ textType: email });
    cy.log(newContactTabEmailVal);
  });

  it('ME-122046 Can I Validate Duplicate Contact(s) UI validations in the contacts Tab > CRMV2 > Contacts | Customer Regression | Sprint Regression', {
    tags: [
      '@customer',
      '@crm',
      '@customerContacts',
      '@p3',
      '@phase2',
    ],
  },
  () => {
    randomContactName = prefixTxt + generateRandomNumber();
    navigateToTheCrmV2Tab({ customerName: customerNameVal.customerName });
    addNewContact({ contactName: contactDepName, randomName: randomContactName, phoneNo: randomPhNo, emailId: newContactTabEmailVal });
    waitSometime(longWait);
    verifyTableColumnsHeaders({ locator: tblContactsTabColHeader, columnNames: contactsTableColumnHeaders });
    addDupContactSaveAndContinue({ contactName: contactDepName, randomName: randomContactName, phoneNo: randomPhNo, emailId: newContactTabEmailVal });
    cy.log('***verifying Column Names of New Contact Table when click on Save and Continue Button***');
    verifyTableColumnsHeaders({ locator: tblNewContTabColHeader, columnNames: newContactTableColumnHeaders });
    cy.log('***verifying Hover over value of New Contact Table when click on Save and Continue Button***');
    cy.log('***verifying Column Names of Existing Contact Table when click on Save and Continue Button***');
    verifyTableColumnsHeaders({ locator: tblExistingContTabColHeader, columnNames: existingContactTableColumnHeaders });
    cy.log('***verifying Hover over value of Existing Contact Table when click on Save and Continue Button***');
    verifyColHoverOvrInExistContTab();
    waitSometime(longWait);
    verifyClosePopup();
    waitSometime(longWait);
    clickAction({ locator: btnSaveContact });
    cy.log('***verifying Column Names of New Contact Table when click on Save and Close Button***');
    verifyTableColumnsHeaders({ locator: tblNewContTabColHeader, columnNames: newContactTableColumnHeaders });
    cy.log('***verifying Hover over value of New Contact Table when click on Save and Close Button***');
    cy.log('***verifying Column Names of Existing Contact Table when click on Save and Close Button***');
    verifyTableColumnsHeaders({ locator: tblExistingContTabColHeader, columnNames: existingContactTableColumnHeaders });
    cy.log('***verifying Hover over value of Existing Contact Table when click on Save and Close Button***');
    verifyColHoverOvrInExistContTab();
  });
});