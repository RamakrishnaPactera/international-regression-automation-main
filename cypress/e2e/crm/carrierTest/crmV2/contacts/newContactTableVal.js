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
} from '../../../../../utilities/carrierUtils/carrierUtils';
import { verifyIndustriesTblValues } from '../../../../../utilities/customerUtils/customerUtils';
import { verifyMailId, verifyPhone } from '../../../../../utilities/crmUtils/crmUtils';
const { longWait } = commonData;
const {
  email,
  phoneNo,
  prefixTxt,
} = crmContactsData.userDefinedData;
const {
  contactsTableColumnHeaders,
  newContactTabCompany,
  newContactTabDepartment,
  newContactTabEmail,
  newContactTabEntityType,
  newContactTabEntityTypeVal,
  newContactTabLinkedInURL,
  newContactTabLinkedInURLVal,
  newContactTabName,
  newContactTabPhone,
  newContactTabTitle,
  newContactTabTitleVal,
} = crmContactsData.staticData;
const { userName: usernameText, password: passwordText } = Cypress.env('users')[Cypress.env('appLoginUser')];
const {
  tdmAddCarrierReq,
  tdmCarrierData,
  tdmCarrierScenario,
} = crmIndustryData.staticData;
const {
  rowsNewContactTable,
  tblContactsTabColHeader,
} = contactPage;

let carrierNameVal, contactDepName, interactionsNewContactTab, randomContactName, randomPhNo, newContactTabEmailVal, newContactTabPhoneVal;
describe('Can I Validate new contact table column values on Duplicate Contact(s) in Contact tab > Carrier > CRMV2 > Contacts Tab > Duplicate Contacts [ME-122053]', () => {
  beforeEach(() => {
    getMinionValues('contactDepartment', 1).then((contactDepartment) => {
      contactDepName = contactDepartment[0];
    });
    getTDMData({ dataType: tdmCarrierData, dataCondition: tdmAddCarrierReq, dataScenario: tdmCarrierScenario });
    cy.then(() => {
      carrierNameVal = Cypress.env('inputVal');
      loginToApplication({ username: usernameText, password: passwordText });
      viewFullPage();
      randomContactName = prefixTxt + generateRandomNumber();
      randomPhNo = phoneNo + generateRandomNumber();
      newContactTabPhoneVal = verifyPhone({ textType: randomPhNo });
      newContactTabEmailVal = verifyMailId({ textType: email });
      interactionsNewContactTab = new Map([
        [newContactTabName, randomContactName],
        [newContactTabCompany, carrierNameVal.carrierName],
        [newContactTabEntityType, newContactTabEntityTypeVal],
        [newContactTabDepartment, contactDepName],
        [newContactTabTitle, newContactTabTitleVal],
        [newContactTabPhone, newContactTabPhoneVal],
        [newContactTabEmail, newContactTabEmailVal],
        [newContactTabLinkedInURL, newContactTabLinkedInURLVal],
      ]);
    });
  });

  it('ME-122053 Can I Validate new contact table column values on Duplicate Contact(s) in Contact tab > CRMV2 > Contacts | Carrier Regression | Sprint Regression', {
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