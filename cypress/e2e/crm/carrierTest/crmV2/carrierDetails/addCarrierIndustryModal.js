import crmIndustryData from '../../../../../testData/crm/crmData/crmIndustryData.json';
import {
  verifyPrimaryChkBxStatus,
  addIndustry,
  carrotButtonClickExpand,
  navigateToTheIndustriesTab,
  verifyPrimaryChkBoxEnabled,
} from '../../../../../utilities/carrierUtils/carrierUtils';
import commonData from '../../../../../testData/staticData/commonData/commonData.json';
import {
  getTDMData,
  viewFullPage,
  waitSometime,
} from '../../../../../utilities/commonUtils/genericUtils';
import { loginToApplication } from '../../../../../utilities/appSpecificUtils/loginUtils/loginUtils';
const { userName: usernameText, password: passwordText } = Cypress.env('users')[Cypress.env('appLoginUser')];
const {
  industryClassificationSystemNAICS,
  industryClassificationSystemSIC,
  tdmAddCarrierReq,
  tdmCarrierData,
  tdmCarrierScenario,
  defaultMode,
  expandMode,
} = crmIndustryData.staticData;
const { shortWait, longWait, moreWait } = commonData;
const {
  industryCodeNAICS,
  industryCodeSIC,
} = crmIndustryData.userDefinedData;
let carrierNameVal;
describe('Can I Validate Primary CheckBox, Data Sources, Save Button & Duplicate code > Carrier > CRM > CarrierDetails > Industries Tab > Add Industry [ME-114902]', () => {
  before(() => {
    cy.log('***creating new carrier***');
    getTDMData({ dataType: tdmCarrierData, dataCondition: tdmAddCarrierReq, dataScenario: tdmCarrierScenario });
    cy.then(() => {
      carrierNameVal = Cypress.env('inputVal');
    });
  });
  beforeEach(() => {
    loginToApplication({ username: usernameText, password: passwordText });
    viewFullPage();
  });

  it('ME-114902 Can I Validate Primary CheckBox, Data Sources, Save Button & Duplicate code Industries Tab > CRM > Carrier details | Carrier Regression | Sprint Regression', {
    tags: [
      '@carrier',
      '@crm',
      '@carrierDetails',
      '@carrierIndustries',
      '@p1',
    ],
  },
  () => {
    cy.log('***verifying in default view***');
    navigateToTheIndustriesTab({ carrierName: carrierNameVal.carrierName });
    verifyPrimaryChkBoxEnabled({ viewMode: defaultMode });
    addIndustry({ typeTextVal: industryClassificationSystemSIC, drpDwnValue: industryCodeSIC, viewMode: defaultMode });
    waitSometime(longWait);
    verifyPrimaryChkBxStatus({ typeText: industryClassificationSystemSIC, drpDwnVal: industryCodeSIC, viewMode: defaultMode });
    waitSometime(shortWait);
    cy.log('***verifying in expand view***');
    carrotButtonClickExpand();
    addIndustry({ typeTextVal: industryClassificationSystemNAICS, drpDwnValue: industryCodeNAICS, viewMode: expandMode });
    waitSometime(moreWait);
    verifyPrimaryChkBxStatus({ typeText: industryClassificationSystemNAICS, drpDwnVal: industryCodeNAICS, viewMode: expandMode });
    waitSometime(shortWait);
  });
});