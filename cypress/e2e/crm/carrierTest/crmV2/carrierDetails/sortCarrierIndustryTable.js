import crmIndustryData from '../../../../../testData/crm/crmData/crmIndustryData.json';
import crmIndustryPage from '../../../../../pageObjects/crm/crmPage/crmIndustryPage.json';
import {
  addIndustry,
  carrotButtonClickExpand,
  navigateToTheIndustriesTab,
} from '../../../../../utilities/carrierUtils/carrierUtils';
import commonData from '../../../../../testData/staticData/commonData/commonData.json';
import {
  clickAndVerifyGridAlignment,
  clickVisibleElement,
  getTDMData,
  verifyText,
  viewFullPage,
  waitSometime,
} from '../../../../../utilities/commonUtils/genericUtils';
import { loginToApplication } from '../../../../../utilities/appSpecificUtils/loginUtils/loginUtils';
const { userName: usernameText, password: passwordText } = Cypress.env('users')[Cypress.env('appLoginUser')];
const {
  defaultMode,
  industryClassificationSystemISIC,
  industryClassificationSystemNAICS,
  industryClassificationSystemSIC,
  industryTabText,
  tdmAddCarrierReq,
  tdmCarrierData,
  tdmCarrierScenario,
} = crmIndustryData.staticData;
const { longWait } = commonData;
const {
  industryCodeISIC,
  industryCodeNAICS,
  industryCodeSIC,
} = crmIndustryData.userDefinedData;
const {
  colHeaderCodeParent,
  colHeaderDivisionParent,
  colHeaderExtendedParent,
  colHeaderIndustryGroupParent,
  colHeaderIndustryParent,
  colHeaderMajorGroupParent,
  colHeaderPrimaryParent,
  colHeaderSystemParent,
  expandViewDialogPopUpClose,
  tabIndustry,
  tabParent,
  tabParentExp,
} = crmIndustryPage;

let carrierNameVal;
const columnLocatorsView = [
  colHeaderDivisionParent,
  colHeaderMajorGroupParent,
  colHeaderIndustryGroupParent,
  colHeaderIndustryParent,
  colHeaderExtendedParent,
  colHeaderSystemParent,
  colHeaderCodeParent,
  colHeaderPrimaryParent,
];

describe('Can I Sort Up/Down arrow of industries table in Industries Tab > Carrier > CRM > CarrierDetails > Industries Tab > Add Industry  [ME-114901]', () => {
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
  it('ME-114901 Can I Sort Up/Down arrow of industries table in Industries Tab > CRM > Carrier details | Carrier Regression | Sprint Regression', {
    tags: [
      '@carrier',
      '@crm',
      '@carrierDetails',
      '@carrierIndustries',
      '@p1',
    ],
  },
  () => {
    cy.log('***Verifying in default view***');
    navigateToTheIndustriesTab({ carrierName: carrierNameVal.carrierName });
    addIndustry({ typeTextVal: industryClassificationSystemSIC, drpDwnValue: industryCodeSIC, viewMode: defaultMode });
    waitSometime(longWait);
    addIndustry({ typeTextVal: industryClassificationSystemNAICS, drpDwnValue: industryCodeNAICS, viewMode: defaultMode });
    waitSometime(longWait);
    addIndustry({ typeTextVal: industryClassificationSystemISIC, drpDwnValue: industryCodeISIC, viewMode: defaultMode });
    cy.log('***Verifying sorting for Division, Major Group, Industry Group, Industry, Extended, System,Code,Primary Column header***');
    columnLocatorsView.forEach((value) => {
      clickAndVerifyGridAlignment({ locator: tabParent, element: value });
    });
    cy.log('***Verifying in expand view***');
    carrotButtonClickExpand();
    cy.log('***Verifying sorting for Division, Major Group, Industry Group, Industry, Extended, System,Code,Primary Column header***');
    columnLocatorsView.forEach((value) => {
      clickAndVerifyGridAlignment({ locator: tabParentExp, element: value });
    });
    clickVisibleElement({ locator: expandViewDialogPopUpClose });
    verifyText({ locator: tabIndustry, verifyText: industryTabText });
  });
});