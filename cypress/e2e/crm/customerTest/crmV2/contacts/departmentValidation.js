/*---------------------------------------------------------------------------------------------------------------
Test Add New Contact - Department, Function, Level, Title Field Validations & Data Sources - P1

Test Cases List
Authored By                   : Gopalpruthviraj
Date                          : 06-04-2023
Functions/Calling References  : contactPage, commonData, crmIndustryData, crmContactsData, utilities
Test cases Included           : ME-136547, ME-151020, ME-151025, ME-151030  Can user Test Add New Contact - Department, Function, Level, Title Field Validations & Data Sources in the contacts Tab > CRMV2 > Contacts
---------------------------------------------------------------------------------------------------------------*/

import {
  clickAction,
  dropDownContainsTextClick,
  generateRandomAlphaNumByLength,
  generateRandomNumber,
  getMinionValues,
  getTDMData,
  multipleSelectCheckboxDropDwnValidation,
  singleSelectDropDwnValidation,
  typeText,
  verifyAttrValueContains,
  verifyIfEnabled,
  verifyTextContains,
  verifyTextOrBackGroundColor,
  verifyToExist,
  verifyToolTips,
  viewFullPage,
} from '../../../../../utilities/commonUtils/genericUtils';
import contactPage from '../../../../../pageObjects/crm/contactPage/contactPage.json';
import crmIndustryData from '../../../../../testData/crm/crmData/crmIndustryData.json';
import { loginToApplication } from '../../../../../utilities/appSpecificUtils/loginUtils/loginUtils';
import crmContactsData from '../../../../../testData/crm/crmData/crmContactsData.json';
import { navigateToTheCrmV2TabCustomer } from '../../../../../utilities/customerUtils/customerUtils';
const { emptyData, prefixTxt } = crmContactsData.userDefinedData;
const {
  attributeValue,
  colorAttr,
  colorCodeVal,
  departmentFieldtooltip,
  minionDrpDwnContactsDepartment,
  minionDrpDwnContactsFunctions,
  minionDrpDwnContactsLevel,
} = crmContactsData.staticData;
const {
  btnContactsPlus,
  btnSaveAndContinueContact,
  btnSaveContact,
  departmentAsterisk,
  departmentToolTip,
  drpdwnContactsDepartmentParent,
  drpdwnContactFunctionsParent,
  drpdwnContactLevelParent,
  txtFieldContactName,
  txtTitle,
} = contactPage;
const { tdmAddCustomerReq, tdmCustomerData, tdmCustomerScenario } = crmIndustryData.staticData;
const { userName: usernameText, password: passwordText } =
  Cypress.env('users')[Cypress.env('appLoginUser')];
let customerNameVal, contactDepName, contactFunctions, contactLevelValue, randomContactName, randomTitle;

describe('Can user Test Add New Contact - Department, Function, Level, Title Field Validations & Data Sources in the contacts Tab > CRMV2 > Contacts [ME-136547] [ME-151020] [ME-151025] [ME-151030]', () => {
  beforeEach(() => {
    getMinionValues(minionDrpDwnContactsDepartment, 16).then(contactDepartment => {
      contactDepName = contactDepartment;
    });
    getMinionValues(minionDrpDwnContactsFunctions, 49).then(contactFunction => {
      contactFunctions = contactFunction;
    });
    getMinionValues(minionDrpDwnContactsLevel, 12).then(contactLevel => {
      contactLevelValue = contactLevel;
    });
    getTDMData({ dataType: tdmCustomerData, dataCondition: tdmAddCustomerReq, dataScenario: tdmCustomerScenario });
    cy.then(() => {
      customerNameVal = Cypress.env('inputVal');
    });
    loginToApplication({ username: usernameText, password: passwordText });
    viewFullPage();
    randomContactName = prefixTxt + generateRandomNumber();
    randomTitle = prefixTxt + generateRandomAlphaNumByLength({ lengthOfString: 15 });
  });

  it('ME-136547, ME-151020, ME-151025, ME-151030 Can user Test Add New Contact - Department, Function, Level, Title Field Validations & Data Sources in the contacts Tab > CRMV2 > Contacts | Customer Regression | Regression',
    { tags: ['@customer', '@crm', '@customerContacts', '@p1', '@phase2'] },
    () => {
      navigateToTheCrmV2TabCustomer({ customerName: customerNameVal.customerName });
      verifyToExist({ element: btnContactsPlus });
      clickAction({ locator: btnContactsPlus });
      cy.log('***verifying Department dropdown***');
      dropDownContainsTextClick({ element: txtFieldContactName, typeText: randomContactName, exactText: randomContactName });
      verifyToolTips({ locator: departmentToolTip, verifyText: departmentFieldtooltip });
      verifyTextOrBackGroundColor({ locator: departmentAsterisk, color: colorAttr, colorCode: colorCodeVal });
      singleSelectDropDwnValidation({ dropdwnEle: drpdwnContactsDepartmentParent, array: contactDepName, selectDropdwnValue: contactDepName[0] });
      cy.log('***verifying Function dropdown***');
      multipleSelectCheckboxDropDwnValidation({ dropdwnEle: drpdwnContactFunctionsParent, array: contactFunctions, selectDropdwnValue1: contactFunctions[0], selectDropdwnValue2: contactFunctions[1] });
      cy.log('***verifying Level dropdown***');
      singleSelectDropDwnValidation({ dropdwnEle: drpdwnContactLevelParent, array: contactLevelValue, selectDropdwnValue: contactLevelValue[0] });
      cy.log('***verifying Title textfield***');
      verifyTextContains({ locator: txtTitle, containsText: emptyData });
      typeText({ locator: txtTitle, dataText: randomTitle });
      verifyAttrValueContains({ locator: txtTitle, attribute: attributeValue, verifyText: randomTitle });
      verifyIfEnabled({ locator: btnSaveContact });
      verifyIfEnabled({ locator: btnSaveAndContinueContact });
    },
  );
});