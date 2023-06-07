import crmFirmographicsData from '../../../../../testData/crm/crmData/crmFirmographicsData.json';
import crmIndustryData from '../../../../../testData/crm/crmData/crmIndustryData.json';
import crmFirmographicsPage from '../../../../../pageObjects/crm/crmPage/crmFirmographicsPage.json';
import {
  navigateToTheIndustriesTab,
  carrotButtonClickExpand,
  verifyAllFieldsInEditIndustryModal,
  addNewIndustry,
  navigateToEditIndustry,
  verifyColumnsInIndustryTab,
} from '../../../../../utilities/customerUtils/customerUtils';
import {
  getTDMData,
  verifyAttrText,
  viewFullPage,
} from '../../../../../utilities/commonUtils/genericUtils';
import { loginToApplication } from '../../../../../utilities/appSpecificUtils/loginUtils/loginUtils';
const { userName: usernameText, password: passwordText } =
  Cypress.env('users')[Cypress.env('appLoginUser')];
const {
  industriesTitleDataWalkmeAttr,
  tdmAddCustomerReq,
  tdmCustomerData,
  tdmCustomerScenario,
} = crmFirmographicsData.staticData;

const {
  validateIndustriesTableTitle,
} = crmFirmographicsData.expectedData;

const {
  industryClassificationSystemSIC,
  industryCodeSIC,
} = crmIndustryData.staticData;

const {
  tblIndustriesTitle,
} = crmFirmographicsPage;

let customerNameVal;
describe('Can I Validate Industry Tab UI Validations in Industries > Customer > CRM > Customer Details > Industries > Add Industry Validations [ ME-113232, ME-115257 ]', () => {
  before(() => {
    cy.log('***Creating Customer***');
    getTDMData({ dataType: tdmCustomerData, dataCondition: tdmAddCustomerReq, dataScenario: tdmCustomerScenario });
    cy.then(() => {
      customerNameVal = Cypress.env('inputVal');
    });
  });
  beforeEach(() => {
    loginToApplication({
      username: usernameText,
      password: passwordText,
    });
    viewFullPage();
  });

  it('ME-113232 Can I Validate Industry Tab UI Validations in Industries > CRM > Customer details | Customer Regression | Sprint Regression',
    {
      tags: [
        '@customer',
        '@crm',
        '@customerDetails',
        '@customerIndustries',
        '@p3',
      ],
    },
    () => {
      navigateToTheIndustriesTab({ customerName: customerNameVal.customerName });
      cy.log('***Industry tab UI validations in Default View***');
      verifyColumnsInIndustryTab();
      cy.log('***Industry tab UI validations in Expand View***');
      carrotButtonClickExpand();
      verifyColumnsInIndustryTab();
    },
  );

  it(
    'ME-115257 Industry Modal Validations in Industries > CRM > Customer details | Customer Regression | Sprint Regression',
    {
      tags: [
        '@customer',
        '@crm',
        '@customerDetails',
        '@customerIndustries',
        '@p1',
      ],
    },
    () => {
      navigateToTheIndustriesTab({ customerName: customerNameVal.customerName });
      cy.log('***Industry tab UI and Functional Validations in Default View***');
      verifyAttrText({ locator: tblIndustriesTitle, attribute: industriesTitleDataWalkmeAttr, verifyText: validateIndustriesTableTitle });
      cy.log('***adding record for Validating fields and functionality in edit mode***');
      addNewIndustry({ typeTextVal: industryClassificationSystemSIC, drpDwnValue: industryCodeSIC });
      navigateToEditIndustry();
      verifyAllFieldsInEditIndustryModal();
      cy.log('***Industry tab UI and Functional Validations in Expand View***');
      carrotButtonClickExpand();
      verifyAttrText({ locator: tblIndustriesTitle, attribute: industriesTitleDataWalkmeAttr, verifyText: validateIndustriesTableTitle });
      navigateToEditIndustry();
      verifyAllFieldsInEditIndustryModal();
    },
  );
});