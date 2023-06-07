import crmIndustryData from '../../../../../testData/crm/crmData/crmIndustryData.json';
import {
  addIndustry,
  verifyPrimaryChkBxStatus,
  carrotButtonClickExpand,
  navigateToTheIndustriesTab,
  verifyPrimaryChkBoxEnabled,
} from '../../../../../utilities/customerUtils/customerUtils';
import commonData from '../../../../../testData/staticData/commonData/commonData.json';
import {
  getTDMData,
  viewFullPage,
  waitSometime,
} from '../../../../../utilities/commonUtils/genericUtils';
import { loginToApplication } from '../../../../../utilities/appSpecificUtils/loginUtils/loginUtils';
const { userName: usernameText, password: passwordText } = Cypress.env('users')[Cypress.env('appLoginUser')];
const {
  defaultMode,
  expandMode,
  industryClassificationSystemNAICS,
  industryClassificationSystemSIC,
  tdmAddCustomerReq,
  tdmCustomerData,
  tdmCustomerScenario,
} = crmIndustryData.staticData;
const { moreWait, longWait } = commonData;
const {
  industryCodeNAICS,
  industryCodeSIC,
} = crmIndustryData.userDefinedData;
let customerNameVal;
describe('Can I Validate Primary CheckBox, Data Sources, Save Button & Duplicate code Industries Tab > Customer > CRM > customer details > Industry > Add Industry [ME-114913,ME-114908] ', () => {
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

  it('ME-114908 Can I Validate Primary CheckBox, Data Sources, Save Button & Duplicate code Industries Tab > CRM > Customer details | Customer Regression | Sprint Regression', {
    tags: [
      '@customer',
      '@crm',
      '@customerDetails',
      '@customerIndustry',
      '@p2',
    ],
  },
  () => {
    cy.log('***Verifying in default view***');
    navigateToTheIndustriesTab({ customerName: customerNameVal.customerName });
    verifyPrimaryChkBoxEnabled({ viewMode: defaultMode });
    addIndustry({ typeTextVal: industryClassificationSystemSIC, drpDwnValue: industryCodeSIC, viewMode: defaultMode });
    waitSometime(longWait);
    verifyPrimaryChkBxStatus({ typeText: industryClassificationSystemSIC, drpDwnVal: industryCodeSIC, viewMode: defaultMode });
    cy.log('***Verifying in expand view***');
    carrotButtonClickExpand();
    addIndustry({ typeTextVal: industryClassificationSystemNAICS, drpDwnValue: industryCodeNAICS, viewMode: expandMode });
    waitSometime(moreWait);
    verifyPrimaryChkBxStatus({ typeText: industryClassificationSystemNAICS, drpDwnVal: industryCodeNAICS, viewMode: expandMode });
  });
});