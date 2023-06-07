import crmIndustryData from '../../../../../testData/crm/crmData/crmIndustryData.json';
import crmIndustryPage from '../../../../../pageObjects/crm/crmPage/crmIndustryPage.json';
import {
  addIndustry,
  carrotButtonClickExpand,
  navigateToTheIndustriesTab,
  verifyIndustriesTblValues,
} from '../../../../../utilities/customerUtils/customerUtils';
import commonData from '../../../../../testData/staticData/commonData/commonData.json';
import {
  getTDMData,
  viewFullPage,
  waitSometime,
} from '../../../../../utilities/commonUtils/genericUtils';
import { loginToApplication } from '../../../../../utilities/appSpecificUtils/loginUtils/loginUtils';
const { userName: usernameText, password: passwordText } =
  Cypress.env('users')[Cypress.env('appLoginUser')];
const {
  defaultMode,
  expandMode,
  industryClassificationSystemISIC,
  industryClassificationSystemNAICS,
  industryClassificationSystemSIC,
  industryCode,
  industryCodeISICValue,
  industryCodeNAICSValue,
  industryCodeSICValue,
  industryDivision,
  industryDivisionISICValue,
  industryDivisionNAICSValue,
  industryDivisionSICValue,
  industryExtended,
  industryExtendedISICValue,
  industryExtendedNAICSValue,
  industryExtendedSICValue,
  industryIndustry,
  industryIndustryGroup,
  industryIndustryGroupISICValue,
  industryIndustryGroupNAICSValue,
  industryIndustryGroupSICValue,
  industryIndustryISICValue,
  industryIndustryNAICSValue,
  industryIndustrySICValue,
  industryMajorGroup,
  industryMajorGroupISICValue,
  industryMajorGroupNAICSValue,
  industryMajorGroupSICValue,
  industryPrimary,
  industryPrimaryISICValue,
  industryPrimaryNAICSValue,
  industryPrimarySICValue,
  industrySystem,
  industrySystemISICValue,
  industrySystemNAICSValue,
  industrySystemSICValue,
  tdmAddCustomerReq,
  tdmCustomerData,
  tdmCustomerScenario,
} = crmIndustryData.staticData;
const { longWait, moreWait } = commonData;
const {
  industryCodeISIC,
  industryCodeNAICS,
  industryCodeSIC,
} = crmIndustryData.userDefinedData;
const {
  rowsIndustriesTable,
  rowsIndustriesTableExpand,
} = crmIndustryPage;

let customerNameVal;
const industriesSIC = new Map([
  [industryDivision, industryDivisionSICValue],
  [industryMajorGroup, industryMajorGroupSICValue],
  [industryIndustryGroup, industryIndustryGroupSICValue],
  [industryIndustry, industryIndustrySICValue],
  [industryExtended, industryExtendedSICValue],
  [industrySystem, industrySystemSICValue],
  [industryCode, industryCodeSICValue],
  [industryPrimary, industryPrimarySICValue],
]);

const industriesNAICS = new Map([
  [industryDivision, industryDivisionNAICSValue],
  [industryMajorGroup, industryMajorGroupNAICSValue],
  [industryIndustryGroup, industryIndustryGroupNAICSValue],
  [industryIndustry, industryIndustryNAICSValue],
  [industryExtended, industryExtendedNAICSValue],
  [industrySystem, industrySystemNAICSValue],
  [industryCode, industryCodeNAICSValue],
  [industryPrimary, industryPrimaryNAICSValue],
]);

const industriesISIC = new Map([
  [industryDivision, industryDivisionISICValue],
  [industryMajorGroup, industryMajorGroupISICValue],
  [industryIndustryGroup, industryIndustryGroupISICValue],
  [industryIndustry, industryIndustryISICValue],
  [industryExtended, industryExtendedISICValue],
  [industrySystem, industrySystemISICValue],
  [industryCode, industryCodeISICValue],
  [industryPrimary, industryPrimaryISICValue],
]);
describe('Can I Validate Industries Table Hierarchy in default/Expand view > Customer > CRM > CustomerDetails > Add Industry > Industries Table Hierarchy Validation [ME-113201]', () => {
  beforeEach(() => {
    cy.log('***Creating Customer***');
    getTDMData({ dataType: tdmCustomerData, dataCondition: tdmAddCustomerReq, dataScenario: tdmCustomerScenario });
    cy.then(() => {
      customerNameVal = Cypress.env('inputVal');
      loginToApplication({ username: usernameText, password: passwordText });
      viewFullPage();
    });
  });
  it('ME-113201 Can I Validate Industries Table Hierarchy in default view > CRM > Customer details | Customer Regression | Sprint Regression', {
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
    cy.log('***Verifying column header values of SIC***');
    addIndustry({ typeTextVal: industryClassificationSystemSIC, drpDwnValue: industryCodeSIC, viewMode: defaultMode });
    waitSometime(longWait);
    verifyIndustriesTblValues({ mapName: industriesSIC, locator: rowsIndustriesTable });
    cy.log('***Verifying column header values of NAICS***');
    addIndustry({ typeTextVal: industryClassificationSystemNAICS, drpDwnValue: industryCodeNAICS, viewMode: defaultMode });
    waitSometime(longWait);
    verifyIndustriesTblValues({ mapName: industriesNAICS, locator: rowsIndustriesTable });
    cy.log('***Verifying column header values of ISIC***');
    addIndustry({ typeTextVal: industryClassificationSystemISIC, drpDwnValue: industryCodeISIC, viewMode: defaultMode });
    waitSometime(moreWait);
    verifyIndustriesTblValues({ mapName: industriesISIC, locator: rowsIndustriesTable });
  });
  it('ME-113201 Can I Validate Industries Table Hierarchy in Expand View> CRM > Customer details | Customer Regression | Sprint Regression', {
    tags: [
      '@customer',
      '@crm',
      '@customerDetails',
      '@customerIndustry',
      '@p1',
    ],
  },
  () => {
    cy.log('***Validations On Expand View***');
    navigateToTheIndustriesTab({ customerName: customerNameVal.customerName });
    carrotButtonClickExpand();
    cy.log('***Verifying column header values of SIC In Expand view***');
    addIndustry({ typeTextVal: industryClassificationSystemSIC, drpDwnValue: industryCodeSIC, viewMode: expandMode });
    waitSometime(longWait);
    verifyIndustriesTblValues({ mapName: industriesSIC, locator: rowsIndustriesTableExpand });
    cy.log('***Verifying column header values of NAICS in Expand view***');
    addIndustry({ typeTextVal: industryClassificationSystemNAICS, drpDwnValue: industryCodeNAICS, viewMode: expandMode });
    waitSometime(longWait);
    verifyIndustriesTblValues({ mapName: industriesNAICS, locator: rowsIndustriesTableExpand });
    cy.log('***Verifying column header values of ISIC in Expand view***');
    addIndustry({ typeTextVal: industryClassificationSystemISIC, drpDwnValue: industryCodeISIC, viewMode: expandMode });
    waitSometime(moreWait);
    verifyIndustriesTblValues({ mapName: industriesISIC, locator: rowsIndustriesTableExpand });
  });
});