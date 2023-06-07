import crmFirmographicsData from '../../../../../testData/crm/crmData/crmFirmographicsData.json';
import crmFirmographicsPage from '../../../../../pageObjects/crm/crmPage/crmFirmographicsPage.json';
import { searchCarrier } from '../../../../../utilities/carrierUtils/carrierUtils';
import {
  clickAction,
  clickActionWait,
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
  tdmAddCarrierReq,
  tdmCarrierData,
  tdmCarrierScenario,
} = crmFirmographicsData.staticData;
const {
  btnFirmographics,
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
  tabCarrierDetails,
  tabCrmCarrier,
  toolTipMsgAssets,
  toolTipMsgGrossProfit,
  toolTipMsgIncorporated,
  toolTipMsgKeyPrincipal,
  toolTipMsgYearFounded,
} = crmFirmographicsPage;

let carrierNameVal;
describe('Carrier > CRM > Carrier details > Firmographics > UI Validations', () => {
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
  });
  it('ME-121327 Can I Validate Firmographics UI validations > CRM > Carrier details | Carrier Regression | Sprint Regression',
    {
      tags: [
        '@carrier',
        '@crm',
        '@carrierDetails',
        '@carrierFirmographics',
        '@p3',
      ],
    },
    () => {
      searchCarrier({ carrierName: carrierNameVal.carrierName });
      viewFullPage();
      clickFirstElementIn({ locator: tabCrmCarrier });
      verifyVisible({ element: tabCarrierDetails });
      clickAction({ locator: tabCarrierDetails });
      verifyVisible({ element: btnFirmographics });
      clickActionWait({ locator: btnFirmographics });
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