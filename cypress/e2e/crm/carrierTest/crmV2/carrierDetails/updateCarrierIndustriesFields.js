import crmFirmographicsData from '../../../../../testData/crm/crmData/crmFirmographicsData.json';
import crmIndustryData from '../../../../../testData/crm/crmData/crmIndustryData.json';
import crmFirmographicsPage from '../../../../../pageObjects/crm/crmPage/crmFirmographicsPage.json';
import {
  addNewIndustry,
  carrotButtonClickExpand,
  navigateToEditIndustry,
  navigateToTheIndustriesTab,
  verifyAllFieldsInEditIndustryModal,
  verifyColumnsInIndustryTab,
} from '../../../../../utilities/carrierUtils/carrierUtils';
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
  tdmAddCarrierReq,
  tdmCarrierData,
  tdmCarrierScenario,
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

let carrierNameVal;
describe('Can I Validate Industry Tab UI Validations in Industries > Carrier > CRM > Carrier details > Industries > Add Industry Validations [ ME-113226, ME-115258 ]', () => {
  before(() => {
    cy.log('***creating new carrier***');
    getTDMData({ dataType: tdmCarrierData, dataCondition: tdmAddCarrierReq, dataScenario: tdmCarrierScenario });
    cy.then(() => {
      carrierNameVal = Cypress.env('inputVal');
    });
  });
  beforeEach(() => {
    loginToApplication({
      username: usernameText,
      password: passwordText,
    });
    viewFullPage();
  });

  it('ME-113226 Can I Validate Industry Tab UI Validations in Industries > CRM > Carrier details | Carrier Regression | Sprint Regression',
    {
      tags: [
        '@carrier',
        '@crm',
        '@carrierDetails',
        '@carrierIndustries',
        '@p3',
      ],
    },
    () => {
      navigateToTheIndustriesTab({ carrierName: carrierNameVal.carrierName });
      cy.log('***Industry tab UI validations in Default View***');
      verifyColumnsInIndustryTab();
      cy.log('***Industry tab UI validations in Expand View***');
      carrotButtonClickExpand();
      verifyColumnsInIndustryTab();
    },
  );

  it('ME-115258 Can I Validate Industry Modal Validations in Industries > CRM > Carrier details | Carrier Regression | Sprint Regression',
    {
      tags: [
        '@carrier',
        '@crm',
        '@carrierDetails',
        '@carrierIndustries',
        '@p1',
      ],
    },
    () => {
      navigateToTheIndustriesTab({ carrierName: carrierNameVal.carrierName });
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