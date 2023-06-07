import crmIndustryData from '../../../../../testData/crm/crmData/crmIndustryData.json';
import crmIndustryPage from '../../../../../pageObjects/crm/crmPage/crmIndustryPage.json';
import { navigateToTheIndustriesTab, carrotButtonClickExpand, verifyCustomizeIndustriesDrgAndDwp } from '../../../../../utilities/carrierUtils/carrierUtils';
import {
  clickAction,
  clickVisibleElement,
  getTDMData,
  verifyClosePopup,
  verifyTableColumnsHeaders,
  verifyTextContains,
  verifyToExist,
  verifyVisible,
  viewFullPage,
} from '../../../../../utilities/commonUtils/genericUtils';
import { loginToApplication } from '../../../../../utilities/appSpecificUtils/loginUtils/loginUtils';
const { userName: usernameText, password: passwordText } =
  Cypress.env('users')[Cypress.env('appLoginUser')];
const {
  industriesTableColumnHeaders,
  tdmAddCarrierReq,
  tdmCarrierData,
  tdmCarrierScenario,
  titleAddNewIndustryDialog,
} = crmIndustryData.staticData;
const {
  btnCarrotExpandCustomize,
  btnCustomize,
  btnExpandCustomize,
  btnExpandIndustriesPlus,
  btnIndustriesPlus,
  customizeTable,
  dialogPopup,
  dialogPopUpExpandView,
  dialogTblIndustriesHeader,
  dialogWindow,
  drpdwnCarrotBtnIndustries,
  tblIndustriesHeader,
} = crmIndustryPage;

let carrierNameVal;
describe('Can I Verify Carrier Industries tab UI Validation > Carrier > CRM > Carrier details > Industries Tab [ME-111157,ME-111190]', () => {
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

  it('ME-111157 Can I Verify Carrier Industries tab UI Validation > CRM > Carrier details | Carrier Regression | Sprint Regression',
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
      cy.log('***validations in defaultView***');
      cy.log('***verifying for header columns, plus button on industry pop box***');
      navigateToTheIndustriesTab({ carrierName: carrierNameVal.carrierName });
      clickAction({ locator: btnIndustriesPlus });
      verifyVisible({ element: dialogWindow });
      verifyTextContains({ locator: dialogWindow, containsText: titleAddNewIndustryDialog });
      cy.log('***verify close popup ***');
      verifyClosePopup();
      cy.log('***validating columns names in default view***');
      verifyTableColumnsHeaders({ locator: tblIndustriesHeader, columnNames: industriesTableColumnHeaders });
      cy.log('***validations in Expand view***');
      carrotButtonClickExpand();
      clickVisibleElement({ locator: btnExpandIndustriesPlus });
      verifyVisible({ element: dialogWindow });
      verifyTextContains({ locator: dialogWindow, containsText: titleAddNewIndustryDialog });
      clickAction({ locator: dialogPopUpExpandView });
      cy.log('***validating columns names in Expand view***');
      verifyTableColumnsHeaders({ locator: dialogTblIndustriesHeader, columnNames: industriesTableColumnHeaders });
      verifyClosePopup();
    });
  it('ME-111190 Can I Verify Customize Table Validations In Industries Tab > CRM > Carrier details | Carrier Regression | Sprint Regression',
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
      clickAction({ locator: drpdwnCarrotBtnIndustries });
      clickVisibleElement({ locator: btnCustomize });
      verifyVisible({ element: dialogPopup });
      clickVisibleElement({ locator: dialogPopup });
      clickAction({ locator: drpdwnCarrotBtnIndustries });
      clickVisibleElement({ locator: btnCustomize });
      verifyToExist({ element: customizeTable });
      verifyCustomizeIndustriesDrgAndDwp();
      cy.log('***validations in Expand view***');
      carrotButtonClickExpand();
      clickVisibleElement({ locator: btnCarrotExpandCustomize });
      clickVisibleElement({ locator: btnExpandCustomize });
      verifyToExist({ element: customizeTable });
      verifyCustomizeIndustriesDrgAndDwp();
    });
});