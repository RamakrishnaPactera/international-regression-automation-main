import crmFirmographicsData from '../../../../../testData/crm/crmData/crmFirmographicsData.json';
import crmFirmographicsPage from '../../../../../pageObjects/crm/crmPage/crmFirmographicsPage.json';
import { searchCustomer } from '../../../../../utilities/customerUtils/customerUtils';
import {
  clickAction,
  clickFirstElementIn,
  getTDMData,
  notClickable,
  verifyNotVisible,
  verifyToExist,
  verifyToolTips,
  verifyVisible,
  viewFullPage,
} from '../../../../../utilities/commonUtils/genericUtils';
import { loginToApplication } from '../../../../../utilities/appSpecificUtils/loginUtils/loginUtils';
const { userName: usernameText, password: passwordText } =
  Cypress.env('users')[Cypress.env('appLoginUser')];
const {
  msgToolTipAssets,
  msgToolTipGrossProfit,
  msgToolTipIncorporated,
  msgToolTipKeyPrincipal,
  msgToolTipYearFounded,
  tdmAddCustomerReq,
  tdmCustomerData,
  tdmCustomerScenario,
} = crmFirmographicsData.staticData;
const {
  btnFirmographicsEdit,
  btnFirmographicsSave,
  dialogClose,
  dialogPopUpWindowFirmographics,
  labelAssets,
  labelGrossProfit,
  labelIncorporated,
  labelKeyPrincipal,
  labelYearFounded,
  msgVerbiage,
  tabCrmCustomer,
  tabCustomerDetails,
  tabFirmographics,
  toolTipMsgAssets,
  toolTipMsgGrossProfit,
  toolTipMsgIncorporated,
  toolTipMsgKeyPrincipal,
  toolTipMsgYearFounded,
} = crmFirmographicsPage;

let customerNameVal;
describe('Customer > CRM > customer details > Firmographics >UI Validations', () => {
  before(() => {
    cy.log('***Creating Customer***');
    getTDMData({ dataType: tdmCustomerData, dataCondition: tdmAddCustomerReq, dataScenario: tdmCustomerScenario });
    cy.then(() => {
      customerNameVal = Cypress.env('inputVal');
    });
  });
  beforeEach(() => {
    loginToApplication({
      username: usernameText,
      password: passwordText,
    });
  });
  it('ME-121328 Can I Validate Firmographics UI validations Customer > CRM > customerDetails > Firmographics | Customer Regression | Sprint Regression ',
    {
      tags: [
        '@customer',
        '@crm',
        '@customerDetails',
        '@customerFirmographics',
        '@p3',
      ],
    },
    () => {
      searchCustomer({ customerName: customerNameVal.customerName });
      viewFullPage();
      clickFirstElementIn({ locator: tabCrmCustomer });
      verifyVisible({ element: tabCustomerDetails });
      clickAction({ locator: tabCustomerDetails });
      verifyVisible({ element: tabFirmographics });
      clickAction({ locator: tabFirmographics });
      verifyVisible({ element: btnFirmographicsEdit });
      clickAction({ locator: btnFirmographicsEdit });
      verifyVisible({ element: dialogPopUpWindowFirmographics });
      verifyVisible({ element: dialogClose });
      cy.log('***Validating Firmographics labels and tooltip message\'s***');
      verifyToExist({ element: labelGrossProfit });
      verifyToolTips({ locator: toolTipMsgGrossProfit, verifyText: msgToolTipGrossProfit });
      verifyToExist({ element: labelAssets });
      verifyToolTips({ locator: toolTipMsgAssets, verifyText: msgToolTipAssets });
      verifyToExist({ element: labelKeyPrincipal });
      verifyToolTips({ locator: toolTipMsgKeyPrincipal, verifyText: msgToolTipKeyPrincipal });
      verifyToExist({ element: labelYearFounded });
      verifyToolTips({ locator: toolTipMsgYearFounded, verifyText: msgToolTipYearFounded });
      verifyToExist({ element: labelIncorporated });
      verifyToolTips({ locator: toolTipMsgIncorporated, verifyText: msgToolTipIncorporated });
      notClickable({ locator: btnFirmographicsSave });
      verifyNotVisible({ element: msgVerbiage });
    });
});