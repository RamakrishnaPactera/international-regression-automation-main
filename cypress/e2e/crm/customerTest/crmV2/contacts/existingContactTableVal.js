import crmIndustryData from '../../../../../testData/crm/crmData/crmIndustryData.json';
import contactPage from '../../../../../pageObjects/crm/contactPage/contactPage.json';
import commonData from '../../../../../testData/staticData/commonData/commonData.json';
import {
  clickAndVerifyGridAlignment,
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
  addExistContact,
  addNewContact,
  navigateToTheCrmV2Tab,
  verifyIndustriesTblValues,
} from '../../../../../utilities/customerUtils/customerUtils';
import { verifyMailId, verifyPhone } from '../../../../../utilities/crmUtils/crmUtils';
const { minWait, longWait } = commonData;
const {
  prefixTxt,
  phoneNo,
  email,
} = crmContactsData.userDefinedData;
const {
  existContactTabAssociate,
  existContactTabAssociateVal,
  existContactTabCompany,
  existContactTabDepartment,
  existContactTabEmail,
  existContactTabEntityType,
  existCntCusTabEntityTypeVal,
  existContactTabLinkedInURL,
  existContactTabLinkedInURLVal,
  existContactTabName,
  existContactTabPhone,
  existContactTabTitle,
  existContactTabTitleVal,
  existingContactTableColumnHeaders,
} = crmContactsData.staticData;
const { userName: usernameText, password: passwordText } = Cypress.env('users')[Cypress.env('appLoginUser')];
const {
  tdmAddCustomerReq,
  tdmCustomerData,
  tdmCustomerScenario,
} = crmIndustryData.staticData;
const {
  colHeaderAssociateParent,
  colHeaderCompanyParent,
  colHeaderDepartmentParent,
  colHeaderEmailParent,
  colHeaderEntityTypeParent,
  colHeaderLinkedInURLParent,
  colHeaderNameParent,
  colHeaderPhoneParent,
  colHeaderTitleParent,
  rowExistContactTable,
  tblExistingContTabColHeader,
  tabParentExistCont,
} = contactPage;
const columnLocatorsView = [
  colHeaderAssociateParent,
  colHeaderNameParent,
  colHeaderCompanyParent,
  colHeaderEntityTypeParent,
  colHeaderDepartmentParent,
  colHeaderTitleParent,
  colHeaderPhoneParent,
  colHeaderEmailParent,
  colHeaderLinkedInURLParent,
];
let customerNameVal, contactDepName, interactionsExistContactTab, randomContactName, randomPhNo, contactTabEmailVal, contactTabPhoneVal;
describe('Can I Validate Duplicate Contact(s) existing table value in the contacts Tab > customer > CRMV2 > Contacts Tab > Duplicate Contacts [ME-122044]', () => {
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
      contactTabPhoneVal = verifyPhone({ textType: randomPhNo });
      cy.log(contactTabPhoneVal);
      contactTabEmailVal = verifyMailId({ textType: email });
      cy.log(contactTabEmailVal);
      interactionsExistContactTab = new Map([
        [existContactTabAssociate, existContactTabAssociateVal],
        [existContactTabName, randomContactName],
        [existContactTabCompany, customerNameVal.customerName],
        [existContactTabEntityType, existCntCusTabEntityTypeVal],
        [existContactTabDepartment, contactDepName],
        [existContactTabTitle, existContactTabTitleVal],
        [existContactTabPhone, contactTabPhoneVal],
        [existContactTabEmail, contactTabEmailVal],
        [existContactTabLinkedInURL, existContactTabLinkedInURLVal],
      ]);
    });
  });

  it('ME-122044 Can I Validate Duplicate Contact(s) existing table value in the contacts Tab > CRMV2 > Contacts | customer Regression | Sprint Regression', {
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
    addNewContact({ contactName: contactDepName, randomName: randomContactName, phoneNo: randomPhNo, emailId: contactTabEmailVal });
    waitSometime(longWait);
    addExistContact({ contactName: contactDepName, randomName: randomContactName, phoneNo: randomPhNo, emailId: contactTabEmailVal });
    verifyTableColumnsHeaders({ locator: tblExistingContTabColHeader, columnNames: existingContactTableColumnHeaders });
    cy.log('***Verifying New contact Column Values***');
    verifyIndustriesTblValues({ mapName: interactionsExistContactTab, locator: rowExistContactTable });
    cy.log('***Verifying sorting of existing contact Column header***');
    columnLocatorsView.forEach((value) => {
      waitSometime(minWait);
      clickAndVerifyGridAlignment({ locator: tabParentExistCont, element: value });
    });
  });
});