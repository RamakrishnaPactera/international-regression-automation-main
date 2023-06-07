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
} from '../../../../../utilities/carrierUtils/carrierUtils';
import { verifyIndustriesTblValues } from '../../../../../utilities/customerUtils/customerUtils';
import { verifyMailId, verifyPhone } from '../../../../../utilities/crmUtils/crmUtils';
const { minWait, longWait } = commonData;
const {
  email,
  phoneNo,
  prefixTxt,
} = crmContactsData.userDefinedData;
const {
  existContactTabAssociate,
  existContactTabAssociateVal,
  existContactTabCompany,
  existContactTabDepartment,
  existContactTabEmail,
  existContactTabEntityType,
  existContactTabEntityTypeVal,
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
  tdmAddCarrierReq,
  tdmCarrierData,
  tdmCarrierScenario,
} = crmIndustryData.staticData;
const {
  tblExistingContTabColHeader,
  rowExistContactTable,
  colHeaderAssociateParent,
  colHeaderNameParent,
  colHeaderCompanyParent,
  colHeaderEntityTypeParent,
  colHeaderDepartmentParent,
  colHeaderTitleParent,
  colHeaderPhoneParent,
  colHeaderEmailParent,
  colHeaderLinkedInURLParent,
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
let carrierNameVal, contactDepName, interactionsExistContactTab, randomContactName, randomPhNo, contactTabEmailVal, contactTabPhoneVal;
describe('Can I Validate Duplicate Contact(s) existing table value in the contacts Tab > Carrier > CRMV2 > Contacts Tab > Duplicate Contacts [ME-122052]', () => {
  beforeEach(() => {
    getMinionValues('contactDepartment', 1).then((contactDepartment) => { contactDepName = contactDepartment[0]; });
    getTDMData({ dataType: tdmCarrierData, dataCondition: tdmAddCarrierReq, dataScenario: tdmCarrierScenario });
    cy.then(() => {
      carrierNameVal = Cypress.env('inputVal');
      loginToApplication({ username: usernameText, password: passwordText });
      viewFullPage();
      randomContactName = prefixTxt + generateRandomNumber();
      randomPhNo = phoneNo + generateRandomNumber();
      contactTabPhoneVal = verifyPhone({ textType: randomPhNo });
      contactTabEmailVal = verifyMailId({ textType: email });
      randomContactName = prefixTxt + generateRandomNumber();
      interactionsExistContactTab = new Map([
        [existContactTabAssociate, existContactTabAssociateVal],
        [existContactTabName, randomContactName],
        [existContactTabCompany, carrierNameVal.carrierName],
        [existContactTabEntityType, existContactTabEntityTypeVal],
        [existContactTabDepartment, contactDepName],
        [existContactTabTitle, existContactTabTitleVal],
        [existContactTabPhone, contactTabPhoneVal],
        [existContactTabEmail, contactTabEmailVal],
        [existContactTabLinkedInURL, existContactTabLinkedInURLVal],
      ]);
    });
  });

  it('ME-122052 Can I Validate Duplicate Contact(s) existing table value in the contacts Tab > CRMV2 > Contacts | Carrier Regression | Sprint Regression', {
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