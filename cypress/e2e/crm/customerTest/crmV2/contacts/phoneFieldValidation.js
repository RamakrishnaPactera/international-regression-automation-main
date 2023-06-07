/*---------------------------------------------------------------------------------------------------------------
Test Add New Contact - Phone Field Validations & Data Sources
Test Cases List
Authored By                   : Gopalpruthviraj
Date                          : 29-03-2023
Functions/Calling References  : contactPage, commonData, crmIndustryData, crmContactsData, utilities
Test cases Included           : ME-151056, ME-151331, ME-151334, ME-151338, ME-151340, ME-151341 Can user test Add new contact - Phone Field Validations & Data Sources in the contacts Tab > CRMV2 > Contacts
---------------------------------------------------------------------------------------------------------------*/

import {
  clearText,
  clickAction,
  dropDownContainsTextClick,
  dropDownExactValueCheckBoxSelection,
  generateRandomNumber,
  generateRandomNumberByLength,
  getMinionValues,
  getTDMData,
  singleSelectDropDwnValidation,
  typeText,
  verifyAttrValueContains,
  verifyIfDisabled,
  verifyIfEnabled,
  verifyTextContains,
  verifyToExist,
  verifyToNotExist,
  verifyToolTips,
  viewFullPage,
  waitSometime,
} from '../../../../../utilities/commonUtils/genericUtils';
import contactPage from '../../../../../pageObjects/crm/contactPage/contactPage.json';
import commonData from '../../../../../testData/staticData/commonData/commonData.json';
import crmIndustryData from '../../../../../testData/crm/crmData/crmIndustryData.json';
import { loginToApplication } from '../../../../../utilities/appSpecificUtils/loginUtils/loginUtils';
import crmContactsData from '../../../../../testData/crm/crmData/crmContactsData.json';
import { navigateToTheCrmV2TabCustomer } from '../../../../../utilities/customerUtils/customerUtils';
const { shortWait } = commonData;
const { prefixTxt } = crmContactsData.userDefinedData;
const {
  attributeValue,
  drpdwnPhoneValueCountryImgAtt,
  drpdwnPhoneValueCountrySelectedAtt,
  drpdwnPhoneValueCountrySelectedDefaultAttValue,
  drpdwnPhoneValueCountrySelectedIndiaAttValue,
  minionDrpDwncontactPhoneLabel,
  minionDrpDwnContactsDepartment,
  titleAddNewContact,
  tooltipPhoneNoError,
} = crmContactsData.staticData;
const {
  emptyData,
  extentionInvalidNo,
  phoneNoIndia,
  phoneNotes,
  phoneNoUS,
  phoneNoUSInvalid,
} = crmContactsData.userDefinedData;
const {
  btnContactsPlus,
  btnSaveAndContinueContact,
  btnSaveContact,
  checkboxPhonePersonal,
  dialogPopModel,
  drpdwnContactDepartment,
  drpdwnLabel,
  drpdwnPhoneValueCountry,
  drpdwnPhoneValueCountryImg,
  errorAlertPhoneNoIcon,
  errorAlertPhoneNoToolTip,
  txtAddNewContactTitle,
  txtContactsPhone,
  txtFieldContactName,
  txtPhNotes,
  txtPhoneExt,
} = contactPage;
const { tdmAddCustomerReq, tdmCustomerData, tdmCustomerScenario } = crmIndustryData.staticData;
const { userName: usernameText, password: passwordText } =
  Cypress.env('users')[Cypress.env('appLoginUser')];
let customerNameVal, contactDepName, contactPhLabel, randomContactName;
const extentionValidNo = generateRandomNumberByLength({ lengthOfNum: 4 });
const extentionValidNo2 = generateRandomNumberByLength({ lengthOfNum: 11 });
const extentionMoreThanMaxLenght = generateRandomNumberByLength({ lengthOfNum: 12 });

describe('Can user test Add new contact - Phone Field Validations & Data Sources in the contacts Tab > CRMV2 > Contacts [ME-151056], [ME-151331], [ME-151334], [ME-151338], [ME-151340], [ME-151341]', () => {
  beforeEach(() => {
    getMinionValues(minionDrpDwnContactsDepartment, 1).then(contactDepartment => {
      contactDepName = contactDepartment[0];
    });
    getMinionValues(minionDrpDwncontactPhoneLabel, 8).then(contactPhoneLabel => {
      contactPhLabel = contactPhoneLabel;
    });
    getTDMData({ dataType: tdmCustomerData, dataCondition: tdmAddCustomerReq, dataScenario: tdmCustomerScenario });
    cy.then(() => {
      customerNameVal = Cypress.env('inputVal');
    });
    loginToApplication({ username: usernameText, password: passwordText });
    viewFullPage();
    randomContactName = prefixTxt + generateRandomNumber();
  });

  it('ME-151056, ME-151331, ME-151334, ME-151338, ME-151340, ME-151341 - Can user test Add new contact - Phone Field Validations & Data Sources in the contacts Tab > CRMV2 > Contacts | Customer Regression | Regression',
    { tags: ['@customer', '@crm', '@customerContacts', '@p2'] },
    () => {
      navigateToTheCrmV2TabCustomer({ customerName: customerNameVal.customerName });
      verifyToExist({ element: btnContactsPlus });
      clickAction({ locator: btnContactsPlus });
      verifyToExist({ element: dialogPopModel });
      verifyToExist({ element: txtAddNewContactTitle });
      verifyTextContains({ locator: txtAddNewContactTitle, containsText: titleAddNewContact });
      cy.log('***verifying phone value country***');
      verifyToExist({ element: drpdwnPhoneValueCountry });
      verifyAttrValueContains({ locator: drpdwnPhoneValueCountry, attribute: drpdwnPhoneValueCountrySelectedAtt, verifyText: drpdwnPhoneValueCountrySelectedDefaultAttValue });
      cy.log('***verifying phone number***');
      dropDownContainsTextClick({ element: txtFieldContactName, typeText: randomContactName, exactText: randomContactName });
      waitSometime(shortWait);
      dropDownContainsTextClick({ element: drpdwnContactDepartment, typeText: contactDepName, exactText: contactDepName });
      waitSometime(shortWait);
      verifyTextContains({ locator: txtContactsPhone, containsText: emptyData });
      //verifying for valid phone number
      typeText({ locator: txtContactsPhone, dataText: phoneNoUS });
      verifyAttrValueContains({ locator: drpdwnPhoneValueCountryImg, attribute: drpdwnPhoneValueCountryImgAtt, verifyText: drpdwnPhoneValueCountrySelectedDefaultAttValue });
      verifyIfEnabled({ locator: btnSaveContact });
      verifyIfEnabled({ locator: btnSaveAndContinueContact });
      //verifying for invalid phone number
      clearText({ locator: txtContactsPhone });
      typeText({ locator: txtContactsPhone, dataText: phoneNoUSInvalid });
      verifyToExist({ element: errorAlertPhoneNoIcon });
      verifyToolTips({ locator: errorAlertPhoneNoToolTip, verifyText: tooltipPhoneNoError });
      verifyIfDisabled({ locator: btnSaveContact });
      verifyIfDisabled({ locator: btnSaveAndContinueContact });
      //verifying for valid phone number
      clearText({ locator: txtContactsPhone });
      dropDownExactValueCheckBoxSelection({ element: drpdwnPhoneValueCountry, ddValue: drpdwnPhoneValueCountrySelectedIndiaAttValue });
      typeText({ locator: txtContactsPhone, dataText: phoneNoIndia });
      verifyAttrValueContains({ locator: drpdwnPhoneValueCountryImg, attribute: drpdwnPhoneValueCountryImgAtt, verifyText: drpdwnPhoneValueCountrySelectedIndiaAttValue });
      verifyToNotExist({ element: errorAlertPhoneNoIcon });
      verifyIfEnabled({ locator: btnSaveContact });
      verifyIfEnabled({ locator: btnSaveAndContinueContact });
      cy.log('***verifying Phone Extension***');
      //verifying for valid phone extension
      verifyTextContains({ locator: txtPhoneExt, containsText: emptyData });
      typeText({ locator: txtPhoneExt, dataText: extentionValidNo });
      verifyAttrValueContains({ locator: txtPhoneExt, attribute: attributeValue, verifyText: extentionValidNo });
      //verifying for valid phone extension
      clearText({ locator: txtPhoneExt });
      typeText({ locator: txtPhoneExt, dataText: extentionValidNo2 });
      verifyAttrValueContains({ locator: txtPhoneExt, attribute: attributeValue, verifyText: extentionValidNo2 });
      //verifying for invalid phone extension
      clearText({ locator: txtPhoneExt });
      typeText({ locator: txtPhoneExt, dataText: extentionInvalidNo });
      verifyAttrValueContains({ locator: txtPhoneExt, attribute: attributeValue, verifyText: emptyData });
      //verifying for invalid phone extension
      clearText({ locator: txtPhoneExt });
      typeText({ locator: txtPhoneExt, dataText: extentionMoreThanMaxLenght });
      verifyAttrValueContains({ locator: txtPhoneExt, attribute: attributeValue, verifyText: extentionMoreThanMaxLenght.substring(0, extentionMoreThanMaxLenght.length - 1) });
      cy.log('***verifying Phone Label***');
      singleSelectDropDwnValidation({ dropdwnEle: drpdwnLabel, array: contactPhLabel, selectDropdwnValue: contactPhLabel[0] });
      cy.log('***verifying Phone Note***');
      verifyTextContains({ locator: txtPhNotes, containsText: emptyData });
      typeText({ locator: txtPhNotes, dataText: phoneNotes });
      verifyAttrValueContains({ locator: txtPhNotes, attribute: attributeValue, verifyText: phoneNotes });
      clearText({ locator: txtPhNotes });
      verifyTextContains({ locator: txtPhNotes, containsText: emptyData });
      typeText({ locator: txtPhNotes, dataText: phoneNotes });
      cy.log('***verifying Phone Personal Checkbox***');
      verifyAttrValueContains({ locator: checkboxPhonePersonal, attribute: attributeValue, verifyText: false });
      clickAction({ locator: checkboxPhonePersonal });
      verifyAttrValueContains({ locator: checkboxPhonePersonal, attribute: attributeValue, verifyText: true });
      verifyIfEnabled({ locator: btnSaveContact });
      verifyIfEnabled({ locator: btnSaveAndContinueContact });
    },
  );
});