import crmIndustryData from '../../../../../testData/crm/crmData/crmIndustryData.json';
import crmIndustryPage from '../../../../../pageObjects/crm/crmPage/crmIndustryPage.json';
import {
  carrotButtonClickExpand,
  navigateToTheIndustriesTab,
  verifyCustomizeIndustriesDrgAndDwp,
} from '../../../../../utilities/customerUtils/customerUtils';
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
  tdmAddCustomerReq,
  tdmCustomerData,
  tdmCustomerScenario,
  titleAddNewIndustryDialog,
} = crmIndustryData.staticData;
const {
  btnCarrotExpandCustomize,
  btnCustomize,
  btnExpand,
  btnExpandCustomize,
  btnExpandIndustriesPlus,
  btnIndustriesPlus,
  customizeTable,
  dialogPopup,
  dialogPopUpExpandView,
  dialogTblIndustriesHeader,
  dialogWindow,
  drpdwnCarrotBtnIndustries,
  expandViewDialogWindow,
  tblIndustriesHeader,
} = crmIndustryPage;
let customerNameVal;
describe('Can I Verify Carrier Industries tab UI Validation > Customer > CRM > Customer details > Industries [ME-111439,ME-111440]', () => {
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
  it('ME-111439 : Can I Verify Carrier Industries tab UI Validation > CRM > Customer details | Customer Regression | Sprint Regression',
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
      cy.log('***validations in defaultView***');
      cy.log('***verifying for header columns, plus button on industry pop box***');
      navigateToTheIndustriesTab({ customerName: customerNameVal.customerName });
      clickAction({ locator: btnIndustriesPlus });
      verifyVisible({ element: dialogWindow });
      verifyTextContains({ locator: dialogWindow, containsText: titleAddNewIndustryDialog });
      verifyClosePopup();
      cy.log('***Validations on columns in defaultView***');
      verifyTableColumnsHeaders({ locator: tblIndustriesHeader, columnNames: industriesTableColumnHeaders });
      cy.log('***validations in Expand View***');
      clickAction({ locator: drpdwnCarrotBtnIndustries });
      clickVisibleElement({ locator: btnExpand });
      verifyVisible({ element: expandViewDialogWindow });
      clickVisibleElement({ locator: btnExpandIndustriesPlus });
      verifyVisible({ element: dialogWindow });
      verifyTextContains({ locator: dialogWindow, containsText: titleAddNewIndustryDialog });
      clickAction({ locator: dialogPopUpExpandView });
      cy.log('***Validations on columns in defaultView***');
      verifyTableColumnsHeaders({ locator: dialogTblIndustriesHeader, columnNames: industriesTableColumnHeaders });
      verifyClosePopup();
    });

  it('ME-111440 : Can I Verify Customize Table Validations In Industries TabCRM > Customer details | Customer Regression | Sprint Regression',
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