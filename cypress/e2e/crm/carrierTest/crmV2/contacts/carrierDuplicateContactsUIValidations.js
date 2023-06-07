import crmIndustryData from '../../../../../testData/crm/crmData/crmIndustryData.json';
import contactPage from '../../../../../pageObjects/crm/contactPage/contactPage.json';
import commonData from '../../../../../testData/staticData/commonData/commonData.json';
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
import { loginToApplication } from '../../../../../utilities/appSpecificUtils/loginUtils/loginUtils';
import crmContactsData from '../../../../../testData/crm/crmData/crmContactsData.json';
import {
  addDupContactSaveAndContinue,
  addNewContact,
  navigateToTheCrmV2Tab,
} from '../../../../../utilities/carrierUtils/carrierUtils';
import { verifyColHoverOvrInExistContTab, verifyMailId } from '../../../../../utilities/crmUtils/crmUtils';
const { longWait } = commonData;
const {
  email,
  phoneNo,
  prefixTxt,
} = crmContactsData.userDefinedData;
const {
  contactsTableColumnHeaders,
  existingContactTableColumnHeaders,
  newContactTableColumnHeaders,
} = crmContactsData.staticData;
const { userName: usernameText, password: passwordText } = Cypress.env('users')[Cypress.env('appLoginUser')];
const {
  tdmAddCarrierReq,
  tdmCarrierData,
  tdmCarrierScenario,
} = crmIndustryData.staticData;
const {
  btnSaveContact,
  tblContactsTabColHeader,
  tblExistingContTabColHeader,
  tblNewContTabColHeader,
} = contactPage;
let carrierNameVal, contactDepName, randomPhNo, newContactTabEmailVal;
describe('Can I Validate Duplicate Contact(s) UI validations in the contacts Tab > Carrier > CRMV2 > Contacts Tab > Duplicate Contacts [ME-122054]', () => {
  beforeEach(() => {
    getMinionValues('contactDepartment', 1).then((contactDepartment) => { contactDepName = contactDepartment[0]; });
    getTDMData({ dataType: tdmCarrierData, dataCondition: tdmAddCarrierReq, dataScenario: tdmCarrierScenario });
    cy.then(() => {
      carrierNameVal = Cypress.env('inputVal');
    });
    loginToApplication({ username: usernameText, password: passwordText });
    viewFullPage();
    randomPhNo = phoneNo + generateRandomNumber();
    newContactTabEmailVal = verifyMailId({ textType: email });
  });

  it('ME-122054 Can I Validate Duplicate Contact(s) UI validations in the contacts Tab > CRMV2 > Contacts | Carrier Regression | Sprint Regression', {
    tags: [
      '@carrier',
      '@crm',
      '@carrierContacts',
      '@p3',
      '@phase2',
    ],
  },
  () => {
    const randomContactName = prefixTxt + generateRandomNumber();
    navigateToTheCrmV2Tab({ carrierName: carrierNameVal.carrierName });
    addNewContact({ contactName: contactDepName, randomName: randomContactName, phoneNo: randomPhNo, emailId: newContactTabEmailVal });
    waitSometime(longWait);
    verifyTableColumnsHeaders({ locator: tblContactsTabColHeader, columnNames: contactsTableColumnHeaders });
    addDupContactSaveAndContinue({ contactName: contactDepName, randomName: randomContactName, phoneNo: randomPhNo, emailId: newContactTabEmailVal });
    cy.log('***verifying Column Names of New Contact Table***');
    verifyTableColumnsHeaders({ locator: tblNewContTabColHeader, columnNames: newContactTableColumnHeaders });
    cy.log('***verifying Hover over value of New Contact Table***');
    cy.log('***verifying Column Names of Existing Contact Table***');
    verifyTableColumnsHeaders({ locator: tblExistingContTabColHeader, columnNames: existingContactTableColumnHeaders });
    cy.log('***verifying Hover over value of Existing Contact Table***');
    verifyColHoverOvrInExistContTab();
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