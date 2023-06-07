import crmIndustryData from '../../../../../testData/crm/crmData/crmIndustryData.json';
import commonData from '../../../../../testData/staticData/commonData/commonData.json';
import {
  addIndustry,
  carrotButtonClickExpand,
  deleteIndustry,
  navigateToEditIndustry,
  navigateToTheIndustriesTab,
  verifyEditFunctionality,
} from '../../../../../utilities/customerUtils/customerUtils';
import { loginToApplication } from '../../../../../utilities/appSpecificUtils/loginUtils/loginUtils';
import {
  getTDMData,
  viewFullPage,
  waitSometime,
} from '../../../../../utilities/commonUtils/genericUtils';
const { shortWait } = commonData;
const { userName: usernameText, password: passwordText } = Cypress.env('users')[Cypress.env('appLoginUser')];
const {
  defaultMode,
  expandMode,
  industryClassificationSystemSIC,
  tdmAddCustomerReq,
  tdmCustomerData,
  tdmCustomerScenario,
} = crmIndustryData.staticData;
const { industryCodeSIC } = crmIndustryData.userDefinedData;
let customerNameVal;
describe('Can I Validate Industries Menu Edit and Delete Industries Modal > Customer > CRM > Customer Details > Industries Tab [ME-113198]', () => {
  before(() => {
    cy.log('***Creating Customer***');
    getTDMData({ dataType: tdmCustomerData, dataCondition: tdmAddCustomerReq, dataScenario: tdmCustomerScenario });
    cy.then(() => {
      customerNameVal = Cypress.env('inputVal');
    });
  });
  beforeEach(() => {
    loginToApplication({ username: usernameText, password: passwordText });
    viewFullPage();
  });
  it('ME-113198 :Can I Validate Industries Menu Edit and Delete Industries Modal| Carrier Regression | Sprint Regression', {
    tags: [
      '@customer',
      '@crm',
      '@customerDetails',
      '@customerIndustries',
      '@p1',
    ],
  }, () => {
    navigateToTheIndustriesTab({ customerName: customerNameVal.customerName });
    cy.log('***Adding Customer***');
    addIndustry({ typeTextVal: industryClassificationSystemSIC, drpDwnValue: industryCodeSIC, viewMode: defaultMode });
    cy.log('***Editing Customer***');
    navigateToEditIndustry();
    verifyEditFunctionality();
    cy.log('***Deleting Customer***');
    deleteIndustry();
    cy.log('***Verifying UI Validations in Expand View***');
    carrotButtonClickExpand();
    addIndustry({ typeTextVal: industryClassificationSystemSIC, drpDwnValue: industryCodeSIC, viewMode: expandMode });
    cy.log('***Editing Customer***');
    navigateToEditIndustry();
    verifyEditFunctionality();
    waitSometime(shortWait);
    cy.log('***Deleting Customer***');
    deleteIndustry();
  });
});