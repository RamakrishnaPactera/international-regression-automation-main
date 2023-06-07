import crmIndustryData from '../../../../../testData/crm/crmData/crmIndustryData.json';
import crmIndustryPage from '../../../../../pageObjects/crm/crmPage/crmIndustryPage.json';
import {
  addIndustry,
  carrotButtonClickExpand,
  navigateToTheIndustriesTab,
} from '../../../../../utilities/customerUtils/customerUtils';
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
  tdmAddCustomerReq,
  tdmCustomerData,
  tdmCustomerScenario,
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

let customerNameVal;
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

describe('Can I Sort Up/Down arrow of industries table in Industries Tab > Customer > CRM > customer details > Industry > Add Industry [ME-114898]', () => {
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

  it('ME-114898 Can I Sort Up/Down arrow of industries table in Industries Tab > CRM > Customer details | Customer Regression | Sprint Regression', {
    tags: [
      '@customer',
      '@crm',
      '@customerDetails',
      '@customerIndustry',
      '@p1',
    ],
  },
  () => {
    cy.log('***Verifying in default view***');
    navigateToTheIndustriesTab({ customerName: customerNameVal.customerName });
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