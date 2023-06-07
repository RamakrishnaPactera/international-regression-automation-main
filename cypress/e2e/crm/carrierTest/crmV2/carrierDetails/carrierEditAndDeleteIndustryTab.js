import crmIndustryData from '../../../../../testData/crm/crmData/crmIndustryData.json';
import commonData from '../../../../../testData/staticData/commonData/commonData.json';
import {
  addIndustry,
  carrotButtonClickExpand,
  deleteIndustry,
  navigateToEditIndustry,
  navigateToTheIndustriesTab,
  verifyEditFunctionality,
} from '../../../../../utilities/carrierUtils/carrierUtils';
import { loginToApplication } from '../../../../../utilities/appSpecificUtils/loginUtils/loginUtils';
import {
  getTDMData,
  viewFullPage,
  waitSometime,
} from '../../../../../utilities/commonUtils/genericUtils';
const { shortWait } = commonData;
const { userName: usernameText, password: passwordText } =
  Cypress.env('users')[Cypress.env('appLoginUser')];
const {
  defaultMode,
  expandMode,
  industryClassificationSystemSIC,
  tdmAddCarrierReq,
  tdmCarrierData,
  tdmCarrierScenario,
} = crmIndustryData.staticData;
const { industryCodeSIC } = crmIndustryData.userDefinedData;
let carrierNameVal;
describe('Can I Verifying Edit, Delete Industries Modal > Carrier > CRM > Carrier Details > Industries Tab [ME-113203]', () => {
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
  it(
    'ME-113203 :Can I Verifying Edit, Delete Industries Modal > carrier > CRM > carrier details > Industries Tab | Carrier Regression | Sprint Regression',
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
      addIndustry({
        typeTextVal: industryClassificationSystemSIC,
        drpDwnValue: industryCodeSIC,
        viewMode: defaultMode,
      });
      cy.log('***Editing Carrier***');
      navigateToEditIndustry();
      verifyEditFunctionality();
      cy.log('***Deleting Carrier***');
      deleteIndustry();
      cy.log('***Verifying UI Validations in Expand View***');
      carrotButtonClickExpand();
      addIndustry({
        typeTextVal: industryClassificationSystemSIC,
        drpDwnValue: industryCodeSIC,
        viewMode: expandMode,
      });
      cy.log('***Editing Carrier***');
      navigateToEditIndustry();
      verifyEditFunctionality();
      waitSometime(shortWait);
      cy.log('***Deleting Carrier***');
      deleteIndustry();
    },
  );
});