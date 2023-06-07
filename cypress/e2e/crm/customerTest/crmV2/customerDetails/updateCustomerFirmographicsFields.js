import crmFirmographicsData from '../../../../../testData/crm/crmData/crmFirmographicsData.json';
import { verifyGrossProfitField, verifyAssetField, verifyKeyPrincipalField, verifyYearFoundedField, verifyIncorporatedField } from '../../../../../utilities/crmUtils/crmUtils';
import crmFirmographicsPage from '../../../../../pageObjects/crm/crmPage/crmFirmographicsPage.json';
import { searchCustomer, navigateToTheEditFirmographicsTab } from '../../../../../utilities/customerUtils/customerUtils';
import {
  clickAction,
  clickMenu,
  dropDownContainsTextClick,
  getTDMData,
  typeText,
  verifyAttrText,
  verifyTagName,
  verifyText,
  verifyVisible,
  viewFullPage,
} from '../../../../../utilities/commonUtils/genericUtils';
import { loginToApplication } from '../../../../../utilities/appSpecificUtils/loginUtils/loginUtils';
import { getTodaysDateMMDDYYYY, returntodayDateMMDD } from '../../../../../utilities/commonUtils/dateTimeUtils';
const { userName: usernameText, password: passwordText } =
  Cypress.env('users')[Cypress.env('appLoginUser')];
const {
  editFirmographicsValueAttr,
  firmographicsFiscalYearEndAttr,
  inputTagName,
  tdmAddCustomerReq,
  tdmCustomerData,
  tdmCustomerScenario,
} = crmFirmographicsData.staticData;
const {
  firmographicsIncorporatedValue,
  firmographicsYearFoundedValue,
  firmographicsStockSymbolValue,
} = crmFirmographicsData.userDefinedData;
const {
  assetsValue,
  editFirmographicsNullValue,
  validatefirmographicsFiscalYearEndDateValue,
  validateGrossProfitValue,
  validateStockSymbolValue,
} = crmFirmographicsData.expectedData;
const {
  btnEditFirmographicsClose,
  btnFirmographicsEdit,
  btnFirmographicsSave,
  msgVerbiage,
  tabCustomerDetails,
  tabViewFirmographicsIncorporated,
  tabViewFirmographicsYearFounded,
  txtAssetsValueVerification,
  txtFieldFirmographicsFiscalYearEnd,
  txtFieldFirmographicsIncorporated,
  txtFieldFirmographicsYearFounded,
  txtGrossProfitVerification,
  drpdwnStockSymbolField,
  linkStockSymbolValue,
  titleYahoo,
} = crmFirmographicsPage;

let customerNameVal;
describe('Can I Validate Create and Update Firmographics Fields Gross Profit, Assets, key Principle, Customer > CRM > customer details > Firmographics > Edit Field Validations [ME-108478,ME-112019]', () => {
  beforeEach(() => {
    cy.log('***Creating Customer***');
    getTDMData({ dataType: tdmCustomerData, dataCondition: tdmAddCustomerReq, dataScenario: tdmCustomerScenario });
    cy.then(() => {
      customerNameVal = Cypress.env('inputVal');
    });
    loginToApplication({ username: usernameText, password: passwordText });
    viewFullPage();
  });

  it('ME-108478 Can I Validate Create and Update Firmographics Fields Gross Profit, Assets, key Principle, Incorporated, Year Founded and Fiscal Year End > CRM > Customer details | Customer Regression | Sprint Regression',
    {
      tags: [
        '@customer',
        '@crm',
        '@customerDetails',
        '@customerFirmographics',
        '@p2',
      ],
    },
    () => {
      searchCustomer({ customerName: customerNameVal.customerName });
      //use this after contact tab migrate from crmV2 to crm, Once feature flag of Contacts tab enable
      //const randomContactName = prefixTxt + generateRandomNumber();
      //addContact({ contactName: contactDepName, randomName: randomContactName });
      navigateToTheEditFirmographicsTab();
      cy.log('***Validating Firmographics Gross Profit field***');
      verifyGrossProfitField();
      cy.log('***Validating Firmographics Assets Field***');
      verifyAssetField();
      cy.log('***Validating Firmographics Key Principal Field***');
      //use this after contact tab migrate from crmV2 to crm, Once feature flag of Contacts tab enable
      //verifyKeyPrincipalURLField({ textField: randomContactName });
      verifyKeyPrincipalField();
      verifyText({ locator: txtGrossProfitVerification, verifyText: validateGrossProfitValue });
      verifyText({ locator: txtAssetsValueVerification, verifyText: assetsValue });
      verifyVisible({ element: tabCustomerDetails });
      clickAction({ locator: btnFirmographicsEdit });
      verifyVisible({ element: msgVerbiage });
      clickAction({ locator: btnEditFirmographicsClose });
      //use this after contact tab migrate from crmV2 to crm, Once feature flag of Contacts tab enable
      //verifyTagName({ locator: linkFirmographicsKeyPrincipal, tagName: linkTagName });
    });

  it('ME-112019 Can I Validate Create and Update Firmographics Fields Incorporated, Year Founded and Fiscal Year End  > CRM > Customer details | Customer Regression | Sprint Regression',
    {
      tags: [
        '@customer',
        '@crm',
        '@customerDetails',
        '@customerFirmographics',
        '@p2',
      ],
    },
    () => {
      const currentDateInMMDDYYYY = getTodaysDateMMDDYYYY();
      const currentDateInMMDD = returntodayDateMMDD();
      searchCustomer({ customerName: customerNameVal.customerName });
      navigateToTheEditFirmographicsTab();
      cy.log('***Validating Incorporated, Fiscal Year End and Year Founded Fields***');
      typeText({ locator: txtFieldFirmographicsIncorporated, dataText: firmographicsIncorporatedValue });
      typeText({ locator: txtFieldFirmographicsYearFounded, dataText: firmographicsYearFoundedValue });
      verifyTagName({ locator: txtFieldFirmographicsIncorporated, tagName: inputTagName });
      verifyTagName({ locator: txtFieldFirmographicsYearFounded, tagName: inputTagName });
      verifyAttrText({ locator: txtFieldFirmographicsFiscalYearEnd, attribute: editFirmographicsValueAttr, verifyText: editFirmographicsNullValue });
      typeText({ locator: txtFieldFirmographicsFiscalYearEnd, dataText: currentDateInMMDDYYYY });
      verifyAttrText({ locator: txtFieldFirmographicsFiscalYearEnd, attribute: editFirmographicsValueAttr, verifyText: currentDateInMMDD });
      verifyAttrText({ locator: txtFieldFirmographicsFiscalYearEnd, attribute: firmographicsFiscalYearEndAttr, verifyText: validatefirmographicsFiscalYearEndDateValue });
      cy.log('***Creating Incorporated, Fiscal Year End and Year Founded Fields***');
      clickAction({ locator: btnFirmographicsSave });
      verifyText({ locator: tabViewFirmographicsIncorporated, verifyText: firmographicsIncorporatedValue });
      verifyText({ locator: tabViewFirmographicsYearFounded, verifyText: firmographicsYearFoundedValue });
      cy.log('***Validating Incorporated, Fiscal Year End and Year Founded Fields after updating***');
      clickAction({ locator: btnFirmographicsEdit });
      verifyIncorporatedField();
      verifyYearFoundedField();
    });
  it('ME-121686 Can I Validate Create and Update Firmographics Fields Stock Symbol Field > CRM > Customer Details | Customer Regression | Sprint Regression',
    {
      tags: [
        '@customer',
        '@crm',
        '@customerDetails',
        '@customerFirmographics',
        '@p2',
      ],
    },
    () => {
      searchCustomer({ customerName: customerNameVal.customerName });
      navigateToTheEditFirmographicsTab();
      dropDownContainsTextClick({ element: drpdwnStockSymbolField, typeText: firmographicsStockSymbolValue, exactText: validateStockSymbolValue });
      clickAction({ locator: btnFirmographicsSave });
      clickMenu({ locator: linkStockSymbolValue });
      verifyVisible({ element: titleYahoo });
    });
});